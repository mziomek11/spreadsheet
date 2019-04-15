const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

// Impoering model
const Spreadsheet = require("../../models/Spreadsheet");

// @GET     api/spreadsheet
// @desc    Get All Spreadsheets
// @access  Private
router.get("", auth, (req, res) => {
    Spreadsheet.find({owner: req.user.id}).sort({date: -1}).then(spreadsheets => res.json(spreadsheets));
});

// @POST    api/spreadsheet
// @desc    Create A Spreadsheet
// @access  Private
router.post("", auth, (req, res) => {
    const newSpreadsheet = new Spreadsheet({
        name: req.body.name,
        owner: req.user.id
    });
    newSpreadsheet.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json({msg: "Send correct data"}))
});

// @GET     api/spreadsheet/:id
// @desc    Get One Spreadsheet
// @access  Private
router.get("/:id", auth, (req, res) => {
    Spreadsheet.findById(req.params.id)
    .then(spreadsheet => {
        if(spreadsheet.owner === req.user.id){
            res.json(spreadsheet)
        }else {
            res.status(403).json({msg: "Access denied"})
        };
    })
    .catch(err => res.status(404).json({msg: "Spreadsheet does not exists"}));
});

// @UPDATE  api/spreadsheet/:id/update
// @desc    Update A Spreadsheet
// @access  Private
router.put("/:id/update", auth, (req, res) => {
    Spreadsheet.findById(req.params.id)
    .then(spreadsheet => {
        if(spreadsheet.owner === req.user.id){
            Spreadsheet.findByIdAndUpdate(req.params.id, { $set: {name: req.body.name}})
            .then(() => res.json(spreadsheet));
        }else {
            res.status(403).json({msg: "Access denied"});
        };
    })
    .catch(err => res.status(404).json({msg: "Spreadsheet does not exists"}));
});

// @DELETE  api/spreadsheet/:id/delete
// @desc    Delete A Spreadsheets
// @access  Private
router.delete("/:id/delete", auth, (req, res) => {
    Spreadsheet.findById(req.params.id)
    .then(spreadsheet => {
        if(spreadsheet.owner === req.user.id){
            Spreadsheet.findByIdAndDelete(req.params.id)
            .then(() => res.json({success: true}))
        }else {
            res.status(403).json({msg: "Access denied"});
        };
    })
    .catch(err => res.status(404).json({msg: "Spreadsheet does not exists"}));
});

module.exports = router;