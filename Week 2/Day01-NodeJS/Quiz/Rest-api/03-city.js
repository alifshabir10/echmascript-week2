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

// query table city
// app.get("/api/v1/city", (req, res) => {
//     pool.query(
//         "select city_id, city_name, city_city_id from city",
//         // penyimpanan filter
//         [],
//         // if true can find
//         (error, result) => {
//             if (error) {
//                 throw error;
//             }
//             res.status(200).json(result.rows);
//         }

//     )
// });

// insert 
// app.post("/api/v1/city", (req,res)=> {
//     const {city_name, city_prov_id} = req.body;
    
//     pool.query(
//         "insert into city ( city_name, city_prov_id) values ($1,$2)",
//         [city_name,city_prov_id],
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
//         "delete from city where city_id = $1",
//         [id],
//         (error, result) => {
//             if(error){
//                 throw error;
//             }
//             res.sendStatus(200);
//         }

//     )
// });


app.put("/api/v1/city/", (req,res)=> {
    const {city_id, city_name} = req.body;
    pool.query(
        "update city set city_name = $1 where city_id=$2",
        [city_name,city_id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});

