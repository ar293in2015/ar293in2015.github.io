window.onload = function () {
  // http://canvasjs.com/editor/?id=http://canvasjs.com/example/gallery/line/earthquakes_monthly/
    var chart = new CanvasJS.Chart("chartContainer",
    {
      theme: "theme2",
      title:{
        // text: "Earthquakes - per month"
      },
      animationEnabled: true,
      axisX: {
        // valueFormatString: "DD-MMM",
        interval:1,
        // intervalType: "day"
        
      },
      axisY:{
        includeZero: false
        
      },
      data: [
      {        
        type: "line",
        //lineThickness: 3,        
        dataPoints: [
        { x: 1, y: 77 },
        { x: 2, y: 82},
        { x: 3, y: 80},
        { x: 4, y: 81 },
        { x: 5, y: 79 },
        { x: 06, y: 92 },
        { x: 07, y: 85 },
        { x: 08, y: 68, indexLabel: "lowest",markerColor: "red", markerType: "triangle" },
        { x: 09, y: 72 },
        { x: 10, y: 75 },
        { x: 11, y: 71 },
        { x: 12, y: 95 },
        { x: 13, y: 74 },
        { x: 14, y: 73 },
        { x: 15, y: 78 },
        { x: 16, y: 72 },
        { x: 17, y: 79 },
        { x: 18, y: 86 },
        { x: 19, y: 92 },
        { x: 20, y: 98 , indexLabel: "highest",markerColor: "DarkSlateGrey", markerType: "cross"},
        
        ]
      }
      
      ]
    });

chart.render();
}