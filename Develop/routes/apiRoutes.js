// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const db = require("../db/db.json");
const uuid = require("uuid")
const fs = require('fs')


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    return res.json(db);
  });

  
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
  console.log(db);

  var newNotes = {
        id: uuid.v4().slice(0, 4),
        title: req.body.title,
        text: req.body.text,
  };
    console.log(newNotes);
    db.push(newNotes)
    fs.writeFile("../Develop/db/db,json", JSON.stringify(db), function (err) {
        if (err) throw err;
        return res.json(db);
    })
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.delete("/api/notes/:id", function(req, res) {
    // Empty out the arrays of data
    var id = req.params.id;
    db.splice(id -1, 1);
    db.forEach((obj, i) => {
        obj.id = i + 1
    });

    fs.writeFile("./Develop/db/db.json", JSON.stringify(db), function() {
        res.json(db);
    })
  });

};
