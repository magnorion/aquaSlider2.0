(function($){
	$.fn.extend({
		aquaSlider: function(width,height,type){
			var self = $(this);
			var options = {
				w: width,
				h: height,
				t: type
			};

			var default_options = {
				w: 550,
				h: 250,
				t: "slide"
			};

			if(typeof(options.w) == "undefined")
				options.w = default_options.w;
			if(typeof(options.h) == "undefined")
				options.h = default_options.h;
			if(typeof(options.t) == "undefined")
				options.t = default_options.t;
			
			// Set core config to image container
			self.addClass("aqua-slider-container").css({
				width: options.w,
				height: options.h
			});

			// Set class to all images 
			var aqua_images_count = 0;
			self.find("img").each(function(){
				var img_self = $(this);
				++aqua_images_count;
				img_self.addClass("aqua-slider-image").attr("img-data-number",aqua_images_count);
			});

			// Build the slider controler ---
			// Left button
			var aqua_btn_left = $("<div>");
			aqua_btn_left.addClass("aqua-slider-controler aqua-slider-arrow aqua-left-control");
			$(".aqua-slider-container").append(aqua_btn_left);

			// Right button
			var aqua_btn_left = $("<div>");
			aqua_btn_left.addClass("aqua-slider-controler aqua-slider-arrow aqua-right-control");
			$(".aqua-slider-container").append(aqua_btn_left);

			// "ticks" control
			var aqua_tick_container = $("<div>");
			aqua_tick_container.addClass("aqua-slider-bot-container");
			$(".aqua-slider-container").append(aqua_tick_container);
			$(".aqua-slider-bot-container").append("<div>");
			var index;
			for(index = 1;index<=aqua_images_count;index++){
				var aqua_tick_builder = $("<span>");
				if(index == 1)
					aqua_tick_builder.addClass("aqua-slider-tick-select")
				else
					aqua_tick_builder.addClass("aqua-slider-tick-deselect")

				aqua_tick_builder.addClass("aqua-slider-controler aqua-slider-tick").prop("data","img-select-"+index);
				$(".aqua-slider-bot-container div").append(aqua_tick_builder);
			}
			// ---

			// Creating the animation ---

			// ---

		}
	})
})(jQuery);