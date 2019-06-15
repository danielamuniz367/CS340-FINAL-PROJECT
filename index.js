var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var port = process.env.PORT || 13151;

app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));


// mysql login info to access db

var mysql = require('mysql');
var pool = mysql.createPool({
	host            : 'classmysql.engr.oregonstate.edu',
	user            : 'cs340_hennigam',
	password        : '0958',
	database        : 'cs340_hennigam',
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// to render handlebars home page

app.get('/', function (req, res){
  res.render('home');
})

// to display database of students / staff / pets / classes / houses

app.get('/students/',function (req, res){
  var payload = {};
  pool.query('SELECT * FROM students', function(err, rows, fields){
    if(err){
      console.log(err);
      return;
    }
    payload.rows = rows;
    res.send(payload);
  });
});

app.get('/staff/',function (req, res){
  var payload = {};
  pool.query('SELECT * FROM staff', function(err, rows, fields){
    if(err){
      console.log(err);
      return;
    }
    payload.rows = rows;
    res.send(payload);
  });
});

app.get('/pets/',function (req, res){
  var payload = {};
  pool.query('SELECT * FROM pets', function(err, rows, fields){
    if(err){
      console.log(err);
      return;
    }
    payload.rows = rows;
    res.send(payload);
  });
});

app.get('/classes/',function (req, res){
  var payload = {};
  pool.query('SELECT classes.id, classes.class_name, classes.instructor_id, staff.lname FROM classes INNER JOIN staff ON classes.instructor_id = staff.id', function(err, rows, fields){
    if(err){
      console.log(err);
      return;
    }
    payload.rows = rows;
    res.send(payload);
  });
});


// to add new workout into log

app.post('/students/',function (req, res){
  var payload = {};
  var sql = "INSERT INTO students (fname, lname, type, class_year, house_id) VALUES (?,?,?,?,?);";
  var values = [req.body.fname, 
                req.body.lname, 
                req.body.type,
                req.body.class_year,
                req.body.house_id];
  sql = mysql.format(sql, values);
  pool.query(sql, function() {
    pool.query("SELECT * FROM students;", function(err, rows, fields){
      if(err){
        console.log(err);
        return;
    }
    payload.rows = rows;
    res.send(payload);
    });
  });
});

app.post('/staff/',function (req, res){
  var payload = {};
  var sql = "INSERT INTO staff (fname, lname, type, house_id, role) VALUES (?,?,?,?,?);";
  var values = [req.body.fname, 
                req.body.lname, 
                req.body.type,
                req.body.house_id,
                req.body.role];
  sql = mysql.format(sql, values);
  pool.query(sql, function() {
    pool.query("SELECT * FROM staff;", function(err, rows, fields){
      if(err){
        console.log(err);
        return;
    }
    payload.rows = rows;
    res.send(payload);
    });
  });
});

app.post('/pets/',function (req, res){
  var payload = {};
  var sql = "INSERT INTO pets (name, species) VALUES (?,?);";
  var values = [req.body.name, 
                req.body.species];
  sql = mysql.format(sql, values);
  pool.query(sql, function() {
    pool.query("SELECT * FROM pets;", function(err, rows, fields){
      if(err){
        console.log(err);
        return;
    }
    payload.rows = rows;
    res.send(payload);
    });
  });
});

app.post('/classes/',function (req, res){
  var payload = {};
  var sql = "INSERT INTO classes (class_name, instructor_id) VALUES (?,?);";
  var values = [req.body.class_name, 
                req.body.instructor_id];
  sql = mysql.format(sql, values);
  pool.query(sql, function() {
    pool.query("SELECT * FROM classes;", function(err, rows, fields){
      if(err){
        console.log(err);
        return;
    }
    payload.rows = rows;
    res.send(payload);
    });
  });
});

// to update workout entry

app.put('/students/:id',function (req, res){
  var payload = {};
  var sql = "UPDATE students SET fname=?, lname=?, type=?, class_year=?, house_id=?  WHERE id=? ";
  var values = [req.body.fname || curVals.fname, 
        req.body.lname || curVals.lname, 
        req.body.type || curVals.type,
        req.body.class_year || curVals.class_year,
        req.body.house_id || curVals.house_id, 
        req.body.id];
  sql = mysql.format(sql, values);
  pool.query("SELECT * FROM students WHERE id=?", [req.params.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query(sql, function() {
        pool.query("SELECT * FROM students;", function(err, rows, fields){
          if(err){
            console.log(err);
            return;
        }
        payload.rows = rows;
        res.send(payload);
        });
      });
    };
  });
});

app.put('/staff/:id',function (req, res){
  var payload = {};
  var sql = "UPDATE staff SET fname=?, lname=?, type=?, house_id=?, role=?  WHERE id=? ";
  var values = [req.body.fname || curVals.fname, 
        req.body.lname || curVals.lname, 
        req.body.type || curVals.type,
        req.body.house_id || curVals.house_id,
        req.body.role || curVals.role, 
        req.body.id];
  sql = mysql.format(sql, values);
  pool.query("SELECT * FROM staff WHERE id=?", [req.params.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query(sql, function() {
        pool.query("SELECT * FROM staff;", function(err, rows, fields){
          if(err){
            console.log(err);
            return;
        }
        payload.rows = rows;
        res.send(payload);
        });
      });
    };
  });
});

