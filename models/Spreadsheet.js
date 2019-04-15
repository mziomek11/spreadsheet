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
    }
});

module.exports = Spreadsheet = mongoose.model('spreadsheet', SpreadsheetSchema);