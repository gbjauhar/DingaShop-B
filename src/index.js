import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors())
  .use(express.json());

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`🌀 started server in door: ${port}`);
});
