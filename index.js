google.charts.load('current', {
  packages: ['corechart', 'bar']
});
var data = [
  ['Stock Symbol', 'Stock Price', {
    role: 'annotation'
  }]
];
var theButton = document.getElementById("add");
theButton.onclick = showInput;

function showInput() {
  var stock_name = document.getElementById("stock_symbol").value.toLowerCase();
  var uppercase_stock = stock_name.toUpperCase();
  var text = document.createTextNode(uppercase_stock);
  var stock_price;
  var myToken = "pk_c373458c15764301a3832fe6fd14d632"
  var dummy_array = [];
  var request = new XMLHttpRequest();
  request.open('GET', 'https://cloud.iexapis.com/beta/stock/' + stock_name + '/price?token=' + myToken + '', true);
  request.onload = function() {
    stock_price = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      var place = document.getElementById("list");
      var node = document.createElement("LI");
      node.appendChild(text);
      place.appendChild(node);

      dummy_array.push(uppercase_stock);
      dummy_array.push(parseFloat(stock_price));
      dummy_array.push(stock_price);
      data.push(dummy_array);
      google.charts.setOnLoadCallback(function() {
        drawBasic(data);
      });
    }
  }
  request.send();
}

function drawBasic(d) {
  var data = google.visualization.arrayToDataTable(d);
  var options = {
    title: 'Stock Prices',
    chartArea: {
      width: '50%'
    },
    hAxis: {
      title: 'Price',
      minValue: 0
    }
  };
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
