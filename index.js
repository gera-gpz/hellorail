const express     = require('express');
const mysql       = require('mysql2/promise');


const PORT      = process.env.PORT          || 8082 
const DBHOST    = process.env.MYSQLHOST     || 'localhost'
const DBPORT    = process.env.MYSQLPORT     ||  3306
const DBDATABASE= process.env.MYSQLDATABASE || 'crud'
const DBUSER    = process.env.MYSQLUSER     || 'root'
const DBPASSWORD= process.env.MYSQLPASSWORD || ''

              
const pool = mysql.createPool({
    host:               DBHOST,
    user:               DBUSER,
    database:           DBDATABASE,
    port:               DBPORT,
    password:           DBPASSWORD,
    waitForConnections: true,
    connectionLimit:    10,
    queueLimit:         0
});

const app = express();

app.use(express.json());
app.use(express.text());


app.get('/usuarios', async (req,res) => { 
    //  const [rows] = await pool.execute('SELECT * FROM `cusuario`');
    //  res.json(rows);
    res.json({mensaje:"Hola"});
});


app.get('/usuarios/:id', async (req,res) => { 
    const [rows] = await pool.execute('SELECT * FROM `cusuario` WHERE `idUsuario` = ?', [req.params.id]);
    
    if (rows.length==0) {
        res.json({registros:"No se encontro usuario"});
    } else {
        res.json(rows);
    }
});


app.listen(PORT,()=>{  
    console.log(`Servidor Express corriendo y escuchando en el puerto ${PORT}`);
});
