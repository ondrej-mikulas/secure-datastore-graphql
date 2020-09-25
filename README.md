# Secure Datastore Graphql

This is implementation of Secure Datastore as **GraphQL server with TypeScript** based on [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md), [apollo-server](https://github.com/apollographql/apollo-server) and [Nexus Schema](https://nxs.li/components/standalone/schema). It is based on a SQLite database [`./prisma/dev.db`](./prisma/dev.db).

## How to use

### 1. Download & install dependencies

Clone this repository

```
git@github.com:ondrej-mikulas/secure-datastore-graphql.git
```

Install yarn dependencies

```
yarn
```

Build solution

```
yarn build
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

### 2. Start the GraphQL server

Launch your GraphQL server with this command:

```
yarn dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of the GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). 

### Storing Endpoint

```graphql
mutation {
  upsertData(
    id: "engineering-jobs-London"
    encryption_key: "1234"
    value: {
      name: "Senior Software Engineer"
      location: "London"
    }
  )
}
```

### Retrieval Endpoint

```graphql
{
  dataList(
    id: "engineering-jobs*a"
    decryption_key:"1234"
  ){
    id
    value
  }
}
```

## Evolving the app

Evolving the application typically requires four subsequent steps:

1. Migrating the database schema using SQL
2. Updating your Prisma schema by introspecting the database with `yarn prisma introspect`
3. Generating Prisma Client to match the new database schema with `yarn prisma generate`
4. Using the updated Prisma Client in your application code

There is also an option to use [migration tool](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-cli/command-reference#migrations-experimental) `yarn db:save` and `yarn db:up` read more here 

## Next steps
* Add Unit tests and Integration tests
* Add support of multiple wildcards in id
* Improve initiliazation vector for AES crypting service, support for multiple crypting options
* Add Pagination
* Add description of errors

