require("dotenv").config();


const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const connectionToDb = require("./config/connectionToDb")
const app = express();

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


app.use(cors({
    origin: "laundry-app-backend-psi.vercel.app",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// User
app.use('/', routeUser);

app.get('/', (req, res) => {
    res.send('Selamat datang di server Express!');
});

// Paket Express
app.use('/pkt_express', routePaketExpress);

// Paket Reguler
app.use('/pkt_reguler', routePaketReguler);

// Paket Setrika
app.use('/pkt_setrika', routePaketSetrika);

// Pelanggan baru
app.use('/pelanggan', routePelanggan);

// Order Paket Express
app.use('/order_exp', routeOrderExpress);

// Order Paket Reguler
app.use('/order_reg', routeOrderReguler);

// Order Paket Setrika
app.use('/order_str', routeOrderSetrika);

// Pengajuan Barang
app.use('/pengajuan', routePengajuanBarang);

// Seluruh Paket
app.use('/jumlah', routeSeluruhPaket);

// Seluruh Order
app.use('/invoice', routeSeluruhOrder);

app.use('/order', routeTotalPendapatan);

// Notifikasi
// app.use('/notifications', routeNotifications);

// Koneksi ke database
connectionToDb();

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});




