const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const plantRoutes = require("./routes/plantRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoute = require("./routes/contact");
const app = express();

app.use(cors());
app.use(express.json());

const plantes = [
  { id: 1, nom: "Aloe Vera", description: "Plante médicinale" },
  { id: 2, nom: "Lavande", description: "Calmante et antiseptique" },
];

app.get("/api/plantes", (req, rend) => {
  res.json(plantes);
});
// Connexion MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((err) => console.error("❌ Erreur de connexion à MongoDB :", err));

// Routes

app.use(express.json());
app.use("/api/contact", contactRoute);

app.use("/api/plants", plantRoutes);
app.use("/api/payments", paymentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Une erreur est survenue." });
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log("🚀 Serveur backend lancé sur http://localhost:3000");
});
