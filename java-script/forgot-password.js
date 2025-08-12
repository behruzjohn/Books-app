async function getUserProfileImg() {
  const backendUrl = 'https://bookzone-backend.onrender.com/api';
  const body = { email: 'baxtiyorovbehruzjon6789@gmail.com' };
  const res = await fetch(`${backendUrl}/auth/reset-password/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);
}
function hrefLogin() {
  location.href = 'http://127.0.0.1:5500/html/sign-in.html';
}

getUserProfileImg();
