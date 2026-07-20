# altrup.dkg.zone
A simple-looking website about me :)

## Setup
Guide to running the website

### Prerequisites
- Docker Compose ([installation guide](https://docs.docker.com/compose/install/))

### Installation & Usage
- Clone repository
  
  ```bash
  git clone https://github.com/altrup/altrup.dkg.zone.git
  ```
- Enter newly created folder
  
  ```bash
  cd altrup.dkg.zone
  ```

- Set up Supabase (see [Database (Supabase)](#database-supabase) below) or use with a json file

- Copy [`.env.example`](/.env.example) and update to your values
  
  ```bash
  cp .env.example .env
  ```

- Start Docker container

  ```bash
  docker compose up -d
  ```
- To stop, run

  ```bash
  docker compose down
  ```
- To update, run

  ```bash
  docker compose build
  ```

### Database (Supabase)

The site needs a Supabase backend. Host it however you like — [Supabase
Cloud](https://supabase.com/) or [self-hosted](https://supabase.com/docs/guides/self-hosting)
— this repo only tracks the database schema, as migrations in
[`supabase/migrations`](/supabase/migrations/).

- Apply the migrations to your database with the
  [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started)

  ```bash
  npx supabase db push --db-url "postgresql://postgres:PASSWORD@HOST:5432/postgres"
  ```

- If your database already has the schema (e.g. it predates the migration
  files), mark the baseline as applied instead of pushing it

  ```bash
  npx supabase migration repair --status applied 20260720000000 --db-url "$SUPABASE_DB_URL"
  ```

The migrations create the tables, trigger, and policies but no data — add your
own rows, or see the `personal-data` branch, which carries the site owner's
content as `supabase/personal-seed.sql` synced via
[`scripts/personal-seed.sh`](/scripts/personal-seed.sh) (`pull` dumps the
database to the file, `push` applies the file to the database).

### Testing
- For testing changes, instead of using docker and rebuilding every time, you can also run using npm
- Install npm packages
  
  ```bash
  npm install
  ```
- Run website
  
  ```bash
  npm run dev
  ```