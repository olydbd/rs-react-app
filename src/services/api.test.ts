import { beforeAll, afterAll, afterEach, describe, expect, it } from 'vitest';
import { fetchData, getCharacterById } from './api';
import { server } from '../__tests__/mocks/node';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Integration Tests', () => {
  describe('Get Characters Data', () => {
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

  describe('Get Character Data By ID', () => {
    it('returns character data for valid id', async () => {
      const character = await getCharacterById(1);
      expect(character.name).toBe('Rick Sanchez');
      expect(character.id).toBe(1);
    });

    it('throws error when character not found (404)', async () => {
      await expect(getCharacterById(999)).rejects.toThrow(
        'Character not found',
      );
    });

    it('throws error for server error (500)', async () => {
      await expect(getCharacterById('500')).rejects.toThrow(
        'HTTP Error. Status: 500',
      );
    });
  });
});
