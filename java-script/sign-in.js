async function saveUserInfo() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
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
  }).then((res) => res.json());

  let token = user2.token;
  localStorage.setItem('token', token);
  localStorage.setItem('user', user2);
}
