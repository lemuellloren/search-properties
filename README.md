## Getting Started

**Server**

Create database

```bash
psql -h localhost -U {YOUR_USERNAME}
CREATE DATABASE properties;
or
\i {YOUR_PATH}/search-properties/server/db.sql
```

```bash
npm install
cd server
node server.js
```

**Client**

```bash
npm install
cd client
npm start
```
