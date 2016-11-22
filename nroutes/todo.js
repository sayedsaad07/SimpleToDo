var _= require('lodash');
var Todo = require('../models/todo.js');

module.exports = function(app)
{
    // app.get('/' , function(req , res){
    //     console.log("App todo route is loaded");
    //     res.send("Hello Todo");
    // });
    

    
      // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

        // use mongoose to get all todos in the database
        Todo.find(function(err, todos) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : req.body.done
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });

    });

    // delete a todo
    app.put('/api/todos/:todo_id', function(req, res) {
         Todo.findById(req.params.id , function(err, todo){
            if(err)  
                res.send(err);
            if(todo)
            {
                _.merge(todo , req.body);
                todo.save(function(err){
                        if(err)
                            res.send(err);
                    });      
                res.json({data: todo});
            };
        });
    }); 

     // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                   { res.send("fail to delete")
                   }
                res.json(todos);
            });
        });
    });
}