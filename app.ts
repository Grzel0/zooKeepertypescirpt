import express from 'express';
import bodyParser from 'body-parser';
// import AnimalsController from './controllers/AnimalController.js';

const app = express();

app.use(bodyParser.json());
// app.use('/animals', AnimalsController);


export default app;