const express = require("express")
const dotenv = require("dotenv")
const {sequelize} = require("./db/models")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const todoRoutes = require("./routes/todoRoutes")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Sync Sequelize models with the database
sequelize.sync().then(() => {
  console.log('Database connected');
});

// Use user routes
app.use('/api/users', userRoutes);

//Use products routes
app.use('/api/products',productRoutes)

//use todo routes
app.use('/api/todos',todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
