// src/server.ts
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 8080;


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
