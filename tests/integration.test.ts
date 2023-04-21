import { describe, expect, it } from 'vitest';
import { getPageContent } from '../src/lib/scraper';
import { getSummary } from '../src/lib/openAi';

describe('integration', () => {

  const link = 'https://medium.com/@jolodev/effectively-using-cdk-pipelines-to-deploy-cdk-stacks-into-multiple-accounts-35f501a58d87';
  it('should get the content of a real website', async() => {
    const content = await getPageContent(link);
    expect(content).not.toBeUndefined();
  });

  it.skip('should summarize the article by using OpenAI', async() => {
    const content = await getPageContent(link);
    const summary = await getSummary(content);
    console.log(summary);

    expect(summary).not.toEqual('');
  });
});