(function($){
	$.fn.extend({
		aquaSlider: function(width,height,type){
			var aqua_self = $(this);
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
			aqua_self.addClass("aqua-slider-container").css({
				width: options.w,
				height: options.h
			});

			// Set class to all images 
			var aqua_images_count = 0;
			aqua_self.find("img").each(function(){
				var img_self = $(this);
				++aqua_images_count;
				img_self.addClass("aqua-slider-image").attr("img-data-number",aqua_images_count);
				if(aqua_images_count == 1)
					img_self.addClass("aqua-slider-image-show").css({opacity:1});
				else
					img_self.addClass("aqua-slider-image-hide").css({opacity:0});
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

				aqua_tick_builder.addClass("aqua-slider-controler aqua-slider-tick").attr("img-select-tick",index);
				$(".aqua-slider-bot-container div").append(aqua_tick_builder);
			}
			// ---

			// Creating the animation ---

			function aqua_slider_current_image(){
				current = {
					image: $(".aqua-slider-image-show"),
					image_data: $(".aqua-slider-image-show").data("img-data-number"),
				 	tick: $(".aqua-slider-tick-select").data("img-select-tick")
				};
				return current;
			}

			function aqua_slider_next_image(){
				next_image_data = current.image_data++;
				if(next_image_data > aqua_images_count)
					next_image_data = 1;
				
				if($(".aqua-slider-image-show").next().hasClass("aqua-slider-image")){
					image = $(".aqua-slider-image-show").next(".aqua-slider-image");
				}
					
				else{
					image = $(".aqua-slider-image").first();
				}
					
				next = {
					data: next_image_data,
					image: image
				} 
				return next;
			}			

			function aqua_slider_prev_image(){
				next_image_data = current.image_data--;
				if(next_image_data <= 0)
					next_image_data = aqua_images_count;
				
				if($(".aqua-slider-image-show").prev().hasClass("aqua-slider-image")){
					image = $(".aqua-slider-image-show").prev();
				}
					
				else{
					image = $(".aqua-slider-image").last();
				}
					
				next = {
					data: next_image_data,
					image: image
				};
				return next;
			}

			function aqua_slider_current_tick(){
				current = {
					image: $(".aqua-slider-image-show"),
					image_data: $(".aqua-slider-image-show").data("img-data-number"),
				 	tick: $(".aqua-slider-tick-select").data("img-select-tick")
				};

				$(".aqua-slider-tick").
			}

			//btn right function
			$(".aqua-right-control").on("click",function(){
				aqua_slider_current_image();
				aqua_slider_next_image();
				
				$(current.image).animate({
					"opacity":0
				},600,function(){
					$(this).removeClass("aqua-slider-image-show").addClass("aqua-slider-image-hide");
				});
				$(next.image).addClass("aqua-slider-image-show").removeClass("aqua-slider-image-hide").animate({"opacity":1},600);
			});

			$(".aqua-left-control").on("click",function(){
				aqua_slider_current_image();
				aqua_slider_prev_image();
				
				$(current.image).animate({
					"opacity":0
				},600,function(){
					$(this).removeClass("aqua-slider-image-show").addClass("aqua-slider-image-hide");
				});
				$(next.image).addClass("aqua-slider-image-show").removeClass("aqua-slider-image-hide").animate({"opacity":1},600);
			});

			// ---

		}
	})
})(jQuery);