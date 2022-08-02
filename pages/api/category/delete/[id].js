import db from "../../../../utils/db";
import Category from "../../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "DELETE":
      try {
        const deletedCategory = await Category.deleteOne({ _id: id });

        if (!deletedCategory)
          res.status(400).json({ message: "Category not found" });

        res.status(200);

        res.json({ message: "Delete success" });
      } catch (error) {
        res.status(400).end();
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}
