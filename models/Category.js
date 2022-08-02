import { Schema, model, models, ObjectId, mongoose } from "mongoose";const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pelaporId: [
      {
        type: ObjectId,
        ref: "Pelapor",
      },
    ],
  },
  {
    timestamps: true,
  }
);
//module.exports = mongoose.model('Category', categorySchema);

const Category = models.Category || model("Category", categorySchema);
/*

Udah beberapa kali ganti model karena ada tambahan data
Tips: Data yang dahulu distore oleh MongoDB, jadi harus ganti nama model

*/
export default Category;
