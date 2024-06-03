require("dotenv").config();


const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const connectionToDb = require("./config/connectionToDb")
const app = express();
const checkLogin = require('./middleware/authMiddleware');

// import routes user
const routeUser = require("./routes/User");
// import routes paket express
const routePaketExpress = require("./routes/Paket/PaketExpress");
// import routes paket reguler
const routePaketReguler = require("./routes/Paket/PaketReguler");
// import routes paket reguler
const routePaketSetrika = require("./routes/Paket/PaketSetrika");
// import routes pelanggan
const routePelanggan = require("./routes/Pelanggan");
// import routes order express
const routeOrderExpress = require("./routes/Order/OrderExpress");
// import routes order reguler
const routeOrderReguler = require("./routes/Order/OrderReguler");
// import routes order setrika
const routeOrderSetrika = require("./routes/Order/OrderSetrika");
// import routes pengajuan barang
const routePengajuanBarang = require("./routes/Pengajuan/PengajuanBarang");
// import routes seluruh paket yang tersedia
const routeSeluruhPaket = require("./routes/Paket/SeluruhPaket");
// import routes seluruh order yang tersedia
const routeSeluruhOrder = require("./routes/Order/SeluruhOrder");
// import routes pendapatan
const routeTotalPendapatan = require("./routes/Order/TotalPendapatan");
// import routes qr
const routeQr = require("./routes/AuthNotification");

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

// Paket Express
app.use('/pkt_express',checkLogin, routePaketExpress);

// Paket Reguler
app.use('/pkt_reguler',checkLogin, routePaketReguler);

// Paket Setrika
app.use('/pkt_setrika',checkLogin, routePaketSetrika);

// Pelanggan baru
app.use('/pelanggan', checkLogin, routePelanggan);

// Order Paket Express
app.use('/order_exp', checkLogin, routeOrderExpress);

// Order Paket Reguler
app.use('/order_reg', checkLogin, routeOrderReguler);

// Order Paket Setrika
app.use('/order_str', checkLogin, routeOrderSetrika);

// Pengajuan Barang
app.use('/pengajuan', checkLogin, routePengajuanBarang);

// Seluruh Paket
app.use('/jumlah', checkLogin, routeSeluruhPaket);

// Seluruh Order
app.use('/invoice', checkLogin, routeSeluruhOrder);

// Total Pendapatan
app.use('/order', checkLogin, routeTotalPendapatan);

// // Menyimpan Qr
app.use('/konfigurasi', checkLogin, routeQr);

// Notifikasi
// app.use('/notifications', routeNotifications);

// Koneksi ke database
connectionToDb();

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});




