import db from "../../../../utils/db";
import Category from "../../../../models/Category";

export default async function handler(req, res) {
  //Best Practice
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        await db();

        const { id } = req.query;

        const { name } = req.body;

        const category = await Category.findByIdAndUpdate(
          id,
          { name },
          //Callback ini berfungsi untuk  mengupdate category tanpa harus findOne lagi dibawah
          {
            new: true,
            runValidators: true,
          }
        );

        if (!category) res.status(400).json({ message: "Category not found" });

        res.status(200);

        res.json({
          data: category,
          message: `Category updated to ${category.name}`,
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
