import tradeController from '@/controllers/trade';
import leaderboardService from '@/services/leaderboard.service';

jest.mock('@/services/leaderboard.service');

const mockRequest = (body: any, params: any = {}) => ({
  body,
  params
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('TradeController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('submitTrade', () => {
    it('should process valid trade', async () => {
      const req = mockRequest({ traderId: 't1', pnl: 100 });
      const res = mockResponse();
      
      await tradeController.submitTrade(req as any, res);
      
      expect(leaderboardService.updateLeaderboard).toHaveBeenCalledWith(
        'global',
        { traderId: 't1', pnl: 100 }
      );
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should reject invalid trade data', async () => {
      const req = mockRequest({ traderId: 't1' });
      const res = mockResponse();
      
      await tradeController.submitTrade(req as any, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Invalid trade data'
      });
    });
  });

  describe('submitCompetitionTrade', () => {
    it('should use competition ID from params', async () => {
      const req = mockRequest({ traderId: 't1', pnl: 100 }, { id: 'comp1' });
      const res = mockResponse();
      
      await tradeController.submitCompetitionTrade(req as any, res);
      
      expect(leaderboardService.updateLeaderboard).toHaveBeenCalledWith(
        'comp1',
        { traderId: 't1', pnl: 100 }
      );
    });
  });
});