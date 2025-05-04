const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const fetch = require('node-fetch');

const html = fs.readFileSync(path.resolve(__dirname, './login.html'), 'utf8');
const js = fs.readFileSync(path.resolve(__dirname, './login.js'), 'utf8');

// Create virtual DOM
let virtualPage = new JSDOM(html, { runScripts: 'dangerously' });
const document = virtualPage.window.document;

// Mock fetch
virtualPage.window.fetch = (url, options) => {
	if (!url.includes('localhost:3000') && !url.includes('127.0.0.1:3000')) {
		return fetch(url, options);
	}

	let mockedRes = {};

	if (options && options?.method === 'POST' && (url.endsWith('/users/signup') || url.endsWith('/users/signin'))) {
		mockedRes = { result: true };
	}

	return Promise.resolve({
		json: () => Promise.resolve(mockedRes),
	});
};

// Insert script.js into virtual DOM
const script = document.createElement('script');
script.textContent = js;
document.body.appendChild(script);

const newUser = { name: 'Test-LaCapsule', email: 'test@lacapsule.academy', password: 'test123' };

beforeEach(() => {
	delete virtualPage.window.location;
	virtualPage.window.location = { assign: jest.fn() };
});

it('Sign-up process', async () => { // Sign-up process
	document.querySelector('#registerName').value = newUser.name; // Fill in the name field
	document.querySelector('#registerEmail').value = newUser.email; // Fill in the email field
	document.querySelector('#registerPassword').value = newUser.password; // Fill in the password field
	document.querySelector('#register').click(); // Click the sign-up button

	// Wait 100ms for registration
	await new Promise(r => setTimeout(r, 100)); // Wait for the registration to be established

	expect(virtualPage.window.location.assign).toHaveBeenCalled(); // Check if the page is redirected to index.html
	expect(virtualPage.window.location.assign.mock.lastCall[0]).toContain('index.html'); // Check if the page is redirected to index.html
});

it('Sign-in process', async () => { // Sign-in process
	document.querySelector('#connectionEmail').value = newUser.email;// Fill in the email field
	document.querySelector('#connectionPassword').value = newUser.password; // Fill in the password field
	document.querySelector('#connection').click(); // Click the sign-in button

	// Wait 100ms for connection
	await new Promise(r => setTimeout(r, 100)); // Wait for the connection to be established

	expect(virtualPage.window.location.assign).toHaveBeenCalled(); // Check if the page is redirected to index.html
	expect(virtualPage.window.location.assign.mock.lastCall[0]).toContain('index.html'); // Check if the page is redirected to index.html
});
