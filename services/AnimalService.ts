import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../data/zoo.json');

function readData() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
const getAllAnimals = () => readData();

const getEndangeredAnimals = () => {
    const animals = readData();
    return animals.filter(animal => animal.isEndangered === true);
};

const getAnimalById = (id) => {
    const animals = readData();
    return animals.find(animal => animal.id === id);
};

const getAnimalsByHabitat = (habitat) => {
    const animals = readData();
    return animals.filter(animal => animal.habitat.toLowerCase() === habitat.toLowerCase());
};

const getAnimalsBySpecies = (species) => {
    const animals = readData();
    return animals.filter(animal => animal.species.toLowerCase() === species.toLowerCase());
};

const addAnimal = (newAnimal) => {
    const animals = readData();
    const id = animals.length ? animals[animals.length - 1].id + 1 : 1;
    const animal = { id, ...newAnimal };
    animals.push(animal);
    writeData(animals);
    return animal;
};

const updateAnimal = (id, updatedData) => {
    const animals = readData();
    const index = animals.findIndex(animal => animal.id === id);
    if (index !== -1) {
        animals[index] = { ...animals[index], ...updatedData };
        writeData(animals);
        return animals[index];
    }
    return null;
};

const deleteAnimal = (id) => {
    const animals = readData();
    const index = animals.findIndex(animal => animal.id === id);
    if (index !== -1) {
        animals.splice(index, 1);
        writeData(animals);
        return true;
    }
    return false;
};

export { getAllAnimals, getEndangeredAnimals, getAnimalById, getAnimalsByHabitat, getAnimalsBySpecies, addAnimal, updateAnimal, deleteAnimal };