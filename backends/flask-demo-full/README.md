# Flask backend demo

This is a demo flask backend for all sample components in this repo.

## Setup

```bash
uv sync
```

## Run

```bash
uv run gunicorn main:app
```

## Live demo

### Build
When deploying to render, use the following build command:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh && source $HOME/.local/bin/env && uv sync
```

### Deploy
When deploying to render, use the following deploy command:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh && source $HOME/.local/bin/env && uv run gunicorn main:app
```



