import 'dotenv/config';
import { server } from './server/server';
import { AppDataSource } from './server/database';

AppDataSource.initialize().then(async () => {
  console.log('Database initialized');
  server.listen(process.env.PORT || 3333, () => {
    console.log(`API server is running on port ${process.env.PORT}`);
  });
});
