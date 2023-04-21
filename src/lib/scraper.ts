import * as cheerio from 'cheerio';

export async function getPage(link: string) {
  try {
    const response = await fetch(link);
    if (response.ok) {
      const html = await response.text();
      return html;
    } else {
      throw new Error(`Error fetching ${link}: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error fetching ${link}:`, error);
  }
}


export function parseHtml(html: string): string {
  const $ = cheerio.load(html);
  const content: string = $('article').text() || $('main').text() || $('body').text();
  return content.trim();
}


export async function getPageContent(link: string) {
  const html = await getPage(link);
  const content = html ? parseHtml(html) : '';
  return content;
}