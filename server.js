const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000; 


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/m.db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'فشل الاتصال بقاعدة البيانات'));
db.once('open', () => {
    console.log('تم الاتصال بنجاح بقاعدة البيانات');
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
    username: 'john_doe',
    password: 'securepassword',
});

newUser.save()
    .then((user) => {
        console.log('تمت إضافة مستخدم جديد:', user);
    })
    


User.find({})
    .then((users) => {
        console.log('جميع المستخدمين:', users);
    })
    .catch((error) => {
        console.error('حدث خطأ أثناء حفظ المستخدم:', error);
    });

User.findOne({ username: 'john_doe' })
    .then((user) => {
        console.log('المستخدم المحدد:', user);
    })
    .catch((error) => {
        console.error('حدث خطأ أثناء البحث عن المستخدم:', error);
    });

User.updateOne({ username: 'john_doe' }, { password: 'newpassword' })
    .then((result) => {
        console.log('تم تحديث المستخدم:', result);
    })
    .catch((error) => {
        console.error('حدث خطأ أثناء تحديث المستخدم:', error);
    });

User.deleteOne({ username: 'john_doe' })
    .then((result) => {
        console.log('تم حذف المستخدم:', result);
    })
    .catch((error) => {
        console.error('حدث خطأ أثناء حذف المستخدم:', error);
    });

    app.get('/artists', async (req, res) => {
        try {
            const artists = await User.find();
            res.render('artists', { artists });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    
});
app.get('/login.html', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});


app.listen(port, () => {
    console.log(`الخادم يعمل على http://localhost:${port}`);
});
