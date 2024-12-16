// model db js
// mengimpor modul mongoose untuk mengelola koneksi dengan mongodb
const mongoose = require("mongoose");

// fungsi asinkron untuk menghubungkan ke database mongodb
const connectDB = async () => {
    try {
        //menghubungkan ke mongodb menggunakan url koneksi
        await mongoose.connect(
             "mongodb+srv://mdpdb:z7uadx7mVcg36EvJ@cluster0.65fnm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        // jika koneksi berhasil log pesan ke konsol
        console.log("MongoDb Connected");
    } catch (error) {
        // jika terjadi kesalahan saat menghubungkan, log pesan kesalahan ke konsol
        console.error("MongoDB connection error:", error);
        // keluar dari proses dengan kode status 1 untuk menandakan ada kesalahan
        process.exit(1);
    }
};

module.exports = connectDB;