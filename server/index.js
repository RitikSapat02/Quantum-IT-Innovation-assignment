const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

const PORT = 8000;


// Database Connection
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Database Connected")).catch((err)=>console.log("Database Not Connected",err))

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));



app.use('/',authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
});

// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const app = express();
// const PORT = 5000;

// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/new');

// // User model
// const User = mongoose.model('User', {
//   name: String,
//   dob: String,
//   email: String,
//   password: String,
// });

// // Registration API
// app.post('/api/register', async (req, res) => {
//   try {
//     const { name, dob, email, password } = req.body;

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save user to the database
//     const user = new User({ name, dob, email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Login API
// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await User.findOne({ email });

//     // Check if user exists and password is correct
//     if (user && await bcrypt.compare(password, user.password)) {
//       // Create and send JWT token
//       const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
//       res.json({ token, user: { name: user.name, dob: user.dob, email: user.email } });
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
