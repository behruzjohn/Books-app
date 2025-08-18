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
const showBtn = document.getElementById('showBtn');

let selectedFile = '';
let imageId = null;

function checkTextInputValue(value) {
  if (value) {
    return true;
  } else {
    return false;
  }
}
const backendUrl = 'http://localhost:8000/api';
async function handleFileChange(e) {
  selectedFile = e.target.files[0];
  if (!selectedFile) {
    return;
  }

  const formData = new FormData();
  formData.append('files', selectedFile);

  try {
    const response = await fetch(backendUrl + '/files/', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    imageId = data.payload[0]._id;
  } catch (err) {}
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  addBook();
});
function showFile() {
  const showBtn = document.getElementById('showBtn');
  file.style.display = 'block';
  showBtn.style.display = 'none';
}

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
    language.value = item.language;
    bookType.value = item.category;
    pages.value = item.pages;
    price.value = item.price;
    rate.value = item.rate;
    title.value = item.title;
    country.value = item.country;
  }
}

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
      rate,
      image
    ) {
      this.title = title;
      this.country = country;
      this.language = language;
      this.description = description;
      this.pages = pages;
      this.price = price;
      this.category = category;
      this.rate = rate;
      this.image = image;
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
    rate.value,
    imageId
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

    if (data.success) {
      load.style.display = 'none';
      alert('Kitob muvafoqiyatli yangilandi✅');
      location.href = `http://127.0.0.1:5500/html/book.html${location.search}`;
    }
  }

  editBook();
}
