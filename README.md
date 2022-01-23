# Broadcom
Interview Challenge

This repo contains docker compose file to bring up ui and backend service.
Folllow commands to run the application

## Prerequisites
docker runtime

## Commands
1. `docker-compose up`
2. Make sure all 3 containers are up `docker ps`
3. Connect to DB and check `USERS` table is created
    Server : localhost:5432
    username: postgres
    password: postgres
    db: postgres
4. To load user data, execute `scripts\insert_users_100.sql` . This will load 100 users to table
5. To load million users, follow [Load Million Users](#load-million-users)
6. Open UI app in browser http://localhost:9090


## Load Million Users
Million test users are loaded in `scripts\user_data.csv` file. To load these data into table, follow below steps
1. Truncate table, `truncate users`
2. Copy csv file into `postgres-data` table created as part of the docker-compose up
2. Get postgres containser name `docker ps`
3. `docker exec -it [CONTAINER_NAME] psql -U postgres -d postgres` 
4. `COPY users(id,first_name,last_name,age,address_1,address_2) FROM '/var/lib/postgresql/data/user_data.csv' DELIMITER ','  CSV HEADER;`
5. Wait for sometime and then creat index `CREATE INDEX idx_users_name_age ON users (last_name desc, age desc);`
6. Give some time for DB to warm up and test the apis