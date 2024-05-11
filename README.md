<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# About project.
> this will be description about project
> 
**Main features**:


# Quickstart
### Prerequisites 
1. node v.18
2. yarn v1.22.19
3. nestjs v.9
4. typeorm: v.0.3.10
5. typescript v.4

# Installation and run the app
To setup and run a local copy:

1. Clone this repo 
```bash
$ git clone https://github.com/rionord/maximum-backend.git
```
2. install packages 
```bash
$ yarn install
```
3. run app
```bash
$ yarn start:dev
```

## Use Docker-compose if you want to run Postgres on a local machine

**Development mode (hot reload) only Postgres DB**
```bash
docker run -d --name postgres \
  -e POSTGRES_PORT=5432 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=safepassword \
  -e POSTGRES_DB=postgres \
  -e POSTGRES_HOST=localhost \
  -p 5432:5432 \
  -v "$(pwd)/pgdata:/var/lib/postgresql/data" \
  postgres
```

**Development mode (hot reload) all services**
```bash
# up app
$ docker-compose up

# up app and build
$ docker-compose build up
# or with detached mode
$ docker-compose build up -d

# down app
$ docker-compose down
```
**Production mode (small size image)**
```bash
# up project
$ docker-compose -f devops/docker-compose.local.yml --project-name maximum up

# up project and build
$ docker-compose -f devops/docker-compose.local.yml --project-name maximum up --build -d

# down project
$ docker-compose -f devops/docker-compose.local.yml --project-name maximum down

```
# Testing
```bash
# run unit tests
yarn test
# watch mode
yarn test:watch
# coverage
yarn test:cov
```

# ENVs
```bash
NODE_ENV=dev
# api
BASIC_URL='http://localhost:3000'
PORT='3000'

# tokens/ security
ACCESS_TOKEN_EXPIRES_IN='30m'
REFRESH_TOKEN_EXPIRES_IN='60m'
JWT_SECRET='maximumSecter'
SALT_VALUE = 10

# database
POSTGRES_PORT='5432'
DB_TYPE='postgres'
POSTGRES_USER='postgres'
POSTGRES_DATABASE='postgres'
POSTGRES_PASSWORD='safepassword'
POSTGRES_HOST='google.com'

TYPEORM_SYNC='true'

#nodemailer
SENDER_MAIL='example@gmail.com'
SENDER_PASSWORD='exojwoarozdyvasy'
MAIL_HOST='example: google app password'
MAIL_PORT= 465


```

# API Documentation (OpenAPI Specification)
we use the Swagger OPEN API documentation. 
You can check the documentation here:
- [development API Documentation](http://ec2-3-71-2-107.eu-central-1.compute.amazonaws.com:3000/api)
- [production API Documentation](#)

# Folder structure
This repository contains 4 main folders
* `/src` contains these project components. 
* `/devops` contains docker image to run on production or development mode
* `/docs` contains all documentation about this project (including business logic).
* `.github/` contains auto-deploy and release workflows.

# Read the rules before making any changes.
- [How to contribute](./CONTRIBUTING.md)
- [How to make Pull Request](.github/PULL_REQUEST_TEMPLATE.md)


# How to works Excel statistic export

We use ExcelJS library for export excel statistic

Steps:
1. Receiving submissions according to the selected filter
2. Crate excel file header using user selected fields or default fields
3. Insert submission data according to the fields

- [ExcelJS library  Documentation](https://www.npmjs.com/package/exceljs)


# How to works PDF import

We use PDF-LIB library for read data from dynamic pdf files

Methods used: 

- [getDropdown](https://pdf-lib.js.org/docs/api/classes/pdfdropdown)  - For read Dropdown fields data
- [getCheckBox](https://pdf-lib.js.org/docs/api/classes/pdfcheckbox) - For read Checkbox fields data
- [getRadioGroup](https://pdf-lib.js.org/docs/api/classes/pdfradiogroup) - For read Radiogroup fields data
- [getTextField](https://pdf-lib.js.org/docs/api/classes/pdftextfield) - For read Text fields data

- [PDF-LIB library  Documentation](https://pdf-lib.js.org/)

