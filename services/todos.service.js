var ToDo = require('../models/todo.model')

_this = this


exports.getTodos = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var todos = await ToDo.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createTodo = async function(todo){

    var newTodo = new ToDo({
        borough: todo.borough,
        cuisine: todo.cuisine,
        status: todo.status,
        name: todo.name,
        restaurant_id: todo.restaurant_id
    })

    try{
        var savedTodo = await newTodo.save()
        return savedTodo;
    }catch(e){
        throw Error("Error while Creating Todo")
    }
}

exports.updateTodo = async function(todo){
    var id = todo.id

    try{
        var oldTodo = await ToDo.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }

    if(!oldTodo){
        return false;
    }

    console.log(oldTodo)

    oldTodo.borough = todo.borough
    oldTodo.cuisine = todo.cuisine
    oldTodo.name = todo.name
    oldTodo.restaurant_id = todo.restaurant_id


    console.log(oldTodo)

    try{
        var savedTodo = await oldTodo.save()
        return savedTodo;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = async function(id){
    
    try{
        var deleted = await ToDo.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Todo Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Todo")
    }
}