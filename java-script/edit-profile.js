let inp = document.getElementById('inp');
let inpu = document.getElementById('inpu');
let place = document.getElementById('place');
let lang = document.getElementById('lang');
let img = document.getElementById('img');
const input = document.getElementById('input');
let phoneNume = document.getElementById('phone-number');
const file = document.getElementById('file');
const load = document.getElementById('load');

let selectedFile = '';
let imageId = null;
const backendUrl = 'http://localhost:8000/api';

async function getUserInfo() {
  const res = await fetch(`${backendUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();
  console.log(data.user);

  inp.value = data.user.firstName;
  inpu.value = data.user.lastName;
  phoneNume.value = data.user.phone;
  input.value = data.user.date_of_birth;
  img.setAttribute('src', data?.user?.image?.url);
}

getUserInfo();

async function handleFileChange(e) {
  const files = e?.target?.files;

  selectedFile = files[0];

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
function discard() {
  location.assign('/html/user-page.html');
}
function saveBut() {
  load.style.display = 'flex';
  class getBookInfo {
    constructor(firstName, lastName, phone, image) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.phone = phone;
      this.image = image;
    }
  }

  const form = new getBookInfo(inp.value, inpu.value, phoneNume.value, imageId);

  async function editBook() {
    const res = await fetch(`${backendUrl}/users/`, {
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
      location.assign('/html/user-page.html');
    }
  }
  editBook();
}
