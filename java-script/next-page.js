const backendUrl = 'https://bookzone-backend.onrender.com/api';
let authorsId = location.search.slice(4);
async function loadAuthor() {
  const res = await fetch(`${backendUrl}/books/author/${authorsId}`);
  const data = await res.json();

  const authorPayload = data.payload;
  let authorInfo = authorPayload?.docs || [];
  if (authorInfo.length === 0) {
    main.innerHTML = `<div class="undef">
    <h2 class="unde">Muallif haqida ma'lumot topilmadi!</h2>
    </div>`;
    return;
  }
  let popularBook = authorInfo.sort((a, b) => b.views - a.views);
  let popularBookRes = popularBook[0];

  if (!popularBookRes?.author) {
    main.innerHTML = "<h2>Muallif haqida ma'lumot topilmadi</h2>";
    return;
  }
  let author = popularBookRes.author;

  let dead = '';

  main.innerHTML = `
  <img onclick="addId()" class="main_img" src="https://37assets.37signals.com/svn/765-default-avatar.png" alt="O'tkir Aka"/>
  <div class="user_info">
    <div class="user_info_nav">
      <h1 id="user_name" style="text-transform: lowercase" class="user_info_h1">
        ${author.firstName} ${author.lastName}
      </h1>
      <div class="born">
      <div class="born_nav">
      <div class="born-1">
      <p class="born_nav_p">Tavvalud sanasi:</p>
      <h1 id="born" class="born_nav_h1">${author.date_of_birth.slice(
        0,
        10
      )}</h1>
      <p class="born_nav_p">${popularBookRes.country} Uzbekistan</p>
      </div>
      ${
        !author?.date_of_death
          ? ``
          : `<h1 id="born-2" class="born_nav_h1">-</h1>
          <div id="born-2" class="born-2">
            <p id="born-2" class="born_nav_p">O'lgan sanasi:</p>
            <h1 id="died" class="born_nav_h1">${dead}</h1>
            <p class="born_nav_p">${popularBookRes.country}, Uzbekistan</p>
         
          </div>`
      }
        </div>
      </div>
      <h3 id="titleName">${author.firstName} ${author.lastName}ning ${
    authorPayload.totalDocs
  } ga yaqin kitoblari mavjud.
      U ko'proq ${popularBookRes.language} tilida kitoblarni nashr qiladi.
      Uning eng mashhur kitoblaridan biri <a href="book.html?id=${
        popularBookRes?._id
      }" id='titleColor'>${popularBookRes.title}</a> hisoblanadi.
      Chunki uni ${popularBookRes.views} ta odam tomosha qilgan.</h3>
      <h2 id='shoirs_h2'>Kitoblari:</h2>

      <div class="swiper">
        <div class="swiper-wrapper" id="shoirs"></div>

        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>

    </div>
  </div>`;
  const getStars = function (rate) {
    let result = '';
    for (let i = 0; i < rate; i++) {
      result += `<img id='rateImg' src='/asign/image/star (2).svg' alt="star"/>`;
    }
    return result;
  };

  let box = document.getElementById('shoirs');
  for (const book of popularBook) {
    let categoryName =
      book.category.charAt(0).toUpperCase() +
      book.category.slice(1).toLowerCase();

    box.innerHTML += `
    <div class="swiper-slide">
      <div id="booksBox" class="books_box" data-id="${book._id}">
        <img id="img" src="https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg" alt="${
          book.title
        }"/>
        <h3 id="title" class="books_box_h3" style="text-transform: uppercase">${
          book.title
        }</h3>
        <p class="shoirs_nav_box_p">Type: ${categoryName}</p>
        <div class="reyting">
          <div id="startsDiv" class="startsDiv">
            <span>Reyting:</span> ${getStars(book.rate)}
          </div>
          <p id="tafsif">${book.description}</p>
        </div>
      </div>
    </div>
  `;
  }

  document.querySelectorAll('.books_box').forEach((box) => {
    box.addEventListener('click', () => {
      const bookId = box.getAttribute('data-id');
      location.assign(`/html/book.html?id=${bookId}`);
    });
  });

  const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    breakpoints: {
      992: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      480: { slidesPerView: 1 },
    },
  });
}
loadAuthor();
