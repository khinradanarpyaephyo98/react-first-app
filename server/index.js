const express=require("express") ;
const bodyParser=require("body-parser");
const cors=require("cors");
const path=require("path");

const app=express();
const mysql=require("mysql");

// if(process.env.NODE_ENV== "production"){
//     app.use(express.static('public'));
//     app.get('*', (req,res) => {
//         req.sendFile(path.resolve (__dirname,'build', 'index.html'))
//     })
// }


const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
    const sqlGet="SELECT * FROM contact_db";
    db.query(sqlGet,(error,result) => {
        res.send(result);
        console.log(result);
    });
});

app.post("/api/post",(req,res) => {
    const {name,email,contact}=req.body;
    const sqlInsert="INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert,[name,email,contact],(error,result) => {
        if (error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req,res) => {
    const { id } = req.params;
    const sqlRemove="DELETE FROM contact_db WHERE id = ? ";
    db.query(sqlRemove, id , (error,result) => {
        if (error){
            console.log(error);
            console.log(result);
        }
    });
});


app.get("/api/get/:id", (req,res) => {
    const {id } = req.params;
    const sqlGet="SELECT * FROM contact_db where id=? ";
    db.query(sqlGet, id , (error,result) => {
        if (error){
            console.log(result);
        }
        res.send(result);
    });
});


app.put("/api/update/:id", (req,res) => {
    const {id} = req.params;
    const {name,email,contact} =req.body;
    const sqlUpdate="UPDATE contact_db SET name = ? , email = ? , contact = ? WHERE id = ? ";
    db.query(sqlUpdate, [name,email,contact,id] , (error,result) => {
        if (error){
            console.log(error);
        }
    });
});

const PORT = process.env.PORT || 3001;

// app.listen(3001,()=> { 
//     console.log("running on port 3001");
// });
app.listen(process.env.PORT||PORT, () => {
    console.log(`server started on port ${PORT}`);
  });