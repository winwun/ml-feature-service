# ml-feature-service

## Requirements

- node 14.16.1, you can install it via [nvm](https://github.com/nvm-sh/nvm)

## Setup

1. Run `yarn` to install all packages
2. Run the application by invoking `yarn start`

## Scripts

### Run Application

> yarn start

### Run Lint

> yarn lint

### Run Unit Tests

> yarn test

## Endpoints

Added a dummy data for the feature list. So on initial run this will be present

```
[
  { featureName: 'someFeature', email: 'someEmail@email.com', enable: true }
]
```

I added some examples below. This can be executed right away via terminal or import to postman

### Get Feature

#### Request

```bash
curl --location --request GET 'http://localhost:4000/api/feature?email=someEmail@email.com&featureName=someFeature'
```

#### Response

- 200 when a feature is found
- 404 when no feature is found
- 500 when something goes wrong

```json
{
  "canAccess": true
}
```

### Post Feature

#### Request

```bash
curl --location --request POST 'http://localhost:4000/api/feature' \
--header 'Content-Type: application/json' \
--data-raw '{
    "featureName": "helloworld",
    "email": "helloworld@email.com",
    "enable": true
}'
```

#### Response

- 200 when feature is posted successfully
- 400 when there is validation errors
- 304 when there is no change on the data
- 500 when something goes wrong

```json
{}
```

### List Features

#### Request

```bash
curl --location --request GET 'http://localhost:4000/api/feature/list'
```

#### Response

- 200 when feature is posted successfully
- 500 when something goes wrong

```json
[
  {
    "featureName": "someFeature",
    "email": "someEmail@email.com",
    "enable": true
  },
  {
    "featureName": "helloworld",
    "email": "helloworld@email.com",
    "enable": true
  }
]
```
