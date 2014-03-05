/* GET collections listing. */
exports.list = function(db) {
  return function(req, res) {
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
