const booksBox = document.getElementById('booksBox');
const books = document.getElementById('books');
const img = document.getElementById('img');
const title = document.getElementById('title');
const tafsif = document.getElementById('tafsif');
const load = document.getElementById('load');

load.style.display = 'flex';
const backendUrl = 'https://bookzone-backend.onrender.com/api';
async function getMyBooks() {
  const res = await fetch(backendUrl + '/books/my-books', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();
  console.log(data);
  if (data.msg === 'jwt expired') {
    alert("Iltimos ro'yxatdan o'ting");
    location.href = 'http://127.0.0.1:5500/html/sign-in.html';
  }

  const dateLoop = data.payload.docs;

  for (const key in dateLoop) {
    let imgUrl = '';
    if (!dateLoop[key].imageLink) {
      imgUrl = 'https://static.thenounproject.com/png/1077596-200.png';
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
    if (data.success === true) {
      load.style.display = 'none';
      for (let i = 0; i < 10; i++) {
        books.innerHTML += `<div id="booksBox" class="books_box">
              <img id="img" src="${imgUrl}" alt="Books 1" />
              <h3 id="title" class="books_box_h3" style="text-transform: uppercase">
                ${dateLoop[key].title}
              </h3>
              <div class="reyting">
              <div id='startsDiv' class="startsDiv">
                ${getStars(dateLoop[key].rate)}
                </div>
                <p id="tafsif">${dateLoop[key].description}</p>
              </div>
            </div>
          </div>`;
      }
    } else {
      alert("Kitob qo'shilmadi");
    }
  }
}

getMyBooks();

async function getUserProfileImg() {
  const res = await fetch(backendUrl + '/users/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();
  console.log(data);
}
getUserProfileImg();

function booksMenu(e) {
  e.style.color = '#c9ac8c';
}
