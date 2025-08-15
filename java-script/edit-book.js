const title = document.getElementById('book-name');
const country = document.getElementById('country');
const language = document.getElementById('inputs_ss');
const pages = document.getElementById('pages');
const price = document.getElementById('price');
const rate = document.getElementById('rate');
const description = document.getElementById('description');
const load = document.getElementById('load');
const bookType = document.getElementById('book-type');

const file = document.getElementById('file');

async function getBookById() {
  const backendUrl = 'http://localhost:8000/api';
  const res = await fetch(backendUrl + `/books/${location.search.slice(4)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();
  for (const key in data) {
    let item = data.payload.book;
    if (item.description === '') {
      description.value = '';
    } else {
      description.value = item.description;
    }
    console.log(item);
    language.value = item.language;
    bookType.value = item.category;
    pages.value = item.pages;
    price.value = item.price;
    rate.value = item.rate;
    title.value = item.title;
    country.value = item.country;
    file.value = '';
  }
}

const showBtn = document.getElementById('showBtn');
showBtn.style.display = 'none';
file.style.display = 'none';

getBookById();

function changeInfo() {
  load.style.display = 'flex';
  class getBookInfo {
    constructor(
      title,
      country,
      language,
      description,
      pages,
      price,
      category,
      rate
    ) {
      this.title = title;
      this.country = country;
      this.language = language;
      this.description = description;
      this.pages = pages;
      this.price = price;
      this.category = category;
      this.rate = rate;
    }
  }

  const form = new getBookInfo(
    title.value,
    country.value,
    language.value,
    description.value,
    pages.value,
    price.value,
    bookType.value,
    rate.value
  );
  async function editBook() {
    const backendUrl = 'http://localhost:8000/api';
    const res = await fetch(`${backendUrl}/books/${location.search.slice(4)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log(data);
    if (data.success) {
      load.style.display = 'none';
      alert("Kitob muvafoqiyatli qo'shildi✅");
    }
  }

  editBook();
}
