import express from 'express';
import cors from 'cors';
import tradeRouter from './routes/trade';
import leaderboardRouter from './routes/leaderboard';

const app = express();

app.use(cors());
app.use(express.json());

// Endpoints
app.use('/trades', tradeRouter);
app.use('/leaderboard', leaderboardRouter);

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
    return res.status(500).json({ error: 'Internal server error' });
  }
);

export default app;
