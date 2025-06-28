import { Request, Response } from 'express';

import { Trade } from '../types';

class TradeController {
  async submitTrade(req: Request, res: Response): Promise<Response> {
    const trade = req.body as Trade;

    if (!trade.traderId || typeof trade.pnl !== 'number') {
      return res.status(400).json({ error: 'Invalid trade data' });
    }

    // TODO: Update leaderboard
    return res.status(201).json({ message: 'Trade processed successfully' });
  }
}

export default new TradeController();
