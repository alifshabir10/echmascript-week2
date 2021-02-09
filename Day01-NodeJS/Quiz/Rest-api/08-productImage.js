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

// query table product_images
app.get("/api/v1/product_images", (req, res) => {
    pool.query(
        "select prim_id, prim_file_name, prim_path,prim_prod_id from product_images",
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
app.post("/api/v1/product_images", (req,res)=> {
    const { prim_file_name, prim_path,prim_prod_id} = req.body;
    
    pool.query(
        "insert into product_images values (gen_random_uuid(),$1,$2,$3)",
        [ prim_file_name, prim_path,prim_prod_id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(201);
        }

    )
});


// delete
app.delete("/api/v1/product_images/:id", (req,res)=> {
    const {id} = req.params;
    pool.query(
        "delete from product_images where prim_id = $1",
        [id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});


app.put("/api/v1/product_images/", (req,res)=> {
    const { prim_file_name, prim_path,prim_prod_id,prim_id} = req.body;
    pool.query(
        "update product_images set  prim_file_name =$1, prim_path =$2,prim_prod_id =$3 where prim_id=$4",
        [ prim_file_name, prim_path,prim_prod_id,prim_id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});

