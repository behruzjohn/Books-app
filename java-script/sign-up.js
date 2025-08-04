const backendUrl = 'https://bookzone-backend.onrender.com/api';
let selectedFile;

document.getElementById('registerBtn').addEventListener('click', checkUser);
document.getElementById('file').addEventListener('click', handleFileChange);
document.getElementById('showBtn').addEventListener('click', showFile);

async function checkUser() {
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
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

    try {
      const res = await fetch(backendUrl + '/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, date_of_birth: new Date() }),
      });

      const data = await res.json();
      console.log(data);

      if (data.token) {
        localStorage.setItem('token', data.token);
        alert(`Ro'yxatdan o'tdingiz`);
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
    firstName.style.border = '3px solid red';
    lastName.style.border = '3px solid red';
    return false;
  }
  return true;
}

function checkPassword(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    alert('Parollingiz xato');
    confirmPassword.style.border = '3px solid red';
    return false;
  } else {
    confirmPassword.style.border = 'none';
  }
  return true;
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
