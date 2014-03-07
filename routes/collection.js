/* GET collections listing. */
function getLastWeek(){
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  return lastWeek ;
}

function getLastMonth(){
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 31);
  return lastWeek ;
}

function getUnixTime(today){
  return  (new Date(today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()+' 00:00:00')).getTime()/1000;
}

exports.show_graph = function (req, res) {
  var connection = require('mongoskin').db("mongodb://localhost/"+req.params.database_name, { native_parser:true });
  var today = new Date();
  var today_unix = getUnixTime(today);
  var graph_values = [];
  var week_graph_values = [];
  var month_graph_values = [];

  connection.collection(req.params.collection_name).find( { time: { $gte: today_unix }}).toArray(function(err, values) {
    for(var x in values) {
      graph_values[x] = { x: values[x].time, y: values[x].count };
    }
 
    var start_week_unix = getUnixTime(getLastWeek());
    connection.collection(req.params.collection_name).find( { time: { $gte: start_week_unix }}).toArray(function(err, values) {
      for(var x in values) {
        week_graph_values[x] = { x: values[x].time, y: values[x].count };
      }

      var start_month_unix = getUnixTime(getLastMonth());
      connection.collection(req.params.collection_name).find( { time: { $gte: start_month_unix }}).toArray(function(err, values) {
        for(var x in values) {
          month_graph_values[x] = { x: values[x].time, y: values[x].count };
        }
      });

      return res.render('graph', { 
        title: 'Graphics for '+req.params.database_name+' .'+req.params.collection_name,
        values: graph_values,
        week_values: week_graph_values, 
        month_values: month_graph_values
      });

    });

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
