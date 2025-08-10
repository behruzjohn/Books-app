const form = document.getElementById('form');
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
let selectedFile = '';
let imageId = null;

function checkTextInputValue(value) {
  if (value) {
    return true;
  } else {
    return false;
  }
}

const backendUrl = 'https://bookzone-backend.onrender.com/api';

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
    if (data.msg === 'jwt expired') {
      alert("Iltimos ro'yxatdan o'ting");
      location.href = 'http://127.0.0.1:5500/html/sign-in.html';
    }
  } catch (err) {
    console.log('Xatolik', err);
  }
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

        console.log(books.success);
        if (books.success === true) {
          load.style.display = 'none';
          alert("Kitob muvaoqiyatli qo'shildi✅");
          location.href = 'http://127.0.0.1:5500/html/user-page.html';
        } else {
          // alert('Nmadir Xato ketti!');
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

//

const actors = [
  {
    name: 'Abdulla Avloniy',
    img: 'https://oyina.uz/storage/generations/April2023/kVsk4nFtlHXwqXZ8uO7T.png',
  },
  {
    name: 'Sharof Rashidov',
    img: 'https://upload.wikimedia.org/wikipedia/uz/e/e1/Sharof_Rashidov.jpg',
  },
  {
    name: 'Zulfiya Isroilova',
    img: 'https://bilimlar.uz/wp-content/uploads/2021/02/zulfiya-640x400-1.jpg',
  },
  {
    name: 'Hamid Olimjon',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPa5Ib9tgouVnIIxep7M7dRpTWBw4Ljrg47A&s',
  },
  {
    name: 'Erkin Vohidov',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaOl7phn2CQ3QFEVI08EXhCiAw-etI3adbIWSu5J7YpCLwqa76ZNnnU4l1oTUdF7CT4LoYihiwHn7PS35sYYnlrA',
  },
  {
    name: 'Abdulla Qodiriy',
    img: 'Abdulla Qodiriy',
  },
  {
    name: 'Gʻafur Gʻulom',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQ0z50N9XOFoeJkzq2cWoFcWBhFpxEolyxAcdcK7VQ3SSQWfe',
  },
  {
    name: 'Usmon Nosir',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ZxZVTG3ZYuxGbfN6RPHTjWhZqT28j5_yvm7wc-s_6SdV4thxFaFgW1QOEwb-ffU4CeENxgv5AvZqYogcWQ6xpQ',
  },
  {
    name: 'Muhammad Yusuf',
    img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQbnI3F6fbzqgTjSA8xxjQ1QViIrxwA_enp8B_EPsVxtR2xQte2HnYZL0Rhoc3IvdLVtaCLOKWZKo-gAiaaEAnv5A',
  },
  {
    name: 'Ibrohim Haqqul',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpRjIDsUAPPgBUjIm-7Bki1Zl6zNCRD3knDw&s',
  },
  {
    name: 'Tohir Malik',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMgxW4gPPeoequoM2fvvIFYjXHsD_Tf_Y_aQ&s',
  },
  {
    name: 'Choʻlpon',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Abdulhamid_Cholpon.jpg',
  },
  {
    name: 'Abu Rayhon Beruniy',
    img: 'https://arboblar.uz/upload/people/a/42222a317a775e40546db8cb9ba7f0380329.jpg',
  },
  {
    name: 'Al-Xorazmiy',
    img: 'https://olympic.uz/uploads/news/a619861b1770f548e53d2a7237848068.jpg',
  },
  {
    name: 'Mirzo Ulugʻbek',
    img: 'https://uzspace.uz/uploads/content/01fFHDU8_sbIING84c1h8nkyRh8SN4kq.jpg',
  },
  {
    name: 'Alisher Navoiy',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkgiAJlcqsf4-BLmhaANkd20g2YlfCRuWdkA&s',
  },
  {
    name: 'Zahiriddin Muhammad Bobur',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Zahiriddin_Muhammad_Bobur.jpg',
  },
  {
    name: 'Ibn Sino (Avicenna)',
    img: 'https://arboblar.uz/upload/people/a/8f1768c323e4808ca8b040ac093d46910329.jpg',
  },
  {
    name: 'Imom Buxoriy',
    img: 'https://old.allomalar.uz/media/images/galareya/%D0%90%D0%BB%D0%B8%D2%9B%D1%83%D0%BB%D0%BE%D0%B2_%D0%90._%D2%9A%D0%BE%D1%81%D0%B8%D0%BC%D0%BE%D0%B2_%D0%A5.%D0%91%D1%83%D1%85%D0%BE%D1%80%D0%B8%D0%B9.jpg',
  },

  {
    name: 'Islom Karimov',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Islam_Karimov_%28cropped%29.jpg',
  },
  {
    name: 'Abdugʻafur Qodirov',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Munavvar_qori_Abdurashidxonov.jpg',
  },
  {
    name: 'Rauf Parfi',
    img: 'https://i.imgur.com/4Ez7CYa.jpg',
  },
  {
    name: 'Muhammad al-Xorazmiy',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh1gDkkWvCnTZtNN-fTQkf0IazUaSbjNVWtQ&s',
  },
  {
    name: 'Ahmad Donish',
    img: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Ahmad_donish.png',
  },
];

// const getAuthors = async () => {
//   const authors = await fetch(backendUrl + '/authors')
//     .then((value) => value?.json())
//     .then((value) => value);

//   console.log(authors);
// };
// getAuthors();

function showFile() {
  const showBtn = document.getElementById('showBtn');
  file.style.display = 'block';
  showBtn.style.display = 'none';
}
