import * as cheerio from 'cheerio';
import { getSummary } from './openAi';

export async function getPage( link: string ) {
  console.log( 'Start scraping and fetching', link );

  try {
    const response = await fetch( link, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      mode: 'no-cors'
    } );
    if ( response.ok ) {
      const html = await response.text();
      return html;
    } else {
      throw new Error( `Error fetching ${link}: ${response.status}` );
    }
  } catch ( error ) {
    console.error( `Error fetching ${link}:`, error );
    throw new Error( `Error fetching ${link}` );
  }
}


export function parseHtml( html: string ): string {
  const $ = cheerio.load( html );
  const content: string = $( 'article' ).text() || $( 'main' ).text() || $( 'body' ).text();
  return content.trim();
}


export async function getPageContent( link: string ) {
  const html = await getPage( link );
  const content = html ? parseHtml( html ) : '';
  return await getSummary( content );
}