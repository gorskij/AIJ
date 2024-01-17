import express from 'express';
import router from './routes';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();

const app = express();
app.use(express.json())

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
const port = 8080;

app.use('/', router);

app.listen(port, async () => {
    await prisma.$connect();
    
    console.log(`Server is running at http://localhost:${port}`);
  
    process.on('beforeExit', async () => {
      await prisma.$disconnect();
    });
  }); 