import db from "../../../utils/db";import Pelapor from "../../../models/Pelapor";
import Category from "../../../models/Category";
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        await db();
        const {
          nohp,
          nama,
          jenisKelamin,
          usia,
          tglvaksin1,
          categoryId1,
          tmptvaksin1,
          about1,
          tglvaksin2,
          categoryId2,
          tmptvaksin2,
          about2,
          about,
        } = req.body;

        const category1 = await Category.findOne({ _id: categoryId1 });
        const category2 = await Category.findOne({ _id: categoryId2 });

        //  const categoryName = await Category.findOne({name: })

        const newItem = {
          nohp,
          nama,
          jenisKelamin,
          usia,
          tglvaksin1,
          categoryId1: category1._id,
          tmptvaksin1,
          about1,
          tglvaksin2,
          categoryId2: category2._id,
          tmptvaksin2,
          about2,
          about,
        };

        const pelapor = await Pelapor.create(newItem);
        category1.pelaporId.push({ _id: pelapor._id });
        category2.pelaporId.push({ _id: pelapor._id });

        await category1.save();
        await category2.save();
        await pelapor.save();
        res.status(200);
        res.json({
          data: req.body,
        });
      } catch (error) {
        console.log(error);
        res.status(400).end();
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}
