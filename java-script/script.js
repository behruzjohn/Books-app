import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

const backendUrl = 'https://bookzone-backend.onrender.com/api';
const res = await fetch(backendUrl + '/authors/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

const data = await res.json();
if (data.msg === 'jwt expired') {
  alert("Iltimos ro'yxatdan o'ting");
  location.href = 'http://127.0.0.1:5500/html/sign-in.html';
}

const user_name = document.getElementById('user_name');
const born = document.getElementById('born');
const died = document.getElementById('died');

let usersBorn = data.payload[0].date_of_birth;
let userDeath = data.payload[0].date_of_death;
let firstName = data.payload[0].firstName;
let lastName = data.payload[0].lastName;
born.innerText = usersBorn.slice(0, 7);
console.log(data);

user_name.innerText = `${firstName} ${lastName}`;
if (userDeath !== null) {
  died.innerText = userDeath.slice(0, 7);
} else {
  died.innerText = 'Xali bu odam tirik!';
}

function addId() {
  console.log('hey');

  location.search = '?343833238';
}

const getFullName = (firstName, lastName) => {
  return `${firstName} ${lastName}`;
};

//

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'vertical',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});
