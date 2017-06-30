//todoDB
//Todos Table

const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const models = require('./models');
const faker = require('faker');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.listen(3000, function () {
  console.log('Successfully started To-Do List application!');
});

// for (var i = 0; i < 8; i++) { // generate some data
//   const todoData = models.Todo.build({
//     item: faker.company.catchPhrase(),
//     completed: false
//   })
//   todoData.save();
// }

app.get('/', function(request, response){
  models.Todo.findAll({
    where: {
      completed: false
    }
  }).then(function(incompleteItem){
    models.Todo.findAll({
      where: {
        completed : true
      }
    }).then(function(completedItem){
      response.render('index', {
        todoList: incompleteItem,
        completedList: completedItem
      })
    })
  })
})

app.post('/todo-add', function(request, response){

  const itemBuild = models.Todo.build({ // adds the user input to the database
    item: request.body.todoAdd,
    completed: false
  });

  itemBuild.save().then(function(){
    console.log(request.body.incompleteTask);
    response.redirect('/');
  })
});

app.post('/mark-complete', function(request, response) {
  models.Todo.update({
      completed: true
    }, {
      where: {
        item: request.body.incompleteTask
      }
    }).then(function() {
      console.log(request.body.incompleteTask);
      response.redirect('/');
    })
})
