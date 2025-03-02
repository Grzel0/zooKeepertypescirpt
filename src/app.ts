import express, {Application} from 'express';
import animalRouter from "./routes/animal.routes";

const app: Application = express();

app.use(express.json());

app.use('/', animalRouter);
app.use('/id/:id', animalRouter);
app.use('/endangered', animalRouter);
app.use('/habitat/:habitat',animalRouter);
app.use('/species', animalRouter);
app.use('/addanimal', animalRouter);
app.use('/updateAnimal/:id', animalRouter);
app.use('/deleteAnimal/:id', animalRouter);


export default app;