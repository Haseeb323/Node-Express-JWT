# NODE JWT token in EXPRESS MongoDB REST Api boilerplate

This is sample json web token rest api boilerplate in NodeJs and ExpressJs for MongoDB along with data validation.

## contents

- [Pre-requisites](#Pre-requisites)
- [Usage](#Usage)
- [Database](#Database)
- [Validation](#Validation)
- [Development](#Development)

## Pre-requisites

- NodeJs installed
- MongoDb installed locally or account in https://www.mongodb.com/

## Usage

- Open Shell/Terminal in project directory and run command "npm install"
- Rename ".env.example" to ".env"
- Set Port in ".env" file
- Set AUTH_TOKEN=ENCRYPTION_KEY in ".env" file

## Database

To connect with database simply add MONGOURI = mongodb://localhost:27017/collection-name

## Validation

For validation get help from https://joi.dev/api/

## Development server

- Run "npm start" command in Shell/Terminal
