$(document).ready(function() {
	$("body").removeClass("preload")
	
	$("nav label").on("click", function() {
		$("nav").toggleClass("active")
	})
	
	$("nav a").on("click", function() {
		if ($(this).next("ul").hasClass("active")) {
			$(this).next("ul").removeClass("active")
		} else {
			$("nav ul.active").removeClass("active")
			$(this).next("ul").addClass("active")
		}
	})
	
	$(window).scroll(stickyNav);
	  
	function stickyNav() {
		if ($(window).scrollTop() > $("header").innerHeight()) {
			$("header").css("margin-bottom", $("nav").height() + "px");
			$("nav").addClass("fixed");
		} else {
			$("header").css("margin-bottom", 0);
			$("nav").removeClass("fixed");
		}
	}
	
	stickyNav()
})