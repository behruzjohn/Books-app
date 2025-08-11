function toggleMenu() {
  document.querySelector('nav ul').classList.toggle('active');
}
function muallif(e) {
  let ret = document.getElementById('container');
  const main = document.getElementById('main');
  ret.style.display = 'none';
  main.style.display = 'block';
}
function mual(e) {
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

async function getBookById() {
  const backendUrl = 'https://bookzone-backend.onrender.com/api';
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
  console.log(data);
  const item = data.payload.book;

  console.log(item);

  let userCountry = '';
  for (const key in item) {
    userCountry = item.country;
    // console.log(item);

    let resImg = '';
    if (item.image && item.image.url) {
      resImg = item.image.url;
    } else {
      resImg =
        'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
    }

    mainBook.innerHTML = `<div class="cover">
              <img src="https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg" alt="" />
            </div>
            <div class="details">
              <h2>${item.title}</h2>
              <div class='pBox'>
              <div class='info'>
              <p style="color:grey">Sahifalar soni:<b id='b' style="color:white">${
                item.pages
              } ta</b></p>
              </div>
              <div class='info'>
              <p style="color:grey">Chop etilgan: <b id='b' style="color:white"> ${item.updatedAt.slice(
                0,
                7
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
              <div class='icons'>
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
             
              <button class="add-btn">Javonga qo'shish <img src="/asign/image/add-icon.svg"/></button>
              
            </div>`;
    //
  }
  let authorInfo = item.author;
  let socialMedia = '';
  let phoneNum = '';

  for (const key in authorInfo) {
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
    console.log(authorInfo.firstName);

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
    }

    mualliff.innerHTML = `<div class="rasmi">
    <img src="${resImg}" alt="Muallif rasmi" />
    </div>
    <div class="ismi">
    <h1 class="iqtibos">${authorInfo.firstName} ${authorInfo.lastName}</h1>
    <p class="iqtibosim">
    ${authorInfo.firstName} ${
      authorInfo.lastName
    } ${authorInfo.date_of_birth.slice(
      0,
      5
    )} yil ${userCountry}da tug'ulgan.Uzbekistonda yashaydi.Telefon raqami: ${phoneNum}.<br/>  
    <ul style="display: flex; gap: 5px; list-style: none;">

    <span id="social" >Instagram accaunti:<li ><a id='a' style="color: blue; text-decoration:none" href='${socialMedia}'</a>Instagram</li></span>
    </ul>
    <span>
    Elektron pochtasi: ${authorInfo.email}
    </span>
    </p>
            </div>`;
  }
}

getBookById();
