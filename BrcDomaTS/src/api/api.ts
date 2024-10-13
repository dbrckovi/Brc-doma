export interface TextBlock
{
  id: string,
  text: string
}

/**
 * Sends a HTTP request to the specified url using the provided method
 * @param url The URL to which the request is sent
 * @param method The HTTP method to use for the request (default is 'GET').
 * @param method The HTTP method to use for the request (default is 'GET').
 * @returns A promise that resolves to the response of the request.
 */
export async function makeRequest(url: string, method: string = 'GET'): Promise<Response> 
{
  try
  {
    console.log(`${method} request: ${url}`);
    const response = await fetch(url, { method: method });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    console.log(`${method} ${url}. Status: ${response.status}`);
    return response;
  }
  catch (error)
  {
    console.log(`${method} ${url}. Error: ${error}`);
    throw error;
  }
}

export async function getStringList(url: string): Promise<string[]>
{
  try
  {
    const response = await makeRequest(url, 'GET');
    const content = await response.text();
    const list: string[] = JSON.parse(content);
    return list;
  }
  catch (error)
  {
    console.error('... getStringList error: ', error);
    return [];
  }
}

export async function getTextBlock(url: string): Promise<TextBlock | null>
{
  try
  {
    const response = await makeRequest(url, 'GET');
    const content = await response.text();
    const textData: TextBlock = JSON.parse(content);
    return textData;
  }
  catch (error)
  {
    console.error('... getTextBlock error: ', error);
    return null;
  }
}

export async function postTextBlock(url: string, textBlock: TextBlock): Promise<void>
{
  try
  {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(textBlock),
    });

    if (!response.ok)
    {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    console.log('TextBlock successfully posted');
  }
  catch (error)
  {
    console.error('Failed to post TextBlock:', error);
  }
}

export async function deleteTextBlock(url: string, id: string): Promise<void>
{
  try
  {
    const response = await makeRequest(`${url}/${id}`, 'DELETE');
    console.log(`Succesfully delete TextBlock with ID ${id}. HTTP status: ${response.status}`);
  }
  catch (error)
  {
    console.error(`Failed to delete TextBlock with id ${id} :`, error);
  }

}