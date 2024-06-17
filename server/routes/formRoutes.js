const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/submit", formController.submitForm);
router.get("/entries", formController.getEntries);
router.get("/refresh", formController.refreshExcel);

module.exports = router;
