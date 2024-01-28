import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';

import userRoutes from './routes/users.js'

const app = express();
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
dotenv.config();
app.get('/', (req, res) => {
    res.send("This is a Stack Overflow clone API")
})
app.use('/user', userRoutes)

const PORT = process.env.PORT || 5000;

const CONNECTION_URL = "mongodb://localhost:27017/StackOverflow"
mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => app.listen(PORT, () => {console.log(`server running on port: ${PORT}`)}))
    .catch((err) => console.log(err.message))
