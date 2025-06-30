import 'jest';
import 'redis-mock';

jest.mock('redis', () => jest.requireActual('redis-mock'));
process.env.REDIS_URL = 'redis://localhost:6379';

if (process.env.NODE_ENV === 'test') {
  const moduleAlias = require('module-alias');
  moduleAlias.addAlias('@', __dirname + '/../src');
}