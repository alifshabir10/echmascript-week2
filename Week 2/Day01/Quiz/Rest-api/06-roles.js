const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create pool for pg database
const Pool = require('pg').Pool;
// configuration database pg
const pool = new Pool({
    user: "postgres",
    password: "Rasenggan10",
    host: "localhost",
    port: 5432,
    database: "Er-Shop"
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 1337;
app.listen(port, () => console.log(`Server Listening on port ${port}`));

// query table roles
app.get("/api/v1/roles", (req, res) => {
    pool.query(
        "select role_id, role_name from roles",
        // penyimpanan filter
        [],
        // if true can find
        (error, result) => {
            if (error) {
                throw error;
            }
            res.status(200).json(result.rows);
        }

    )
});

// insert 
app.post("/api/v1/roles", (req,res)=> {
    const {role_name} = req.body;
   
    pool.query(
        "insert into roles ( role_name) values ($1)",
        [role_name],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(201);
        }

    )
});


delete
app.delete("/api/v1/roles/:id", (req,res)=> {
    const {id} = req.params;
    pool.query(
        "delete from roles where role_id = $1",
        [id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});


app.put("/api/v1/roles/", (req,res)=> {
    const { role_name,role_id} = req.body;
    pool.query(
        "update roles set role_name = $1 where role_id=$2",
        [role_name,role_id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});

