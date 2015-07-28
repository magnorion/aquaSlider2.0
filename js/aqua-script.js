(function($){
	$.fn.extend({
		aquaSlider: function(select){
			var aqua_self = $(this);
			aqua_self.wrap("<div class='aqua-slider-control-container'></div>");
			
			var options = {};
			select = (typeof select !== "object") ? {} : select;
			options.w = select.width || 550;
			options.h = select.height || 250;
			options.b = select.bullet || "number";
			options.a = select.animation || 7000;

			// Set core config to image container
			aqua_self.addClass("aqua-slider-container").css({
				width: options.w,
				height: options.h
			});
			$(".aqua-slider-control-container").css({
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
			$(".aqua-slider-container").after(aqua_tick_container);
			$(".aqua-slider-bot-container").append("<div>");
			var index;
			for(index = 1;index<=aqua_images_count;index++){
				var aqua_tick_builder = $("<span>");
				if(options.b == "image"){
					if(index == 1)
						aqua_tick_builder.addClass("aqua-slider-tick-select")
					else
						aqua_tick_builder.addClass("aqua-slider-tick-deselect")
				}else if(options.b == "number"){
					if(index == 1)
						aqua_tick_builder.addClass("aqua-slider-tick-select aqua-slider-number").text(index);
					else
						aqua_tick_builder.addClass("aqua-slider-tick-deselect aqua-slider-number").text(index);
				}

				aqua_tick_builder.addClass("aqua-slider-controler aqua-slider-tick").attr("img-select-tick",index);
				$(".aqua-slider-bot-container div").append(aqua_tick_builder);
			}
			$(".aqua-slider-tick").each(function(){
				var self = $(this);
				self.on("click",function(){
					var data = self.attr("img-select-tick");
					aqua_slider_tick_click(data);
				});	
			});

			var getSizeBot = $(".aqua-slider-bot-container").height();
			$(".aqua-slider-control-container").css({
				height: (options.h + getSizeBot)
			});
			// ---

			// Add text
			var aqua_slider_alt_box = $("<div>");
			aqua_slider_alt_box.addClass("aqua-slider-alt-box").css({
				"opacity":0,
				"bottom":"-70%"
			});
			$(".aqua-slider-container").append(aqua_slider_alt_box);
			function aqua_slider_alt(){
				if(typeof($(current.image).attr("alt")) != "undefined"){
					$(".aqua-slider-alt-box").empty();
					var alt_image_data = $(current.image).attr("alt");
					$(".aqua-slider-alt-box").animate({
						"bottom":"0%",
						opacity:1
					},1000,function(){
						$(".aqua-slider-alt-box").append("<span> "+alt_image_data+" </span>");
					});
				}
			}

			function aqua_slider_alt_remove(){
				$(".aqua-slider-alt-box").find("span").remove();
				$(".aqua-slider-alt-box").stop().animate({
					"bottom":"-70%",
					opacity:0
				},1000);
			}
			aqua_slider_current_image();
			aqua_slider_alt();
			// ---

			// Creating the animation ---

			function aqua_slider_current_image(){
				current = {
					image: $(".aqua-slider-image-show"),
					image_data: $(".aqua-slider-image-show").attr("img-data-number"),
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
				}else{
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
				}else{
					image = $(".aqua-slider-image").last();
				}
				next = {
					data: next_image_data,
					image: image
				};
				return next;
			}

			function aqua_slider_current_tick(){
				img_data = $(".aqua-slider-image-show").attr("img-data-number");
				$(".aqua-slider-tick").each(function(){
					if($(this).attr("img-select-tick") == img_data)
						$(this).addClass("aqua-slider-tick-select").removeClass("aqua-slider-tick-deselect");
					else
						$(this).addClass("aqua-slider-tick-deselect").removeClass("aqua-slider-tick-select");
				});
			}

			//btn right function
			$(".aqua-right-control").on("click",function(){
				// Clear the auto animation timer
				clearTimeout(timeOut);
				timeOut = setTimeout(aqua_slider_auto_slide,options.a);
				// ----

				aqua_slider_alt_remove();
				aqua_slider_next_image();
				aqua_slider_current_image();
				
				$(current.image).animate({
					"opacity":0
				},600,function(){
					$(this).removeClass("aqua-slider-image-show").addClass("aqua-slider-image-hide");
					aqua_slider_current_tick();
				});
				$(next.image).addClass("aqua-slider-image-show").removeClass("aqua-slider-image-hide").animate({"opacity":1},600);
				setTimeout(function(){
					aqua_slider_current_image();
					aqua_slider_alt();
				},1000);
			});

			// btn left function
			$(".aqua-left-control").on("click",function(){
				// Clear the auto animation timer
				clearTimeout(timeOut);
				timeOut = setTimeout(aqua_slider_auto_slide,options.a);
				// ----

				aqua_slider_alt_remove();
				aqua_slider_prev_image();
				aqua_slider_current_image();
				
				$(current.image).animate({
					"opacity":0
				},600,function(){
					$(this).removeClass("aqua-slider-image-show").addClass("aqua-slider-image-hide");
					aqua_slider_current_tick();
				});
				$(next.image).addClass("aqua-slider-image-show").removeClass("aqua-slider-image-hide").animate({"opacity":1},600);
				setTimeout(function(){
					aqua_slider_current_image();
					aqua_slider_alt();
				},1000);
			});

			function aqua_slider_tick_click(data){
				// Clear the auto animation timer
				clearTimeout(timeOut);
				timeOut = setTimeout(aqua_slider_auto_slide,options.a);
				// ----

				var aqua_image_clicked = $(aqua_self).find("[img-data-number='"+data+"']");
				aqua_slider_current_image();
				if(current.image_data == aqua_image_clicked.attr("img-data-number")){
					return false;
				}
				aqua_slider_alt_remove();
				$(current.image).animate({
					"opacity":0
				},600,function(){
					$(this).removeClass("aqua-slider-image-show").addClass("aqua-slider-image-hide");
					aqua_slider_current_tick();
				});
				$(aqua_image_clicked).addClass("aqua-slider-image-show").removeClass("aqua-slider-image-hide").animate({"opacity":1},600);
				setTimeout(function(){
					aqua_slider_current_image();
					aqua_slider_alt();
				},1000);
				
			}

			// ---

			//auto animation --
			var timeOut = null;
			function aqua_slider_auto_slide(){
				$(".aqua-right-control").trigger("click");
				timeOut = setTimeout(aqua_slider_auto_slide,options.a);
			}
			setTimeout(function(){
				(function(){
					aqua_slider_auto_slide();
				})();
			},options.a);

			aqua_self.on({
				mouseenter:function(){
					clearTimeout(timeOut);
				},
				mouseleave:function(){
					timeOut = setTimeout(aqua_slider_auto_slide,options.a);
				}
			});
			// ---

			// Get the keypress
			$(document).keyup(function(e){
				if(e.keyCode == 39)
					$(".aqua-right-control").trigger("click");
				else if(e.keyCode == 37)
					$(".aqua-left-control").trigger("click");
			});
			// ----
			
			return aqua_self;
		}
	})
})(jQuery);