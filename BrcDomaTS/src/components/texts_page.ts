import { API_URL } from "global";
import { makeGetRequest } from "api/api";

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