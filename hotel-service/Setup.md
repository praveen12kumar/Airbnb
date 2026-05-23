## How to setup a new TypeScript + Express.js server

1.

```
npm init -y
```

2.

```
npm install -D typescript
npm install concurrently
```

3.

```
tsc --init
```

4.

```
Add the following scripts to package.json
{
    "build": "npx tsc",
    "prestart": "npm run build",
    "watch": "npx tsc -w",
    "start": "npx nodemon dist/index.js",
    "dev": "npx concurrently \"npm run watch\" \"npm start\""
}

```

Note: Make relevant config changes in tsconfig.json file

```
5.
npm run dev
```
