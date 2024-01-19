console.log('hiii');
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import route from './Routes/index.js';

const app = express();

dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.send('hi backend..')
});

app.use('/api/v1/', route);

mongoose.connect(process.env.MongoUrl).then(()=>console.log('Database Connected!'));

app.listen(8000, ()=> console.log('Port running on 8000!'));