COPY words(id, word, definition_en, definition_pl, enabled, lvl, data, is_daily)
FROM '/docker-entrypoint-initdb.d/words.csv'
DELIMITER '|'
CSV HEADER;

INSERT INTO admins VALUES ('admin', '$2b$10$hvP/FaFNF7pEl/gZ9h/KYOnjcI9SsSIHckX9w5QNpdyuQ6panJYra');