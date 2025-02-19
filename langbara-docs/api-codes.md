# Api Codes

## Info

- `0` - success

Please add `api-code` header to API responses 

Messages in response should be vague not to say too much about our API.

(Use only in public API)

## Invalid request data

- `1000` - incomplete request body / query
- `1001` - too long request params provided
- `1002` - qurey param that is supposed to be a number is not a number

## Register errors

- `2000` - user with same username exists
- `2001` - user with same email exists
- `2002` - user with same uid already exist
- `2003` - hCaptcha error
- `2004` - invalid 6-digit 2FA token during enabling 2FA

## Cookies errors

- `3000` - auth cookie doenst exist
- `3001` - admin auth cookie doesnt exist
- `3002` - auth cookie contains invalid content
- `3003` - admin auth cookie contains invalid content
- `3004` - user isnt logged in
- `3005` - admin isnt logged in
- `3006` - user's auth cookie contains null as language level (user didnt set their lvl)

## Login errors

- `4000` - invalid login (no such displayName or email in DB)
- `4001` - invalid password
- `4002` - 2fa token required
- `4003` - invalid 2fa token

## Changing password and delete account errors

- `5000` - invalid name or id (user doesn't exist)
- `5001` - invalid (old) password

## Admin panel errors

- `6000` - no word for given date (taskcalendar)

## Word drawing errors
- `7000` - no more words for user
- `7001` - levels array is too long
- `7003` - levels array contains invalid level name 
- `7004` - user already answered daily question

## Guess send errors
- `8000` - no matching pending game for such user_id and token

## Hints errors
- `9000` - number outside of hints array bounds
- `9001` - hint number is not a number
- `9002` - no more hints for user