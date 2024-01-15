const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  fio: {
    type: String,
    required: true,
  },
  numberPhone: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
