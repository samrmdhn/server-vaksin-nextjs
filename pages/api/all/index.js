import Category from "../../../models/Category";
import Pelapor from "../../../models/Pelapor";
import db from "../../../utils/db";

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        await db();
        const category = await Category.find();
        const pelapor = await Pelapor.find();
        const allData = { category, pelapor };
        console.log(allData);
        res.status(200);
        res.json({
          message: "Success get all data",
          data: allData,
        });
      } catch (error) {
        res.status(400).end();
      }
      break;
    default:
      res.status(405).end();
      break;
  }
}
