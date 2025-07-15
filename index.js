const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
const pxpRoutes = require("./routes/pxpRoutes");
app.use("/api/pxp", pxpRoutes);

app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
