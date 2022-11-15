var express = require('express');
var router = express.Router();
var database = require('../database');
var data_exporter = require('json2csv').Parser;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('datatable', { title: 'DataTable' });
});

router.get('/get_data', function(req, res, next) {
  var draw = req.query.draw;
  var start = req.query.start;
  var length = req.query.length;
  var order_data = req.query.order;
  if (typeof order_data == 'undefined') {
    var column_name = 'naziv';
    var column_sort_order = 'desc';
  }
  else {
    var column_index = req.query.order[0]['column'];
    var column_name = req.query.columns[column_index]['data'];
    var column_sort_order = req.query.order[0]['dir'];
  }
  var search_value = req.query.search['value'];
  var search_value_usporedi = [];
  search_value_usporedi.push(
    "'%",
    search_value,
    "%'"
  );
  var search_value_datum;
  var parsedDate = Date.parse(search_value);
  (search_value == '' || isNaN(parsedDate) || !isNaN(search_value)) ?  search_value_datum="'1.1.1'" : search_value_datum = "'" + search_value + "'";
  console.log(search_value_datum);
  var search_value_broj;
  (search_value == '' || isNaN(search_value)) ? search_value_broj = 0 : search_value_broj = search_value;
  console.log(search_value_broj);
  search_value_usporedi=search_value_usporedi.join('');
  var search_query = `
    AND (naziv LIKE ${search_value_usporedi}
      OR godina_osnivanja = ${search_value_broj}
      OR sjedište LIKE ${search_value_usporedi}
      OR država LIKE ${search_value_usporedi}
      OR email LIKE ${search_value_usporedi}
      OR oib_člana LIKE ${search_value_usporedi}
      OR broj_iskaznice_člana = ${search_value_broj}
      OR ime_člana LIKE ${search_value_usporedi}
      OR prezime_člana LIKE ${search_value_usporedi}
      OR datum_rođenja_člana = ${search_value_datum}
      OR uzrast LIKE ${search_value_usporedi}
      OR težina LIKE ${search_value_usporedi}
      OR spol LIKE ${search_value_usporedi}
      OR oib_trenera LIKE ${search_value_usporedi}
      OR ime_trenera LIKE ${search_value_usporedi}
      OR prezime_trenera LIKE ${search_value_usporedi}
      OR datum_rođenja_trenera = ${search_value_datum}
      OR istek_licence = ${search_value_datum}
     )
  `;

  var queryTotal = `select count(*) as total from klubclantrener`;
  var queryTotalFilter = `SELECT COUNT(*) AS total FROM klubclantrener WHERE true ${search_query}`;

database.query(queryTotal, function(error, data) {
  console.log(data);
  var datarow = data.rows[0];
  var total_records = datarow["total"];
  console.log(total_records);

  //Total number of records with filtering

  database.query(queryTotalFilter, function(error, data){
      console.log(data);
      var datarow = data.rows[0];
      var total_records_with_filter = datarow["total"];
      console.log(total_records_with_filter);
      var query = `
      SELECT * FROM klubclantrener
      WHERE true ${search_query} 
      ORDER BY ${column_name} ${column_sort_order} 
      LIMIT ${length} offset ${start}
      `;

      var data_arr = [];

      database.query(query, function(error, data){
        console.log(data)
        for (let row of data.rows) {
          data_arr.push({
            'naziv' : row["naziv"],
            'godina_osnivanja' : row["godina_osnivanja"],
            'sjedište' : row["sjedište"],
            'država' : row["država"],
            'email' : row["email"],
            'oib_člana' : row["oib_člana"],
            'broj_iskaznice_člana' : row["broj_iskaznice_člana"],
            'ime_člana' : row["ime_člana"],
            'prezime_člana' : row["prezime_člana"],
            'datum_rođenja_člana' : row["datum_rođenja_člana"],
            'uzrast' : row["uzrast"],
            'težina' : row["težina"],
            'spol' : row["spol"],
            'oib_trenera' : row["oib_trenera"],
            'ime_trenera' : row["ime_trenera"],
            'prezime_trenera' : row["prezime_trenera"],
            'datum_rođenja_trenera' : row["datum_rođenja_trenera"],
            'istek_licence' : row["istek_licence"]
          });
        };

        var output = {
          'draw' : draw,
          'iTotalRecords' : total_records,
          'iTotalDisplayRecords' : total_records_with_filter,
          'aaData' : data_arr
        };

        res.json(output);

      });
    });
  });
});

router.get('/export', function(req, res, next) {
  var filterquery = `select * from klubclantrener`;
  database.query(filterquery, function(error, data) {
    var sql_data = JSON.parse(JSON.stringify(data));
    var file_header = ['naziv', 'godina_osnivanja', 'sjedište', 'država', 'email', 'oib_člana', 'broj_iskaznice_člana', 'ime_člana', 'prezime_člana', 'datum_rođenja_člana',
    'uzrast', 'težina', 'spol', 'oib_trenera', 'ime_trenera', 'prezime_trenera', 'datum_rođenja_trenera', 'istek_licence'];
    var json_data = new data_exporter({file_header});
    var csv_data = json_data.parse(sql_data);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=filtrirani_podaci.csv");
    res.status(200).end(csv_data);
  });
});

module.exports = router;
