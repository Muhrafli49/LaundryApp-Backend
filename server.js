require("dotenv").config();


const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const connectionToDb = require("./config/connectionToDb")
const app = express();

const routeUser = require("./routes/User");



const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User
app.use('/', routeUser);

app.get('/', (req, res) => {
    res.send('Selamat datang di server Express!');
});

// Koneksi ke database
connectionToDb();

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});




