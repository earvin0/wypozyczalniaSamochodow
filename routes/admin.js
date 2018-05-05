var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment')

/* GET home page. */

router.get('/', function(req, res, next) {
    var db = mysql.createConnection({
      host: 'localhost',
      user: 'fafik',
      password: 'password',
      database: 'wypozyczalnia'
    })

    db.connect();

    db.query('SELECT * FROM rezerwacje;',function(error,dane2){
        console.log(dane2);
        res.render('admin', { moment: moment, dane: dane2});
    }

    );

});

router.post('/cars', function(req, res, next) {
    var db = mysql.createConnection({
      host: 'localhost',
      user: 'fafik',
      password: 'password',
      database: 'wypozyczalnia'
    })

    db.connect();

    db.query('SELECT * FROM samochody;',function(error,dane2){
        console.log(dane2);
        res.render('admincars', { dane: dane2});
    }

    );

});

router.post('/accept', function(req, res, next) {
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'fafik',
        password: 'password',
        database: 'wypozyczalnia'
      })
  
      db.connect();
  
      var id = req.body.ID;
      var personID = req.body.personID;
      var query = 'UPDATE rezerwacje SET stan=\"potwierdzona\" where ID='+id+' AND personID='+personID+';';
      console.log(query);
      db.query(query,function(error,dane2){
          console.log(dane2);
          res.redirect('/admin');
      }
  
      );
});

router.post('/modify', function(req, res, next) {
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'fafik',
        password: 'password',
        database: 'wypozyczalnia'
      })
  
      db.connect();
  
      var id = req.body.ID;
      var personID = req.body.personID;
      var query = 'SELECT * FROM rezerwacje where ID='+id+' AND personID='+personID+';';
      console.log(query);
      db.query(query,function(error,dane2){
          console.log(dane2);
          res.render('adminmodify', { item: dane2});
      }
  
      );
});

router.post('/modify2', function(req, res, next) {
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'fafik',
        password: 'password',
        database: 'wypozyczalnia'
      })
  
      db.connect();
  
      var id = req.body.ID;
      var personID = req.body.personID;
      var data_od = req.body.data_od ;
      var data_do = req.body.data_do ;

      var query = 'UPDATE rezerwacje SET data_od="'+data_od+'", data_do="'+data_do+'", stan="oczekujaca" where ID='+id+' AND personID='+personID+';';
      console.log(query);
      db.query(query,function(error,dane2){
        console.log(dane2);
        res.redirect('/admin');
    });
});

router.post('/cancel', function(req, res, next) {
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'fafik',
        password: 'password',
        database: 'wypozyczalnia'
      })
  
      db.connect();
  
      var id = req.body.ID;
      var personID = req.body.personID;
      var query = 'DELETE FROM rezerwacje where ID='+id+' AND personID='+personID+';';
      db.query(query,function(error,dane2){
          console.log(dane2);
          res.redirect('/admin');
      }
  
      );
});

module.exports = router;
