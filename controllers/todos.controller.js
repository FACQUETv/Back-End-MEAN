var TodoService = require('../services/todos.service')

_this = this

// HTTP GET
exports.getTodos = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    console.log(page, limit)

    try{
        var todos = await TodoService.getTodos({}, page, limit)
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Todos Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

// HTTP POST
exports.createTodo = async function(req, res, next){
    var todo = {
        id : req.body._id,
        address : {building : req.body.building,
                   coord : req.body.coord,
                   street : req.body.street,
                   zipcode : req.body.zipcode},
        borough : req.body.borough,
        cuisine : req.body.status,
        name : req.body.name,
        restaurant_id : req.body.restaurant_id
    }

    try{
        var createdTodo = await TodoService.createTodo(todo)
        return res.status(201).json({status: 201, data: createdTodo, message: "Succesfully Created ToDo"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"})
    }
}

// HTTP PUT
exports.updateTodo = async function(req, res, next){


    var id = req.body.id;

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    console.log(req.body)

    var todo = {
        id,
        borough: req.body.borough ? req.body.borough : null,
        cuisine: req.body.cuisine ? req.body.cuisine : null,
        name: req.body.name ? req.body.name : null,
        restaurant_id: req.body.restaurant_id ? req.body.restaurant_id : null
    }

    try{
        var updatedTodo = await TodoService.updateTodo(todo)
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

// HTTP DELETE
exports.removeTodo = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await TodoService.deleteTodo(id)
        return res.status(204).json({status:204, message: "Succesfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}