const { Router } = require("express");
const { sendEmail } = require("../controllers/requestRegister");

const router = Router();

router.get("/", (req, res) => {
  res.send("GET request to the war send email");
});

router.post("/", [], sendEmail);

module.exports = router;
