
// Dependencies
// path package is needed for the path to the html files
const path = require('path');


module.exports = (app) => {

    // Route to the home page is no matching route is found
    app.get('/', (req, res) => {
        console.log(__dirname);
        console.log(path.join(__dirname,'../public/index.html'));
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    // Route to the notes page
    app.get('/notes', (req, res) => {
        console.log(__dirname);
        console.log(path.join(__dirname,'../public/notes.html'));
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
}

   