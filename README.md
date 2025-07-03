# trading-leaderboard

1. **API for Trade Events:** Design a REST API endpoint (e.g., `POST /trades`) that accepts a payload representing a single trade, like `{ "traderId": "...", "pnl": 150.75 }`.
2. **Leaderboard Logic:** Implement the logic to process these trades and maintain a leaderboard ranked by the cumulative PnL for each trader.
3. **Data Storage:** Use an in-memory database like Redis (its sorted set feature is a great fit here) to store the leaderboard data for efficient querying.
4. **API for Leaderboard:** Create a `GET /leaderboard` endpoint that returns the top N traders, ranked by PnL. The response must be paginated.
5. **Bonus Feature:** Add the concept of separate, concurrent competitions. The API could be extended to `POST /competitions/:id/trades` and `GET /competitions/:id/leaderboard`.
6. **Testing:** Write tests to validate the trade submission and leaderboard endpoints.

## Installation

1. Clone the repository:
```
git clone https://github.com/rounakvjay/trading-leaderboard.git
cd trading-leaderboard


## Install dependencies:
npm install

## Start Redis server:
redis-server

## Build the application
npm run build

## Running the application 
npm start

## Run tests
npm test
```


## API Documentation
**1. Submit a Trade**
POST `/trades`
```{
  "traderId": "trader-123",
  "pnl": 42.5
}
```

**2. Submit a Competition Trade**
POST `/trades/competitions/:id`
```{
  "traderId": "trader-123",
  "pnl": 42.5
}
```

Submit a trade to a specific competition leaderboard

Path Parameters:
- `id`: Competition ID

**3. Get Global Leaderboard**
GET `/leaderboard`
retrieve the global leaderboard

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)

**4. Get Competition Leaderboard**
GET `/leaderboard/competitions/:id`
Retrieve a competition-specific leaderboard

Path Parameters:
- `id`: Competition ID

Query Parameters:
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)


## Configuration (Add .env)
```
REDIS_URL=redis://localhost:6379
PORT=3000
NODE_ENV=test```
