import request from 'supertest';
import express from 'express';
import tradeRoute from '@/routes/trade';
import leaderboardService from '@/services/leaderboard.service';

jest.mock('@/services/leaderboard.service');

const app = express();
app.use(express.json());
app.use('/trades', tradeRoute);

describe('Trade Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /trades should process trade', async () => {
    (leaderboardService.updateLeaderboard as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/trades')
      .send({ traderId: 't1', pnl: 100 });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Trade processed successfully' });
  });

  test('POST /trades/competitions/:id should use competition ID', async () => {
    (leaderboardService.updateLeaderboard as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .post('/trades/competitions/comp1')
      .send({ traderId: 't1', pnl: 100 });

    expect(leaderboardService.updateLeaderboard).toHaveBeenCalledWith('comp1', {
      traderId: 't1',
      pnl: 100,
    });
  });
});
