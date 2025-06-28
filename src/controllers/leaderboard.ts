import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const DEFAULT_COMPETITION = 'global';

class LeaderboardController {
  async getLeaderboard(req: Request, res: Response): Promise<Response> {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid pagination parameters' });
    }

    const leaderboard = await leaderboardService.getLeaderboard(
      DEFAULT_COMPETITION,
      page,
      limit
    );
    return res.json(leaderboard);
  }

  async getCompetitionLeaderboard(
    req: Request,
    res: Response
  ): Promise<Response> {
    const competitionId = req.params.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: 'Invalid pagination parameters' });
    }

    const leaderboard = await leaderboardService.getLeaderboard(
      competitionId,
      page,
      limit
    );
    return res.json(leaderboard);
  }
}

export default new LeaderboardController();
