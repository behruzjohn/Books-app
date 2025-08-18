const muallifInfo = document.getElementById('muallifInfo');
const muallifTaqriz = document.getElementById('muallifTaqriz');
muallifInfo.style.color = '#c9ac8c';
function toggleMenu() {
  document.querySelector('nav ul').classList.toggle('active');
}
function muallif(e) {
  muallifInfo.style.color = 'white';
  muallifTaqriz.style.color = '#c9ac8c';
  let ret = document.getElementById('container');
  const main = document.getElementById('main');
  ret.style.display = 'none';
  main.style.display = 'block';
}
function mual(e) {
  muallifInfo.style.color = '#c9ac8c';
  muallifTaqriz.style.color = 'white';
  const ret = document.getElementById('container');
  const main = document.getElementById('main');
  main.style.display = 'none';
  ret.style.display = 'block';
}

//
const load = document.getElementById('load');
const mainBook = document.getElementById('main-book');
const mualliff = document.getElementById('muallif');
load.style.display = 'flex';
let dataComment = '';
let getCoomet = '';
async function getBookById() {
  const backendUrl = 'http://localhost:8000/api';
  const res = await fetch(
    backendUrl + `/books/${location.search.slice(4, 2000000)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();

  load.style.display = 'none';
  if (data.success) {
    load.style.display = 'none';
  }

  dataComment = data;
  const item = data.payload.book;

  let userIds = item.author._id;
  let coments = item.comments;
  for (let i = 0; i < coments.length; i++) {
    let user = coments[i].user;

    const allBoxComent = document.getElementById('allBoxComent');
    allBoxComent.innerHTML += `
    <div id="commentss" data-id='${user._id}' class="comments_nav">
    <div class="comBox">
    <img
    class="addBox_img"
    src="/asign/image/man-user-circle-icon.png"
    alt="Muallif rasmi"
    />
    <div class="timer">
    <div class="time">
    <h3>${user.firstName} ${user.lastName}</h3>
    <p class="comments_p">
    ${coments[i].text}
    </p>
    
    </div>
                  </div>
                  </div>
                  </div>
                  `;
  }
  document.querySelectorAll('.comments_nav').forEach((commentBox) => {
    commentBox.addEventListener('click', () => {
      const userId = commentBox.getAttribute('data-id');
      location.href = `http://127.0.0.1:5500/html/index.html?id=${userId}`;
    });
  });

  let userCountry = '';
  for (const key in item) {
    userCountry = item.country;

    let resImg = '';
    if (item.image && item.image.url) {
      resImg = item.image.url;
    } else {
      resImg =
        'https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg';
    }

    mainBook.innerHTML = `<div class="cover">
    <img src="${resImg}" alt="" />
    </div>
    <div class="details">
    <div class="titleBox">
    <h2>${item.title}</h2>
    <img
    id="editIcon"
    onclick="editIcon(this)"
    src="/asign/image/pen-line.svg"
    alt=""
    />
              </div>
              <div class='pBox'>
              <div class='info'>
    <p style="color:grey">Sahifalar soni:<b id='b' style="color:white">${
      item.pages
    } ta</b></p>
    </div>
    <div class='info'>
    <p style="color:grey">Chop etilgan: <b id='b' style="color:white"> ${item.updatedAt.slice(
      0,
      10
    )}</b></p>
    </div>
    <div class='info'>
    <p style="color:grey"> Janri: <b id='b' style="color:white"> ${
      item.category.charAt(0).toUpperCase() +
      item.category.slice(1).toLowerCase()
    }</b></p>
    </div>
    <div class='info'>
    <p style="color:grey">Ko'rishlar soni: <b id='b' style="color:white"> ${
      item.views
    }</b></p>
    </div>
    </div>
    
    <p class="desc">
    ${item.description}
    </p>
    <div class='boxIc'>
    <div class="boxIc_img">
    <img
    class="imoje"
    src="/asign/image/Frame (1).png"
    alt="Ulashish"
    />
    
    <img
    class="imoje"
    src="/asign/image/Frame (2).png"
    alt="Ulashish"
    />
    </div>
    
    <button id="addShelf" class="add-btn">Javonga qo'shish <img src="/asign/image/add-icon.svg"/></button>
    </div>
    </div>`;
    //
    const editIcon = document.getElementById('editIcon');
    if (userIds !== localStorage.getItem('userId')) {
      editIcon.style.display = 'none';
      localStorage.setItem('currentBookId', item._id);
    } else {
      editIcon.style.display = 'flex';
    }
    editIcon.addEventListener('click', () => {
      const bookId = location.search.slice(4);

      location.href = `http://127.0.0.1:5500/html/edit-book.html?id=${bookId}`;
    });
  }
  async function addShelfBook() {
    const body = JSON.stringify({
      bookId: location.search.slice(4),
    });
    const res = await fetch(backendUrl + '/users/shelf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body,
    });

    const data = await res.json();

    if (data.success) {
      alert(`Kitob muvofoqiyatli javoningizga qo'shildi✅`);
    }
  }
  const addShelf = document.getElementById('addShelf');
  addShelf.addEventListener('click', () => {
    addShelfBook();
  });

  let authorInfo = item.author;
  let socialMedia = '';
  let phoneNum = '';
  for (const key in authorInfo) {
    userName = authorInfo.firstName;
    lastName = authorInfo.lastName;
    if (authorInfo.phone.slice(0, 4) === '+998') {
      phoneNum = authorInfo.phone;
    } else {
      phoneNum = '+998' + authorInfo.phone;
    }
    let resImg = '';
    if (authorInfo.image) {
      resImg = authorInfo.image?.url;
    } else {
      resImg = '/asign/image/man-user-circle-icon.png';
    }

    mualliff.innerHTML = `
<div class="rasmi">
  <img src="${resImg}" alt="Muallif rasmi" />
</div>
<div class="ismi">
  <h1 class="iqtibos">${authorInfo.firstName} ${authorInfo.lastName}</h1>
  <p class="iqtibosim">
    ${authorInfo.firstName} ${
      authorInfo.lastName
    } ${authorInfo.date_of_birth.slice(0, 5)} yil ${userCountry}da tug'ulgan. 
    Uzbekistonda yashaydi. Telefon raqami: ${phoneNum}.<br/>  

    <ul id="socialMed" style="display: flex; gap: 10px; list-style: none; padding: 0; margin: 0; align-items: center;">
      <li>Instagram accaunt: <a id="a" style="color: blue; text-decoration:none" href="${socialMedia}">Instagram</a></li>
      </ul>
      <li id="socLi">Elektron pochtasi: ${authorInfo.email}</li>
  </p>
</div>`;
  }
  mualliff.addEventListener('click', () => {
    location.href = `http://127.0.0.1:5500/html/index.html?id=${authorInfo._id}`;
  });
  const socialMed = document.getElementById('socialMed');
  if (
    authorInfo.firstName === 'Behruz' ||
    authorInfo.firstName === 'Behruzjon' ||
    authorInfo.firstName === 'behruz' ||
    authorInfo.firstName === 'behruzjon'
  ) {
    socialMedia = 'https://www.instagram.com/behruzjon.web/';
  } else if (
    authorInfo.firstName === 'Muhammad' ||
    authorInfo.firstName === 'muhammad'
  ) {
    socialMedia = 'https://www.instagram.com/erkinov.web/';
  } else {
    socialMed.style.display = 'none';
  }
}
const userBan = document.getElementById('user-banner');
async function getName() {
  const backendUrl = 'http://localhost:8000/api';
  const res = await fetch(backendUrl + '/users/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();

  let myInfo = data.user;
  localStorage.setItem('firstName', myInfo.firstName);
  localStorage.setItem('lastName', myInfo.lastName);
  if (data.msg === 'jwt expired') {
    alert("Iltimos ro'yxatdan o'ting");
    location.href = 'http://127.0.0.1:5500/html/sign-in.html';
    return;
  }

  const addBox = document.getElementById('addBox');
  addBox.innerHTML = `
  <img
              class="addBox_img"
              src="/asign/image/man-user-circle-icon.png"
              alt="Muallif rasmi"
            />
            <div class="addBox_nav">
              <h3 class="addBox_nav_h3">
                ${myInfo.firstName} ${myInfo.lastName}
                <span class="addBox_nav_span"
                  >o’z taqrizingiz bilan ulashing</span
                >
              </h3>
              <div class="input_div">
                <input id="addBox_input" class="addBox_input" type="text" />
                <button onclick="add()" class="addBox_btn">Sharx Yozish</button>
              </div>
            </div>
  `;
}
getName();

getBookById();

function add() {
  const addBox_input = document.getElementById('addBox_input');

  if (!addBox_input.value) {
    addBox_input.style.border = '3px solid red';
    return;
  }

  async function addCommit() {
    load.style.display = 'flex';
    const backendUrl = 'http://localhost:8000/api';
    const res = await fetch(backendUrl + `/books/comment`, {
      method: 'POST',
      body: JSON.stringify({
        text: addBox_input.value,
        bookId: location.search.slice(4),
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const data = await res.json();

    if (data.success) {
      addBox_input.value = '';
      load.style.display = 'none';

      const allBoxComent = document.getElementById('allBoxComent');
      const user = data.payload.user;
      const text = data.payload.text;

      allBoxComent.innerHTML += `
    <div id="commentss" data-id='${user._id}' class="comments_nav">
      <div class="comBox">
        <img class="addBox_img"
             src="/asign/image/man-user-circle-icon.png"
             alt="Muallif rasmi" />
        <div class="timer">
          <div class="time">
            <h3>${localStorage.getItem('firstName')} ${localStorage.getItem(
        'lastName'
      )}</h3>
            <p class="comments_p">${text}</p>
          </div>
        </div>
      </div>
    </div>
  `;

      const newComment = allBoxComent.lastElementChild;
      newComment.addEventListener('click', () => {
        const userId = newComment.getAttribute('data-id');
        location.href = `http://127.0.0.1:5500/html/index.html?id=${userId}`;
      });
    }
  }

  addCommit();
}
