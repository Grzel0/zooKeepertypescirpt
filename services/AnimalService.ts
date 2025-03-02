import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {animal} from "../models/animal.js";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const filePath: string = path.join(__dirname, '../data/zoo.json');
type AnimalData = Omit<animal, 'id'>

function readData(): animal[] {
    const data: string = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as animal[];
}

function writeData(data: animal[]): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
const getAllAnimals:() => animal[] = (): animal[] => readData();



const getEndangeredAnimals:() => animal[] = (): animal[] => {
    const animals: animal[] = readData();
    return animals.filter(animal => animal.isEndangered === true);
};

const getAnimalById = (id: number) => {
    const animals: animal[] = readData();
    return animals.find(animal => animal.id === id);
};

const getAnimalsByHabitat = (habitat: string): animal[] => {
    const animals: animal[] = readData();
    return animals.filter(animal => animal.habitat.toLowerCase() === habitat.toLowerCase());
};

const getAnimalsBySpecies = (species: string): animal[] => {
    const animals: animal[] = readData();
    return animals.filter(animal => animal.species.toLowerCase() === species.toLowerCase());
};

const addAnimal = (newAnimal: AnimalData): animal => {
    const animals: animal[] = readData();
    const id: number = animals.length ? animals[animals.length - 1].id + 1 : 1;
    const animal = { id, ...newAnimal };
    animals.push(animal);
    writeData(animals);
    return animal;
};

const updateAnimal = (id: number, updatedData: Partial<AnimalData>) => {
    const animals: animal[] = readData();
    const index: number = animals.findIndex(animal => animal.id === id);
    if (index !== -1) {
        animals[index] = { ...animals[index], ...updatedData };
        writeData(animals);
        return animals[index];
    }
    return null;
};

const deleteAnimal = (id: number): boolean => {
    const animals: animal[] = readData();
    const index: number = animals.findIndex(animal => animal.id === id);
    if (index !== -1) {
        animals.splice(index, 1);
        writeData(animals);
        return true;
    }
    return false;
};

export { getAllAnimals, getEndangeredAnimals, getAnimalById, getAnimalsByHabitat, getAnimalsBySpecies, addAnimal, updateAnimal, deleteAnimal };