import express, {Application} from 'express';
import bodyParser from 'body-parser';
import animalRouter from "./routes/animal.routes";

const app: Application = express();

app.use(bodyParser.json());

app.use('/', animalRouter);
app.use('/id/:id', animalRouter);
app.use('/endangered', animalRouter);
app.use('/habitat/:habitat',animalRouter);
app.use('/species', animalRouter);
app.use('/addanimal', animalRouter);
app.use('/updateAnimal/:id', animalRouter);
app.use('/deleteAnimal/:id', animalRouter);


export default app;