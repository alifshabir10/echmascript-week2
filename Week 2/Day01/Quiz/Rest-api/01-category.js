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

// query table reqions
app.get("/api/v1/category", (req, res) => {
    pool.query(
        "select cate_id, cate_name from category",
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
app.post("/api/v1/category", (req,res)=> {
    const {cate_name} = req.body;
    pool.query(
        "insert into category (cate_name) values ($1)",
        [cate_name],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(201);
        }

    )
});


// delete
app.delete("/api/v1/category/:id", (req,res)=> {
    const {id} = req.params;
    pool.query(
        "delete from category where cate_id = $1",
        [id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});

// change data
app.put("/api/v1/category/", (req,res)=> {
    const {cate_id, cate_name} = req.body;
    pool.query(
        "update category set cate_name = $1 where cate_id=$2",
        [cate_name,cate_id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});

// update table use method PUT 
app.put("/api/v1/category/:id", (req,res)=> {
    const {id} = req.params;
    const {cate_name} = req.body;
    pool.query(
        "update category set cate_name = $1 where region_id=$4",
        [cate_name,id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});