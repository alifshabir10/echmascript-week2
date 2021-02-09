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

// query table user_roles
app.get("/api/v1/user_roles", (req, res) => {
    pool.query(
        "select user_id, role_id  from user_roles",
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
app.post("/api/v1/user_roles", (req,res)=> {
    const { user_id, role_id} = req.body;
    
    pool.query(
        "insert into user_roles (user_id, role_id) values ($1,$2)",
        [ user_id, role_id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(201);
        }

    )
});


// delete
app.delete("/api/v1/user_roles/:id", (req,res)=> {
    const {id} = req.params;
    pool.query(
        "delete from user_roles where user_id = $1",
        [id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});


app.put("/api/v1/user_roles/", (req,res)=> {
    const {role_id, user_id} = req.body;
    pool.query(
        "update user_roles set role_id = $1 where user_id=$2",
        [role_id, user_id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});

