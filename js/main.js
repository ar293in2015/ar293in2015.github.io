		//  inject the ngRoute dependency in the module.
	    var myAppModule = angular.module('app', []);
	    
myAppModule.factory('dashboardFactory', function (){

		   
		    var factory = {};

		    return factory;
		});


// TIMELINE CHART: http://codepen.io/gtb104/pen/ByovgE

myAppModule.controller('dashboardController', function ($scope, $http, dashboardFactory){


		    $http.get("https://crazyfaceapi.azurewebsites.net/api/snapshots")
		    .then(function(response) {
		        $scope.transactionInfo = response.data;
		        console.log($scope.transactionInfo);
		    });



			makeTimelineChart();
		   
		    $scope.start = function() {
		    	console.log("HERE");
		    }



		});




function makeTimelineChart() {

	var data_from_DB = [
	  {time: "Wed Jan 03 2014 20:43:05 GMT-0400 (EDT)"  , person_id: 543, img_url: "http://greatinspire.com/wp-content/uploads/2013/12/Collection-of-Face-Art-Portraits-from-Alexander-Khokhlov-4.jpg"},
	  {time: "Wed Feb 03 2014 20:43:05 GMT-0400 (EDT)"  , person_id: 142, img_url: "http://artisticthings.com/wp-content/uploads/2010/01/01-Lepard-Matutinal-324x400.jpg"},
	  {time: "Wed Mar 04 2014 09:45:04 GMT-0400 (EDT)"  , person_id: 319, img_url: "http://www.pd4pic.com/images/black-victoria-lady-woman-face-artistic-artist.png"},
	  {time: "Wed Apr 05 2014 11:26:33 GMT-0400 (EDT)"  , person_id: 319, img_url: "http://www.pd4pic.com/images/black-victoria-lady-woman-face-artistic-artist.png"},
	  {time: "Wed Apr 13 2014 10:40:35 GMT-0400 (EDT)"  , person_id: 987, img_url: "http://himg2.huanqiu.com/attachment2010/2015/0616/13/42/20150616014229473.jpg"},
	  {time: "Wed Apr 16 2014 23:38:53 GMT-0400 (EDT)"  , person_id: 543, img_url: "http://greatinspire.com/wp-content/uploads/2013/12/Collection-of-Face-Art-Portraits-from-Alexander-Khokhlov-4.jpg"},
	  {time: "Wed Apr 17 2014 16:42:47 GMT-0400 (EDT)"  , person_id: 142, img_url: "http://artisticthings.com/wp-content/uploads/2010/01/01-Lepard-Matutinal-324x400.jpg"},
	  {time: "Wed May 03 2014 16:57:42 GMT-0400 (EDT)"  , person_id: 543, img_url: "http://greatinspire.com/wp-content/uploads/2013/12/Collection-of-Face-Art-Portraits-from-Alexander-Khokhlov-4.jpg"},
	  {time: "Wed May 03 2014 21:56:27 GMT-0400 (EDT)"  , person_id: 987, img_url: "http://himg2.huanqiu.com/attachment2010/2015/0616/13/42/20150616014229473.jpg"},
	  {time: "Wed May 13 2014 09:52:43 GMT-0400 (EDT)"  , person_id: 142, img_url: "http://artisticthings.com/wp-content/uploads/2010/01/01-Lepard-Matutinal-324x400.jpg"},
	  {time: "Wed May 18 2014 15:57:51 GMT-0400 (EDT)"  , person_id: 142, img_url: "http://greatinspire.com/wp-content/uploads/2013/12/Collection-of-Face-Art-Portraits-from-Alexander-Khokhlov-4.jpg"},
	  {time: "Wed May 19 2014 11:16:09 GMT-0400 (EDT)"  , person_id: 543, img_url: "http://greatinspire.com/wp-content/uploads/2013/12/Collection-of-Face-Art-Portraits-from-Alexander-Khokhlov-4.jpg"},
	  {time: "Wed Jun 03 2014 11:16:09 GMT-0400 (EDT)"  , person_id: 987, img_url: "http://himg2.huanqiu.com/attachment2010/2015/0616/13/42/20150616014229473.jpg"},
	  {time: "Wed Jun 05 2014 11:16:09 GMT-0400 (EDT)"  , person_id: 543, img_url: "http://greatinspire.com/wp-content/uploads/2013/12/Collection-of-Face-Art-Portraits-from-Alexander-Khokhlov-4.jpg"},
	  {time: "Wed Jun 05 2014 22:57:16 GMT-0400 (EDT)"  , person_id: 319, img_url: "http://www.pd4pic.com/images/black-victoria-lady-woman-face-artistic-artist.png"},
	  {time: "Wed Jun 09 2014 21:48:50 GMT-0400 (EDT)"  , person_id: 543, img_url: "http://greatinspire.com/wp-content/uploads/2013/12/Collection-of-Face-Art-Portraits-from-Alexander-Khokhlov-4.jpg"},
	  {time: "Wed Jun 13 2014 05:49:50 GMT-0400 (EDT)"  , person_id: 111, img_url: "http://crazyfaceapi.azurewebsites.net/api/images/?name=image.jpg"}
	];

	// parse data from DB
	var counts_for_time = {};
	var counts_for_people = {};

	for (var p = 0; p < data_from_DB.length; p++) {
		var this_entry = data_from_DB[p];
		var entry_time = this_entry.time;
		var entry_person = {person_id: this_entry.person_id, img_url: this_entry.img_url};
		
		if(!counts_for_time[entry_time]) {
			counts_for_time[entry_time] = [];
		}
		counts_for_time[entry_time].push(entry_person);

		if(!counts_for_people[this_entry.person_id]) {
			counts_for_people[this_entry.person_id] = {num:0, img_url: this_entry.img_url};
		}
		counts_for_people[this_entry.person_id].num+=1;
	}

	var data = [];

	Object.keys(counts_for_time).forEach(function(key) {
        var time = key;
        var num = counts_for_time[key].length;
        var who = counts_for_time[key];
        data.push({date: time, count: num, people: who});
    });



	// Perform some data type conversion
	data.forEach(function ( d ) {
	  d.date = new Date(d.date);
	});

	var el = d3.select('#chart'),
	    svg = null,
	    chart = null,
	    width = document.getElementById('chart').offsetWidth,
	    height = document.getElementById('chart').offsetHeight,
	    minObjHeight = 10,
	    maxObjHeight = height*0.25,
	    margin = {
	      top:    maxObjHeight*2,
	      right:  maxObjHeight*4,
	      bottom: maxObjHeight*2,
	      left:   maxObjHeight*4
	    },
	    mostRecent = d3.max(data, function ( d ) { return d.date; }),
	    oldest = d3.min(data, function ( d ) { return d.date; }),
	    self = this;

	// Setup our x scale. This will convert a date
	// to an x coordinate
	var x = d3.time.scale()
	  .domain([
	    d3.min(data, function ( d ) { return d.date; }),
	    d3.max(data, function ( d ) { return d.date; })
	  ])
	  .range([0, width - margin.right]);

	// Reorder the data by count. This allows for larger
	// counts (larger circles) to be rendered first.
	// i.e. below smaller circles.
	data.sort(function ( a, b ) {
	  return d3.descending(a.count, b.count);
	});

	// Setup radius scale.
	var r = d3.scale.linear()
	  .clamp(true)
	  .domain([1, d3.max(data, function ( d, i ) {
	    // We're going to assume that the first count
	    // represents the initial load, which could be
	    // a large number and would skew the subsequent
	    // radius scaling.
	    return (i === 0) ? 1 : d.count;
	  })])
	  .range([minObjHeight, maxObjHeight]);

	var xAxis = d3.svg.axis()
	  .scale(x)
	  .ticks(4)
	  .tickSize(0)
	  .tickPadding(10);

	var zoom = d3.behavior.zoom()
	  .x(x)
	  .scaleExtent([1,Infinity])
	  .on('zoom', function() {
	    draw();
	  });

	var svg = el.append('svg')
	  .attr('id', 'svg')
	  .attr('height', height)
	  .attr('width', width);
	var chart = svg.append('g')
	  .attr('transform', 'translate(' + (margin.left * 0.5) + ', 0)');

	var tooltip = d3.select('#timelineChart').append('div')
	  .classed('tooltip', true)
	  .style('z-index', 9000)
	  .style('opacity', 0);
	tooltip.append('div').classed('down-arrow', true);
	tooltip.append('div').classed('content', true);

	var dateAxis = chart.append('g')
	  .attr('class', 'x axis')
	  .attr('transform', 'translate(0, ' + (height-24) + ')');

	var midline = chart.append('line')
	  .attr('class', 'midline')
	  .attr('x1', 0 - margin.left * 0.5)
	  .attr('y1', height * 0.5)
	  .attr('x2', width)
	  .attr('y2', height * 0.5);

	var timeframe = chart.append('line')
	  .attr('class', 'timeframe')
	  .attr('y1', height * 0.5)
	  .attr('y2', height * 0.5);

	var zoomTarget = chart.append('rect')
	  .attr('class', 'pane')
	  .attr('width', width)
	  .attr('height', height)
	  .style('cursor', 'move')
	  .style('fill', 'none')
	  .style('pointer-events', 'all')
	  .call(zoom);

	var circles = chart.selectAll('circle')
	  .data(data);

	circles.enter().append('circle')
	  .attr('cy', height*0.5)
	  .attr('r', function ( d ) {
	    return r(d.count);
	  })
	  .on('mouseover', function ( d ) {
	  	var thisSVG = d3.select(this)[0][0];
	  	//console.log((thisSVG.cx.baseVal.value));
	  	var hr = d.date.getHours();
		var min = d.date.getMinutes();
		if (min < 10) {
		    min = "0" + min;
		}
		var ampm = hr < 12 ? "am" : "pm";
		var time = hr + ":" + min + ampm;
	    var format = d3.time.format('%m/%d/%y');
	    var faces = '';

	    for (var f = 0; f < d.people.length; f++) {
	    	if (faces.indexOf(d.people[f].img_url) == -1) {
	    		//faces += '<img src=" ' + d.people[f].img_url+'" height="100" width="auto">' + '<br/>';
	    		faces+='<p>'+d.people[f].person_id+'</p>';
	    	}
	    }

	    var message = time + '<br/>' + d.count + ((d.count === 1) ? ' case' : ' cases') + '<br/>' + '<br/>Severity:<br/>' + faces,
	        svgTop = thisSVG.offsetTop,//33
	        svgLeft = mousePosX,//33
	        circle = d3.select(this),
	        circleX = parseInt(circle.attr('cx'), 10),
	        circleY = parseInt(circle.attr('cy'), 10),
	        circleR = parseInt(circle.attr('r'), 10),
	        left,
	        top;
	    circle.classed('hover', true);
	    // Calculate positioning
	    // 56 = tooltip height
	    // 5 = spacer
	     top = svgTop + circleY - circleR - 56 - 5-100;
	     // top = mousePosY;
	    // 110 = tooltip width
	     left = svgLeft - 110*0.5 + margin.left*0.5 + circleX;
	     left = mousePosX -65;//- 110*0.5 ;
	     // left = getOffset(d3.select(this)[0][0]).left;
	    tooltip.transition()
	      .duration(200)
	      .style('opacity', 1);
	    tooltip
	      .style('left', left + 'px')
	      .style('top', top + 'px')
	      .select('.content').html(message);
	  })
	  .on('mouseout', function () {
	    d3.select(this).classed('hover', false);
	    tooltip.transition()
	      .duration(500)
	      .style('opacity', 0);
	  });


	circles.exit().remove();

	var draw = function () {
	  dateAxis.call(xAxis);
	  circles.attr('cx', function ( d ) {
	    return x(d.date);
	  });
	  timeframe.attr('x1', function () {
	    return x(oldest);
	  });
	  timeframe.attr('x2', function () {
	    return x(mostRecent);
	  });
	};

	var resize = function () {
	  var width = document.getElementById('chart').offsetWidth;
	  //Update width related values
	  x.range([0, width - margin.right]);
	  svg.attr('width', width);
	  midline.attr('x2', width);
	  zoomTarget.attr('width', width);
	  draw();
	};

	d3.select(window).on('resize', resize);

	draw();
}

function getPos(e){
    		mousePosX=e.clientX;
    		mousePosY=e.clientY;
    	}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    console.log(_x);
    return { top: _y, left: _x };
}

$(document).ready(function() {

	var mousePosX, mousePosY;

	var gauge1 = loadLiquidFillGauge("fillgauge1", 45);
    var config1 = liquidFillGaugeDefaultSettings();
    config1.circleColor = "#FF7777";
    config1.textColor = "#FF4444";
    config1.waveTextColor = "#FFAAAA";
    config1.waveColor = "#FFDDDD";
    config1.circleThickness = 0.2;
    config1.textVertPosition = 0.2;
    config1.waveAnimateTime = 4000;





});