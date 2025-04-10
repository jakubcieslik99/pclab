# <img src="https://i.ibb.co/fNpQ9xD/pclab-1.png" width="400">

## PCLab 🖥️

📌 Complete web system for completing computer sets, sharing them and buying with REST API server, based on the MERN stack.
Project contains Express.js app as a backend (server), React app as a frontend (client) and another React app as an
administrator panel.

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/jakubcieslik99/pclab?color=orange&filename=server%2Fpackage.json&label=server%20version)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/jakubcieslik99/pclab?color=orange&filename=client%2Fpackage.json&label=client%20version)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/jakubcieslik99/pclab?color=orange&filename=admin%2Fpackage.json&label=admin%20version)
![GitHub top language](https://img.shields.io/github/languages/top/jakubcieslik99/pclab)
![GitHub repo size](https://img.shields.io/github/repo-size/jakubcieslik99/pclab)
[![Website)](https://img.shields.io/website?label=demo%20website&url=https%3A%2F%2Fpclab.jakubcieslik.com%2F)](https://pclab.jakubcieslik.com/)
[![Admin Panel)](https://img.shields.io/website?label=demo%20admin%20panel&url=https%3A%2F%2Fadmin.pclab.jakubcieslik.com%2F)](https://admin.pclab.jakubcieslik.com/)

## Features

- Searching for computer sets that suits your needs
- Completing computer sets based on available components
- Editing created computer sets
- Sharing computer sets
- Buying available computer sets
- Rating computer sets
- Commenting computer sets

## Screenshots

<img src="https://i.ibb.co/0yBSCcH/pclab-2.png" width="800">

<img src="https://i.ibb.co/6XLRJ73/pclab-3.png" width="800">

## Run Locally

- Clone repository

```bash
  git clone https://github.com/jakubcieslik99/pclab.git
```

ℹ️ Instructions for running server app locally:

- Navigate to the server directory and install dependencies

```bash
  cd pclab/server
  pnpm install
```

- Run server app in development mode

```bash
  pnpm run docker
  pnpm run dev
```

- Last recommended step is to run locally Stripe development webhook service

ℹ️ Instructions for running client app locally:

- Navigate to the client directory and install dependencies

```bash
  cd pclab/client
  pnpm install
```

- Run client app in development mode

```bash
  pnpm run dev
```

ℹ️ Instructions for running admin panel locally:

- Navigate to the admin directory and install dependencies

```bash
  cd pclab/admin
  pnpm install
```

- Run admin panel in development mode

```bash
  pnpm run dev
```

## Deployment

ℹ️ Instructions for building and running server app in production

- Convert to production build

```bash
  pnpm run build
```

- Run server app in production mode

```bash
  pnpm install --prod
  pnpm run start
```

ℹ️ Instructions for building and running client app in production

- Create production build

```bash
  pnpm run build
```

- Run client app in production mode

```bash
  pnpm run preview
```

ℹ️ Instructions for building and running admin panel in production

- Create production build

```bash
  pnpm run build
```

- Run admin panel app in production mode

```bash
  pnpm run preview
```

## Environment Variables

⚙️ To run server app, you will need to add the following environment variables to your .env file

Vars:

- `DIR` _(default already set for development)_
- `ENV` _(default already set for development)_

- `MONGO_VER`

- `HOST`
- `PORT`
- `API_URL`
- `APP_URL`
- `ADMINPANEL_URL`

- `MONGO_HOST`
- `MONGO_PORT`
- `MONGO_DB`
- `MONGO_USER`

- `SMTP_HOST`
- `SMTP_USERNAME`
- `NOREPLY_ADDRESS`

Secrets:

- `MONGO_PASSWORD`
- `JWT_ACCESS_TOKEN_SECRET`
- `JWT_REFRESH_TOKEN_SECRET`
- `CRYPTO_SECRET`
- `STRIPE_SECRET`
- `STRIPE_ENDPOINT_SECRET`
- `SMTP_PASSWORD`

Optional secrets for Infisical secrets manager:

- `INFISICAL_URL` _(used for production)_
- `INFISICAL_CLIENT_ID` _(used for production)_
- `INFISICAL_CLIENT_SECRET` _(used for production)_
- `INFISICAL_PROJECT_ID` _(used for production)_

( ℹ️ - sample .env config file is provided in the server directory under the name `.env.sample` )

⚙️ To build client app, you will need to add the following environment variables to your .env file

- `VITE_PREVIEW_PORT`
- `VITE_API_URL`
- `VITE_APP_URL`
- `VITE_API_STRIPE`

( ℹ️ - sample .env config file is provided in the client app directory under the name `.env.sample` )

⚙️ To build admin panel, you will need to add the following environment variables to your .env file

- `VITE_PREVIEW_PORT_2`
- `VITE_API_URL`
- `VITE_APP_URL`
- `VITE_ADMINPANEL_URL`

( ℹ️ - sample .env config file is provided in the admin panel directory under the name `.env.sample` )

## Languages

🔤 Available client app languages: **PL**

🔤 Available admin panel languages: **PL**

## Feedback

If you have any feedback, please reach out to me at ✉️ contact@jakubcieslik.com

## Authors

- [@jakubcieslik99](https://www.github.com/jakubcieslik99)

The whole project was developed as an engineering thesis at the _University of Zielona Góra_, titled "A web system for
completing computer sets, based on the Node.js environment". **The version saved on an attached CD and submitted as part of
the diploma work is the property of the _University of Zielona Góra_.**
