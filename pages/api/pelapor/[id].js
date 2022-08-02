import db from "../../../utils/db";import Pelapor from "../../../models/Pelapor";
export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "PUT":
      try {
        await db();
        const { id } = req.query;
        const { respon } = req.body;
        const pelapor = await Pelapor.findByIdAndUpdate(
          id,
          {
            respon: respon,
            statusRespon: "1",
          },
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(200);
        res.json({
          data: pelapor,
        });
      } catch (error) {
        res.status(400).end();
      }
      break;

    case "GET":
      try {
        await db();
        const { id } = req.query;
        const pelapor = await Pelapor.findOne({ nohp: id })
          .populate({
            path: "categoryId1",
            select: "name",
          })
          .populate({
            path: "categoryId2",
            select: "name",
          });
        res.status(200);
        res.json({ data: pelapor });
      } catch (error) {
        res.status(400).end();
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}
