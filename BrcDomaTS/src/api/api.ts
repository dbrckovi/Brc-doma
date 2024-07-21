export async function makeGetRequest(url: string): Promise<string> {
  try {
      console.log(url);
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      // You can choose to deserialize the response body here if needed
      const responseData = await response.text(); // or response.json(), response.blob(), etc.

      console.log(responseData);
      return responseData;
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return "";
  }
}