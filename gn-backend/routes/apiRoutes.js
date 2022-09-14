const express = require("express");
const controller = require("../controllers/apiController");

const router = express.Router();

router.get("/getNotes/", controller.notes_all_get);

router.get("/note/:id", controller.note_ID_get);

router.post("/addnote", controller.note_add_post);

router.post("/modifynote", controller.note_modify_post);

router.delete("/deletenote/:id", controller.note_ID_delete);

module.exports = router;