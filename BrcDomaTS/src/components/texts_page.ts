import { API_URL } from "global";

export class TextsPage {
    constructor(private container: HTMLElement) { }

    async render() {
        const title = document.createElement("label");
        title.textContent = "Texts";
        this.container.appendChild(title);

        try {
            let bla = await makeGetRequest(API_URL + "/api/TextBlock");
            const testLabel = document.createElement("label");
            testLabel.textContent = bla;
            this.container.appendChild(testLabel);
        }
        catch (error) {
            console.error('Failed to fetch and display text:', error);
        }
    }
}

async function makeGetRequest(url: string): Promise<string> {
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