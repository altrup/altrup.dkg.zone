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

- Add your content (see [Content](#content) below)

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

### Content

The site reads two things from the repo folder, both mounted into the container
by `compose.yaml`, so content changes need no rebuild:

- `data/sections.json` — the page sections. An example ships in the repo; edit
  it and reload.
- `public/images/` — image files referenced from the JSON as `/images/...`.
  This folder is gitignored. Keep the real images wherever you like and either
  symlink the folder in (`ln -s /path/to/images public/images`) or rsync them
  onto the server (`rsync -a --delete ./public/images/ server:/path/to/altrup.dkg.zone/public/images/`).
  The production server lists `public/` at startup, so run
  `docker compose restart web` after adding new image files.

Image helpers (need [ImageMagick](https://imagemagick.org/) and [exiv2](https://exiv2.org/)):

- `./scripts/strip-metadata.sh` removes EXIF/XMP/IPTC metadata (GPS,
  timestamps, camera) from every image without re-encoding. Run it before publishing photos.
- `./scripts/generate-preview-images.sh` writes 250px-tall previews of
  everything under `public/images/full/` to `public/images/preview/`.

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
