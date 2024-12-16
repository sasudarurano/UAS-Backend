const multer = require("multer"); // Mengimpor modul multer untuk menangani file upload
const path = require("path"); // Mengimpor modul path untuk mempermudah pengelolaan jalur file

// Konfigurasi penyimpanan file dengan multer
const storage = multer.diskStorage({
  // Menentukan lokasi penyimpanan file
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/uploads")); // Menyimpan file di folder public/uploads
  },
  // Menentukan nama file yang akan disimpan
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Menambahkan suffix unik untuk menghindari duplikasi nama file
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname) // Membuat nama file baru dengan format [fieldname]-[uniqueSuffix].[ext]
    );
  },
});

// Filter file untuk membatasi jenis file yang dapat diunggah
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/; // Hanya memperbolehkan tipe file gambar
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase() // Mengecek ekstensi file
  );
  const mimetype = allowedTypes.test(file.mimetype); // Mengecek MIME type file

  if (extname && mimetype) {
    cb(null, true); // Jika valid, lanjutkan proses upload
  } else {
    cb(new Error("Only images are allowed!"), false); // Jika tidak valid, kirimkan error
  }
};

// Konfigurasi multer
const upload = multer({
  storage, // Menggunakan konfigurasi storage yang telah dibuat
  limits: { fileSize: 2 * 1024 * 1024 }, // Membatasi ukuran file maksimum menjadi 2MB
  fileFilter, // Menggunakan filter file yang telah dibuat
});

// Mengekspor konfigurasi multer agar dapat digunakan di file lain
module.exports = upload;