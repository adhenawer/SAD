var gauge;
var gaugeData;
var gaugeOptions;
function drawGauge() {
  gaugeData = new google.visualization.DataTable();
  gaugeData.addColumn('number', 'Indicador');
  gaugeData.addRows(1);
  gaugeData.setCell(0, 0, 0);
  gauge = new google.visualization.Gauge(document.getElementById('gauge'));
  gaugeOptions = {
    width: 850, height: 450,
    minorTicks: 20, majorTicks:' '
  };
  gauge.draw(gaugeData, gaugeOptions);
}

function changeGauge(realizado, toleranciaMin, toleranciaMax, avisoMin, avisoMax, max) {
  gaugeOptions = {
		  	  width: 850, height: 450,
              yellowFrom: avisoMin, yellowTo: toleranciaMin,
              greenFrom: toleranciaMin, greenTo: toleranciaMax,
              redFrom: toleranciaMax, redTo: avisoMax,
              max: max,
              minorTicks: 20, redColor:'#FF9900', majorTicks:' '
  };
  gaugeData.setValue(0, 0, realizado);
  gauge.draw(gaugeData, gaugeOptions);
}
google.setOnLoadCallback(drawGauge);