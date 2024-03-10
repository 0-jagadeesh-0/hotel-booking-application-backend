const express = require('express');
const connectDB = require('./config/db')
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotel');
const userRoutes = require('./routes/user');

const cors = require('cors');


dotenv.config();

const app = express();
connectDB();

app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/v1/auth/', authRoutes);
app.use('/api/v1/hotels/', hotelRoutes);
app.use('/api/v1/users/', userRoutes);


app.listen(process.env.PORT, () => {
    console.log('server started successfully at port ' + process.env.PORT);
});