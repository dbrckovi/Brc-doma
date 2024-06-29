export class TextsPage {
    constructor(private container: HTMLElement) {}

    render()
    {
        const title = document.createElement("label");
        title.textContent = "Texts";
        this.container.appendChild(title);
    }
}