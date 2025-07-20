# Micro Frontend Demo Project

This is a simple Micro Frontend architecture demo built using **Module Federation**. It consists of two separate applications:

- **Host (Shell):** runs on port `1000`, named `application`
- **Remote (Provider):** runs on port `1001`, named `components`

## 🧱 Project Structure

micro-frontend-demo/

├── application/ # Host (container) app — PORT: 1000

└── components/ # Remote app exposing components — PORT: 1001


## Core Technologies
- React 19.0.0
- TypeScript (ES2020)

---

## 🚀 Getting Started

Make sure you have **Node.js (v16+)** and **npm** installed.

### 1. Start the Remote (`components` on port 1001)

```bash
cd components
npm install
npm run dev
```
This will start the remote app on http://localhost:1001


### 2. Start the Host (`application` on port 1000)

```bash
cd application
npm install
npm run dev
```
This will start the host app on http://localhost:1000

## 📦 Module Federation Setup

- **The Host consumes components exposed by the Remote.**
- **Module Federation enables runtime sharing of React components between apps.**
- **Both apps must be running simultaneously for remote imports to work.**
