const OrderPktExpress = require('../../models/Order/OrderPktExpress');
const OrderPktReguler = require('../../models/Order/OrderPktReguler');
const OrderPktSetrika = require('../../models/Order/OrderPktSetrika');
const PengajuanBarang = require('../../models/Pengajuan/PengajuanBarang');

exports.totalPendapatan = async (req, res) => {
    try {
        // Ambil total pendapatan dari masing-masing jenis order paket yang statusnya true
        const totalExp = await OrderPktExpress.aggregate([
            {
                $match: { status: true } // Filter berdasarkan status true
            },
            {
                $group: {
                    _id: null,
                    totalExp: { $sum: "$totalBayarExp" }
                }
            }
        ]);

        const totalReg = await OrderPktReguler.aggregate([
            {
                $match: { status: true } // Filter berdasarkan status true
            },
            {
                $group: {
                    _id: null,
                    totalReg: { $sum: "$totalBayarReg" }
                }
            }
        ]);

        const totalStr = await OrderPktSetrika.aggregate([
            {
                $match: { status: true } // Filter berdasarkan status true
            },
            {
                $group: {
                    _id: null,
                    totalStr: { $sum: "$totalBayarStr" }
                }
            }
        ]);

        // Ambil nilai total dari hasil aggregasi
        const totalExpValue = totalExp.length > 0 ? totalExp[0].totalExp : 0;
        const totalRegValue = totalReg.length > 0 ? totalReg[0].totalReg : 0;
        const totalStrValue = totalStr.length > 0 ? totalStr[0].totalStr : 0;

        // Jumlahkan total pendapatan dari semua jenis order paket
        const totalPendapatan = totalExpValue + totalRegValue + totalStrValue;

        // Kirim respons dengan total pendapatan yang telah dihitung
        res.json({
            totalExp: totalExpValue,
            totalReg: totalRegValue,
            totalStr: totalStrValue,
            subtotal: totalPendapatan
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};


exports.PemasukanPengeluaran = async (req, res) => {
    try {
        // Ambil total pendapatan dari masing-masing jenis order paket yang statusnya true
        const totalExp = await OrderPktExpress.aggregate([
            { $match: { status: true } },
            { $group: { _id: null, totalExp: { $sum: "$totalBayarExp" } } }
        ]);

        const totalReg = await OrderPktReguler.aggregate([
            { $match: { status: true } },
            { $group: { _id: null, totalReg: { $sum: "$totalBayarReg" } } }
        ]);

        const totalStr = await OrderPktSetrika.aggregate([
            { $match: { status: true } },
            { $group: { _id: null, totalStr: { $sum: "$totalBayarStr" } } }
        ]);

        // Ambil nilai total dari hasil aggregasi
        const totalExpValue = totalExp.length > 0 ? totalExp[0].totalExp : 0;
        const totalRegValue = totalReg.length > 0 ? totalReg[0].totalReg : 0;
        const totalStrValue = totalStr.length > 0 ? totalStr[0].totalStr : 0;

        // Jumlahkan total pendapatan dari semua jenis order paket
        const totalPendapatan = totalExpValue + totalRegValue + totalStrValue;

        // Ambil total pengeluaran dari pengajuan barang yang statusnya true
        const pengajuan = await PengajuanBarang.aggregate([
            { $match: { status: true } },
            { $group: { _id: null, totalPengeluaran: { $sum: "$totalHarga" } } }
        ]);

        // Ambil nilai total pengeluaran dari hasil aggregasi
        const totalPengeluaranValue = pengajuan.length > 0 ? pengajuan[0].totalPengeluaran : 0;

        // Kirim respons dengan total pendapatan dan pengeluaran yang telah dihitung
        res.json({
            success: true,
            message: "Pemasukan dan Pengeluaran berhasil dihitung",
            data: {
                totalPendapatan,
                totalPengeluaran: totalPengeluaranValue,
                netIncome: totalPendapatan - totalPengeluaranValue // Pemasukan bersih
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};