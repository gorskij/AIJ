import express from 'express';
import router from './routes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json())
const port = 3000;

app.use('/', router);

app.listen(port, async () => {
    await prisma.$connect();
    
    console.log(`Server is running at http://localhost:${port}`);
  
    process.on('beforeExit', async () => {
      await prisma.$disconnect();
    });
  }); 