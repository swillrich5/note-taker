
const fs = require('fs');
const {v4 : uuidv4} = require('uuid');

// read the notes from the db.json file and 
// put them in the dbNotes array, adding an id
let rawData = fs.readFileSync('./db/db.json');
let db = JSON.parse(rawData);

let dbNotes = [];
for (var i = 0; i < db.length; i++) {
    dbNotes.push( {
        id: uuidv4(),
        title: db[i].title,
        text: db[i].text
    })
}



module.exports = (app) => {

    // console.log(dbNotes);
    app.get('/api/notes', (req, res) => res.json(dbNotes));

    // writes out the array of note object to file
    // called every time a note is added or deleted
    function writeNotesToFile(notesList) {
        var notes = [];
        for (var i = 0; i < notesList.length; i++) {
            notes.push( {
                title: notesList[i].title,
                text: notesList[i].text
            })
        }
        fs.writeFileSync('./db/db.json', JSON.stringify(notes), err => {
            if (err) {
                console.log('Error = ' + err);
            }
        });
    }


    // this code will save the note by pushing it on to dbNotes
    // it also updates the db.json file with the updated list
    app.post('/api/notes', (req, res) => {
        req.body.id = uuidv4();
        dbNotes.push(req.body);
        writeNotesToFile(dbNotes);
        res.json(dbNotes);
    });


    // this deletes the note specified by the id  and writes
    // the updated list out to the db.json file
    app.delete('/api/notes/:id', (req, res) => {
        dbNotes.splice(req.params.id, 1);
        writeNotesToFile(dbNotes);
        res.json(dbNotes);
    });

}










