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
