const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

// Impoering model
const Spreadsheet = require("../../models/Spreadsheet");

// @GET     api/spreadsheet
// @desc    Get All Spreadsheets
// @access  Private
router.get("/", (req, res) => {
    Spreadsheet.find().sort({date: -1}).then(spreadsheets => res.json(spreadsheets));
});

// @POST    api/spreadsheet
// @desc    Create A Spreadsheet
// @access  Private
router.post("/", auth, (req, res) => {
    const newSpreadsheet = new Spreadsheet({
        name: req.body.name
    });
    newSpreadsheet.save().then(item => res.json(item));
});

// @UPDATE  api/spreadsheet/:id/update
// @desc    Update A Spreadsheet
// @access  Private
router.put("/:id/update", auth, (req, res) => {
    Spreadsheet.findByIdAndUpdate(req.params.id, { $set: {name: body.req.name}})
    .then(() => res.json({success: true}))
    .catch(err => res.status(404).json({success: false}));
});

// @DELETE  api/spreadsheet/:id/delete
// @desc    Delete A Spreadsheets
// @access  Private
router.delete("/:id/delete", auth, (req, res) => {
    Spreadsheet.findByIdAndDelete(req.params.id)
    .then(() => res.json({success: true}))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;