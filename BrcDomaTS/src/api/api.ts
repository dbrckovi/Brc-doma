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