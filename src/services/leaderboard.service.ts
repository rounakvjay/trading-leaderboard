import redisService from './redis.service';
import { PaginatedLeaderboard, LeaderboardEntry } from '../types';

class LeaderboardService {
  async updateLeaderboard(competitionId: string, trade: { traderId: string; pnl: number }): Promise<void> {
    await redisService.addToLeaderboard(competitionId, trade.traderId, trade.pnl);
  }

  async getLeaderboard(
    competitionId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedLeaderboard> {
    const offset = (page - 1) * limit;
    const [results, total] = await Promise.all([
      redisService.getLeaderboard(competitionId, limit, offset),
      redisService.getTotalCount(competitionId)
    ]);

    const entries: LeaderboardEntry[] = results.map((result, index) => ({
      rank: offset + index + 1,
      traderId: result.traderId,
      pnl: result.pnl
    }));

    return {
      page,
      limit,
      total,
      results: entries
    };
  }
}

export default new LeaderboardService();