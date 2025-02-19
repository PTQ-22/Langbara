CREATE TABLE users(
	id TEXT PRIMARY KEY NOT NULL,
	display_name TEXT NOT NULL,
	email TEXT NOT NULL,
	passwd TEXT NOT NULL,
	points INT DEFAULT 0 NOT NULL,
	streak INT DEFAULT 0 NOT NULL,
	"data" JSONB DEFAULT '{}'::jsonb NOT NULL,
    is_2fa BOOLEAN NOT NULL DEFAULT FALSE,
    secret_2fa TEXT
);

CREATE INDEX display_name_index ON users(display_name);
CREATE INDEX email_index ON users(email);


CREATE TABLE words(
	id TEXT PRIMARY KEY,
	word TEXT NOT NULL,
	definition_en TEXT NOT NULL,
	definition_pl TEXT NOT NULL,
	enabled BOOLEAN DEFAULT TRUE,
	lvl SMALLINT DEFAULT 0,
	data JSONB,
	is_daily BOOLEAN DEFAULT FALSE
);

CREATE INDEX word_lvl ON words(lvl);


CREATE TABLE daily(
	"date" DATE PRIMARY KEY,
	word_id TEXT REFERENCES words(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);


CREATE TABLE games(
	id TEXT PRIMARY KEY,
	user_id TEXT REFERENCES users(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	word_id TEXT REFERENCES words(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	"date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	data JSONB
);

CREATE INDEX user_id_index ON games(user_id);


CREATE TABLE pendingGames(
	token TEXT PRIMARY KEY,
	word_id TEXT REFERENCES words(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	user_id TEXT,
	user_type BOOLEAN,
	"date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    data JSONB
);

CREATE TABLE admins (
	"name" TEXT PRIMARY KEY,
	passwd TEXT NOT NULL,
    is_2fa BOOLEAN NOT NULL DEFAULT FALSE,
    secret_2fa TEXT
);


CREATE OR REPLACE FUNCTION get_unlimited(
	p_token TEXT,
	p_user_id TEXT,
	p_user_type BOOLEAN,
	p_data JSONB,
	p_lvl SMALLINT)
RETURNS TABLE (
	id TEXT,
	definition_pl TEXT,
	definition_en TEXT,
	hints jsonb,
	part jsonb,
	lvl SMALLINT,
	guesses_left INT
)
LANGUAGE plpgsql
AS
$do$
DECLARE
	pending pendinggames%ROWTYPE;
	newWordId TEXT;
BEGIN
	
	IF EXISTS(SELECT FROM pendinggames WHERE token = p_token) THEN
		SELECT *
		INTO pending
		FROM pendinggames
		WHERE token = p_token;
	
		RETURN QUERY
		SELECT
			words.id,
			words.definition_pl,
			words.definition_en,
			words.data->'hints' as hints,
			words.data->'part' as part,
			words.lvl,
			(pending.data->'guesses_left')::INT
		FROM words
		WHERE words.id = pending.word_id;
	ELSE
		SELECT words.id
		INTO newWordId
		FROM words 
		WHERE words.id NOT IN (
		  SELECT word_id
		  FROM games
		  WHERE user_id = p_user_id AND (data->>'earned')::INT > 0
		) 
		  AND words.enabled 
		  AND words.lvl = p_lvl
		ORDER BY RANDOM()
		LIMIT 1;
		
		INSERT INTO pendingGames(user_id, word_id, user_type, token, data)
		VALUES (p_user_id, newWordId, p_user_type, p_token, p_data)
		ON CONFLICT (token) DO NOTHING;
		
		RETURN QUERY
		SELECT 
			words.id,
			words.definition_pl,
			words.definition_en,
			words.data->'hints' as hints,
			words.data->'part' as part,
			words.lvl,
			-1
		FROM words 
		WHERE words.id = newWordId;
		
	END IF;
END
$do$;


CREATE OR REPLACE FUNCTION get_daily(
	p_token TEXT,
	p_user_id TEXT,
	p_user_type BOOLEAN,
	p_data JSONB,
	p_day INT,
	p_month INT,
	p_year INT)
RETURNS TABLE (
	id TEXT,
	definition_pl TEXT,
	definition_en TEXT,
	hints jsonb,
	part jsonb,
	lvl SMALLINT,
	guesses_left INT
)
LANGUAGE plpgsql
AS
$do$
DECLARE
	pending pendinggames%ROWTYPE;
	newWordId TEXT;
BEGIN
	
	IF EXISTS(SELECT FROM pendinggames WHERE token = p_token) THEN
		SELECT *
		INTO pending
		FROM pendinggames
		WHERE token = p_token;
	
		RETURN QUERY
		SELECT
			words.id,
			words.definition_pl,
			words.definition_en,
			words.data->'hints' as hints,
			words.data->'part' as part,
			words.lvl,
			(pending.data->'guesses_left')::INT
		FROM words
		WHERE words.id = pending.word_id;
	ELSE
		SELECT word_id
		INTO newWordId
		FROM daily
		WHERE
			EXTRACT(DAY FROM "date") = p_day AND
			EXTRACT(MONTH FROM "date") = p_month AND
			EXTRACT(YEAR FROM "date") = p_year;
		
		IF FOUND THEN

			INSERT INTO pendingGames(user_id, word_id, user_type, token, data)
			VALUES (p_user_id, newWordId, p_user_type, p_token, p_data)
			ON CONFLICT (token) DO NOTHING;

			RETURN QUERY
			SELECT 
				words.id,
				words.definition_pl,
				words.definition_en,
				words.data->'hints' as hints,
				words.data->'part' as part,
				words.lvl,
				-1
			FROM words 
			WHERE words.id = newWordId;
		END IF;
		
	END IF;
END
$do$;


CREATE OR REPLACE FUNCTION update_points(
	p_token TEXT, -- pending game token
	p_user_id TEXT,
	p_user_type BOOLEAN, -- 0 if unregistered, 1 if registered
	p_max_points INT,
	p_points_drop_per_guess INT,
	p_max_guess_number INT
)
RETURNS INT
LANGUAGE plpgsql
AS
$do$
DECLARE
	v_pending pendinggames%ROWTYPE;
	v_earned INT;
BEGIN
	SELECT *
	INTO v_pending
	FROM pendinggames
	WHERE token = p_token AND user_id = p_user_id;

	IF FOUND THEN
		-- game exists
		
		v_earned := p_max_points - p_points_drop_per_guess * (p_max_guess_number - (v_pending.data->>'guesses_left')::int);
	
		IF p_user_type THEN
			
			UPDATE users
			SET 
				points = points + v_earned
			FROM pendinggames
			WHERE id = user_id;
			
		END IF;
		
		RETURN v_earned;
		
	ELSE
		-- game doenst exist
		RETURN -1;
	END IF;
	
END
$do$;


