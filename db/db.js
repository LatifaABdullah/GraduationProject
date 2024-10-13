const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // استبدلي هذا باسم المستخدم الخاص بك
  password: '123456', // استبدلي هذا بكلمة المرور الخاصة بك
  database: 'recruitment_db' // استبدلي هذا باسم قاعدة البيانات الخاصة بك
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

const db = require('./db'); // تأكدي من أن هذا السطر موجود في بداية الملف

module.exports = connection;
