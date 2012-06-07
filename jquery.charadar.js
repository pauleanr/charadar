/* Charadar v1.0 | http://blog.pauleanr.com/charadar */
;(function($){
	$.fn.charadar = function(setting){
		var _d = {
			axis: 10,
			axisPixel: 10,
			skills: [],
			shiftAngle: 0,
			containerPadding: [40, 50, 20, 50],
			skillNameShift: 3,
			polyStyle: {
				fill: 'none',
				stroke: '#aaa',
				strokeWidth: 1
			},
			skillLineStyle: {
				stroke: '#666',
				strokeWidth: 1
			},
			skillStyle: {
				fill: 'yellow',
				stroke: 'orange',
				strokeWidth: 1
			}
		};
		var _s = $.extend(_d, setting);
		var $container = this;
		var n = {
			skillAmount: function(){return (_s.skills.length < 3) ? 3 : _s.skills.length},
			radius: function(){return _s.axis * _s.axisPixel},
			diameter: function(){return this.radius() * 2},
			centerCoordinate: function(){
				return [
					this.radius() + _s.containerPadding[3],
					this.radius() + _s.containerPadding[0]
				]
			}
		};
		var polygon = {
			initAngle: function(){return _s.shiftAngle + 90},
			singleAngle: function(){return 360 / n.skillAmount();},
			method: function(angle, radius){
				angle += this.initAngle();
				var x = Math.round(n.centerCoordinate()[0] + radius * Math.cos(this.pi(angle)));
				var y = Math.round(n.centerCoordinate()[1] - radius * Math.sin(this.pi(angle)));
				return [x, y];
			},
			pi: function(angle){
				return angle / 180 * Math.PI;
			},
			coordinates: function(){
				var coordinates = [];
				for(var i = 0; i<n.skillAmount(); i++){
					coordinates.push(this.method(this.singleAngle() * i, n.radius()));
				}
				return coordinates;
			},
			skillCoordinates: function(){
				var amount = _s.skills.length;
				var coordinates = [];
				for(var i = 0; i<amount; i++){
					coordinates.push(this.method(this.singleAngle() * i, _s.skills[i][0] * _s.axisPixel));
				}
				return coordinates;
			}
		};
		var skillName = function(id, value, name, coordinate){
			this.nameId = this.nameClass + '-' + id;
			$container.append('<div class="'+this.nameClass+'" id="'+this.nameId+'">'+name+'<span class="'+this.nameClass+'-value">&nbsp;-'+value+'</span>'+'</div>');
			$('#'+this.nameId).css('position', 'absolute');
			this.coordinate = function(){
				return [this.xMethod(coordinate), this.yMethod(coordinate)];
			}
		}
		skillName.prototype.nameClass = 'pauleanRadar-skillName';
		skillName.prototype.xMethod = function(coordinate){
			var x;
			if(coordinate[0] == n.centerCoordinate()[0]){
				x = coordinate[0] - $('#'+this.nameId).outerWidth(true) / 2;
			}else if (coordinate[0] < n.centerCoordinate()[0]){
				x = coordinate[0] - $('#'+this.nameId).outerWidth(true) - _s.skillNameShift;
			}else{
				x = coordinate[0] + _s.skillNameShift;
			}
			return x;
		}
		skillName.prototype.yMethod = function(coordinate){
			var y;
			if(coordinate[0] == n.centerCoordinate()[0]){
				if(coordinate[1] < n.centerCoordinate()[1]){
					y = coordinate[1] - $('#'+this.nameId).outerHeight(true) - _s.skillNameShift;
				}else{
					y = coordinate[1] + _s.skillNameShift;
				}
			}else{
				y = coordinate[1] - $('#'+this.nameId).outerHeight(true) / 2;
			}
			return y;
		}
		$container.css({
			position: 'relative',
			width: n.diameter() + _s.containerPadding[3] + _s.containerPadding[1],
			height: n.diameter() + _s.containerPadding[0] + _s.containerPadding[2],
			overflow: 'hidden',
			padding: 0
		}).svg({onLoad: function(svg){
			var polyCoordinates = polygon.coordinates();
			var skillCoordinate = polygon.skillCoordinates();
			var skillCount = skillCoordinate.length;
			for(var j=0; j<skillCount; j++){
				if(typeof _s.skills[j][1] == 'string'){
					var skillNameItem = new skillName(j, _s.skills[j][0], _s.skills[j][1], polyCoordinates[j]);
					$('#'+skillNameItem.nameId).css({
						top: skillNameItem.coordinate()[1],
						left: skillNameItem.coordinate()[0]
					});
				}
				svg.polyline([n.centerCoordinate(), skillCoordinate[j], skillCoordinate[(j+1 == skillCount) ? 0 : (j+1)]], {
					fill: _s.skillStyle.fill,
					stroke: 'none',
					strokeWidth: 'none'
				});
			}
			for(var i = 0; i < n.skillAmount(); i++){
				svg.line(polyCoordinates[i][0], polyCoordinates[i][1], n.centerCoordinate()[0], n.centerCoordinate()[1], {
					stroke: _s.skillLineStyle.stroke,
					strokeWidth: _s.skillLineStyle.strokeWidth
				});
			}
			skillCoordinate.push(skillCoordinate[0]);
			svg.polyline(skillCoordinate, {
				fill: 'none',
				stroke: _s.skillStyle.stroke,
				strokeWidth: _s.skillStyle.strokeWidth
			});
			polyCoordinates.push(polyCoordinates[0]);
			svg.polyline(polyCoordinates, {
				fill: _s.polyStyle.fill,
				stroke: _s.polyStyle.stroke,
				strokeWidth: _s.polyStyle.strokeWidth
			});
		}});
		if(typeof _s.title == 'string'){
			$container.prepend('<div id="pauleanRadar-title">'+_s.title+'</div>');
			var $title = $('#pauleanRadar-title');
			$title.css('position', 'absolute').css({
				top: 0,
				left: n.centerCoordinate()[0] - $title.width() / 2
			});
		}
		return $container;
	}
})(jQuery);
