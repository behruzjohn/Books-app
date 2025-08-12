const backendUrl = 'https://bookzone-backend.onrender.com/api';
const shoirs = document.getElementById('shoirs');
const load = document.getElementById('load');
load.style.display = 'flex';
const bookSeach = document.getElementById('book-search');
const shoirs_h3 = document.getElementById('shoirs_h3');

let allBooks = [];

const getBooks = async () => {
  load.style.display = 'flex';
  const books = await fetch(backendUrl + '/books/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const getBooksApi = await books.json();
  if (getBooksApi.msg === 'jwt expired') {
    alert("Iltimos ro'yxatdan o'ting");
    location.href = 'http://127.0.0.1:5500/html/sign-in.html';
    return;
  }

  const dateLoop = getBooksApi.payload.docs;
  allBooks = dateLoop;
  console.log(dateLoop);

  if (getBooksApi.success) {
    load.style.display = 'none';
    books.innerHTML = '';

    for (const key in dateLoop) {
      let imgUrl = '';
      if (!dateLoop[key].imageLink) {
        imgUrl =
          'https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg';
      } else {
        imgUrl = `https://bookzone-backend.onrender.com/api/${dateLoop[key].imageLink}`;
      }

      const getStars = (rate) => {
        let result = '';
        for (let i = 0; i < rate; i++) {
          result += `<img id='rateImg' src='/asign/image/star (2).svg' id="starts"/>`;
        }
        return result;
      };

      if (dateLoop[key].rate > 1) {
        shoirs.innerHTML += `
      <div id="booksBox" class="books_box" data-id="${dateLoop[key]._id}">
        <img id="img" src="${imgUrl}" alt="Books 1" />
        <h3 id="title" class="books_box_h3" style="text-transform: uppercase">
          ${dateLoop[key].title}
        </h3>
        <div class="reyting">
          <div id='startsDiv' class="startsDiv">
          <span>Daraja:</span>  ${getStars(dateLoop[key].rate)}
          </div>
          <p id="tafsif">${dateLoop[key].description}</p>
        </div>
      </div>
    `;
      }
    }
    document.querySelectorAll('.books_box').forEach((box) => {
      box.addEventListener('click', () => {
        const bookId = box.getAttribute('data-id');
        location.href = `http://127.0.0.1:5500/html/book.html?id=${bookId}`;
      });
    });
  }
};
load.style.display = 'none';

getBooks();
getBooks();
getBooks();

function innerBooks(books) {
  shoirs.innerHTML = '';

  books.forEach((item) => {
    let categoryName =
      item.category.charAt(0).toUpperCase() +
      item.category.slice(1).toLowerCase();

    const getStars = (rate) => {
      let result = '';
      for (let i = 0; i < rate; i++) {
        result += `<img id='rateImg' src='/asign/image/star (2).svg' alt="star"/>`;
      }
      return result;
    };

    if (item.rate > 1) {
      shoirs.innerHTML += `
        <div id="booksBox" class="books_box" data-id="${item._id}">
          <img id="img" src="https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg" alt="${
            item.title
          }" />
          <h3 id="title" class="books_box_h3" style="text-transform: uppercase">
            ${item.title}
          </h3>
          <p class="shoirs_nav_box_p">Type:  ${categoryName}</p>
          <div class="reyting">
            <div id='startsDiv' class="startsDiv">
              <span>Daraja:</span> ${getStars(item.rate)}
            </div>
            <p id="tafsif">${item.description || ''}</p>
          </div>
        </div>
      `;
    }
  });

  document.querySelectorAll('.books_box').forEach((box) => {
    box.addEventListener('click', () => {
      const bookId = box.getAttribute('data-id');
      location.href = `http://127.0.0.1:5500/html/book.html?id=${bookId}`;
    });
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
  // console.log(typeof classics);

  innerBooks(classics);
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
  load.style.display = 'flex';
  if (bookSeach.value) {
    shoirs_h3.style.display = 'none';
    getAuthors(bookSeach.value);
    load.style.display = 'flex';
  } else {
    load.style.display = 'none';
  }
}

getAuthors();
