const express = require("express")
const app = express()
const mysql = require("mysql2")
const cors = require("cors")

app.use(cors())
app.use(express.json())

const db = mysql.createPool({
    host:"34.151.244.20",
    user:"root",
    password:"daniel1609",
    database:"listadecontatos"
})


app.post("/register", (req, res) => {
    const {nome} = req.body
    const {email} = req.body;
    const {numero} = req.body

    let SQL = "INSERT INTO contatos (nome ,email, numero) VALUES (?,?,?)"

    db.query(SQL,[nome,email,numero], (err,result) =>{
       if(err){
        res.send(err)
       }
       else{
        res.send(result)
       }
    })
})

app.post("/search", (req, res) => {
    const { nome } = req.body
    const { email } = req.body
    const { numero } = req.body

    let SQL = "SELECT * from contacts WHERE nome = ? AND email = ? AND numero = ?"

    db.query(SQL, [nome,email,numero] ,(err, result) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

app.get("/getcontacts",(req,res) => {
    let SQL = "select * from contatos"
    db.query(SQL,(err,result)=>{
        if(err){
            console.log(err);
        } 
        else res.send(result)
    })
})

app.put("/edit", (req,res) =>{
    const {id} = req.body
    const {nome} = req.body
    const {email} = req.body
    const {numero} = req.body

    let SQL = "UPDATE contatos SET nome = ?, email = ?, numero = ? WHERE id = ?"
    db.query(SQL ,[nome, email, numero, id], (err,result) => {
        if(err){
            res.send(err)
        } 
        else{
           res.send(result) 
        } 
    })

})

app.delete('/delete/:id',(req,res) => {
    const {id} = req.params

    let SQL = "DELETE from contatos WHERE id = ?"

    db.query(SQL,[id],(err,result) => {
        if(err){
            console.log(err)
        }
    })
})

app.get('/', (req,res) => {
    res.send("servidor rodando!")
}) 

app.listen(3000)