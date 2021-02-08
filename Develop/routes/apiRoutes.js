// ===============================================================================
// LOAD DATA & DEPENDENCIES
// Linking the route to the data source (db.json)
// Adding in the dependencies required for the code to function
// ===============================================================================

const db = require("../db/db.json");
const uuid = require("uuid")
const fs = require('fs')


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    return res.json(db);
  });

  
  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
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

   // API DELETE Requests
  // ---------------------------------------------------------------------------
 

  app.delete("/api/notes/:id", function(req, res) {
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
