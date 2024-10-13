const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 3000;

// إعداد اتصال بقاعدة البيانات
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // استبدلي هذا باسم المستخدم الخاص بك
    password: '123456', // استبدلي هذا بكلمة المرور الخاصة بك
    database: 'recruitment_db' // استبدلي هذا باسم قاعدة البيانات الخاصة بك
});

// الاتصال بقاعدة البيانات
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// استخدام middleware لتحليل JSON
app.use(express.json());

// استخدام مجلد public للملفات الثابتة
app.use(express.static(path.join(__dirname, '../public')));

// إرجاع بيانات المرشحين
app.get('/candidates', (req, res) => {
    connection.query('SELECT name, email, skills, experience, phone FROM candidates', (err, results) => {
        if (err) {
            console.error('Error fetching candidates:', err); // طباعة خطأ في الكونسول
            return res.status(500).send(err);
        }
        res.json(results); // إرجاع البيانات كـ JSON
    });
});

// إرجاع بيانات الوظائف
app.get('/jobs', (req, res) => {
    connection.query('SELECT title, description, requirements FROM jobs', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// إضافة وظيفة جديدة
app.post('/add-job', (req, res) => {
    const { title, description, requirements } = req.body;

    // استعلام لإضافة الوظيفة إلى قاعدة البيانات
    connection.query(
        'INSERT INTO jobs (title, description, requirements) VALUES (?, ?, ?)',
        [title, description, requirements],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Job added successfully!' }); // إرجاع رسالة نجاح
        }
    );
});

// إرجاع ملف HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
