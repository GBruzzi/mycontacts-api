const express = require('express');

//biblioteca de tratamento de erros async do express
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

//Error handler => middleware de tratamento de erros do express
app.use((error,request,response,next) => {
  console.log(error);
  response.sendStatus(500);
});


//Startar o server
app.listen(3000, () => console.log('Server started at http://localhost:3000'));

