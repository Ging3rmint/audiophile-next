const { products } = require("./data.json");

const handler = (req: any, res: any) => {
  if (req.method === "GET") {
    res.status(200).json(products);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
};

export default handler;
