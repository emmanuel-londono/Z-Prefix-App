# Z-Prefix-App


### PostGres Setup
Execute this command in your wsl 2 command line:

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=YOUR_PASSWORD -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

docker exec -it (PSQL-Container-ID) bash

### Login to PostGres
   
psql -U postgres


## Front-end Setup 

- navigate to front-end in terminal
- execute "npm install" command
- execute "npm start" command

## Server Setup
- navigate to server in terminal
- execute "npm install" command 
- execute "npm start" command



