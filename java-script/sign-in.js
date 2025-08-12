async function saveUserInfo() {
  const load = document.getElementById('load');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  if (email.value === '' || password.value === '') {
    alert('Iltimos email yoki parolingizni kiriting');
  } else {
    load.style.display = 'flex';
  }

  class GetUser {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
  }
  var user = new GetUser(`${email.value}`, `${password.value}`);
  console.log(user);
  //

  const backendUrl = 'https://bookzone-backend.onrender.com/api';

  const user2 = await fetch(backendUrl + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...user }),
  }).then((res) => {
    return res.json();
  });
  // localStorage.setItem('userInfo', json.stringify(user2.user));

  if (user2.success) {
    load.style.display = 'none';
    location.href = 'http://127.0.0.1:5500/html/user-page.html';
  } else {
    alert('Parol yoki emailingiz xato!');
    load.style.display = 'none';
    return false;
  }

  let token = user2.token;
  localStorage.setItem('token', token);
  localStorage.setItem('user', user2);
}
