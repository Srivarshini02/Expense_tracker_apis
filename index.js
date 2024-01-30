const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT
app.listen(port)
const Expense=require('./expense')
mongoose.connect('mongodb+srv://lsrivarshini02:srivarshini@cluster0.pf2vacu.mongodb.net/newDb?retryWrites=true&w=majority',{
    useUnifiedTopology: true
})
app.use(express.json())

app.get('/expense', async(req, res) => {
    const result=await Expense.find()
  res.send(result)

})

app.get('/expense/:id', async(req, res) => {
  try{
    const id=req.params.id
    // console.log(req.params)
    const result=await Expense.findById(id)
    if(result){
        res.send(result)
    }
    else{
        res.send("No Expenses")
    }
    
    }catch(err){
      res.send(err)
  }
})
  
    
//   res.send(expenses)
// res.send(req.params)



app.delete('/expense/:id',async(req,res)=>{
  try{
    const id=req.params.id;
    const result=await Expense.findByIdAndDelete(id)
    if(result)
      res.send(result)
    else
      res.send("No expenses to show")
  }catch(err){
    res.send(err)
  }
})

// app.post('/expense/:id',async(req,res)=>{
//   try{
//     const id=req.params.id;
//     const result=await Expense.findById(id)
//     if(result)
//       res.send(result)
//     else
//       res.send("No exsp")
//   }catch(err){
//     res.send(err)
//   }
// })


app.post('/expense', async(req, res) => {
    console.log(req.body)
    try{
    const newExpense=req.body
    await Expense.create(newExpense)
    res.send('Created')  
    }catch(err){
      res.send(err)
    }
  })



  app.put('/expense/:id',async(req,res)=>{
    try{
      const id=req.params.id;
      const newUpdateExpense=req.body
      const resultUpdate=await Expense.findByIdAndUpdate(id,{$set:newUpdateExpense},{new:true})
      if(resultUpdate)
        res.send(resultUpdate)
      else
        res.send("No expenses to show")
    }catch(err){
      res.send(err)
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


