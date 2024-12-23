//Imports
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

//Declarations
const loadMoreBtn = document.querySelector('.load-more-btn');
const key = '47085202-d45a05c5527d5a5bb1843bc76';
const loader = document.querySelector('.loader');
let page = 1;
let perPage = 15;
let isLoading = false;
export let userSearchQuery = '';

export async function getPictures(query, renderFn, isFirstLoad = false) {
  if (isLoading) return;
  isLoading = true;
  if (userSearchQuery !== query) {
    userSearchQuery = query;
    page = 1;
  }

  //search parameters
  const searchParams = new URLSearchParams({
    key,
    page,
    per_page: perPage,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  try {
    loader.style.display = 'block';
    const res = await axios.get(url);
    const pictures = res.data.hits;
    const totalHits = res.data.totalHits;

    if (pictures.length === 0 && page === 1) {
      loadMoreBtn.style.display = 'none';

      iziToast.error({
        title: 'No pictures found',
        message: 'Try another query',
        messageColor: 'black',
        messageSize: '14px',
        position: 'topCenter',
        timeout: 3000,
        closeOnClick: true,
      });
    } else {
      page += 1;
      //showing the found pictures
      renderFn(pictures, isFirstLoad);
      loadMoreBtn.style.display = 'block';
    }
    //no more pictures logic
    if (page > Math.ceil(totalHits / perPage) && totalHits > 0) {
      loadMoreBtn.style.display = 'none';
      iziToast.error({
        title: `We're sorry, but you've reached the end of search results.`,
        message: 'Try another query',
        messageColor: 'black',
        messageSize: '14px',
        position: 'topCenter',
        timeout: 3000,
        closeOnClick: true,
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    loader.style.display = 'none';
    isLoading = false;
  }
}

