import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'myappdb',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


// Login Route
app.post('/login', (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return; // Ensure the function ends here
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error logging in', error: err });
      return; // Ensure the function ends here
    }

    if (Array.isArray(results) && results.length > 0) {
      res.status(200).json({ success: true, username });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});



// Remove duplicate declaration
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}


// Configure Multer storage for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
  },
});

// Initialize Multer
const upload = multer({ storage: storage });

app.post('/AdminAddField', upload.single('image'), (req: Request, res: Response): void => {
  //console.log(req.body);
  const { fieldName, contactNumber, fieldLocation, facebookPage} = req.body;
  const image = req.file ? req.file.filename : null; // Get uploaded image filename if present

  if (!fieldName || !contactNumber  || !fieldLocation || !facebookPage) {
    res.status(400).json({ success: false, message: 'All fields except the image are required' });
    return; // Ensure no further code runs
  }

  const query = 'INSERT INTO football_fields (field_name, contact_number, field_location, facebook_page, image) VALUES (?, ?, ?, ?, ?)';

  db.query(query, [fieldName, contactNumber, fieldLocation, facebookPage, image], (err, result) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error saving field', error: err.message });
      return;
    }
    res.status(201).json({ success: true, message: 'Field added successfully' });
  });
});

// Fetch football fields from database
app.get('/getFields', (req: Request, res: Response) => {
  const query = 'SELECT * FROM football_fields';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error fetching fields', error: err });
    } else {
      res.status(200).json({ success: true, fields: results });
    }
  });
});
// DELETE football field endpoint
app.delete('/deleteField/:id', (req: Request, res: Response): void => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ success: false, message: 'Field ID is required' });
    return;
  }

  const query = 'DELETE FROM football_fields WHERE id = ?';

  db.query(query, [id], (err, result: mysql.OkPacket) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error deleting field', error: err.message });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Field not found' });
      return;
    }

    res.status(200).json({ success: true, message: 'Field deleted successfully' });
  });
});



//Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});