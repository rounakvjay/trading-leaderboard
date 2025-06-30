import { Router } from 'express';
import leaderboardController from '../controllers/leaderboard';

const router = Router();

router.get('/', leaderboardController.getLeaderboard);
router.get(
  '/competitions/:id',
  leaderboardController.getCompetitionLeaderboard
);

export default router;
