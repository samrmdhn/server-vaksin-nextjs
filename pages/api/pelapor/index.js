import db from "../../../utils/db";import Pelapor from "../../../models/Pelapor";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        await db();
        const pelapor = await Pelapor.find();

        res.status(200);
        res.json({
          data: pelapor,
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
