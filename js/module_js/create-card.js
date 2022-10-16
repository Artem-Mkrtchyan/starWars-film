import { renderPage } from './../script.js';

export function createCardElem({title, text, id}) {
  //Создание элементов карты
  const cardWrapp = document.createElement('li');
  const cardBody = document.createElement('div');
  const cardTitle = document.createElement('h3');
  const cardText = document.createElement('p');
  const cardLink = document.createElement('a');

  //Добавление классов
  cardWrapp.classList.add('card');
  cardBody.classList.add('card-body');
  cardTitle.classList.add('card-title');
  cardText.classList.add('card-text');
  cardLink.classList.add('btn', 'btn-primary');

  //Добавление содердимого элементам
  cardTitle.textContent = title;
  cardText.textContent = text;
  cardLink.text = 'Подробнее';
  cardLink.setAttribute('data-home', `${title.replace(/\s/g, '-')}`)

  //Состояние в historiState
  let state = cardLink.getAttribute('data-home');
  let hash = `#${id}`;

  cardLink.href = `${location.href}${hash}`;

  //Событие на нажатия сслыки
  cardLink.addEventListener('click', (event) => {
    event.preventDefault();
    document.title = title;

    window.history.pushState({state}, '', hash);
    //Рендер детальной страницы о фильме
    renderPage(
      './module_js/film-details.js',
      `https://swapi.dev/api/films/${id}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
      true
    )
  })

  //Добавление элементов
  cardBody.append(cardTitle);
  cardBody.append(cardText);
  cardBody.append(cardLink);
  cardWrapp.append(cardBody);

  return cardWrapp
}
