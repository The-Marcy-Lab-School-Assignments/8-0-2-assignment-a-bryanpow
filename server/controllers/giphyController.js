const { fetchData } = require("../utils");

exports.serveGifs = async (req, res, send) => {
  const { search } = req.query;
  console.log(process.env.API_KEY)
  const API_URL = search
    ? `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=3&rating=g`
    : `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=3&rating=g`;
  /* FEEDBACK: since fetchData does the try/catch, you don't need
  to do that here. If the error is returned, then you can use
  that returned value to handle errors */

  try {
    const [data, error] = await fetchData(API_URL);
    if (error) throw new Error(error);
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(404);
  }
};
