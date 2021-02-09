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

// query table users
app.get("/api/v1/users", (req, res) => {
    pool.query(
        "select user_id, user_name, user_email,user_password from users",
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
app.post("/api/v1/users", (req,res)=> {
    const { user_name, user_email,user_password} = req.body;
    
    pool.query(
        "insert into users (user_name, user_email,user_password) values ($1,$2,$3)",
        [user_name, user_email,user_password],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(201);
        }

    )
});


delete
app.delete("/api/v1/users/:id", (req,res)=> {
    const {id} = req.params;
    pool.query(
        "delete from users where user_id = $1",
        [id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});


app.put("/api/v1/users/", (req,res)=> {
    const {user_name, user_email,user_password, user_id} = req.body;
    pool.query(
        "update users set  user_name = $1, user_email = $2,user_password=$3 where user_id=$4",
        [user_name, user_email,user_password,user_id],
        (error, result) => {
            if(error){
                throw error;
            }
            res.sendStatus(200);
        }

    )
});

