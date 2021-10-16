<p align="center">
  <img style="width:30%" src="./public/img/logo.png">
</p>

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
</p>

English | [한국어](./README-ko.md) 

## Overview

- Dokerized Express + Typescript app with MySQL Database 
- Code Hot reloading While running Docker Container 
- Minimal Memo API server example

## How to run

1. Clone this repository
2. Rename `.env.example` to `.env`
3. Run the command 
    ```
    docker-compose up
    ``` 

## etc

View logs
```
docker-compose logs app
docker-compose logs db
```
Open mysql terminal
```
docker exec -it db bin/sh
mysql -u root -p 
```
Stops containers and removes containers, networks, volumes, and images created by `up`
```
docker-compose down
```
Build images before starting containers
```
docker-compose up --build
```

## Project Structure

```bash
├── public/                    # README logo
├── src/                       # main source code
│   ├── interfaces             # typescript interfaces
│   ├── database.ts            # database connection and sql query
│   ├── app.ts                 # express application
│   └── server.ts              # start server
├── requests.rest              # requests file to test docker-compose
├── my.cnf                     # mysql configuration
├── setup.sql                  # database info configuration
├── start.sh                   # start script for express app
├── Dockerfile.dev             # dockerfile for express app
├── docker-compose.yml         # docker-compose configuration
├── .env.example               # env variable configuration
├── package-lock.json          # package-lock.json
├── package.json               # package.json
└── tsconfig.json              # typescript config
```


## HTTP request and view the response

Using <a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client">REST Client</a> or Whatever you want, like <a href="https://www.postman.com/ ">Postman</a> 
```yaml
GET http://localhost:3000/api/memo

### 
POST http://localhost:3000/api/memo
content-type: application/json

{
    "content": "default memo"
}

###
PUT  http://localhost:3000/api/memo
content-type: application/json

{
    "id" : 1,
    "newContent" : "modified memo"
}
###
DELETE http://localhost:3000/api/memo
content-type: application/json

{
    "id" : "1"
}
```
 
