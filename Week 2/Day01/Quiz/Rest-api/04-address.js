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

// query table address
app.get("/api/v1/address", (req, res) => {
    pool.query(
        "select addr_id, addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_city_id, addr_user_id, addr_city_id from address",
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
app.post("/api/v1/address", (req, res) => {
    const { addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_city_id, addr_user_id } = req.body;

    pool.query(
        "insert into address (  addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_city_id, addr_user_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_city_id, addr_user_id],
        (error, result) => {
            if (error) {
                throw error;
            }
            res.sendStatus(201);
        }

    )
});


// delete
app.delete("/api/v1/address/:id", (req, res) => {
    const { id } = req.params;
    pool.query(
        "delete from address where addr_id = $1;",
        [id],
        (error, result) => {
            if (error) {
                throw error;
            }
            res.sendStatus(200);
        }

    )
});


app.put("/api/v1/address/", (req, res) => {
    const { addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_city_id, addr_user_id, addr_id } = req.body;
    pool.query(
        "update address set addr_email = $1,addr_fullname = $2, addr_phone_number = $3, addr_is_default =$4, addr_zipcode = $5, addr_street1 = $6, addr_street2 = $7, addr_city_id =$8, addr_user_id = $9 where addr_id=$10",
        [addr_email, addr_fullname, addr_phone_number, addr_is_default, addr_zipcode, addr_street1, addr_street2, addr_city_id, addr_user_id, addr_id],
        (error, result) => {
            if (error) {
                throw error;
            }
            res.sendStatus(200);
        }

    )
});

