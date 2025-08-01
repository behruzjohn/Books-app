export const backendUrl = 'https://bookzone-backend.onrender.com/api';
let selectedFile;

class GetUser {
  constructor(firstName, lastName, email, phone, role, image, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.image = image;
    this.password = password;
  }
}
function checkPhone(phone) {
  if (phone.value.length > 10) {
    phone.style.border = '3px solid red';
    phone.style.color = 'red';
    return false;
  } else {
    return true;
  }
}
function checkName() {
  if (firstName.value === '' || lastName.value === '') {
    firstName.style.border = '3px solid red';
    lastName.style.border = '3px solid red';
    return false;
  } else {
    return true;
  }
}

function checkPassword(password, confirmPassword) {
  if (password.value.length > 8 || confirmPassword.value.length > 8) {
    alert(`Siz parolni qaytadan to'gri yozing!`);
    confirmPassword.style.border = '3px solid red';
    confirmPassword.style.color = 'red';
    return false;
  } else {
    return true;
  }
}

function showFile() {
  const file = document.getElementById('file');
  const showBtn = document.getElementById('showBtn');

  file.style.display = 'block';
  showBtn.style.display = 'none';
  console.log(file.files);
}

function handleFileChange(e) {
  const file = e.files[0];

  if (file) {
    selectedFile = file;
  }
}

async function auth() {
  const checkRole = document.querySelectorAll(`input[name='role']`);
  let role = null;
  for (const key of checkRole) {
    if (key.checked) {
      role = key.value;
      break;
    }
  }

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const address = document.getElementById('addres');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');

  if (firstName.value && lastName.value === '') {
    alert('Error');
  } else if (isNaN === phone.value) {
    alert('Error');
  } else if (password.value.lenght > 8) {
    alert('Error');
  }

  const isPasswordCorrect = checkPassword(password, password2);
  const isNameTrue = checkName(firstName, lastName);
  const isNumber = checkPhone(phone);
  let imgId = '';
  if (selectedFile) {
    const formData = new FormData();

    formData.append('files', selectedFile);

    console.log(selectedFile);

    const imgUrl = await fetch(backendUrl + '/files/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => res);

    if (imgUrl.payload[0]._id) {
      imgId = imgUrl.payload[0]._id;
    }
  }

  if (isPasswordCorrect && isNameTrue && isNumber) {
    const user = new GetUser(
      firstName.value,
      lastName.value,
      email.value,
      phone.value,
      role,
      imgId,
      password.value
    );

    const user3 = await fetch(backendUrl + '/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, date_of_birth: new Date() }),
    }).then((res) => res.json());
    console.log(user3);
    localStorage.setItem('token', user3);
  }
}
