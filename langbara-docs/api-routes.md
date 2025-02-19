# Routes docs

Also list is sorted alphabetically. If you add something pls put it in a right place.

## API V1 `/api/v1`
### POST `/login`

Body (JSON)
- `login` - displayName or email
- `passwd` - plaintext passwd

Returns JSON
```js
{
    "msg": "Success!",
    "auth": "[AUTH_COOKIE]" // new value of cookie (set it on NextJS side)
}
```
---
### POST `/register`

Body (JSON):
- `displayName`
- `email`
- `passwd` - plaintext

Cookies:
- `auth` - user cookie with all the data

Returns JSON
```js
{
    "msg": "User successfully created!",
    "auth": "[COOKIE_VALUE]" // new value of cookie (set it on NextJS side)
}
```
---
### POST `/admin/2fa/register`

Generates temporary 2FA secret key for admin to display as QR code.

Body JSON
- `name` - admin name

Returns JSON
```ts
{
    secret: string;
}
```
### POST `/admin/change-password`

(change password for admins)

Body (JSON)
- `oldPassword`
- `newPassword`

!!! IMPORTANT this route also requires `authcookie` query param with admin auth cookie provided


Returns JSON
```js
{
    "msg": "Password changed for admin: {name}"
}
```
### POST `/admin/login`

Body (JSON)
- `login` - admin name
- `passwd` - plaintext passwd

Returns JSON
```js
{
    "msg": "Success",
    "cookies": {
        "adminauth": "[COOKIE_VALUE]" // set adminauth cookie to this value on nextjs side
    }
}
```
---
### POST `/admin/register`

Body (JSON)
- `name` - admin name
- `password` - plaintext passwd

Returns (JSON) with status 201
```js
{
    "msg": "Admin successfully created!"
}
```

---
### POST `/user/change-password`

(change password for normal users)

Body (JSON)
- `id` - userId
- `oldPassword`
- `newPassword`

Returns JSON
```js
{
    "msg": "Password changed for user with id: {body.id}"
}
```
---
### POST `/words/daily-list`

Body JSON
 - `month: number`
 - `year: number`

Fetches list of all dates for a given month and year with daily word set

Returns JSON
```ts
{
    msg: "OK",
    dates: [
        ...
    ] // dates array
}
```
---
### GET `/words/new-daily`
### POST `/words/on-date`
Body (JSON): 
- `date` - it should be string `new Date().toDateString()` to prevent problem with different date on server

Returns word for given date from database

Returns JSON
```ts
{
    word: {
        id: string;
        word: string;
        definition_pl: string;
        definition_en: string;
        enabled: boolean;
        is_daily: boolean;
        lvl: number;
        data: {
            hints: string[];
            part: string;
        };
    }
}
```
---

Fetches new daily word from DB with given conditions:
- `is_daily = FALSE`
- `enabled  = TRUE`

Returns JSON
```ts
{
    msg: "Success",
    word: {
        id: string;
        word: string;
        definition_pl: string;
        definition_en: string;
        enabled: boolean;
        is_daily: boolean;
        lvl: number;
        data: {
            hints: string[];
            part: string;
        };
    }
}
```
---
### GET `/words/random`

Fetches random word from db with `enabled` flag

Returns JSON
```ts
{
    msg: "Success",
    word: {
        id: string;
        word: string;
        definition_pl: string;
        definition_en: string;
        enabled: boolean;
        is_daily: boolean;
        lvl: number;
        data: {
            hints: string[];
            part: string;
        };
    }
}
```
---
### POST `/words/save`

Body (JSON): 
- `word` - object of type `WordEntryWithDate` (type as below)
```ts
{
    word: {
        id: string;
        word: string;
        definition_pl: string;
        definition_en: string;
        enabled: boolean;
        is_daily: boolean;
        lvl: number;
        data: {
            hints: string[];
            part: string;
        };
        date?: string;
    }
}
```

If `date` is not provided in the object treats word as not daily word so only upserts word with given id and data to DB

If `date` is provided in the object treats word as daily word so:
- word with `id` will be set to daily word
- provided word will be saved as daily word with new id (`id = dateToHash(date)`)

Returns JSON
```ts
{
    msg: "Success"
}
```
---
### POST `/words/set-enabled`

Body (JSON)
```ts
{
    wordId: string;
    enabled: boolean
}
```

Sets enabled property of word with id `wordId`

Returns JSON
```ts
{
    msg: "Updated X rows(s)"
}
```
---
## Internal V1 `/internal/v1/`
### POST `/admin/change-password`

(change password for normal users)

Body (JSON)
- `id` - userId
- `oldPassword`
- `newPassword`

Returns JSON
```js
{
    "msg": "Password changed for user with id: {body.id}"
}
```
### GET `/admin/check-cookie`

Query Params
- `authcookie` - value of `adminauth` cookie

Returns JSON
```js
{
    "isCorrect": true / false // true - if admin is logged in; false if not
}
```
---
### GET `/cookies/get`

Query params:
- `cookie` - data cookie value

Returns JSON with decrypted cookie

For more details see documentation about user cookies in `cookies-user.md`


---
### GET `/cookies/new`

Generates new cookie for a user (unregistered)

Returns JSON
```js
{
    "auth": "[COOKIE_VALUE]", // auth cookie value (set it on NextJS side)
}
```
---