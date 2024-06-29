export class ListsPage {
    constructor(private container: HTMLElement) {}

    render()
    {
        const title = document.createElement("label");
        title.textContent = "Lists";
        this.container.appendChild(title);
    }
}