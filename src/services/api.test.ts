import { beforeAll, afterAll, afterEach, describe, expect, it } from 'vitest';
import { fetchData } from './api';
import { server } from '../__tests__/mocks/node';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Integration Tests', () => {
  it('return characters array on success', async () => {
    const { results } = await fetchData('Rick');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Rick Sanchez');
  });

  it('return empty array on 404 status code', async () => {
    const { results } = await fetchData('NonExistent');
    expect(results).toEqual([]);
  });

  it('throws an error on 500 status code', async () => {
    await expect(fetchData('ServerError')).rejects.toThrow(
      'HTTP Error. Status: 500',
    );
  });
});
