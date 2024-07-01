const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path'); 
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();
const { User, Contact, CustomOrder } = require('./config');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart'); 

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use('/api', productRoutes);
app.use('/api/cart', cartRoutes);

// Middleware to set CORS headers for all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '1800');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
  next();
});

app.post('/Register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Registration failed' });
  }
});

app.post('/Login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ name: user.name, email: user.email }, 'secretKey');
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Login failed' });
  }
});
app.get('/login', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    const decoded = jwt.verify(token, 'secretKey');
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
});
app.post('/Contact', async (req, res) => {
  const { nameC, emailC, message } = req.body;
  try {
    const contactMessage = new Contact({ nameC, emailC, message });
    await contactMessage.save();
    res.status(201).send({ message: 'Message sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Failed to send message' });
  }
});

const imageDir = path.join(__dirname, './public/assets/');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// API route for handling form submission
app.post('/', upload.single('image'), async (req, res) => {
  const { nameO, emailO, phoneO, description } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const customOrderMessage = new CustomOrder({ nameO, emailO, phoneO, description, image });
    await customOrderMessage.save();
    res.status(201).send({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to send message' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
