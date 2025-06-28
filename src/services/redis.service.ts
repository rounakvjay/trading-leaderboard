import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

class RedisService {
  private async getClient() {
    const client = createClient({
      url: REDIS_URL,
    });
    await client.connect();
    return client;
  }

  async addToLeaderboard(competitionId: string, traderId: string, pnl: number): Promise<void> {
    const client = await this.getClient();
    try {
      const key = `leaderboard:${competitionId}`;
      await client.zIncrBy(key, pnl, traderId);
    } finally {
      await client.quit();
    }
  }

  async getLeaderboard(
    competitionId: string,
    limit: number,
    offset: number
  ): Promise<{ traderId: string; pnl: number }[]> {
    const client = await this.getClient();
    try {
      const key = `leaderboard:${competitionId}`;
      
      const results = await client.zRangeWithScores(key, '+inf', '-inf', {
        BY: 'SCORE',
        REV: true,
        LIMIT: {
          offset,
          count: limit
        }
      });

      return results.map((item) => ({
        traderId: item.value,
        pnl: item.score
      }));
    } finally {
      await client.quit();
    }
  }

  async getTotalCount(competitionId: string): Promise<number> {
    const client = await this.getClient();
    try {
      const key = `leaderboard:${competitionId}`;
      return client.zCard(key);
    } finally {
      await client.quit();
    }
  }
  
}

export default new RedisService();
