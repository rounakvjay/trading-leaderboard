import express from 'express';
import cors from 'cors';
import tradeController from './controllers/trade';

const app = express();

app.use(cors());
app.use(express.json());

// Endpoints
app.post('/trades', tradeController.submitTrade);

// Health check
app.get('/health', (_, res) => res.status(200).send('OK'));

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
);

export default app;
