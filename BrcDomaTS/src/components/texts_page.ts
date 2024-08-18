import { API_URL } from "global";
import { getStringList, getTextBlock, makeGetRequest, postTextBlock } from "api/api";
import { TextBlock } from "api/api";

let selectedButton: HTMLButtonElement | null = null;
let textBox: HTMLTextAreaElement | null = null;

export class TextsPage {
    constructor(private container: HTMLElement) { }

    async render() {

        const verticalContainer = document.createElement("div");
        verticalContainer.id = "vertical-container";
        this.container.appendChild(verticalContainer);

        const buttonContainer = document.createElement("div");
        buttonContainer.id = "button-container";
        verticalContainer.appendChild(buttonContainer);

        const textareaContainer = document.createElement("div");
        textareaContainer.id = "textarea-container";
        verticalContainer.appendChild(textareaContainer);

        selectedButton = null;
        const title = document.createElement("label");
        title.textContent = "Texts";
        buttonContainer.appendChild(title);

        try {
            let items: string[] = await getStringList(API_URL + "/api/TextBlock");

            for (const item of items) {
                const button = document.createElement('button');
                button.id = "text_title_button_" + item;
                button.textContent = item;
                button.classList.add("title-button-default");
                button.onclick = () => titleButton_onclick(button);
                buttonContainer.appendChild(button);
                
                if (selectedButton == null) titleButton_onclick(button);
            }

            const btnSave = document.createElement('button');
            btnSave.onclick = () => SaveCurrentTextBlock();
            buttonContainer.appendChild(btnSave);
           
            textBox = document.createElement("textarea");
            textBox.classList.add("fill_remaining_space");
            textareaContainer.appendChild(textBox);
        }
        catch (error) {
            console.error('Failed to fetch and display text:', error);
        }
    }
}

function titleButton_onclick(button: HTMLButtonElement) {
    if (selectedButton != null) {
        selectedButton.classList.remove("title-button-selected");
        selectedButton.classList.add("title-button-default");
    }
    selectedButton = button;
    selectedButton.classList.remove("title-button-default");
    selectedButton.classList.add("title-button-selected");

    LoadCurrentTextBlock();
}

//Loads text of the selected TextBlock
async function LoadCurrentTextBlock(){
    if (selectedButton != null) {
        let textBlock:TextBlock | null = await getTextBlock(API_URL + "/api/TextBlock/" + selectedButton.textContent);
        if (textBlock != null && textBox != null) textBox.value = textBlock.text;
    }
}

//Saves text of the selected TextBlock
async function SaveCurrentTextBlock() {
    if (selectedButton != null && selectedButton.textContent != null && textBox != null)
    {
        let textBlock: TextBlock = { id: selectedButton.textContent, text: textBox.value };
        let url: string = API_URL + "/api/TextBlock";
        await postTextBlock(url, textBlock);
    }    
}