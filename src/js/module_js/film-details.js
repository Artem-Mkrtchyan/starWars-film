import { renderPage } from "./../script.js";

export function render(data, list = {...key}) {
  //Создание тегов
  const section = document.createElement('section');
  const title = document.createElement('h1');
  const link = document.createElement('a');
  const text = document.createElement('p');
  const lists = {
    listPlanets: createList(list.listPlanet, 'Planets'),
    listSpecies: createList(list.listSpecies, 'Species'),
  }

  //Добавление классов тегам
  section.classList.add('d-flex', 'flex-column', 'align-items-start', 'gap-2');
  title.classList.add('align-self-center');
  link.classList.add('btn', 'btn-warning')

  //Добавление содержимго тегам
  link.href = location.href.split('#')[0]
  title.textContent = data.title;
  text.textContent = data.opening_crawl;
  link.textContent = `Back to episodes`;

  //Событие на нажатие ссылки "Home"
  link.addEventListener('click', (e) => {
    e.preventDefault()
    // Удаление hesh параметра
    if (location.href.includes('#')) {
      window.history.pushState({home: 'Star-Wars'}, null, location.href.split('#')[0]);
    }
    //Рендер главной страницы
    renderPage(
      './module_js/list-film.js',
      'https://swapi.dev/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
      )
  })


  section.append(title);
  section.append(link);
  section.append(text);
  section.append(lists.listPlanets);
  section.append(lists.listSpecies);

  return section
}

function createList(arr, title){
  const listWrap = document.createElement('div');
  const titleList = document.createElement('h2');
  const list = document.createElement('ul');

  list.classList.add('list-group', 'list-group-flush');

  titleList.textContent = title
  arr.forEach(obj => {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    item.textContent = obj.name
    list.append(item);
  });

  listWrap.append(titleList)
  listWrap.append(list)
  return listWrap
}
