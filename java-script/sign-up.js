const backendUrl = 'http://localhost:8000/api';
let selectedFile;

document.getElementById('registerBtn').addEventListener('click', checkUser);
document.getElementById('file').addEventListener('click', handleFileChange);
document.getElementById('showBtn').addEventListener('click', showFile);

async function checkUser() {
  const load = document.getElementById('load');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const birth = document.getElementById('birth');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');

  const isPasswordCorrect = checkPassword(password, password2);
  const isNameTrue = checkName(firstName, lastName);
  const isNumber = checkPhone(phone);

  const checkRole = document.querySelectorAll("input[name='role']");
  let role = null;
  for (const key of checkRole) {
    if (key.checked) {
      role = key.value;
      return false;
    }
  }

  if (!role) {
    alert('Rolni tanlang');
    return;
  }

  if (isPasswordCorrect && isNameTrue && isNumber) {
    class GetUser {
      constructor(firstName, lastName, email, phone, role, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.password = password;
      }
    }
    const user = new GetUser(
      firstName.value,
      lastName.value,
      email.value,
      phone.value,
      role,
      password.value
    );

    load.style.display = 'flex';

    try {
      const res = await fetch(backendUrl + '/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, date_of_birth: birth.value }),
      });

      const data = await res.json();
      if (data.success) {
        location.assign('/html/sign-in.html');
      }
      if (data.token) {
        load.style.display = 'none';
        localStorage.setItem('token', data.token);
        alert(`Ro'yxatdan o'tdingiz✅`);
      }
    } catch (err) {
      console.error('Xatolik:', err);
    }
  }
}

function checkPhone(phone) {
  if (phone.value.length > 15 || isNaN(phone.value)) {
    phone.style.border = '3px solid red';
    phone.style.color = 'red';
    return false;
  }
  return true;
}

function checkName(firstName, lastName) {
  if (firstName.value === '' || lastName.value === '') {
    firstName.style.border = '1px solid red';
    lastName.style.border = '1px solid red';
    return false;
  }
  return true;
}

function checkPassword(password, confirmPassword) {
  if (password.value && confirmPassword.value) {
    if (password.value !== confirmPassword.value) {
      alert('Parollingiz xato');
      confirmPassword.style.border = '1px solid red';
      return false;
    } else {
      confirmPassword.style.border = 'none';
    }
    return true;
  } else {
    alert('Parolni kiritishingiz zarur!');
    return false;
  }
}

function showFile() {
  const file = document.getElementById('file');
  const showBtn = document.getElementById('showBtn');

  file.style.display = 'block';
  showBtn.style.display = 'none';
}

function handleFileChange(e) {
  const file = e.files[0];
  if (file) {
    selectedFile = file;
  }
}
