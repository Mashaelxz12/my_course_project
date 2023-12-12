const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const exampleSchema = new Schema({
    name: String,
    age: Number
});

const ExampleModel = mongoose.model('Example', exampleSchema);

app.get('/api/examples', async (req, res) => {
    try {
        const examples = await ExampleModel.find();
        res.json(examples);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/artists', (req, res) => {
    // Assuming you have a list of artists, replace the comment with the actual logic to fetch artists from the database
    const artists = /* Logic to fetch artists from the database */;

    res.render('artists', { artists }); // Assuming you have a template engine (like EJS) for rendering HTML with dynamic data
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
