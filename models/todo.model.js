var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ToDoSchema = new mongoose.Schema({
    address: {building : String, coord : String, street: String, zipcode : String},
    borough: String,
    cuisine: String,
    grades: {date: {$date: String, grade: String, score: String}},
    name : String,
    restaurant_id : String
})

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('restaurant', ToDoSchema)

module.exports = ToDo;