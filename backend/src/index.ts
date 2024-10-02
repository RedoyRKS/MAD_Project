import express from 'express';
import cors from 'cors';
import mysql, { RowDataPacket } from 'mysql2';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'myappdb'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// // Booking Endpoint
// app.post('/api/bookings', (req, res) => {
//   const { fieldName, date, time, bkashNumber } = req.body;

//   if (!fieldName || !date || !time || !bkashNumber) {
//     return res.status(400).send('All fields are required');
//   }

//   const query = `INSERT INTO bookings (fieldName, date, time, bkashNumber) VALUES (?, ?, ?, ?)`;

//   db.query(query, [fieldName, date, time, bkashNumber], (err, results) => {
//     if (err) {
//       console.error('Error inserting booking:', err);
//       return res.status(500).send('Error storing booking information');
//     }

//     res.status(201).send('Booking successfully stored');
//   });
// });

// Sample signup endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send('User registered successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Sample login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
    db.query(query, [username, password], (err, results: any) => {
      if (err) {
        return res.status(500).send(err);
      }
  
      // Check if the results array is not empty
      if (Array.isArray(results) && results.length > 0) {
        res.status(200).json({ success: true, username });
      } else {
        res.status(401).json({ success: false });
      }
    });
  });
  
  

