# altrup.dkg.zone
A simple-looking website about me :)

## Setup
Guide to running the website

### Prerequisites
- Node.js and npm ([installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

### Installation & Usage
- Clone repository
  
  ```bash
  git clone https://github.com/EricL521/altrup.dkg.zone.git
  ```
- Enter newly created folder
  
  ```bash
  cd altrup.dkg.zone
  ```
- Install npm packages
  
  ```bash
  npm install
  ```
- Set up [supabase](https://supabase.com/) (For self-hosting, see [Supabase self-hosting guide](https://supabase.com/docs/guides/self-hosting))
  - Create a `.env` file by copying the `.env.example` file, and update the placeholders with your Supabase credentials
- Build website
  
  ```bash
  npm run build
  ```
- Start server
  
  ```bash
  npm run preview
  ```
  - Or start with custom port
    - Linux
      
      ```bash
      PORT=CUSTOM_PORT npm run preview
      ```
    - Windows
      
      ```cmd
      set PORT=CUSTOM_PORT && npm run preview
      ```
