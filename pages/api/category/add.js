import db from "../../../utils/db";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await db();

        const { name } = req.body;

        const category = await Category.create({ name });

        res.status(200);

        res.json({
          data: name,
          message: `Successfully created ${category.name}`,
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
