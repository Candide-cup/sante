const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      "https://sandbox.fedapay.com/v1/transactions",
      {
        amount: req.body.amount,
        currency: { iso: "XOF" },
        description: req.body.description,
        customer: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone_number: {
            number: req.body.phone,
            country: "BJ", // 🇧🇯 Bénin — adapte si besoin
          },
        },
        callback_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FEDAPAY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ url: response.data.transaction.url });
  } catch (err) {
    console.error("Erreur FedaPay :", err.response?.data || err.message);

    res.status(500).json({
      error: "Erreur lors de la création de la transaction",
      details: err.response?.data || err.message, // 🔍 ajoute ceci
    });
  }
});

module.exports = router;
