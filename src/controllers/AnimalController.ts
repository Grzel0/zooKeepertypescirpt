import express, {Request, Response} from 'express';
import {animalService} from '../services/AnimalService.js';
import {animal} from "../models/animal";

const app = express();
app.use(express.json());

class AnimalController{

    static getAllAnimals (req: Request, res: Response): void {
        const animals: animal[] = animalService.getAllAnimals();
        res.json(animals);
    };

    static getAnimalId (req: Request, res: Response):void {
        const animal: animal | undefined = animalService.getAnimalById(Number(req.params.id));
        if (animal) {
            res.json(animal);
        } else {
            res.status(404).json({ message: 'Animal not found' });
        }
    };

    static getAnimalEndangered (req: Request, res: Response):void {
        const animals: animal[] = animalService.getEndangeredAnimals();
        res.json(animals);
    };

    static getAnimalHabitat(req: Request, res: Response): void {
        const animals: animal[] = animalService.getAnimalsByHabitat(req.params.habitat);
        res.json(animals);
    };

    static getAnimalSpecies(req: Request, res: Response): void {
        const species: string | undefined = req.query.species as string;
        const animals: animal[] = animalService.getAnimalsBySpecies(species);
        res.json(animals);
    };

    static newAnimal(req: Request, res: Response): void {
        const newAnimal: animal = animalService.addAnimal(req.body);
        res.status(201).json(newAnimal);
    };

    static updateAnimal(req: Request, res: Response): void{
        const updatedAnimal: animal | null = animalService.updateAnimal(Number(req.params.id), req.body);
        if (updatedAnimal) {
            res.json(updatedAnimal);
        } else {
            res.status(404).json({ message: 'Animal not found' });
        }
    };

    static deleteAnimal(req: Request, res: Response): void{
        const isDeleted: boolean = animalService.deleteAnimal(Number(req.params.id));
        if (isDeleted) {
            res.json({ message: 'Animal deleted successfully' });
        } else {
            res.status(404).json({ message: 'Animal not found' });
        }
    };

}

export default AnimalController;