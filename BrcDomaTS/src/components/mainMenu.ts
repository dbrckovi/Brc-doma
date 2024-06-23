export class MainMenu {
    constructor(private container: HTMLElement, private onNavigate: (module: string) => void) {}

    render() {
        const menuItems = [
            { name: 'List', id: 'lists', disabled: false },
            { name: 'Texts', id: 'texts', disabled: false },
            { name: 'Devices', id: 'devices', disabled: true},
            { name: 'Light Control', id: 'lightControl', disabled: true },
            { name: 'Music Control', id: 'musicControl', disabled: true },
            { name: 'Cameras', id: 'cameras', disabled: true },
        ];

        menuItems.forEach(item => {
            const button = document.createElement('button');
            button.id = item.id;
            button.textContent = item.name;
            button.disabled = item.disabled;
            button.onclick = () => this.onNavigate(item.id);
            this.container.appendChild(button);
        });
    }
}