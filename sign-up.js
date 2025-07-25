const backendUrl = 'https://bookzone-backend.onrender.com/api';

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

function checkPassword(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    alert(`Siz parolni qaytadan to'gri yozing!`);
    confirmPassword.style.border = '3px solid red';
    confirmPassword.style.color = 'red';
    return false;
  } else {
    confirmPassword.style.border = '3px soli  d green';
    confirmPassword.style.color = 'green';
    return true;
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

  const isPasswordCorrect = checkPassword(password, password2);

  if (isPasswordCorrect) {
    const user = new GetUser(
      firstName.value,
      lastName.value,
      email.value,
      phone.value,
      role,
      password.value
    );

    const response = await fetch(backendUrl + '/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...user, date_of_birth: new Date() }),
    });
    response.then((res) => res.json()).then((res) => console.log(res));
  }
}
