require('dotenv').config();
const express = require('express'); // framework nodejs
const cors = require('cors'); // cors
const configViewEngine = require('./config/viewEngine');
const connection = require('./config/database');
const routerAPI = require('./routes/api');

const app = express(); // app express
const port = process.env.PORT || 8888; // port

// config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config cors
app.use(cors());

// config view engine
configViewEngine(app);

// khai báo route api
app.use('/v1/api', routerAPI);

// test connection
(async () => {
    try {
        await connection();
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (error) {
        console.log(">>> Error connection to DB: ", error);
    }
})();