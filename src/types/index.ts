export interface Trade {
    traderId: string;
    pnl: number;
  }
  
  export interface LeaderboardEntry {
    rank: number;
    traderId: string;
    pnl: number;
  }
  
  export interface PaginatedLeaderboard {
    page: number;
    limit: number;
    total: number;
    results: LeaderboardEntry[];
  }