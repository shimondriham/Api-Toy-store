const mongoose = require("mongoose");
const Joi = require("joi");

let toySchema = new mongoose.Schema({
    name:String,
    price:Number,
    info:String,
    cat:String,
    img:{
      type:String, default:"https://images.unsplash.com/photo-1596068587619-e4b11c7a3488?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    date_created:{
      type:Date, default:Date.now()
    },
    user_id:String
  })
  
  exports.ToyModel = mongoose.model("toys", toySchema);
  
  exports.validateToys = (_reqBody) => {
    let joiSchema = Joi.object({
      name:Joi.string().min(2).max(99).required(),
      price:Joi.number().min(1).max(999).required(),
      cat:Joi.string().min(2).max(99).required(),
      info:Joi.string().min(2).max(99).required(),
      img:Joi.string().min(1).max(999).allow(null,'')
    })
    return joiSchema.validate(_reqBody)
  }