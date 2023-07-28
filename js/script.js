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
    accountId: 'b281e777-8a54-4ffb-bb1e-19e594454736',
    url: 'https://167.koronacloud.com/web/api/v3/accounts',
    username: 'main',
    password: '1234',
  },
};

async function testAPIKey() {
  fetchAPIData('')
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

// testAPIKey();

// Display 20 products
async function displayProducts() {
  // Destructuring results returns the 'results' array from the data object returned
  const { results } = await fetchAPIData('products?page=1&size=40');

  results.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('card');
    productDiv.innerHTML = `
          <a href="product.html?id=${product.id}">
            <img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${product.name}"
            />
          </a>
          <div class="card-body">
            <h4>${product.name}</h4>
            <h5 class="card-title">${product.prices[0].value}</h5>
          </div>
        `;

    document.querySelector('#products-list').appendChild(productDiv);
  });
}

// Fetch data from TMDB API
// NOTE: FOR PRODUCTION--> create own backend server and make the request to THAT server where API Key is stored, then request from there to TMDB DB
async function fetchAPIData(endpoint) {
  const ACCOUNT_ID = state.api.accountId;
  const API_URL = state.api.url;
  const USERNAME = state.api.username;
  const PASSWORD = state.api.password;

  showSpinner();

  const response = await fetch(`${API_URL}/${ACCOUNT_ID}/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(USERNAME + ':' + PASSWORD),
    },
  });

  const data = await response.json();
  console.log(data);

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight Active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  links.forEach((link) => {
    if (link.getAttribute('href') === state.currentPage) {
      link.classList.add('active');
    }
  });
}

// Init App
// Custom 'router' for page links
function init() {
  switch (state.currentPage) {
    case '/':
    case '/index.html':
      //   console.log('Home');
      displayProducts();
      break;
    case '/product.html':
      console.log('Product Details');
      // displayProductDetails();
      break;
    case '/profile.html':
      console.log('Profile Details');
      // displayProfileDetails();
      break;
    // case '/search.html':
    //   console.log('Search');
    //   // search();
    //   break;
  }
}

init();
