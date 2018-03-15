const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
const command = argv._[0];
// console.log('Command: ', command);
// console.log('Process :', process.argv);
// console.log('Yargs: ', argv);

let note;
switch (command) {
    case 'add':
        note = notes.addNote(argv.title, argv.body);
        if (note) {
            console.log(argv.title, 'Note created successfully');
            notes.logNote(note);
        } else {
            console.log(argv.title, ' already in use');
        }
        break;
    case 'list':
        const notesList = notes.getAll();
        console.log(`Printing ${notesList.length} note(s).`);
        notesList.forEach(note => {
            notes.logNote(note);
        });
        break;
    case 'read':
        note = notes.getNote(argv.title);
        if (note) {
            console.log(argv.title, 'Note found');
            notes.logNote(note);
        } else {
            console.log('Note not found');
        }
        break;
    case 'remove':
        let noteRemoved = notes.removeNote(argv.title);
        let message = noteRemoved ? 'Note was removed' : 'Note not found';
        console.log(message);
        break;
    default:
        console.log('Command not recognized');
        break;
}
