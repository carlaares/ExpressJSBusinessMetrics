/* GET collections listing. */
exports.list = function(db) {
  return function(req, res) {
    // var db = mongo.db("mongodb://localhost/business-metrics", {native_parser:true});

    db.collectionNames(function(err, collections){
      console.log(collections);
    });
    res.json('a');
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
  function(req, res){
    var collection = db.collection('databases');
    collection.insert(
      { name: req.param('name')}, 
      function(err, result) { 
        res.redirect('/');  
      }
    );
  }
};
