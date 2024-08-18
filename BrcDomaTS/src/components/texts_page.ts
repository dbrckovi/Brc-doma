import { API_URL } from "global";
import { getStringList, makeGetRequest } from "api/api";

let selectedButton: HTMLButtonElement | null = null;

export class TextsPage {
    constructor(private container: HTMLElement) { }

    async render() {
        selectedButton = null;
        const title = document.createElement("label");
        title.textContent = "Texts";
        this.container.appendChild(title);

        try {
            let items: string[] = await getStringList(API_URL + "/api/TextBlock");

            for (const item of items) {
                const button = document.createElement('button');
                button.id = "text_title_button_" + item;
                button.textContent = item;
                button.classList.add("title-button-default");
                button.onclick = () => titleButton_onclick(button);
                this.container.appendChild(button);
                
                if (selectedButton == null) titleButton_onclick(button);
            }
        }
        catch (error) {
            console.error('Failed to fetch and display text:', error);
        }
    }
}

function titleButton_onclick(button: HTMLButtonElement) {
    
    console.log("ne jebi");

    if (selectedButton != null) {
        selectedButton.classList.remove("title-button-selected");
        selectedButton.classList.add("title-button-default");
    }
    selectedButton = button;
    selectedButton.classList.remove("title-button-default");
    selectedButton.classList.add("title-button-selected");
}