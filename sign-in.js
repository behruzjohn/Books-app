function saveUserInfo() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  class GetUser {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }
  }
  var users = new GetUser(`${email.value}`, `${password.value}`);
  console.log(users);
}
