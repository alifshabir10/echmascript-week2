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

// query table province
app.get("/api/v1/province", (req, res) => {
    pool.query(
        "select prov_id, prov_name from province",
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
app.post("/api/v1/province", (req,res)=> {
    const {prov_name} = req.body;
    pool.query(
        "insert into province (prov_name) values ($1)",
        [prov_name],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(201);
        }

    )
});


// // delete
app.delete("/api/v1/province/:id", (req,res)=> {
    const {id} = req.params;
    pool.query(
        "delete from province where prov_id = $1",
        [id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});


app.put("/api/v1/province/", (req,res)=> {
    const {prov_id, prov_name} = req.body;
    pool.query(
        "update province set prov_name = $1 where prov_id=$2",
        [prov_name,prov_id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});

