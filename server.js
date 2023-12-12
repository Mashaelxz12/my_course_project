const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// middleware للوصول إلى الملفات الثابتة (public)
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// اتصال بقاعدة البيانات
mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// تعريف نموذج مثال
const Schema = mongoose.Schema;
const exampleSchema = new Schema({
    name: String,
    age: Number
});

const ExampleModel = mongoose.model('Example', exampleSchema);

// مسار API لجلب بيانات مثال
app.get('/api/examples', async (req, res) => {
    try {
        const examples = await ExampleModel.find();
        res.json(examples);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// مسار لجلب صفحة الرسامين
app.get('/artists', (req, res) => {
    res.sendFile(__dirname + '/artists.html');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
