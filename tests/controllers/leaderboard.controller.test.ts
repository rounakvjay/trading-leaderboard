import leaderboardController from '@/controllers/leaderboard';
import leaderboardService from '@/services/leaderboard.service';

jest.mock('@/services/leaderboard.service');

const mockRequest = (query: any = {}, params: any = {}) => ({
  query,
  params,
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('LeaderboardController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLeaderboard', () => {
    it('should return global leaderboard', async () => {
      const req = mockRequest({ page: '2', limit: '5' });
      const res = mockResponse();
      const mockData = {
        page: 2,
        limit: 5,
        total: 20,
        results: [
          { rank: 6, traderId: 'trader6', pnl: 600 },
          { rank: 7, traderId: 'trader7', pnl: 550 },
        ],
      };
      (leaderboardService.getLeaderboard as jest.Mock).mockResolvedValue(
        mockData
      );

      await leaderboardController.getLeaderboard(req as any, res);

      expect(leaderboardService.getLeaderboard).toHaveBeenCalledWith(
        'global',
        2,
        5
      );
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle invalid pagination', async () => {
      const req = mockRequest({ page: '0', limit: '-10' });
      const res = mockResponse();

      await leaderboardController.getLeaderboard(req as any, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid pagination parameters',
      });
    });
  });

  describe('getCompetitionLeaderboard', () => {
    it('should return competition leaderboard', async () => {
      const req = mockRequest({ page: '1', limit: '10' }, { id: 'comp123' });
      const res = mockResponse();
      const mockData = {
        page: 1,
        limit: 10,
        total: 15,
        results: [
          { rank: 1, traderId: 'trader1', pnl: 1000 },
          { rank: 2, traderId: 'trader2', pnl: 900 },
        ],
      };
      (leaderboardService.getLeaderboard as jest.Mock).mockResolvedValue(
        mockData
      );

      await leaderboardController.getCompetitionLeaderboard(req as any, res);

      expect(leaderboardService.getLeaderboard).toHaveBeenCalledWith(
        'comp123',
        1,
        10
      );
      expect(res.json).toHaveBeenCalledWith(mockData);
    });
  });
});
