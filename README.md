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

- Set up Supabase (see [Self-Hosting Supabase](#self-hosting-supabase) below) or use with a json file

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

### Self-Hosting Supabase
 
The site needs a Supabase backend. The self-hosted Supabase stack lives in
[`supabase/docker`](/supabase/docker/).
 
- Enter the Supabase Docker folder
  ```bash
  cd supabase/docker
  ```
 
- Create its environment file from the example
  ```bash
  cp .env.example .env
  ```
 
- Generate fresh secrets and keys
  ```bash
  ./utils/generate-keys.sh
  ```
 
  This generates fresh values for `JWT_SECRET`, `ANON_KEY`, `SERVICE_ROLE_KEY`,
  `SECRET_KEY_BASE`, `VAULT_ENC_KEY`, `PG_META_CRYPTO_KEY`,
  `LOGFLARE_PUBLIC_ACCESS_TOKEN`, `LOGFLARE_PRIVATE_ACCESS_TOKEN`,
  `POSTGRES_PASSWORD`, and `DASHBOARD_PASSWORD`, and writes them into `.env`.
- Open `.env` and set the remaining values that the script does not generate,
  including:
  - `POOLER_TENANT_ID` — any short, lowercase, hyphen-free identifier
  - `SUPABASE_PUBLIC_URL`, `API_EXTERNAL_URL`, `SITE_URL` — your domain
  - `DASHBOARD_USERNAME` — the Studio login username and password
- Start the Supabase stack
  ```bash
  docker compose up -d
  ```
 
  On the first start, the database is initialized and the portfolio table,
  trigger, policies, and example data are created automatically from the
  scripts in [`volumes/db/init`](/supabase/docker/volumes/db/init/). View the dashboard at [localhost:8000](http://localhost:8000)
- Return to the project root when finished
  ```bash
  cd ../..
  ```
 
> **Note:** If you change the database password after the first start, use
> `./utils/db-passwd.sh` rather than editing `.env`, since the database keeps
> its own copy of the password from when it was first initialized.

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