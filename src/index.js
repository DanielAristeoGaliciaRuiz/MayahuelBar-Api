const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

const ventasRoutes = require('./routes/ventas.routes');
const productosRoutes = require('./routes/productos.routes')
const reportesRoutes = require('./routes/reportes.routes');

dotenv.config();


app.use(cors());
app.use(express.json());

app.use('/api/ventas', ventasRoutes);
app.use('/api/productos',productosRoutes);
app.use('/api/reportes', reportesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
