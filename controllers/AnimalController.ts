import express from 'express';
import * as AnimalsService from '../services/AnimalService.js';

const app = express();

app.get('/', (req, res) => {
    const animals = AnimalsService.getAllAnimals();
    res.json(animals);
});

app.get('/id/:id', (req, res) => {
    const animal = AnimalsService.getAnimalById(Number(req.params.id));
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }
});

app.get('/endangered', (req, res) => {
    const animals = AnimalsService.getEndangeredAnimals();
    res.json(animals);
});

app.get('/habitat/:habitat', (req, res) => {
    const animals = AnimalsService.getAnimalsByHabitat(req.params.habitat);
    res.json(animals);
});

app.get('/species', (req, res) => {
    const species = req.query.species;
    const animals = AnimalsService.getAnimalsBySpecies(species);
    res.json(animals);
});

app.post('/addanimal', (req, res) => {
    const newAnimal = AnimalsService.addAnimal(req.body);
    res.status(201).json(newAnimal);
});

app.put('/updateanimal/:id', (req, res) => {
    const updatedAnimal = AnimalsService.updateAnimal(Number(req.params.id), req.body);
    if (updatedAnimal) {
        res.json(updatedAnimal);
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }
});

app.delete('/:id', (req, res) => {
    const isDeleted = AnimalsService.deleteAnimal(Number(req.params.id));
    if (isDeleted) {
        res.json({ message: 'Animal deleted successfully' });
    } else {
        res.status(404).json({ message: 'Animal not found' });
    }
});

export default app;