export interface TextBlock {
    id: string,
    text: string
}

export async function makeGetRequest(url: string): Promise<string> {
  try {
      console.log("GET request: " + url + " ...");
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text();

      console.log("... GET response: " + responseData);
      return responseData;
  } catch (error) {
      console.error('... GET error: ', error);
      return "";
  }
}

export async function getStringList(url: string): Promise<string[]> {
    try {
        const response = await makeGetRequest(url);
        const list:string[] = JSON.parse(response);
        return list;
    }
    catch (error) {
        console.error('... getStringList error: ', error);
        return [];
    }
}

export async function getTextBlock(url: string): Promise<TextBlock | null> {
    try {
        const response = await makeGetRequest(url);
        const textData: TextBlock = JSON.parse(response);
        return textData;
    }
    catch (error) {
        console.error('... getTextBlock error: ', error);
        return null;
    }
}

export async function postTextBlock(url: string, textBlock: TextBlock): Promise<void> {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(textBlock),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error: ${errorText}`);
        }

        console.log('TextBlock successfully posted');
    } catch (error) {
        console.error('Failed to post TextBlock:', error);
    }
}