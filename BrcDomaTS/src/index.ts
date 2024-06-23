import { MainMenu } from './components/mainMenu.js';

let selectedButtonID: string | null = null;

document.addEventListener('DOMContentLoaded', () => 
{
  const mainMenuContainer = document.getElementById('main-menu');

  if (mainMenuContainer) 
  {
    const mainMenu = new MainMenu(mainMenuContainer, showMainPage);
    mainMenu.render();

    showMainPage('lists');
  }
});

function showMainPage(module: string) 
{
  if (selectedButtonID)
  {
    let selectedButton = document.getElementById(selectedButtonID);
    selectedButton?.classList.remove('selected');
  }

  selectedButtonID = module;
  let selectedButton = document.getElementById(selectedButtonID);
  selectedButton?.classList.add('selected');
}