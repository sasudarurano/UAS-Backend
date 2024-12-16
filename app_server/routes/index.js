var express = require('express');
var router = express.Router();

// import controller
const mainController = require('../controllers/mainController');

//route
router.get('/', mainController.use);

router.get('/home', mainController.index);

// router.get('/about', mainController.about);

// router.get('/contact', mainController.contact);


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.get("/home", (req, res)=>{
//     // res.sendFile(__dirname + "/home.html");

//     const berita =[
//         {
//             judul: "berita 1",
//             isi: "isi berita 1"
            
//         },
//         {
//             judul: "berita 2",
//             isi: "isi berita 2"
//         }
//     ];
//     res.render('home',{title: 'halaman home',berita, layout:'main'});
// });

// router.get("/about", (req, res)=>{
//     // res.sendFile(__dirname + "/about.html");
//     res.render('about',{title: 'halaman about', layout:'main'});
// });


// router.get("/contact", (req, res)=>{
//     // res.sendFile(__dirname + "/contact.html");
//     res.render('contact',{title: 'halaman contact', layout:'main'});
// });

// router.get("/prodi",(req, res)=>{
//     const programstudi =[
//         {NamaProdi: "Sistem Informasi", Fakultas: "FIKR", Singkatan: "SI"},
//         {NamaProdi: "Informatika", Fakultas: "FIKR", Singkatan: "IF"},
//         {NamaProdi: "Teknik Elektro", Fakultas: "FIKR", Singkatan: "TE"},
//         {NamaProdi: "Manajemen Informatika", Fakultas: "FIKR",Singkatan: "MI"},
//         {NamaProdi: "Manajemen", Fakultas: "FEB", Singkatan: "MJ"},
//         {NamaProdi: "Akuntasi", Fakultas: "FEB", Singkatan: "AK"}
//     ];
//     res.render('prodi',{title: 'halaman prodi',programstudi,layout:'main'});
// });


// router.use("/",(req, res)=>{
//     res.send("<h1>404 not found</h1>");
// });

module.exports = router;
