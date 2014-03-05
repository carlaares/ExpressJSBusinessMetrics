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
    
    res.json('a');
  }
};
