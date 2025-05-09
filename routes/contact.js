const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { nom, email, message } = req.body;

  try {
    // Transporteur SMTP (ex : Gmail ou autre service)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ton email
        pass: process.env.EMAIL_PASS, // mot de passe ou app password
      },
    });

    // Email à envoyer
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_TO, // ton email de réception
      subject: `Nouveau message de ${nom}`,
      text: message,
    });

    res.status(200).json({ message: "Message envoyé avec succès" });
  } catch (err) {
    console.error("Erreur d'envoi d'email :", err);
    res.status(500).json({ error: "Échec de l'envoi du message" });
  }
});

module.exports = router;
