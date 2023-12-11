const express = require('express');
const app = express();
const port = 3000; // يمكنك تغييره حسب الحاجة

app.use(express.static('public')); // هذا يسمح لك بالوصول إلى الملفات في مجلد public

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
// مسار آخر
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html');
});

// مسار API
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello, this is API data!' });
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// مسار يتفاعل مع بيانات POST
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData);
    res.send('Form submitted successfully!');
});
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const exampleSchema = new Schema({
    name: String,
    age: Number
});

const ExampleModel = mongoose.model('Example', exampleSchema);

// مثال على الاستعلام من قاعدة البيانات
app.get('/get-examples', async (req, res) => {
    const examples = await ExampleModel.find();
    res.json(examples);
});
