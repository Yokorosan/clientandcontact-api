# clientandcontact-api

How to install and use:

### 1. Installing Dependencies

```
yarn install
```

### 2. Setting the server

First and foremost, after installing the dependencies, make a copy of the .env.example file on the root of the application and change the name to .env,

```
PGHOST= Where Postgres is running
PGPORT= Postgres port
PGUSER= your user on Postgres
PGPASSWORD= your user password on Postgres
PGDATABASE= the name of the database you want to use on postgress
SECRET_KEY= Random secrey_key used for hashing the passwords
PORT= Which port you want to run the application on, for default it's set to run on port 3001
```

### 3.Creating all the database

Run the following command on your terminal to create your database.

```
yarn typeorm migration:run -d src/data-source.ts
```

### Caution

If something goes wrong, check if you configurated your .env file correctly.

### 4. Run the server

```
yarn run dev
```

### 5. Enjoy!

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
