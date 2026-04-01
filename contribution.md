## Manual Installation
- Install nodejs locally
- Clone the repo from the github
- Install dependencies (npm install)
- Start the db locally:
    - You can take the connection string from neon.tech or run the db using docker
        - docker pull postgres
        - docker run -e POSTGRES_PASSWORD=nirajjha -d -p 5432:5432 postgres
- Update the .env file with the correct credentials:
    - DATABASE_URL="postgresql://postgres:nirajjha@localhost:5432/postgres"
- Run the migration
    - npx drizzle-kit push
- Run the project
    - npm run dev

## Docker Installation
- Install docker
- Create a docker network
    - docker network create blognet
- Start the postgres container
    - docker run --name postgresdb --network blognet -e POSTGRES_PASSWORD=nirajjha -d -p 5432:5432 postgres
- Run the migration (from host, using localhost since Postgres port is exposed)
    - npx drizzle-kit push
- Build the app image
    - docker build --network=host -t blogapp .
- Run the app container
    - docker run --rm --name blogapp --network blognet -e DATABASE_URL="postgres://postgres:nirajjha@postgresdb:5432/postgres" -p 3004:3004 blogapp

## Docker Compose Installation
- Install docker
- Run: docker compose up