import request from 'supertest';
import express from 'express';
import leaderboardRoute from '@/routes/leaderboard';
import leaderboardService from '@/services/leaderboard.service';

jest.mock('@/services/leaderboard.service');

const app = express();
app.use(express.json());
app.use('/leaderboard', leaderboardRoute);

describe('Leaderboard Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /leaderboard should return global leaderboard', async () => {
    const mockData = {
      page: 1,
      limit: 10,
      total: 50,
      results: [
        { rank: 1, traderId: 'trader1', pnl: 1000 },
        { rank: 2, traderId: 'trader2', pnl: 900 }
      ]
    };
    (leaderboardService.getLeaderboard as jest.Mock).mockResolvedValue(mockData);

    const response = await request(app)
      .get('/leaderboard')
      .query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test('GET /leaderboard/competitions/:id should return competition leaderboard', async () => {
    const mockData = {
      page: 2,
      limit: 5,
      total: 25,
      results: [
        { rank: 6, traderId: 'trader6', pnl: 800 },
        { rank: 7, traderId: 'trader7', pnl: 750 }
      ]
    };
    (leaderboardService.getLeaderboard as jest.Mock).mockResolvedValue(mockData);

    const response = await request(app)
      .get('/leaderboard/competitions/comp123')
      .query({ page: 2, limit: 5 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockData);
  });

  test('GET /leaderboard should handle invalid pagination', async () => {
    const response = await request(app)
      .get('/leaderboard')
      .query({ page: 0, limit: -5 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid pagination parameters' });
  });
});