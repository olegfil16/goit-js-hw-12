import renderPictures from './js/render-functions';
import { getPictures, userSearchQuery } from './js/pixabai-api';

//Declarations
const form = document.getElementById('form');
const loadMoreBtn = document.querySelector('.load-more-btn');
export const gallery = document.querySelector('.gallery');
loadMoreBtn.style.display = 'none';

form.addEventListener('submit', e => {
  e.preventDefault();

  //Getting info from the input
  const searchValue = e.target.elements.searchquery.value;
  if (searchValue.trim() === '') return;
  gallery.innerHTML = '';
  getPictures(searchValue, renderPictures, true);
});

loadMoreBtn.addEventListener('click', async () => {
  getPictures(userSearchQuery, renderPictures, false);
});

//
//

//
// INFINITY SCROLL
//

//
// import renderPictures from './js/render-functions';
// import { getPictures, userSearchQuery } from './js/pixabai-api';

// //Declarations
// const form = document.getElementById('form');
// const loadMoreBtn = document.querySelector('.load-more-btn');
// export const gallery = document.querySelector('.gallery');

// form.addEventListener('submit', e => {
//   e.preventDefault();

//   //Getting info from the input
//   const searchValue = e.target.elements.searchquery.value;
//   if (searchValue.trim() === '') return;
//   gallery.innerHTML = '';
//   getPictures(searchValue, renderPictures, true);
// });
