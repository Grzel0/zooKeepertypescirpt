import express, {Request, Response} from 'express';
import * as AnimalsService from '../services/AnimalService.js';
import {animal} from "../models/animal.js";

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    const animals: animal[] = AnimalsService.getAllAnimals();
    res.json(animals);
});

app.get('/id/:id', (req: Request, res: Response) => {
    const animal: animal | undefined = AnimalsService.getAnimalById(Number(req.params.id));
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }
});

app.get('/endangered', (req: Request, res: Response) => {
    const animals: animal[] = AnimalsService.getEndangeredAnimals();
    res.json(animals);
});

app.get('/habitat/:habitat', (req: Request, res: Response) => {
    const animals: animal[] = AnimalsService.getAnimalsByHabitat(req.params.habitat);
    res.json(animals);
});

app.get('/species', (req: Request, res: Response) => {
    const species: string | undefined = req.query.species as string;
    const animals: animal[] = AnimalsService.getAnimalsBySpecies(species);
    res.json(animals);
});

app.post('/addanimal', (req: Request, res: Response) => {
    const newAnimal: animal = AnimalsService.addAnimal(req.body);
    res.status(201).json(newAnimal);
});

app.put('/updateanimal/:id', (req: Request, res: Response) => {
    const updatedAnimal: animal | null = AnimalsService.updateAnimal(Number(req.params.id), req.body);
    if (updatedAnimal) {
        res.json(updatedAnimal);
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }
});

app.delete('/:id', (req: Request, res: Response) => {
    const isDeleted: boolean = AnimalsService.deleteAnimal(Number(req.params.id));
    if (isDeleted) {
        res.json({ message: 'Animal deleted successfully' });
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }
});

export default app;