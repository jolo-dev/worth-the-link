import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { encode } from '@nem035/gpt-3-encoder';

const openai = connectToOpenAi();

export function connectToOpenAi() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const configuration = new Configuration( {
    apiKey,
  } );

  return new OpenAIApi( configuration );
}

export const runtime = 'edge'

export function numberOfTokens( text: string ) {
  const encoded = encode( text );
  return encoded.length;
}

export async function getSummary( text: string ) {
  try {
    const cleanText = text.replaceAll( '`', '' ).replaceAll( '$', '\\$' );

    const prompt = `Write a Summary and list some key points of following text\n ${cleanText}`;
    const tokens = numberOfTokens( prompt );
    const completion = await openai.createCompletion( {
      model: 'text-davinci-003',
      prompt,
      // Need to Calculate the tokens
      // https://github.com/openai/openai-node/issues/52#issuecomment-1404840559
      max_tokens: 4090 - tokens,
      stream: true,
    } );

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream( completion );
    // Respond with the stream
    return new StreamingTextResponse( stream );
    // return completion.data.choices[0].text;
  } catch ( error ) {
    console.error( error );
    return '<b>Probably, too big to fetch </b>';
  }
}
