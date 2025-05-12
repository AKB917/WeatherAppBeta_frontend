if (typeof URLBACKEND === 'undefined') {
	var URLBACKEND = window.env.URL_BACKEND;
}
console.log("API URL:", URLBACKEND);

const registerBtn = document.querySelector('#register');
if (registerBtn) {
	registerBtn.addEventListener('click', function () {
		const name = document.querySelector('#registerName')?.value;
		const email = document.querySelector('#registerEmail')?.value;
		const password = document.querySelector('#registerPassword')?.value;

		if (!name || !email || !password) return alert("Remplir tous les champs");

		fetch(`${URLBACKEND}/users/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password }),
		})
			.then(res => res.json())
			.then(data => {
				if (data.result) {
					localStorage.setItem('user', JSON.stringify(data.User)); // attention à la majuscule
					window.location.assign('index.html');
				} else {
					alert(data.error);
				}
			});
	});
}

const connectionBtn = document.querySelector('#connection');
if (connectionBtn) {
	connectionBtn.addEventListener('click', function () {
		const email = document.querySelector('#connectionEmail')?.value;
		const password = document.querySelector('#connectionPassword')?.value;

		if (!email || !password) return alert("Remplir tous les champs");

		fetch(`${URLBACKEND}/users/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
			.then(res => res.json())
			.then(data => {
				if (data.result) {
					localStorage.setItem('user', JSON.stringify(data.user));
					window.location.assign('index.html');
				} else {
					alert(data.error);
				}
			});
	});
}
