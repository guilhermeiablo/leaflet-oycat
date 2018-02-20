var ctx = document.getElementById("myChart");

 let cstLine = [];
for(let i=0;i<2048-2017;i++){
  cstLine.push(360);
}

var myChart = new Chart(ctx, {
  defaultFontFamily: "'Titillium Web', sans-serif",
  defaultFontColor: '#455',
  type: 'bar',
  data: {
    labels: ["", " ", " ", "2020", " ", " ", " ", " ", "2025", " ", " ", " ", " ", "2030", " ", " ", " ", " ", "2035", " ", " ", " ", " ", "2040", " ", " ", " ", " ", "2045", " ", " ", ""],
    datasets: [{
      label: 'Annual Decommissioned Tonnage (000\'s of Te)',
      data: [101.7,144.266,163.9535,406.3273,324.992,723.943,617.893899999618,706.63,873.589,684.728,480.659,807.711,382.096,320.601,408.7144,253.684,272.158,190.111,529.489,677.036,547.825,265.289,169.292,244.273699999809,486.799,586.832,260.65,537.109,289.846,228.928,190.657699999809,0],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(54, 162, 235, 0.2)'

      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1,
      options: {
        legend: {
          fullWidth: true,
          labels: {
            useLineStyle: false,
            boxWidth: 0,
          }
        }
      }
    },{
      type:'line',
      label:'Total yard capacity',
      data: cstLine,
      pointRadius: 0,
      fill: false,
      borderColor: "rgba(200,0,0,1)",
      fontSize: 40,
      options: {
        legend: {
          fullWidth: true,
          labels: {
            useLineStyle: true,
            boxWidth: 0,
          }
        }
      }
    }
  ]
},
options: {
  maintainAspectRatio: false,
  responsive: false,
  fontSize: 40,
  legend: {
    position: 'top',
    fullWidth: true,
    labels: {
      useLineStyle: true,
      fontSize: 10,
      padding: 10
    }
  },
  scales: {
    xAxes: [{
      ticks: {
        fontSize: 9
      },
      display: true

    }],
    yAxes: [{
      ticks: {
        beginAtZero:true,
        fontSize: 10
      }
    }]
  }
}
});
