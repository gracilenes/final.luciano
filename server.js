const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
app.use(express.json());

let produtos = [];
let idCounter = 1;

// pagina inicial
app.use(express.static(path.join(__dirname, 'public')));