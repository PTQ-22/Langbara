# Endpoint template

Each endpoint is in `src/public/`

Each endpoint file:
- cannot start with `_` character 
- must contain router export 

```js
export const router = express.Router();
```

## Routes

`example.ts` in `src/public/api/v1/`
```js
export const router = express.Router();

router.get("/foo", async (req: express.Request, res: express.Response) => {
    res.status(200).json({
      msg: "This is Foo",
    });
}
```
would add 1 new route: `/api/v1/foo`.

You can create more than 1 endpoint in each file

## Middlewares

You can also add middleware in `_middleware.ts` file

Each middleware exports middleware function (eg. )

```ts
// just some express middleware
async function foo(req, res, next) {
    // some logic
    next(); // call next function to go to next middleware in a stack
}

export const middleware = foo 
```

Also consider such file structure

```js
public/
    api/
        example.ts // route defined in there
        _middleware.ts // middleware no. 2
    _middleware.ts // middleware no. 1
```

Order of execution would be
```ts
_middleware.ts // middleware no. 1
_middleware.ts // middleware no. 2
example.ts // route defined in there
```


