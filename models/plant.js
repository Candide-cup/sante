const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom de la plante est requis."],
    trim: true,
    minlength: [2, "Le nom doit contenir au moins 2 caractères."],
  },
  latinName: {
    type: String,
    trim: true,
  },
  origin: {
    type: String,
    trim: true,
  },
  partsUsed: {
    type: String,
    trim: true,
  },
  benefits: {
    type: String,
    trim: true,
    maxlength: [1000, "Les bienfaits doivent faire moins de 1000 caractères."],
  },
  preparation: {
    type: String,
    trim: true,
  },
  precautions: {
    type: String,
    trim: true,
  },
  availableQuantities: {
    type: [String],
    validate: {
      validator: (arr) => arr.length > 0,
      message: "Il faut au moins une quantité disponible.",
    },
  },
});

module.exports = mongoose.model("Plant", plantSchema);

// import mongoose from "mongoose";

// const plantSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Le nom de la plante est requis."],
//     trim: true,
//     minlength: [2, "Le nom doit contenir au moins 2 caractères."],
//   },
//   latinName: {
//     type: String,
//     trim: true,
//   },
//   origin: {
//     type: String,
//     trim: true,
//   },
//   partsUsed: {
//     type: String,
//     trim: true,
//   },
//   benefits: {
//     type: String,
//     trim: true,
//     maxlength: [1000, "Les bienfaits doivent faire moins de 1000 caractères."],
//   },
//   preparation: {
//     type: String,
//     trim: true,
//   },
//   precautions: {
//     type: String,
//     trim: true,
//   },
//   availableQuantities: {
//     type: [String],
//     validate: {
//       validator: (arr) => arr.length > 0,
//       message: "Il faut au moins une quantité disponible.",
//     },
//   },
// });

// const Plant = mongoose.model("Plant", plantSchema);
// export default Plant;
