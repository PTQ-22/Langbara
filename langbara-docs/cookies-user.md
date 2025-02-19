# User Auth Cookies

Everything is stored in one `auth` cookie

its content is encrypted. After decrypting it should look like this

```ts
{
  uid: string;
  version: number;
  account_type: AccountType;
  unregistered: { // for unregistered users
    points: number;
    streak: number;
  },
  registered: { // for registered users
    display_name: string;
    passwd: string;
  };
}
```

After decrypting cookie `cookie.registered.passwd` is in plaintext

## Account Types
- `0` - UNREGISTERED
- `1` - REGISTERED

## Unregistered block

Every piece of data that is stored here only matters for unregistered users.

Fields:
- `points`, `streak` - self explanatory