/* GET collections listing. */
exports.list = function(db) {
  return function(req, res) {
    var collection = db.collection('databases');
    var ObjectID = require('mongodb').ObjectID;

    collection.find({ _id: new ObjectID(req.params.database_id) }).toArray(function(err, docs) {
      var post = docs[0];
      var connection = require('mongoskin').db("mongodb://localhost/"+post.name, { native_parser:true });
      connection.collectionNames(function(err, collections){
        console.log(collections);
        return res.render('collections', { title: 'Collections on '+post.name, collections: collections });
      });
    });
  }
};

exports.choose_database = function(db) {
  return function(req, res) {
    res.render('collections_choose_database', {
      title: 'New Database'
    });
  }
};

exports.add_database = function(db) {
  return function(req, res) {
    var collection = db.collection('databases');
    var dbname = req.param('name');
    collection.insert({ name: dbname }, 
      function(err, result) {
        console.log(err); 
        res.redirect('/');  
      }
    );
  }
};