app.put('/pets/:id',function (req, res){
  var payload = {};
  var sql = "UPDATE pets SET name=?, species=? WHERE id=? ";
  var values = [req.body.name || curVals.name, 
        req.body.species || curVals.species, 
        req.body.id];
  sql = mysql.format(sql, values);
  pool.query("SELECT * FROM pets WHERE id=?", [req.params.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query(sql, function() {
        pool.query("SELECT * FROM pets;", function(err, rows, fields){
          if(err){
            console.log(err);
            return;
        }
        payload.rows = rows;
        res.send(payload);
        });
      });
    };
  });
});

app.put('/classes/:id',function (req, res){
  var payload = {};
  var sql = "UPDATE classes SET class_name=?, instructor_id=? WHERE id=? ";
  var values = [req.body.class_name || curVals.class_name, 
        req.body.instructor_id || curVals.instructor_id, 
        req.body.id];
  sql = mysql.format(sql, values);
  pool.query("SELECT * FROM classes WHERE id=?", [req.params.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query(sql, function() {
        pool.query("SELECT * FROM classes;", function(err, rows, fields){
          if(err){
            console.log(err);
            return;
        }
        payload.rows = rows;
        res.send(payload);
        });
      });
    };
  });
});

// to delete workout log entry

app.post('/students/:id', function (req, res) {
  var payload = {};
  var sql = "DELETE FROM students WHERE id = ?;";
  var id = req.params.id;
  sql = mysql.format(sql, id);
  pool.query(sql, function() {
    pool.query("SELECT * FROM students;", function(err, rows, fields) {
      if(err){
        console.log(err);
        return;
      }
      payload.rows = rows;
      res.send(payload);
    });
  });
})

app.post('/staff/:id', function (req, res) {
  var payload = {};
  var sql = "DELETE FROM staff WHERE id = ?;";
  var id = req.params.id;
  sql = mysql.format(sql, id);
  pool.query(sql, function() {
    pool.query("SELECT * FROM staff;", function(err, rows, fields) {
      if(err){
        console.log(err);
        return;
      }
      payload.rows = rows;
      res.send(payload);
    });
  });
})

app.post('/pets/:id', function (req, res) {
  var payload = {};
  var sql = "DELETE FROM pets WHERE id = ?;";
  var id = req.params.id;
  sql = mysql.format(sql, id);
  pool.query(sql, function() {
    pool.query("SELECT * FROM pets;", function(err, rows, fields) {
      if(err){
        console.log(err);
        return;
      }
      payload.rows = rows;
      res.send(payload);
    });
  });
})

app.post('/classes/:id', function (req, res) {
  var payload = {};
  var sql = "DELETE FROM classes WHERE id = ?;";
  var id = req.params.id;
  sql = mysql.format(sql, id);
  pool.query(sql, function() {
    pool.query("SELECT * FROM classes;", function(err, rows, fields) {
      if(err){
        console.log(err);
        return;
      }
      payload.rows = rows;
      res.send(payload);
    });
  });
})

// 404 error - use the handlebars 404 page

app.use(function(req, res){                 
	res.status(404);
	res.render("404");
});

// 500 error - use the handlebars 500 page

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500);
	res.render("500");
});

// display in console that app is running and on what port

app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});