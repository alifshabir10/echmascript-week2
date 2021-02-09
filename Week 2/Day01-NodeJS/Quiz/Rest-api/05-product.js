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

// query table product
app.get("/api/v1/product", (req, res) => {
    pool.query(
        "select prod_id, prod_title, prod_description, prod_stock, prod_price, prod_price, prod_condition, prod_manufacture, prod_image, prod_cate_id from product",
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
// app.post("/api/v1/city", (req,res)=> {
//     const {addr_name, city_prov_id} = req.body;
    
//     pool.query(
//         "insert into city ( addr_name, city_prov_id) values ($1,$2)",
//         [addr_name,city_prov_id],
//         (error, result) => {
//             if(error){
//                 throw error;
//             }
//             res.sendStatus(201);
//         }

//     )
// });


// delete
// app.delete("/api/v1/city/:id", (req,res)=> {
//     const {id} = req.params;
//     pool.query(
//         "delete from city where addr_id = $1",
//         [id],
//         (error, result) => {
//             if(error){
//                 throw error;
//             }
//             res.sendStatus(200);
//         }

//     )
// });


// app.put("/api/v1/city/", (req,res)=> {
//     const {addr_id, addr_name} = req.body;
//     pool.query(
//         "update city set addr_name = $1 where addr_id=$2",
//         [addr_name,addr_id],
//         (error, result) => {
//             if(error){
//                 throw error;
//             }
//             res.sendStatus(200);
//         }

//     )
// });

