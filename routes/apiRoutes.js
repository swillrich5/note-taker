
const fs = require('fs');

// link routes to this data source

let rawData = fs.readFileSync('./db/db.json');
let dbNotes = JSON.parse(rawData);



module.exports = (app) => {

    // console.log(dbNotes);
    app.get('/api/notes', (req, res) => res.json(dbNotes));


    // this code will save the note by pushing it on to dbNotes
    app.post('/api/notes', (req, res) => {
        // console.log(res);
        console.log("This is app.post");
        console.log(req.body);
        dbNotes.push(req.body);
        console.log(dbNotes);
        res.json(dbNotes);


    });

}










