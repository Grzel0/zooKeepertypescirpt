import fs from 'fs';
import path from 'path';
import {animal} from "../models/animal";

const filePath: string = path.join(__dirname, '../data/zoo.json');
type AnimalData = Omit<animal, 'id'>


class AnimalService {

    private readData(): animal[] {
        const data: string = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data) as animal[];
    }

    private writeData(data: animal[]): void {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }

    getAllAnimals(): animal[] {
        return this.readData();
    }


    getEndangeredAnimals(): animal[] {
        const animals: animal[] = this.readData();
        return animals.filter(animal => animal.isEndangered === true);
    };

    getAnimalById(id: number):animal | undefined {
        const animals: animal[] = this.readData();
        return animals.find(animal => animal.id === id);
    };

    getAnimalsByHabitat(habitat: string): animal[] {
        const animals: animal[] = this.readData();
        return animals.filter(animal => animal.habitat.toLowerCase() === habitat.toLowerCase());
    };

    getAnimalsBySpecies(species: string): animal[] {
        const animals: animal[] = this.readData();
        return animals.filter(animal => animal.species.toLowerCase() === species.toLowerCase());
    };

    addAnimal (newAnimal: AnimalData): animal {
        const animals: animal[] = this.readData();
        const id: number = animals.length ? animals[animals.length - 1].id + 1 : 1;
        const animal = { id, ...newAnimal };
        animals.push(animal);
        this.writeData(animals);
        return animal;
    };

    updateAnimal(id: number, updatedData: Partial<AnimalData>): animal | null {
        const animals: animal[] = this.readData();
        const index: number = animals.findIndex(animal => animal.id === id);
        if (index !== -1) {
            animals[index] = { ...animals[index], ...updatedData };
            this.writeData(animals);
            return animals[index];
        }
        return null;
    };

    deleteAnimal(id: number): boolean{
        const animals: animal[] = this.readData();
        const index: number = animals.findIndex(animal => animal.id === id);
        if (index !== -1) {
            animals.splice(index, 1);
            this.writeData(animals);
            return true;
        }
        return false;
    };

}

export const animalService = new AnimalService;