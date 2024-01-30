const mongoose=require('mongoose')
const expenseSchema=new mongoose.Schema({
    Amount:Number,
    Desc: String,
    Title: String
})
const Expense=mongoose.model('Expense',expenseSchema)
module.exports=Expense
