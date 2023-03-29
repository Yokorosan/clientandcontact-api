# clientandcontact-api

How to install and use:

### 1. Installing Dependencies

```
yarn install
```

### 2. Run the server

```
yarn run dev
```

### 3. Enjoy!

For a more comprehensive way to use all the available routes, plase consult our documentation: https://github.com/Yokorosan/clientcontact_api_documentation

### If u want to run tests:

```
yarn test
```

it will run all the tests related to the functionalities for the application.

### if you want to run just a specific set of tests:

```
yarn test ./src/test/__tests__/integration/<folder>
```

### Caution

Be aware that the server is configurated to run on htttp://localhost:3001, because localy with would conflict with other ports on localhost:3000, just select your prefered port on the .env file or in the server.ts to avoid conflict with other running applications.
