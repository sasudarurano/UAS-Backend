// middleware/roleMiddleware.js

// Middleware untuk memeriksa peran pengguna
const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      if (req.user && req.user.role === requiredRole) {
        // Jika pengguna memiliki role yang sesuai
        next(); // Lanjutkan ke middleware berikutnya
      } else {
        // Jika tidak memiliki role yang sesuai
        res.status(403).json({ message: "Access denied" }); // Kirim respons akses ditolak
      }
    };
  };
  
  module.exports = roleMiddleware; // Mengekspor middleware