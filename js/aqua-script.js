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
			options.a = select.animation || 9000;
			options.c = select.control || "on";
			options.i = select.autoPlay || "off";
			options.t = select.type || "fade";

			var aqua_slide_size;

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
				img_self.addClass("aqua-slider-image").attr("img-data-number",aqua_images_count).css({width:aqua_self.width()});
				
				if(options.t == "fade")
					img_self.addClass("fade-style");
				else if(options.t == "slide"){
					img_self.addClass("slide-style");
				}

				if(aqua_images_count == 1)
					img_self.addClass("aqua-slider-image-show").css({opacity:1});
				else
					img_self.addClass("aqua-slider-image-hide").css({opacity:0});
					
			});
			// Slice Build ---
			var slicer_count = 10; // Slice counter
			var aqua_slider_count_slicer = Number( $(".aqua-slider-image").first().width() / slicer_count);
			var aqua_slider_slice_height = $(".aqua-slider-container .aqua-slider-image").height();
			var leftCount = 0;
			var position_background = 0;
			for(i=1;i<=slicer_count;i++){
				var slicer = $("<div>");
				slicer.attr("aqua-slider-data-slicer",i);
				if(position_background > 0)
					slicer.css({"backgroundPosition":"-"+position_background+"px,0px"});
				else
					slicer.css({"backgroundPosition":position_background+"px,0px"});

				slicer.addClass("aqua-slider-slicer").css({width:aqua_slider_count_slicer,height:aqua_slider_slice_height,left:Number(leftCount)});
				leftCount += Number(aqua_slider_count_slicer);
				position_background += Number(aqua_slider_count_slicer);
				$(".aqua-slider-container").append(slicer);
			}
			// ---

			//If a image have a link ---
			aqua_self.find("a").each(function(){
				var self = $(this);
				var href = self.attr("href");
				var image_replace = self.children("img").attr("aqua-slider-link",href).css({"cursor":"pointer"}).on("click",function(){
					var image_url = $(this).attr("aqua-slider-link");
					window.location.assign(image_url);
				});
				self.before(image_replace);
				self.remove();
			});


			// Build the slider controler ---
			if(options.c == "on"){
				// Left button
				var aqua_btn_left = $("<div>");
				aqua_btn_left.addClass("aqua-slider-controler aqua-slider-arrow aqua-left-control");
				$(".aqua-slider-container").append(aqua_btn_left);

				// Right button
				var aqua_btn_left = $("<div>");
				aqua_btn_left.addClass("aqua-slider-controler aqua-slider-arrow aqua-right-control");
				$(".aqua-slider-container").append(aqua_btn_left);
			}

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
				height: (Number(options.h) + Number(getSizeBot))
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
					$(".aqua-slider-alt-box").stop().animate({
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

			var objectAnimateNext;
			if(options.t == "fade" || options.t == "basic-fade")
				objectAnimateNext = {opacity:0}
			else if(options.t == "slice-wave")
				objectAnimateNext = {"top":"100%"}

			//btn right function
			function aqua_slider_click_next(){
				aqua_slider_alt_remove();
				aqua_slider_next_image();
				aqua_slider_current_image();
				$(".aqua-right-control").unbind("click");
				var current_image_src = $(current.image).attr("src");
				var slicer_timer = 50;
				$(".aqua-slider-slicer").css({backgroundImage:"url('"+current_image_src+"')",opacity:1});
				aqua_self.find(".aqua-slider-slicer").each(function(){
					var self = $(this);
					if(options.t == "slice"){
						if( (Number(self.attr("aqua-slider-data-slicer")) % 2 ) == 0)
							objectAnimateNext = {"top":"-100%",opacity:1}
						else
							objectAnimateNext = {"top":"100%",opacity:1}
					}if(options.t == "basic-fade"){
						slicer_timer = 500;
					}else if(options.t == "slice-wave"){
						slicer_timer += 150;
					}else{
						slicer_timer += 100;
					}
					console.log(slicer_timer);
					$(current.image).removeClass("aqua-slider-image-show").addClass("aqua-slider-image-hide").css({opacity:0});
					$(next.image).addClass("aqua-slider-image-show").removeClass("aqua-slider-image-hide").css({"opacity":1});
					self.animate(objectAnimateNext,slicer_timer,function(){
						self.css({opacity:0,top:0});
						if(self.attr("aqua-slider-data-slicer") == slicer_count ){
							aqua_slider_current_tick();
							$(".aqua-right-control").bind("click",aqua_slider_click_next);
							aqua_slider_current_image();
							aqua_slider_alt();
							return true;
						}else{
							return true;
						}
					});
				});
			}
			$(".aqua-right-control").on("click",function(){
				aqua_slider_click_next();
			});

			var objectAnimatePrev;
			if(options.t == "fade" || options.t == "basic-fade")
				objectAnimatePrev = {opacity:0}
			else if(options.t == "slice-wave")
				objectAnimatePrev = {"top":"100%",opacity:1}

			// btn right function
			function aqua_slider_click_prev(){
				aqua_slider_alt_remove();
				aqua_slider_prev_image();
				aqua_slider_current_image();

				$(".aqua-left-control").unbind("click");
				var current_image_src = $(current.image).attr("src");
				var slicer_timer = 50;
				$(".aqua-slider-slicer").css({backgroundImage:"url('"+current_image_src+"')",opacity:1});
				var position;
				var data_slicer_limit = Number(slicer_count);
				aqua_self.find(".aqua-slider-slicer").each(function(){
					var self = $("[aqua-slider-data-slicer='"+data_slicer_limit+"']");
					--data_slicer_limit;
					if(options.t == "slice"){
						if( (Number(self.attr("aqua-slider-data-slicer")) % 2 ) == 0)
							objectAnimatePrev = {"top":"-100%",opacity:1}
						else
							objectAnimatePrev = {"top":"100%",opacity:1}
					}if(options.t == "basic-fade"){
						slicer_timer = 500;
					}else if(options.t == "slice-wave"){
						slicer_timer += 150;
					}else{
						slicer_timer += 100;
					}
					$(current.image).removeClass("aqua-slider-image-show").addClass("aqua-slider-image-hide").css({opacity:0});
					$(next.image).addClass("aqua-slider-image-show").removeClass("aqua-slider-image-hide").css({"opacity":1});
					self.animate( objectAnimatePrev ,slicer_timer,function(){
						self.css({opacity:0,marginLeft:0,top:0});
						if(self.attr("aqua-slider-data-slicer") == 2 ){
							aqua_slider_current_tick();
							$(".aqua-left-control").bind("click",aqua_slider_click_prev);
							aqua_slider_current_image();
							aqua_slider_alt();
							return true;
						}else{
							return true;
						}
					});
				});
			}

			// btn left function
			$(".aqua-left-control").on("click",function(){
				aqua_slider_click_prev();
			});

			function aqua_slider_tick_click(data){
				var aqua_image_clicked = $(aqua_self).find("[img-data-number='"+data+"']");
				aqua_slider_current_image();
				if(current.image_data == aqua_image_clicked.attr("img-data-number")){
					return false;
				}
				aqua_slider_alt_remove();
				$(".aqua-right-control").unbind("click");
				$(current.image).animate({
					"opacity":0
				},600,function(){
					$(this).removeClass("aqua-slider-image-show").addClass("aqua-slider-image-hide");
					aqua_slider_current_tick();
					$(".aqua-right-control").bind("click",aqua_slider_click_next);
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
			var first_pass = false;
			function aqua_slider_auto_slide(){
				if(!first_pass){
					first_pass = true;
				}else{
					aqua_slider_click_next();
				}
				timeOut = setTimeout(aqua_slider_auto_slide,options.a);
			}

			if(options.i == "on"){
				aqua_slider_auto_slide();

				$(".aqua-slider-control-container").on({
					mouseover: function(){
						clearTimeout(timeOut);
					},
					mouseleave: function(){
						timeOut = setTimeout(aqua_slider_auto_slide,options.a);
					}
				});
			}
			return aqua_self;
		}
	})
})(jQuery);