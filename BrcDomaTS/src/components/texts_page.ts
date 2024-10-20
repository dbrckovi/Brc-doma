import { API_URL } from "global";
import { deleteTextBlock, getStringList, getTextBlock, makeRequest, postTextBlock } from "api/api";
import { TextBlock } from "api/api";
import { showModule } from "pages/home-page";
import { PAGE_ID_TEXTS } from "global";

let selectedButton: HTMLButtonElement | null = null;
let textBox: HTMLTextAreaElement | null = null;
let btnSave: HTMLButtonElement;
let buttonContainer: HTMLDivElement;

export class TextsPage
{
  constructor(private container: HTMLElement) { }

  async render()
  {
    const verticalContainer = document.createElement("div");
    verticalContainer.id = "vertical-container";
    this.container.appendChild(verticalContainer);

    buttonContainer = document.createElement("div");
    buttonContainer.id = "button-container";
    verticalContainer.appendChild(buttonContainer);

    const textareaContainer = document.createElement("div");
    textareaContainer.id = "textarea-container";
    verticalContainer.appendChild(textareaContainer);

    const bottomContainer = document.createElement("div");
    bottomContainer.id = "bottom-container";
    verticalContainer.appendChild(bottomContainer);

    selectedButton = null;
    const title = document.createElement("label");
    title.textContent = "Texts";
    buttonContainer.appendChild(title);

    try
    {
      let items: string[] = await getStringList(API_URL + "/TextBlock");

      for (const item of items)
      {
        const button = makeTitleButton(buttonContainer, item);
        if (selectedButton == null) titleButton_onclick(button);
      }

      btnSave = document.createElement('button');
      btnSave.classList.add("title-button-default");
      btnSave.textContent = "Save";
      btnSave.onclick = () => SaveCurrentTextBlock();
      bottomContainer.appendChild(btnSave);

      const btnNew = document.createElement("button");
      btnNew.classList.add("title-button-default");
      btnNew.classList.add("space-on-left");
      btnNew.textContent = "New";
      btnNew.onclick = () => NewTextItemClicked();
      bottomContainer.appendChild(btnNew);

      const btnDelete = document.createElement("button");
      btnDelete.classList.add("title-button-default");
      btnDelete.classList.add("space-on-left");
      btnDelete.textContent = "Delete";
      btnDelete.onclick = () => DeleteTextItemClicked();
      bottomContainer.appendChild(btnDelete);

      textBox = document.createElement("textarea");
      textBox.classList.add("fill_remaining_space", "editor");
      textBox.oninput = () => TextChanged();
      textareaContainer.appendChild(textBox);
    }
    catch (error)
    {
      console.error('Failed to fetch and display text:', error);
    }
  }
}

function makeTitleButton(container: HTMLDivElement, item: string): HTMLButtonElement
{
  const button = document.createElement('button');
  button.id = "text_title_button_" + item;
  button.textContent = item;
  button.classList.add("title-button-default");
  button.onclick = () => titleButton_onclick(button);
  container.appendChild(button);
  return button;
}

function deleteTitleButton(container: HTMLDivElement, button: HTMLButtonElement)
{
  container.removeChild(button);
  if (selectedButton == button) selectedButton = null;
  LoadCurrentTextBlock();
}


function titleButton_onclick(button: HTMLButtonElement)
{
  if (selectedButton != null)
  {
    selectedButton.classList.remove("title-button-selected");
    selectedButton.classList.add("title-button-default");
  }
  selectedButton = button;
  selectedButton.classList.remove("title-button-default");
  selectedButton.classList.add("title-button-selected");

  LoadCurrentTextBlock();
}

//Loads text of the selected TextBlock
async function LoadCurrentTextBlock()
{
  if (selectedButton != null)
  {
    let textBlock: TextBlock | null = await getTextBlock(API_URL + "/TextBlock/" + selectedButton.textContent);
    if (textBlock != null && textBox != null) textBox.value = textBlock.text;
    btnSave.classList.remove("title-button-not-saved");
    btnSave.classList.add("title-button-default");
  }
  else
  {
    if (textBox != null) textBox.value = "";
  }
}

//Saves text of the selected TextBlock
async function SaveCurrentTextBlock()
{
  if (selectedButton != null && selectedButton.textContent != null && textBox != null)
  {
    let textBlock: TextBlock = { id: selectedButton.textContent, text: textBox.value };
    let url: string = API_URL + "/TextBlock";
    await postTextBlock(url, textBlock);
    btnSave.classList.remove("title-button-not-saved");
    btnSave.classList.add("title-button-default");
  }
}

async function TextChanged()
{
  btnSave.classList.remove("title-button-default");
  btnSave.classList.add("title-button-not-saved");
}

async function NewTextItemClicked()
{
  const userInput = prompt("Enter name of new text item");

  if (userInput !== null)
  {
    try
    {
      if (userInput.length == 0) throw "Invalid input";
      let items: string[] = await getStringList(API_URL + "/TextBlock");
      for (const item of items)
      {
        if (item == userInput) throw "Item already esists";
      }

      let textBlock: TextBlock = { id: userInput, text: "" };
      let url: string = API_URL + "/TextBlock";
      await postTextBlock(url, textBlock);

      const button = makeTitleButton(buttonContainer, userInput);
      titleButton_onclick(button);
    }
    catch (error)
    {
      alert(error);
    }
  }
}

async function DeleteTextItemClicked()
{
  if (selectedButton != null && selectedButton.textContent != null)
  {
    const dialogResult = confirm("Do you want to elete '" + selectedButton.textContent + "'?");
    if (dialogResult)
    {
      await deleteTextBlock(API_URL + "/TextBlock", selectedButton.textContent);
      showModule(PAGE_ID_TEXTS);
    }
  }
}