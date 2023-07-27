import { configDotenv } from 'dotenv';
const process = configDotenv();

const state = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    accountId: process.env.ACCOUNT_ID,
    url: 'https://167.koronacloud.com/web/api/v3',
    username: process.env.API_LOGIN,
    password: process.env.API_PASSWORD,
  },
};

console.log(state.api.username);
console.log(state.api.password);
console.log(state.api.accountId);

// Init App
// Custom 'router' for page links
function init() {
  switch (state.currentPage) {
    case '/':
    case '/index.html':
    case '/products.html':
      //   console.log('Home');
      displaySlider();
      displayProducts();
      break;
    case '/product.html':
      // console.log('Movie Details');
      displayProductDetails();
      break;
    case '/profile.html':
      // console.log('TV Details');
      displayProfileDetails();
      break;
    case '/search.html':
      // console.log('Search');
      search();
      break;
  }
}
