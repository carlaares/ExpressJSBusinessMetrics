/* GET collections listing. */
exports.show_graph = function (req, res) {
  var connection = require('mongoskin').db("mongodb://localhost/"+req.params.database_name, { native_parser:true });
  var today = new Date();
  var today_unix = (new Date(today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()+' 00:00:00')).getTime()/1000;
  connection.collection(req.params.collection_name).find( { time: { $gte: today_unix }}).toArray(function(err, values) {
    var graph_values = [];
    for(var x in values) {
      graph_values[x] = { x: values[x].time, y: values[x].count };
    }
    return res.render('graph', { title: 'Graphics for '+req.params.database_name+' .'+req.params.collection_name, values: graph_values });
  });
};

exports.list = function(db) {
  return function(req, res) {
    var collection = db.collection('databases');
    var ObjectID = require('mongodb').ObjectID;

    collection.find({ _id: new ObjectID(req.params.database_id) }).toArray(function(err, docs) {
      var post = docs[0];
      var connection = require('mongoskin').db("mongodb://localhost/"+post.name, { native_parser:true });
      connection.collections(function(err, collections){
        return res.render('collections', { title: 'Collections on '+post.name, collections: collections, database_name: post.name });
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
