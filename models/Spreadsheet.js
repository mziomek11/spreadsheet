const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpreadsheetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    owner: {
        type: String,
        required: true
    }
});

module.exports = Spreadsheet = mongoose.model('spreadsheet', SpreadsheetSchema);