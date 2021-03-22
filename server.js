const express = require('express');
const fetch = require('node-fetch')
const app = express();

let url = 'https://xkcd.com/info.0.json';

app.get('/api/latest', (req, res) => {
	fetch(url)
		.then(res => res.json())
		.then(json => {
			res.send(json)
		})
		.catch ((err) => console.log('Error in getlatest: ' + err))
})

app.get('/api/:id', (req, res) => {
	fetch(`https://xkcd.com/${req.params.id}/info.0.json`)
		.then(res => res.json())
		.then(json => {
			res.send(json);
		})
		.catch ((err) => console.log('Error in getComic: ' + err));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});