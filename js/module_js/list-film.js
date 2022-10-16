import { createCardElem } from './create-card.js'

//Создание списка
export function render(data) {
  const listFilm = document.createElement('ul');
  listFilm.classList.add('list-group', 'gap-5');

  //Счетчик
  let count = 0;

  //Создание элементов списка
  data.results.forEach(obj => {
    count += 1;
    const card = createCardElem({
      title: obj.title,
      text: obj.opening_crawl,
      id: count
    })
    listFilm.append(card);
  });

  return listFilm;
}
