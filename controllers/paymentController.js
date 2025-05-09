require("dotenv").config();
const axios = require("axios");

exports.createTransaction = async (req, res) => {
  try {
    const { amount, customer } = req.body;
    console.log("🔐 Clé API envoyée à FedaPay :", process.env.FEDAPAY_API_KEY);

    // console.log("Clé API FedaPay :", process.env.FEDAPAY_API_KEY);

    const response = await axios.post(
      "https://api.fedapay.com/v1/transactions",
      {
        amount,
        description: "Paiement pour une plante Naturamedica",
        currency: "XOF",
        callback_url: "https://votresite.com/success",
        customer,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FEDAPAY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json({
      message: "Transaction créée",
      url: response.data?.transaction?.url,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la création de la transaction :",
      error.response?.data || error.message || error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la transaction", error: error.message });
    // res.status(500).json({ message: "Erreur lors de la transaction" });
  }
};
