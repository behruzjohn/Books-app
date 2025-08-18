const shoirs = document.getElementById('shoirs');
const load = document.getElementById('load');
const addBookid = document.getElementById('addBookid');
addBookid.style.display = 'none';
async function getAutorInfo() {
  load.style.display = 'flex';
  const backendUrl = 'http://localhost:8000/api';

  const res = await fetch(backendUrl + '/authors/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  let halfResult = data.payload;

  if (data.success) {
    load.style.display = 'none';
  }

  for (const key in halfResult) {
    let resImg = '';
    if (halfResult[key].image && halfResult[key].image.url) {
      resImg = halfResult[key].image.url;
    } else {
      resImg =
        'https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg';
    }

    shoirs.innerHTML += `
          <div id="booksBox" data-id="${halfResult[key]._id}" class="books_box">
           <img src="${resImg}" alt="Books 1" />
            <h3 class="books_box_h3" style="text-transform: uppercase">
              ${halfResult[key].firstName} ${halfResult[key].lastName}
            </h3>
            <div class="reyting">
             <p id="type">Type: <span >Author</span></p>
              <p id="type">Born: <span>${halfResult[key].date_of_birth.slice(
                0,
                10
              )}</span></p>
            </div>
          </div>
        `;
    document.querySelectorAll('.books_box').forEach((box) => {
      box.addEventListener('click', () => {
        const userId = box.getAttribute('data-id');
        location.assign(`/html/next-page.html?id=${userId}`);
      });
    });
  }
}

getAutorInfo();
