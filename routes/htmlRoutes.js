
// Dependencies
// path package is needed for the path to the html files
const path = require('path');


module.exports = (app) => {

    // Route to the notes page
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });


    // Route to the home page if anything besides /notes is entered.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

}

   