require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); // For parsing application/json

// Configure MySQL connection

dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}


async function getDbConnection() {
  return await mysql.createConnection(dbConfig);
}

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('An error occurred while connecting to the MySQL server:', err);
    process.exit(1); // Optionally exit the process with an error code
  } else {
    console.log('Connected to the MySQL server.');
  }
});


// Defining connection
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

/**-----SignUp and Login Routes ------- */
app.post('/signup', async(req,res) =>{
    try{
      const {username, email, password} = req.body;
      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const signUpConnection = await getDbConnection();
      /**We pass in the values */
      const [insertUserRow] = await signUpConnection.execute(
      'INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)',
      [username, email, hashedPassword])

      await signUpConnection.end();
      res.status(201).send('User created successfully');

    } catch(error){
        console.error(error);
        res.status(500).send('Error occurred');
    }
});

app.post('/login', async(req,res) =>{
    try{
      const {email, password} = req.body;
      const loginConnection = await getDbConnection();

      /**Always verify if the email works to save time*/
      /** we will return everything from it and compare the hasedpassword with the one from SQL */
      const [users] = await loginConnection.execute('SELECT * FROM User WHERE Email = ?',[email]);

      await loginConnection.end();

      if(users.length == 0){
        return res.status(401).send('User not found.');
      }

      const user = users[0];

      const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);
      if(!isPasswordValid){
        return res.status(401).send('Password Invalid');
      }

      /**this tokeen will be available for 24h before expiring */
      const token = jwt.sign({ userId: user.UserID }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
      /**Keychain in iOS */
      res.send({ token });


    } catch(error){
        res.send(500).send("Error has occurred within signup");
    }
});
