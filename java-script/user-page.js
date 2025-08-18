const booksBox = document.getElementById('booksBox');
const books = document.getElementById('books');
const img = document.getElementById('img');
const title = document.getElementById('title');
const tafsif = document.getElementById('tafsif');
const load = document.getElementById('load');
const addBookid = document.getElementById('addBookid');
const shelfs = document.getElementById('shelfs');
const myCreates = document.getElementById('myCreates');
const profileBox = document.getElementById('profileBox');
const logOut = document.getElementById('logOut');
const logOutBox = document.getElementById('logOutBox');
addBookid.style.display = 'none';

logOutBox.addEventListener('click', () => {
  location.assign('/html/sign-in.html');
});

let count = 0;
profileBox.addEventListener('click', () => {
  logOut.classList.toggle('active');
  count++;
  if (count % 2 === 1) {
    logOut.style.display = 'flex';
    logOut.style.flexDirection = 'column';
  } else {
    logOut.style.display = 'none';
  }
});

const backendUrl = 'http://localhost:8000/api';
window.addEventListener('DOMContentLoaded', () => {
  const myCreatesBtn = document.getElementById('myCreates');
  booksMenu(myCreatesBtn);
});
async function booksMenu(e) {
  e.style.color = '#c9ac8c';
  shelfs.style.color = 'white';
  load.style.display = 'flex';

  const res = await fetch(backendUrl + '/books/my-books', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();

  const dateLoop = data.payload.docs;

  if (data.success) {
    load.style.display = 'none';
    if (dateLoop.length === 0) {
      books.innerHTML = `<h1 class="unde">Siz yaratgan kitoblar mavjud emas!</h1>`;
    } else {
      books.innerHTML = '';
      let dataId = '';

      for (const key in dateLoop) {
        let imgUrl = '';
        if (!dateLoop[key].imageLink) {
          imgUrl =
            'https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg';
        } else {
          imgUrl = `http://localhost:8000/api/${dateLoop[key].imageLink}`;
        }

        const getStars = (rate) => {
          let result = '';
          for (let i = 0; i < rate; i++) {
            result += `<img id='rateImg' src='/asign/image/star (2).svg' id="starts"/>`;
          }
          return result;
        };

        books.innerHTML += `
      <div id="booksBox" data-id="${dateLoop[key]._id}" class="books_box">
        <img src="${imgUrl}" alt="Books 1" />
        <h3 class="books_box_h3" style="text-transform: uppercase">
          ${dateLoop[key].title}
        </h3>
        <div class="reyting">
          <div class="startsDiv">
            ${getStars(dateLoop[key].rate)}
          </div>
          <p class="books_box-category">${dateLoop[key].category}</p>
        </div>
      </div>
    `;
      }
    }
  }

  document.querySelectorAll('.books_box').forEach((box) => {
    box.addEventListener('click', () => {
      const id = box.getAttribute('data-id');
      location.assign(`/html/book.html?id=${id}`);
    });
  });
}

const phoneFormatter = (phone) => {
  let value = phone.toString();
  if (value.startsWith('+998')) {
    value = value.slice(4);
  }

  const result = value
    .toString()
    .replace(/^(\d{2})(\d{3})(\d{2})(\d{2})$/, '($1) $2-$3-$4');

  return `+998 ${result}`;
};

const userBan = document.getElementById('user-banner');
async function getUserProfileImg() {
  const res = await fetch(backendUrl + '/users/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();

  if (data.msg === 'jwt expired') {
    alert("Iltimos ro'yxatdan o'ting");
    location.assign('/html/sign-in.html');
    return;
  }

  let phoneNum = '';
  let myInfo = data.user;
  if (myInfo.role === 'author') {
    addBookid.style.display = 'flex';
    addBookid.innerText = `Yangi kitob qo'shish`;
  }

  phoneNum = phoneFormatter(myInfo.phone);

  let userId = myInfo._id;

  localStorage.setItem('userId', userId);

  let resImg = `/asign/image/man-user-circle-icon.png`;
  userBan.innerHTML = `
      <div class="user-banner_nav">
      <div class="imgages">
      <img src="${resImg}" alt="User image" />
      <h3 class="imgages_h3">${
        myInfo.role.charAt(0).toUpperCase() + myInfo.role.slice(1).toLowerCase()
      }</h3>
            <p class="imgages_p">${phoneNum}</p>
            </div>
            <div class="user-banner_info">
            <div class="inbox">
            <h1>${myInfo.firstName} ${myInfo.lastName}</h1>
            <img
    id="editIcon"
    onclick="editIcon(this)"
    src="/asign/image/pen-line.svg"
    alt=""
    />
            
            </div>
            <div class="user-banner-info_p">
            <p><strong>Tavallud:</strong> ${myInfo.date_of_birth.slice(
              0,
              7
            )}</p>
            <p><strong>Manzil:</strong> Jizzax</p>
            <p><strong>Email:</strong> ${myInfo.email}</p>
            </div>
            </div>
            </div>`;
}
function editIcon() {
  location.assign('/html/edit-profile.html');
}
getUserProfileImg();

async function myShelfs(e) {
  myCreates.style.color = 'white';
  load.style.display = 'flex';
  books.innerHTML = '';
  const res = await fetch(backendUrl + '/users/shelf/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();

  const dateLoop = data.payload.shelf;

  if (data.msg === 'jwt expired') {
    alert("Iltimos ro'yxatdan o'ting");
    location.assign('/html/sign-in.html');
    return;
  }

  if (data.success) {
    if (dateLoop.length === 0) {
      books.innerHTML = `<h1 class="unde">Sizning javoningiz bo'sh!</h1>`;
    } else {
      load.style.display = 'none';
      e.style.color = '#c9ac8c';
    }
    for (const key in dateLoop) {
      let imgUrl = '';
      if (!dateLoop[key].imageLink) {
        imgUrl =
          'https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg';
      } else {
        imgUrl = `http://localhost:8000/api/${dateLoop[key].imageLink}`;
      }

      const getStars = (rate) => {
        let result = '';
        for (let i = 0; i < rate; i++) {
          result += `<img id='rateImg' src='/asign/image/star (2).svg' id="starts"/>`;
        }
        return result;
      };

      books.innerHTML += `
      <div id="booksBox" data-id="${dateLoop[key]._id}" class="books_box">
        <img src="${imgUrl}" alt="Books 1" />
        <h3 class="books_box_h3" style="text-transform: uppercase">
          ${dateLoop[key].title}
        </h3>
        <div class="reyting">
          <div class="startsDiv">
            ${getStars(dateLoop[key].rate)}
          </div>
          <p id="tafsif">${dateLoop[key].description}</p>
        </div>
      </div>
    `;
    }
    document.querySelectorAll('.books_box').forEach((box) => {
      box.addEventListener('click', () => {
        const id = box.getAttribute('data-id');
        location.assign(`/html/next-page.html?id=${id}`);
      });
    });
  }
}
