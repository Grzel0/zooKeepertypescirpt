import express, {Request, Response, Router} from 'express';
import AnimalController from "../controllers/AnimalController";

const animalRouter: Router = express.Router();

animalRouter.get("/", AnimalController.getAllAnimals)
animalRouter.get("/id/:id", AnimalController.getAnimalId)
animalRouter.get("/endangered", AnimalController.getAnimalEndangered)
animalRouter.get("/habitat/:habitat", AnimalController.getAnimalHabitat)
animalRouter.get("/species", AnimalController.getAnimalSpecies)
animalRouter.post("/addanimal", AnimalController.newAnimal)
animalRouter.put("/updateanimal/:id", AnimalController.updateAnimal)
animalRouter.delete("/deleteanimal/:id", AnimalController.deleteAnimal)

export default animalRouter;

