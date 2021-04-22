
const fs = require('fs');

// link routes to this data source

let rawData = fs.readFileSync('./db/db.json');
let db = JSON.parse(rawData);

let dbNotes = [];
console.log("db = " + db);
for (var i = 0; i < db.length; i++) {
    dbNotes.push( {
        id: i,
        title: db[i].title,
        text: db[i].text
    })
}



module.exports = (app) => {

    // console.log(dbNotes);
    app.get('/api/notes', (req, res) => res.json(dbNotes));


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
        // console.log(res);
        console.log("This is app.post");
        console.log(req.body);
        req.body.id = dbNotes.length;
        dbNotes.push(req.body);
        writeNotesToFile(dbNotes);
        console.log(dbNotes);
        res.json(dbNotes);
    });


    // this deletes the note specified by the id  and writes
    // the updated list out to the db.json file
    app.delete('/api/notes/:id', (req, res) => {

        console.log("This is app.delete");
        console.log("dbNotes before:\n ");
        console.log(dbNotes);
        console.log(req.body);
        dbNotes.splice(req.params.id, 1);
        console.log(req.params.id);
        console.log("dbNotes after: \n ");
        console.log(dbNotes);
        writeNotesToFile(dbNotes);
        res.json(dbNotes);
    });

}










