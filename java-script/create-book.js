const form = document.getElementById('form');
const title = document.getElementById('book-name');
const country = document.getElementById('country');
const language = document.getElementById('lang');
const pages = document.getElementById('pages');
const price = document.getElementById('price');
const rate = document.getElementById('rate');
const description = document.getElementById('description');
const load = document.getElementById('load');
const bookType = document.getElementById('book-type');

const file = document.getElementById('file');
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

function addBook() {
  load.style.display = 'flex';
  class getBookInfo {
    constructor(
      title,
      country,
      image,
      language,
      description,
      pages,
      price,
      category,
      rate
    ) {
      this.title = title;
      this.country = country;
      this.image = image;
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
    imageId,
    language.value,
    description.value,
    pages.value,
    price.value,
    bookType.value,
    rate.value
  );

  const getBooks = async () => {
    if (localStorage.getItem('token')) {
      try {
        const books = await fetch(backendUrl + '/books/', {
          method: 'POST',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then((val) => val?.json())
          .then((val) => val);

        if (books.success === true) {
          load.style.display = 'none';
          alert("Kitob muvaoqiyatli qo'shildi✅");
          location.assign('/html/user-page.html');
        } else {
          location.assign('/html/sign-in.html');
        }
      } catch (error) {
        alert(`Xatolik:${error}`);
      }
    } else {
      alert('Please get token!');
    }
  };

  getBooks();
}

function showFile() {
  const showBtn = document.getElementById('showBtn');
  file.style.display = 'block';
  showBtn.style.display = 'none';
}
