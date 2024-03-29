const chalk = require("chalk");
const Note = require("./models/Note");

async function addNote(date, fio, numberPhone, title, Owner) {
  await Note.create({ date, fio, numberPhone, title, Owner });

  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  const notes = await Note.find();

  return notes;
}

async function removeNote(id, owner) {
  await Note.deleteOne({ _id: id, Owner: owner });
  console.log(chalk.red(`Note with id="${id}" has been removed.`));
}

async function updateNote(noteData, owner) {
  const result = await Note.updateOne(
    { _id: noteData.id, Owner: owner },
    {
      fio: noteData.fio,
      numberPhone: noteData.numberPhone,
      title: noteData.title,
      Owner: owner,
    }
  );
  if (result.matchedCount === 0) {
    throw new Error("No note to edit");
  }
  console.log(chalk.bgGreen(`Note with id="${noteData.id}" has been updated!`));
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
};
