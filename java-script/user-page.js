const booksBox = document.getElementById('booksBox');
const books = document.getElementById('books');
const img = document.getElementById('img');
const title = document.getElementById('title');
const tafsif = document.getElementById('tafsif');
const load = document.getElementById('load');

const backendUrl = 'https://bookzone-backend.onrender.com/api';
async function getMyBooks() {
  load.style.display = 'flex';

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
    return;
  }

  const dateLoop = data.payload.docs;

  if (data.success) {
    books.innerHTML = '';

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

      books.innerHTML += `
        <div id="booksBox" class="books_box">
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
      `;
    }
  }

  load.style.display = 'none'; // faqat hammasi tugagach yo‘qoladi
}

getMyBooks();
const userBan = document.getElementById('user-banner');
async function getUserProfileImg() {
  const res = await fetch(backendUrl + '/users/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();
  let phoneNum = '';

  let myInfo = data.user;
  if (myInfo.phone.includes('+998')) {
    phoneNum = myInfo.phone;
  } else {
    phoneNum = `+998${myInfo.phone}`;
  }
  console.log(myInfo);
  let resImg = `/asign/image/man-user-circle-icon.png`;
  userBan.innerHTML = `
  <div class="user-banner_nav">
          <div class="imgages">
            <img src="${resImg}" alt="User image" />
            <h3 class="imgages_h3">${
              myInfo.role.charAt(0).toUpperCase() +
              myInfo.role.slice(1).toLowerCase()
            }</h3>
            <p class="imgages_p">${phoneNum}</p>
          </div>
          <div class="user-banner_info">
            <h1>${myInfo.firstName} ${myInfo.lastName}</h1>
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

getUserProfileImg();

function booksMenu(e) {
  e.style.color = '#c9ac8c';
}
