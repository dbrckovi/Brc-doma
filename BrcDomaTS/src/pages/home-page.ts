import { MainMenu } from 'components/mainMenu';
import { ListsPage } from 'components/lists_page';
import { version, mode, PAGE_ID_TEXTS,PAGE_ID_LISTS } from 'global';
import 'styles/home-page.css'
import { TextsPage } from 'components/texts_page';

// FIXME - importing global stuff
console.log('this script is loaded inside home page')
console.log(`Global: ${PAGE_ID_TEXTS} ${PAGE_ID_LISTS} ${version} ${mode}`);

let selectedButtonID: string | null = null;

//Load event
document.addEventListener('DOMContentLoaded', () =>
{
  createMainMenu();
});

//Create main menu
function createMainMenu()
{
  const mainMenuContainer = document.getElementById('main-menu');

  if (mainMenuContainer)
  {
    const mainMenu = new MainMenu(mainMenuContainer, mainMenu_ModuleChanged);
    mainMenu.render();

    mainMenu_ModuleChanged(PAGE_ID_TEXTS);
  }
}

//fired when selected moude is changed
function mainMenu_ModuleChanged(module: string)
{
  if (selectedButtonID)
  {
    let selectedButton = document.getElementById(selectedButtonID);
    selectedButton?.classList.remove('selected');
  }

  selectedButtonID = module;
  let selectedButton = document.getElementById(selectedButtonID);
  selectedButton?.classList.add('selected');

  showModule(module);
}

export function showModule(module: string)
{
  const contentContainer = document.getElementById('content');
  if (contentContainer)
  {
    contentContainer.innerHTML = "";
    switch(module)
    {
      case PAGE_ID_LISTS :
        const listsPage = new ListsPage(contentContainer);
        listsPage.render();
        break;
        case PAGE_ID_TEXTS :
        const textsPage = new TextsPage(contentContainer);
        textsPage.render();
        break;
    }
  }
}
