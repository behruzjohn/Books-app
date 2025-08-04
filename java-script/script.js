const backendUrl = 'https://bookzone-backend.onrender.com/api';
const res = await fetch(backendUrl + '/books/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  // GET metodida `body` bo‘lmaydi
});

const data = await res.json();
console.log(data);
