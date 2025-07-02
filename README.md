# altrup.dkg.zone
A simple-looking website about me :)

## Setup
Guide to running the website

### Prerequisites
- Docker Compose ([installation guide](https://docs.docker.com/compose/install/))

### Installation & Usage
- Clone repository
  
  ```bash
  git clone https://github.com/EricL521/altrup.dkg.zone.git
  ```
- Enter newly created folder
  
  ```bash
  cd altrup.dkg.zone
  ```
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