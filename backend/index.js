const express = require("express");
const qr = require("qr-image");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-qr", (req, res) => {
  const url = req.body.url;
  const qr_svg = qr.image(url, { type: 'png' });
  res.type('png');
  qr_svg.pipe(res);
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
