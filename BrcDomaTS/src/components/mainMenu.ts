import { PAGE_ID_CAMERAS, PAGE_ID_DEVICES, PAGE_ID_LISTS, PAGE_ID_MUSIC_CONTROL, PAGE_ID_TEXTS } from "global";

export class MainMenu {
    constructor(private container: HTMLElement, private onNavigate: (module: string) => void) {}

    render() {
        const menuItems = [
            { name: 'List', id: PAGE_ID_LISTS, disabled: false },
            { name: 'Texts', id: PAGE_ID_TEXTS, disabled: false },
            { name: 'Devices', id: PAGE_ID_DEVICES, disabled: true},
            { name: 'Light Control', id: PAGE_ID_LISTS, disabled: true },
            { name: 'Music Control', id: PAGE_ID_MUSIC_CONTROL, disabled: true },
            { name: 'Cameras', id: PAGE_ID_CAMERAS, disabled: true },
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