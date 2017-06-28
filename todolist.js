const express = require('express');
const path = require('path');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const models = require('./models');

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

app.get('/', function(request, response){
  models.Todo.findAll({
    where: {
      completed: false
    }
  }).then(function(todoList){
    models.Todo.findAll({
      where: {
        completed: true
      }
    })
  }).then(function(completed){
    console.log(todoList);
    response.render('index', {
      todoList: todoList,
      completedList: completed
    });
  });
});

var todoList = [];
var completedList = [];

app.post('/', function(request, response){
  var item = request.body.todoAdd;
  var toComplete = request.body.incompleteTask;

  const itemBuild = models.Todo.build({ // adds the user input to the database
    item: item,
    completed: false
  });

  itemBuild.save().then(function (newTodo) { // saves to database
    todoList.push(newTodo);
  })

  models.Todo.update({
    completed: true
  }, {
    where: {
      item: toComplete
    }
  }).then(function(completed){
    console.log(completed);
    response.redirect('/');
  })

  // response.render('index', {
  //   todoList: todoList,
  //   completedList: completed
  // });

  // if(item){
  //   todoList.push(item);
  //   console.log('todoList ' + todoList);
  // } else if (toComplete){
  //   for (var i = 0; i < todoList.length; i++) {
  //     if(todoList[i] === toComplete){
  //       todoList.splice(i,1);
  //     }
  //   }
  //   completedList.push(toComplete);
  //   console.log('toComplete ' + toComplete);
  // }
});
