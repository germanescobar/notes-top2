const request = require('supertest');
const app = require('./app');
const mongoose = require("mongoose");
const Note = require('./model/Note');

beforeEach(async () => {
    // antes de cada prueba limpiamos todas las colecciones para iniciar con una
    // base de datos en blanco
    for (var i in mongoose.connection.collections) {
      await mongoose.connection.collections[i].remove({});
    }
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
  });

describe('/', () => {
  test('GET responds with success code', async () => {
    const response = await request(app).get('/notes');
    expect(response.statusCode).toBe(200);
  });

  test('returns notes', async () =>{
    await Note.create({title: "Nota 1", description: "Esta es la nota 1"});
    const response = await request(app).get('/notes');
    
    const notes = response.body;
    expect(notes.length).toBe(1);

    const note1 = notes[0];
    expect(note1.title).toBe("Nota 1");
    expect(note1.description).toBe("Esta es la nota 1");
  });
});



describe('POST /notes', () =>{
  test('creates a note successfully', async () =>{
    const response = await request(app).post('/notes')
      .send({title:"Nota 1", description:"Esta es la nota 1"});
    expect(response.statusCode) .toBe(200);
    
    const notes = await Note.find();
    expect(notes.length).toBe(1);

    const nota1 = notes[0];
    expect(nota1.title).toBe("Nota 1");
    expect(nota1.description).toBe("Esta es la nota 1")
  })
});