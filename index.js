import express from 'express'

const app = express();

const port = 3000;
app.use(express.json())

let teaData = [];
let teaId = 1;

app.post("/teas",(req,res)=>{
    const {name,price} = req.body;
    const teaObj = {id:teaId++,name,price}
    teaData.push(teaObj);
    res.status(201).send(teaObj)
})
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData)
})
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.filter(t=>t.id === parseInt(req.params.id))
    if (!tea) {
        res.status(404).send("Tea not found")
    }
    res.status(200).send(tea)
})
app.put("/teas/:id",(req,res)=>{
    const teaIndex = teaData.findIndex(t=>t.id === parseInt(req.params.id))
    if (teaIndex === -1) {
        res.status(404).send("Tea not found")
    }
    teaData[teaIndex] = {
        ...teaData[teaIndex],
        name:req.body.name,
        price:req.body.price
    }
    console.log(teaData[teaIndex]);
    
    res.status(200).send("updated")
})
app.delete("/teas/:id",(req,res)=>{
   const index = teaData.findIndex(t=>t.id === parseInt(req.params.id));
   if (index == -1) {
    res.status(404).send("Not found")
   }
   teaData.splice(index,1)
    res.status(204).send("deleted")
})



app.listen(port,() => {
    console.log(`Server is running on port: ${port}`);
    
})
