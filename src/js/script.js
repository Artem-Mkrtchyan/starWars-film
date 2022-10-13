const sectionFilm = document.getElementById('section-film');
const container = document.createElement('div');
container.classList.add('container');
sectionFilm.append(container)

const cssPromises = {};
//Загрузка файлов
export function loadResourse(src) {
  //Загрузка JS файлов
  if (src.endsWith('.js')) {
    return import(src)
  }

  //Загрузка css файлов
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve())
      })
      document.head.append(link);
  }
    return cssPromises[src];
  }
  return fetch(src).then(resp => resp.json());
}

//Отрисовка страниц
export function renderPage(moduleName, urlApi, css, flag = false) {
  Promise.all([moduleName, urlApi,css].map(src => loadResourse(src)))
    .then(([modulePage, data]) => {
      //Списка фильмов
      if(!flag) {
        container.innerHTML = '';
        container.append(modulePage.render(data))
        return
      }
      //Детальной информации
      Promise.all(
        [ Promise.all(data.planets.map(src => loadResourse(src))),
        Promise.all(data.species.map(src => loadResourse(src))) ]
      ).then(([listPlanet, listSpecies]) => {
        container.innerHTML = '';
        container.append(modulePage.render(data, {listPlanet, listSpecies}))
      })
    })
}

function appPage(hash) {
  if(!location.hash) {
    history.replaceState({home: 'Star-Wars'}, '', location.href.split('#')[0])
    document.title = 'Star Wars';
    renderPage(
      './module_js/list-film.js',
      'https://swapi.dev/api/films/',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
      )
   } else {
    let params = location.hash.replace('#', '');
    renderPage(
      './module_js/film-details.js',
      `https://swapi.dev/api/films/${params}`,
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css',
      true
    )
   }
}

//Получения хеша
let params = location.hash.replace('#', '')
//отрисовка страницы
appPage(params);

window.addEventListener('popstate', (e) => {
  appPage(params);
 })
