# FASCO — Fashion eCommerce (MERN + Tailwind)

Pixel-inspired recreation of the [Authentication / eCommerce Store Figma](https://www.figma.com/design/K56vLCXDbbz8hEJPmNrBwR/Authentication---eCommerce-Store--Copy-).

## Stack

- **client/** — React + Vite + Tailwind CSS + React Router
- **server/** — Node.js + Express + MongoDB + JWT

## Setup

1. Install [MongoDB](https://www.mongodb.com/try/download/community) and start it locally.
2. Install dependencies:

```bash
cd server && npm install
cd ../client && npm install
```

3. Seed products + demo admin:

```bash
cd server
npm run seed
```

Demo admin: `admin@fasco.com` / `Admin@123`

4. Run API (port **5000**):

```bash
cd server
npm run dev
```

5. Run client (port **5173**):

```bash
cd client
npm run dev
```

Open http://localhost:5173

## Features

- Auth: Sign In, Sign Up, Forgot Password → OTP → New Password
- Home, Shop (filters/sort), Product Detail, Cart, Checkout, Thank You
- JWT auth, cart (local + server), orders, discount codes `FASCO10` / `WELCOME15`
