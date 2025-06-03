import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();
const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

// applicaiton routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('App is running');
});

// error handlers
// app.use(globalErrorHandler);
app.use(notFound);

export default app;
