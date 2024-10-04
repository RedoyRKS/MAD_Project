import express, {Request, Response} from 'express';
import cors from 'cors';
import mysql, { RowDataPacket } from 'mysql2';
import { isValid, parseISO } from 'date-fns';
import multer from 'multer'; // To handle image upload

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

// Booking Endpoint
app.post('/bookings', (req: Request, res: Response) => {
  const { fieldName, date, time, bkashNumber } = req.body;

  console.log('Received booking data:', req.body);

  // Validate fields
  if (!fieldName || !date || !time || !bkashNumber) {
    res.status(400).send('All fields are required');
    return;
  }

  // Validate date format
  if (!isValid(parseISO(date))) {
    res.status(400).send('Invalid date format. Use YYYY-MM-DD');
    return;
  }

  // Validate time format (use regex or custom validation for time)
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    res.status(400).send('Invalid time format. Use HH:MM');
    return;
  }

  const query = `INSERT INTO bookings (fieldName, date, time, bkashNumber) VALUES (?, ?, ?, ?)`;

  db.query(query, [fieldName, date, time, bkashNumber], (err: mysql.QueryError | null, results: any) => {
    if (err) {
      console.error('Error inserting booking:', err);
      res.status(500).send(`Error storing booking information: ${err.message}`);
      return;
    }

    res.status(201).send('Booking successfully stored');
  });
});

// Define the route for adding new fields
app.post('/add-field', (req, res) => {
  const { name, type, imageUrl } = req.body; // Receive the field data from the request

  if (!name || !type || !imageUrl) {
    res.status(400).send({ success: false, message: 'All fields are required' });
  }

  const sql = `INSERT INTO fields (name, type, imageUrl) VALUES (?, ?, ?)`;

  db.query(sql, [name, type, imageUrl], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send({ success: false, message: 'Failed to add field' });
    }

    res.status(200).send({ success: true, message: 'Field added successfully' });
  });
});

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

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
  

