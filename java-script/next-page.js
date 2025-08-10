const backendUrl = 'https://bookzone-backend.onrender.com/api';
const shoirs = document.getElementById('shoirs');
const load = document.getElementById('load');
load.style.display = 'flex';
const bookSeach = document.getElementById('book-search');

let allBooks = [];

function innerBooks(books) {
  shoirs.innerHTML = '';
  // console.log(books);
  books.forEach((item) => {
    let resImg = '';
    if (item.image?.url) {
      resImg = item.image?.url;
    } else {
      resImg = 'https://static.thenounproject.com/png/1077596-200.png';
    }

    let categoryName =
      item.category.charAt(0).toUpperCase() +
      item.category.slice(1).toLowerCase();

    shoirs.innerHTML += `
      <div class="shoirs_nav_box">
        <img class="shoirs_nav_box_img" src="${resImg}" alt="${item.title}" />
        <div class="shoirs_text">
          <h3 class="shoirs_nav_box_h3">${item.title}</h3>
          <p class="shoirs_nav_box_p">${categoryName}</p>
          
        </div>
      </div>
    `;
  });
}

const getAuthors = async (text) => {
  shoirs.innerHTML = '';

  const res = await fetch(
    `${backendUrl}/books/search${text ? `?title=${text}` : ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();

  if (data.msg === 'jwt expired') {
    alert("Iltimos ro'yxatdan o'ting");
    location.href = 'http://127.0.0.1:5500/html/sign-in.html';
    return;
  }

  if (data.success) {
    load.style.display = 'none';
    allBooks = data.payload;
    innerBooks(allBooks);
  }
};

function filterClassic(e) {
  e.style.color = 'red';
  let classics = allBooks.filter((book) => book.category === 'classic');
  console.log(typeof classics);

  innerBooks(classics);
  // if () {

  // }
}

function filterBiography(e) {
  e.style.color = 'red';
  let biographies = allBooks.filter((book) => book.category === 'biography');
  innerBooks(biographies);
}

function filterScients(e) {
  e.style.color = 'red';
  let sciences = allBooks.filter((book) => book.category === 'science');
  innerBooks(sciences);
}

function search() {
  if (bookSeach.value) {
    getAuthors(bookSeach.value);
  }
}

getAuthors();
