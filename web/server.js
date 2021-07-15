require('dotenv').config();

const fetch = require('node-fetch');
const express = require('express');
const path = require('path');
const app = express()
const axios = require('axios')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('views', './views');
app.use('/static', express.static(path.resolve('static')));
app.set('view engine', 'ejs');
const port = 80

app.get('/', async (req, res) => {
	res.render('index', { page: 'Home', menuId: 'home' });
});

app.get('/verify/github', async (req, res) => {
	res.render('github', { 'client_id': process.env.CLIENT_ID });
});

app.get('/verify/github/process', async (req, res) => {

	const requestToken = req.query.code

	var url = "https://github.com/login/oauth/access_token?client_id=" + process.env.CLIENT_ID + "&client_secret=" + process.env.CLIENT_SECRET + "&code=" + requestToken;

	axios({
		method: 'post',
		url: url,
		headers: {
			accept: 'application/json'
		}
	}).then((response) => {
		access_token = response.data.access_token
		app.set('access_token', access_token);
		res.redirect('/verify/github/success');
	})
})

app.get('/verify/github/success', async (req, res) => {

	var access_token = app.get('access_token');
	app.set('access_token', undefined);

	if (access_token === undefined) {
		res.redirect('/verify/github');
		return;
	}

	axios({
		method: 'get',
		url: `https://api.github.com/user`,
		headers: {
			Authorization: 'token ' + access_token
		}
	}).then((response) => {
		app.set('github_id', response.data.id);
		res.render('github_success');
	})
});

app.post('/verify/github/success', async (req, res) => {

	const discordID = req.body.discordID;

	const githubID = app.get('github_id');
	app.set('github_id', undefined);

	if (githubID === undefined) {
		res.redirect('/verify/github');
		return;
	}

	fetch(process.env.WEBHOOK, {
		"method": "POST",
		"headers": { "Content-Type": "application/json" },
		"body": JSON.stringify({
			"content": "!verify github " + discordID + " " + githubID + " <@!" + discordID + ">"
		})

	}).then(response => { res.render('done'); })
		.catch(err => console.error(err));

});

app.get('*', async (req, res) => {
	res.render('error');
});

app.listen(port, () => console.log(`App listening on port ${port}!`))