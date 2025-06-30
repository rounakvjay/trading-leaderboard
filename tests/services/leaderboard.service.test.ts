import leaderboardService from '@/services/leaderboard.service';
import redisService from '@/services/redis.service';

jest.mock('@/services/redis.service', () => ({
  addToLeaderboard: jest.fn(),
  getLeaderboard: jest.fn(),
  getTotalCount: jest.fn()
}));

describe('LeaderboardService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateLeaderboard', () => {
    it('should call redis service with correct params', async () => {
      await leaderboardService.updateLeaderboard('comp1', {
        traderId: 'trader1',
        pnl: 100
      });
      
      expect(redisService.addToLeaderboard).toHaveBeenCalledWith(
        'comp1',
        'trader1',
        100
      );
    });
  });

  describe('getLeaderboard', () => {
    it('should return paginated results', async () => {
      (redisService.getLeaderboard as jest.Mock).mockResolvedValue([
        { traderId: 'trader1', pnl: 300 },
        { traderId: 'trader2', pnl: 200 }
      ]);
      (redisService.getTotalCount as jest.Mock).mockResolvedValue(50);
      
      const result = await leaderboardService.getLeaderboard('comp1', 2, 2);
      
      expect(result).toEqual({
        page: 2,
        limit: 2,
        total: 50,
        results: [
          { rank: 3, traderId: 'trader1', pnl: 300 },
          { rank: 4, traderId: 'trader2', pnl: 200 }
        ]
      });
    });
  });
});