export function displayCSV(csv) {
    const lines = csv.split('\n');
   
    
    let data1=[];
    let label='test';
    lines.forEach(line => {
        const columns = line.split(',');
        console.log(columns);
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


