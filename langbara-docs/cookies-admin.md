 # Admin Auth Cookies 

Data stored in 1 cookie (encrypted)

- `adminauth`

Similar to user cookie
```ts
{
  name: string;
  passwd: string;
  token2FA: string; // optional
}
```

On every request to `/admin/*` credentials in cookie will be deciphered and checked