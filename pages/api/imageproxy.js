export default async (req, res) => {
  const url = req.query.url;
  const result = await fetch(url);
  const body = await result.body;
  body.pipe(res);
};
