
var ringer = {
	
	countdown_to: $("#timer").attr("data-date"),
	rings: {
		'DAYS': {
			s: 86400000, // mseconds in a day,
			max: 365
		},
		'HRS': {
			s: 3600000, // mseconds per hour,
			max: 24
		},
		'MINS': {
			s: 60000, // mseconds per minute
			max: 60
		},
		'SECS': {
			s: 1000,
			max: 60
		}
	},
	r_count: 4,
	r_spacing: 5, // px
	r_size: 60, // px
	r_thickness: 2, // px
	update_interval: 11, // ms
	init: function() {
		$r = ringer;
		$r.cvs = document.getElementById('timer');
		$r.size = {
			w: ($r.r_size + $r.r_thickness) * $r.r_count + ($r.r_spacing * ($r.r_count - 1)),
			h: ($r.r_size + $r.r_thickness)
		};
		$r.cvs.setAttribute('width', $r.size.w);
		$r.cvs.setAttribute('height', $r.size.h);
		$r.ctx = $r.cvs.getContext('2d');
		$(document.body.header).append($r.cvs);
		$r.cvs = $($r.cvs);
		$r.ctx.textAlign = 'center';
		$r.actual_size = $r.r_size + $r.r_thickness;

		// var localtime = new Date(Date.UTC(2021, 5, 28, 15, 40, 0));
		var localtime = new Date(Date.parse($("#timer").attr("data-date")))
		console.log("Target date in local timezone", localtime)
		$r.countdown_to_time = Date.UTC(localtime.getUTCFullYear(), localtime.getUTCMonth(), localtime.getUTCDate(),
		 localtime.getUTCHours(), localtime.getUTCMinutes(), localtime.getUTCSeconds()); 
		console.log("Target in UTC", $r.countdown_to_time);
		$r.cvs.css({
			width: $r.size.w + "px",
			height: $r.size.h + "px"
		});
		$r.go();
	},
	ctx: null,
	go: function() {
		var idx = 0;
		var date = new Date();
		var now = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
		 date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
		console.log("Now in UTC", now)
		$r.time = (now) - $r.countdown_to_time;
		if($r.time > 0){
			var countdowndiv = document.getElementById('countdownhead');
			countdowndiv.innerHTML = "We are now LIVE!";
			countdowndiv.style.fontSize = "x-large";
			countdowndiv.style.margin = 0;

			$r.cvs = document.getElementById('timer');
			$r.cvs.remove();
		}else{
			for (var r_key in $r.rings) $r.unit(idx++, r_key, $r.rings[r_key]);
			setTimeout($r.go, $r.update_interval);
		}
		
	},
	unit: function(idx, label, ring) {
		var x, y, value, ring_secs = ring.s;
		value = parseFloat($r.time / ring_secs);
		$r.time -= Math.round(parseInt(value)) * ring_secs;
		if (value > 0) {
			value = 0;
		}
		value = Math.abs(value);
		x = ($r.r_size * .5 + $r.r_thickness * .5);
		x += +(idx * ($r.r_size + $r.r_spacing + $r.r_thickness));
		y = $r.r_size * .5;
		y += $r.r_thickness * .5;
		
		// calculate arc end angle
		var degrees = 360 - (value / ring.max) * 360.0;
		var endAngle = degrees * (Math.PI / 180);
		$r.ctx.save();
		$r.ctx.translate(x, y);
		$r.ctx.clearRect($r.actual_size * -0.5, $r.actual_size * -0.5, $r.actual_size, $r.actual_size);

		// first circle
		$r.ctx.strokeStyle = "rgba(255,255,255,0.2)";
		$r.ctx.beginPath();
		$r.ctx.arc(0, 0, $r.r_size / 2, 0, 2 * Math.PI, 2);
		$r.ctx.lineWidth = $r.r_thickness;
		$r.ctx.stroke();

		// second circle
		$r.ctx.strokeStyle = "rgba(255,255,255,0.5)";
		$r.ctx.beginPath();
		$r.ctx.arc(0, 0, $r.r_size / 2, 0, endAngle, 1);
		$r.ctx.lineWidth = $r.r_thickness;
		$r.ctx.stroke();

		// label
		$r.ctx.fillStyle = "#ffffff";
		$r.ctx.fillColor = "#000000";
		$r.ctx.font = '9px monospace';
		$r.ctx.fillText(label, 0, 23);
		$r.ctx.fillText(label, 0, 23);
		$r.ctx.font = 'bold 30px monospace';
		$r.ctx.fillText(Math.floor(value), 0, 10);
		$r.ctx.restore();
	}
}
ringer.init();