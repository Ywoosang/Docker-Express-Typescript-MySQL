# Docker-Express-Typescript-MySQL

- Dokerized Express + Typescript app with MySQL Database 
- Code Hot reloading While running Docker Container 
- Memo API server example

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
Build images before starting containers.
```
docker-compose up --build
```

## HTTP request and view the response

using <a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client">REST Client</a>

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
 
