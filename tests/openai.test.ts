import { describe, expect, it, vi } from 'vitest';
import { getSummary } from '../src/lib/openAi';

vi.mock('openai', () => ({
  Configuration: vi.fn(),
  connectToOpenAi: vi.fn(),
  OpenAIApi: vi.fn(() => {
    return {
      createCompletion: vi.fn().mockResolvedValue({
        data: {
          choices: [{ text: 'This is a summary.' }]
        }
      })
    };
  })
}));

describe('openai', () => {

  it('should get an summary', async() => {
    // const response = await getSummary(`
    // https://nikoheikkila.fi/blog/clean-frontend-architecture-with-sveltekit/discovering-the-use-cases/
    // `);

    // console.log(response);

    // expect(response).not.toEqual(null);
  });

  // Tests that providing valid text input returns a summary.
  it('should return a summary successfully', async() => {
    const summary = await getSummary('This is some text.');
    expect(summary).toBe('This is a summary.');
  });

});
