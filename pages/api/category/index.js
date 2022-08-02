import db from "../../../utils/db";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        await db();

        const category = await Category.find();

        if (!category)
          res.status(400).json({ message: "Error displaying data" });

        res.status(200);

        res.json({
          data: category,
          message: "Success get all category",
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
