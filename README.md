# Pool Monitor (skeleton)

Next.js (App Router, TypeScript) app with production Docker (`standalone`) images, Compose files for local and production, example nginx reverse-proxy config, and GitHub Actions for CI plus deploy to a VPS.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Development server       |
| `npm run build`| Production build         |
| `npm run start`| Start production server  |
| `npm run lint` | ESLint (`next lint`)     |
| `npm run typecheck` | `tsc --noEmit`      |

## Docker (local)

```bash
docker compose build
docker compose up
```

Or build and run the image directly:

```bash
docker build -t pool-monitor-3:local .
docker run --rm -p 3000:3000 pool-monitor-3:local
```

The app listens on port **3000** inside the container.

## VPS (nginx + Docker)

1. Install Docker Engine and the Compose plugin on the server.
2. Create a deploy directory (e.g. `/opt/pool-monitor-3`) containing **`docker-compose.prod.yml`** from this repo (same content as in Git).
3. Set the image when starting Compose (GitHub Actions exports `IMAGE` before `docker compose`):

   - The workflow pushes `ghcr.io/<OWNER>/<REPO>:main` (and a commit-SHA tag). For [this repository](https://github.com/darkovasic/pool-monitor-3), that is **`ghcr.io/darkovasic/pool-monitor-3:main`**.

4. **Private GHCR images:** on the VPS, log in once:

   ```bash
   echo YOUR_READ_PACKAGES_PAT | docker login ghcr.io -u YOUR_GH_USERNAME --password-stdin
   ```

5. **nginx:** add a `server_name` (your domain) and reverse-proxy to **`127.0.0.1:3002`** (host port from `docker-compose.prod.yml`). Use the same TLS pattern as your other vhosts (e.g. Certbot `certbot --nginx -d your.subdomain`).

## GitHub Actions

- **CI** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)): on pushes and pull requests to `main` — `npm ci`, lint, typecheck, build.
- **Deploy** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)): on push to `main` — build and push the image to GHCR, then SSH to the VPS and run `docker compose -f docker-compose.prod.yml pull` and `up -d`.

### Repository secrets (deploy)

| Secret             | Description                                      |
|--------------------|--------------------------------------------------|
| `VPS_HOST`         | VPS hostname or IP                               |
| `VPS_USER`         | SSH user                                         |
| `VPS_SSH_KEY`      | Private key for that user (full PEM, multiline)|
| `VPS_DEPLOY_PATH`  | Absolute path to the directory on the VPS that contains `docker-compose.prod.yml` |

Optional on the VPS only: a read-only PAT with `read:packages` for private images (`GHCR_PULL_TOKEN` is not a GitHub Actions secret here; use it only in the shell on the server for `docker login` as above).
