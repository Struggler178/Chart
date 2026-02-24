const ctx = document.getElementById('myChart');

const downloadBtn = document.getElementById('downloadCSV');
let isOpen=false;

const pop= document.getElementById('myForm');
const button= document.getElementById('openForm');


Chart.register(ChartDataLabels);

//event listener for downloading chart data as csv
downloadBtn.addEventListener('click', function() {
    if (myChart.data.datasets.length === 0) {
        alert('No data to download!');
        return;
    }
    const csvOutput = convertToCSV(myChart.data.datasets);
    downloadCSV(csvOutput, 'chart_data.csv');
});

//event listener for uploadng csv file, when a csv file is uploaded then we run handleFileSelect which checks if the file is correct and adds the data to the chart
document.getElementById('csvFile').addEventListener('change', handleFileSelect, false);


let myChart=
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['NOT MET%', 'MET%', 'EXCEED'],
      datasets: [],
      
      
      
    },
    pointRadius:25,
    options: {
      scales: {
        y: {
          
          ticks:{
            font:{ 
            size:16
          }
          },
          beginAtZero: false
        },
        x: {
          ticks:{
            font:{ 
            size:13
          },
          color:'black'
        },
           
          beginAtZero: false
        }

      },
    responsive: true,
    elements:{
      point:{
      radius:20
      }
    }
    ,
    plugins: {
       datalabels:   {
          anchor: 'center',
          align: 'center',
          
          labels: {
            value: {
              color: 'black'
            }
          },
          font: {
              size: 20,
            weight: 'bold', 
            family: 'Arial'
            }

        },
             legend: {
          
            position: 'bottom', 
          
            align: 'center', 
            labels: {    
                padding: 20 
            }
        }
      }
    },
 
  });




//event listener for manual chart data submission
document.getElementById('lineForm').addEventListener('submit', function (e) {
      e.preventDefault();
      
      openForm();

      let label = document.getElementById('lineLabel').value.trim();
      
      
     
      const dataArray = getData();
      if (dataArray.some(isNaN) || dataArray.length !== myChart.data.labels.length) {
        alert(`Please enter ${myChart.data.labels.length} valid numbers`);
        return;
      }

      const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

    
      myChart.data.datasets.push({
        label: label,
        data: dataArray,
        borderColor: randomColor,
        fill: false,
        lineTension: 0.3
        
      });

    
      myChart.update();

     
      e.target.reset();
    });
  
function getData(){
      const d = document.getElementById('lineData1').value.trim();
      const d2 = document.getElementById('lineData2').value.trim();
      const d3 = document.getElementById('lineData3').value.trim();
      return [d,d2,d3];
}



//function for converting dataset array of chart to csv string
function convertToCSV(arr) {
  let csv='label, NOT MET, MET, EXCEED\n';
  arr.forEach(dataset => {
    csv += `${dataset.label},${dataset.data[0]},${dataset.data[1]},${dataset.data[2]}\n`;
  });
  return csv;
}


//function for converting csv string to csv file using blob datatype
function downloadCSV(csvStr, filename) {
  const blob = new Blob(["\\ufeff", csvStr], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

//main function for adding csv data to chart...
function displayCSV(csv) {
    const lines = csv.split('\n');
   
    
    let data1=[];
    let label='test';
    lines.forEach(line => {
        const columns = line.split(',');
        columns.forEach(column => {
          if (Number.isInteger(Number(column))) {
            data1.push(Number(column));
          }
          else{
            label="";
            label=column;
          }
        });
        if (data1.length == 3) {
           const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

          myChart.data.datasets.push({
          label: label,
          data: data1,
          borderColor: randomColor,
          fill: false,
          lineTension: 0.3
      });
          myChart.update();
          data1=[];
        }

       
    });
}

//function that runcs displayCSV immediately after a file is uploaded
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            displayCSV(csvData);
        };
        reader.readAsText(file);
    }
    
    
}

//handles pop up for adding data to chart
function openForm(){
  if (isOpen==false){
    pop.style.display='inline';
    button.style.display='none'

  }
  else{
    pop.style.display='none';
    button.style.display='inline'
  }
  isOpen=!isOpen;    
}

function downloadChart(){
  console.log(myChart.data.datasets)
  if (myChart.data.datasets.length==0){
     alert(`Chart is empty`);
        return;
  }
  else{
    var a = document.createElement('a');
    a.href = myChart.toBase64Image();
    a.download = 'chart.png';
    a.click();

  }
  
}
