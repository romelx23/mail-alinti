const { response } = require("express");
const { mail } = require("../helpers/mail");

const sendEmail = async (req, res = response) => {
  try {
    // console.log(req.body);
    const data = JSON.parse(req.body.data);
    // console.log(data);

    // console.log(req.body);
    // console.log(req.files);

    const send = await mail({
      data,
      image: req.files.image,
    });

    res.status(200).json({
      ...send,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

module.exports = {
  sendEmail,
};
