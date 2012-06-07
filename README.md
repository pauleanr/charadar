charadar
========

Charadar is a simple radar chart and easy to use.
It's depend on [jqeury svg plugin](http://keith-wood.name/svg.html)
so if you want to use this plugin, you should download jquery svg and put it in your web.

Usage
-----

Make sure you add the library to your `head`

	<head>
		<script type="text/javascript" src="jquery.min.js"></script>
		<script type="text/javascript" src="jquery.svg.min.js"></script>
		<script type="text/javascript" src="jquery.charadar.js"></script>
	</head>

Then create a div and initialize the script:

	<div id="skillChart"></div>

	<style>
	$('#skillchart').charadar({
		skill: [
			[3, 'aaa'],
			[5, 'bbb'],
			[10, 'ccc'],
			[1, 'ddd']
		]
	});
	</style>

It can work!
The polygon's vertex amount is equal to the skill amount you set.

Available Options
-----------------

*	**title**  the chart title, should be set string type value
*	**axis**  the amount of axis
*	**axisPixel**  the distance between two axis
*	**shiftAngle**  set this to rotate the polygon 
*	**containerPadding**  the padding outside of the chart, set array type value [top, right, bottom, left],  like [0, 50, 0, 0]
*	**skillNameShift**  the shift between polygon vertex and skill name
*	**polyStyle**  the polygon style, set like {file: 'color or none', strock: 'color or none', strockWidth: 1}
*	**skillLineStyle**  the skill polygon line style, set like {strock: 'color or none', strockWidth: 1}
*	**skillStyle**  the skill polygon style, set like {file: 'color or none', strock: 'color or none', strockWidth: 1}
