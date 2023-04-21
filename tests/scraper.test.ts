import { vi, expect, it, describe } from 'vitest';
import { getPage, parseHtml } from '../src/lib/scraper';

describe('scraper', () => {
  it('test should return the html successfully', async() => {
    const link = 'https://www.example.com';
    const mockResponse = { ok: true, text: vi.fn(() => Promise.resolve('<html><body><h1>Hello World</h1></body></html>')) };
    const fetchMock = vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(mockResponse));

    const html = await getPage(link);

    expect(fetchMock).toHaveBeenCalledWith(link);
    expect(mockResponse.text).toHaveBeenCalled();
    expect(html).toEqual('<html><body><h1>Hello World</h1></body></html>');

    fetchMock.mockRestore();
  });

  // Tests that getPage returns undefined when given an invalid link.
  it('should test an invalid link', async() => {
    const link = 'invalid_link';
    const mockResponse = { ok: false };
    const mockFetch = vi.fn(() => Promise.resolve(mockResponse));
    global.fetch = mockFetch;

    const result = await getPage(link);

    expect(mockFetch).toHaveBeenCalledWith(link);
    expect(result).toBeUndefined();
  });

  // Tests that getPage returns undefined when response is empty.
  it('should return an empty response', async() => {
    const link = 'https://www.example.com';
    const mockResponse = { ok: true, text: vi.fn(() => Promise.resolve('')) };
    const mockFetch = vi.fn(() => Promise.resolve(mockResponse));
    global.fetch = mockFetch;

    const result = await getPage(link);

    expect(mockFetch).toHaveBeenCalledWith(link);
    expect(mockResponse.text).toHaveBeenCalled();
    expect(result).toEqual('');
  });

  // Tests that valid HTML input returns trimmed text content.
  it('should parse the content in <article> correctly', () => {
    const html = '<html><body><article><p>Some text content</p></article></body></html>';
    const expected = 'Some text content';
    expect(parseHtml(html)).toEqual(expected);
  });

  it('should parse the content in <main> correctly', () => {
    const html = '<html><body><main><p>Some text content</p></main></body></html>';
    const expected = 'Some text content';
    expect(parseHtml(html)).toEqual(expected);
  });

  // Tests that empty HTML input returns empty string.
  it('should return empty string', () => {
    const html = '';
    const expected = '';
    expect(parseHtml(html)).toEqual(expected);
  });

  // Tests that function removes excess whitespace from text content.
  it('should return the right content without whitespace', () => {
    const html = '<html><body><article>   Article content   </article><main>   Main content   </main></body></html>';
    const expected = 'Article content';
    const result = parseHtml(html);
    expect(result).toEqual(expected);
  });
});

