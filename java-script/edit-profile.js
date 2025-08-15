let inp = document.getElementById("inp")
let inpu = document.getElementById("inpu")
let place = document.getElementById("place")
let lang = document.getElementById("lang")
let img = document.getElementById("img")
let phoneNume = document.getElementById("phone-number")


function saveBut() {
    class getBookInfo {
        constructor(
            firstName,
            lastName,
            lang,
            // image,
            phone,
            address,

        ) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.lang = lang;
            // this.image = image;
            this.phone = phone;
            this.address = address;

        }
    }

    const form = new getBookInfo(
        inp.value,
        inpu.value,
        lang.value,
        // img.value,
        phoneNume.value,
        place.value,

    );
    console.log(localStorage.getItem('token'));

    async function editBook() {
        const backendUrl = 'https://bookzone-backend.onrender.com/api';
        const res = await fetch(`${backendUrl}/users/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();
    }
    editBook()
}