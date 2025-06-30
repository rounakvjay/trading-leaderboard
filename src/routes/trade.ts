import { Router } from 'express';
import tradeController from '../controllers/trade';

const router = Router();

router.post('/', tradeController.submitTrade);
router.post('/competitions/:id', tradeController.submitCompetitionTrade);

export default router;
