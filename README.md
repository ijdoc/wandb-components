# W&B Components - log a custom app to any W&B Workspace

Weights & Biases (W&B) Components is a library of sample extensions you can log to any W&B workspace to customize and improve your ML workflows. The W&B Components library showcases two complementary uses:
1. **Log a component as an HTML media object** to extend the functionality of your W&B workspace with a fully customizable panel.
2. **Deploy a backend** to:
   - implement a custom endpoint to handle requests from your logged component, or
   - setup a serverless handler for your W&B automations (a.k.a. webhooks)

## Getting Started

### Prerequisites

#### Components
- Our sample components are built with [node](https://nodejs.org/en/download/package-manager)
- We use [react](https://react.dev/) and [vite](https://vitejs.dev/) to build single-file components to log as HTML media objects

#### Backends
- We typically use [uv](https://docs.astral.sh/uv/getting-started/installation/) to manage python environments and dependencies

## Demo

The backend at [backends/flask-render/](backends/flask-render/) provides endpoints for all components in this repo and it is deployed to a free instance on [render](https://render.com/).

## Repo Organization
```
clone-run/                 # Provides a simple interface to clone a W&B run
qa-bot/                    # Provides a simple Q&A bot interface
backends/                  # Backend examples
├── aws-lambda-pulumi/     # Demo IaC AWS Lambda backend using Pulumi
├── flask-render/          # Demo flask backend for all components
└── README.md              # Documentation
LICENSE
README.md
```
