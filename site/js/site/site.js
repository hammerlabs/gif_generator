var SITE = new Site();   

(function($) {   
	$(document).ready(function(){  
		       
		SITE.config = config; 
		delete config;
		
		if($('html.video')){
			SITE.build();  
			
		}else{
			///doesn't have html5 video so hide gif generator
			$('body').append('<div id="site_holder">Please use a modern browser</div>');
			
		}
	              
	});      
})(jQuery); 

function Site() { 
	this.built = false;   
	this.debugging = true;
	this.tracking = true;
    this.vidW = 640;    
	this.vidH = 300;    
	this.blog_name = "http://www.ahdev.tumblr.com";     
	//this.blog_name = "http://www.americanhustlemoviedev.tumblr.com";      
	                                                                          
	this.site_url = "http://cdn-dev.triggerglobal.com/sony/americanhustle/gif_generator/site/";
	//this.site_url = "http://www.americanhustle-movie.com/tumblr/gifgenerator/";
	
	this.d = new Date();
	this.n = this.d.getTime(); 
	
	this.src = "vid/video";
	this.id = "gif_creator_"+this.n; 

    this.width = 640;
	this.height = 500;  
	
	this.step = -1;   
	
	this.start = 0;
	this.end = 300;    
	this.max = 3;
	this.duration = 0; 
	this.min_start = 0;
	this.max_end = 10;
	
	this.view_video; 
	this.edit_video;  
	this.frame_rate = 24;

};    

Site.prototype.trace = function (val) {    	
	//if(this.debugging) alert(val); 
	//if(this.debugging) console.log(val); 
};  

Site.prototype.build = function () {   
	
	$("#gif_frame").css({  
		"border":"0"});  
		
	$("html").css({  
		"margin":"0",  
		"width":"100%",  
		"height":"100%"
		}); 
		 
	$("body").css({  
		"background-color":"#252525", 
		"margin":"0",  
		"width":"100%",  
		"height":"100%"
		});               
	
	$("body").append('<div id="site_holder"></div>');    
	$("#site_holder").css({    
		"background-color":"#252525", 
		"width":"100%",  
		"height":"100%"
		});  
		
		
	$("#site_holder").append('<div id="site_content"></div>');    
	$("#site_content").css({  
		"margin":"0px auto 0px auto",
		"background-color":"#252525", 
		"width":this.width+"px",  
		"height":"640px",
		"padding":"0px"
		});  
		 
		
	$("#site_content").append('<div id="gif_title">GIF GENERATOR</div>');  
	$("#gif_title").css({  
		"font-size":"26px",
		"color":"#ffc500",
		"font-family":'Baumans',   
		"border-bottom":"1px solid #ffc500",
		"margin":"0px auto 10px auto"
		});      
		 
    
    $("#site_content").append('<div id="steps"></div>');  
	$("#steps").css({  
		"width":"100%",  
		"height":"100%",
		"margin":"0px auto 30px auto"
		});    
		
	
	this.action(0)

};    

Site.prototype.step_0 = function () {   
	                 
	SITE.trace("step 0")
		
	$("#steps").append('<div id="step_0"></div>');  
	$("#step_0").css({     
		"position":"absolute",
		"width":this.width+"px",  
		"height":this.height+"px",
		"margin":"0px auto 30px auto"
		});  
		 
	$("#step_0").append('<div id="step_0_desc">Create an animated gif from the official trailer of American Hustle to download and share. Then view the gifs at the American Hustle Gif Gallery.</div>');  
	$("#step_0_desc").css({  
		"font-size":"16px",
		"color":"#959595",
		"font-family":'Raleway',   
		"margin":"0px auto 30px auto"
		});   
		
    $("#step_0").append('<div id="poster_holder"></div>');  
	$("#poster_holder").css({  
		"background-image":"url("+SITE.config["cdn"]+"images/step_0_img.jpg)",
		"background-position":"left top",
		"background-repeat":"no-repeat",
		"width":this.vidW+"px",  
		"height":this.vidH+"px",
		"margin":"0px auto 30px auto"
		});  
	
	$("#step_0").append('<div id="step_0_nav"></div>');  
	$("#step_0_nav").css({  
		"width":this.width+"px",  
		"height":"100px",
		"margin":"0px auto 30px auto"
		}); 
		
		
	$("#step_0_nav").append('<div id="begin_btn">CLICK TO BEGIN</div>');  
	$("#begin_btn").css({   
		"background-color":"#5a5a5a",
		"padding":"8px",    
		"font-family":"Baumans",
		"font-size":'18px',
		"color":"#FFF",
		"text-align":"center",
		"width":this.width-200+"px",  
		"margin":"0px auto 30px auto",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#begin_btn"), 0, {borderRadius:"2px"});   
	
	$("#begin_btn").click(function(event){    
		SITE.action(1);
	});
	 
	$("#begin_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#begin_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	}); 	
    SITE.trace("step 0")   

};  

Site.prototype.step_1 = function () {   
	
		
	$("#steps").append('<div id="step_1"></div>');  
	$("#step_1").css({    
		"position":"absolute",
		"width":this.width+"px",  
		"height":this.height+"px",
		"margin":"0px auto 30px auto"
		});  
	 
	$("#step_1").append("<div id='step_1_desc'>Choose the start frame of the scene you'd like to use.</div>");  
	$("#step_1_desc").css({  
		"font-size":"16px",
		"color":"#959595",
		"font-family":'Raleway',   
		"margin":"0px auto 30px auto"
		}); 
		   
   	$("#step_1").append('<div id="video_player"></div>');  
	$("#video_player").css({  
		"width":this.vidW+"px",  
		"height":this.vidH+"px",
		"margin":"0px auto 30px auto"
		});     
	                         
	this.vid_type = "mp4";     
	SITE.trace("user_browser = "+SITE.config["user_browser"]);    
	if(SITE.config["user_browser"] == "Firefox") this.vid_type = "webm";
	

	
	
	
	
	//this.vid_player = document.createElement('video');  
	//this.vid_player.setAttribute('class',"video-js vjs-default-skin"); 
	//this.vid_player.setAttribute('width',this.vidW);   
	//this.vid_player.setAttribute('height',this.vidH); 
	//this.vid_player.setAttribute('data-setup',"{}");
	
	
	var src		 	= SITE.config['cdn']+this.src+"."+this.vid_type; 
	var vidType 	= this.vid_type;
	var videoEl =   '<video id="myVideo" class="video-js vjs-default-skin" controls preload="auto" width="'+this.vidW+'" height="'+this.vidH+'" data-setup="{}"><source src="'+src+'" type="video/'+vidType+'" /></video>';
	
	videojs.options.techOrder 		 = [  'html5','flash', 'other supported tech'];
	$("#video_player").append(videoEl); 
	//videojs.players = {};
	SITE.myPlayer = videojs("myVideo");
	
    SITE.myPlayer.ready(function(){
    	//console.log(videojs.players);
	    SITE.view_video = this;    
		SITE.view_video.play();
		
		 this.on("play", function(){
			 
			// SITE.start =  this.currentTime();
			 SITE.duration = Math.round(SITE.view_video.duration());   
		 });
		
		this.on("error",function(event){
			//console.log(event);
			
		});
		
		this.on("ended", function(){
			
		}); 
		if(this.ia == "Flash"){
			this.on("loadedalldata", function(){     
				SITE.trace("loaded ")
				this.currentTime(SITE.start);
			});
			
		}else{
			this.on("loadedmetadata", function(){     
				SITE.trace("loaded ")
				this.currentTime(SITE.start);
			});

		}
	
		  
		this.on("timeupdate", function(){
			SITE.start = Math.round(this.currentTime()*10)/10;
			//console.log(SITE.start); 
			SITE.duration = Math.round(this.duration());   
		    SITE.trace("this.duration() = "+this.duration());
		}); 
	    
	    
    });
	
	
/*
	videojs.options.flash.swf		 = "http://cdn-dev.triggerglobal.com/sony/americanhustle/gif_generator/site/js/libraries/video-js/video-js.swf"; 
	$("#video_player").append(videoEl); 	  
	
	videojs(this.id, "", function(){
		
	
  		// Player (this) is initialized and ready.   
		SITE.view_video = this;    
		
		this.on("ended", function(){
			
		}); 
		
		this.on("loadedmetadata", function(){     
			SITE.trace("loaded ")
			this.currentTime(SITE.start);
		});
		  
		this.on("timeupdate", function(){
			SITE.start = Math.round(this.currentTime()*10)/10; 
			SITE.duration = Math.round(this.duration());   
		    SITE.trace("this.duration() = "+this.duration());
		}); 
		
	});    
*/
	
      
	$("#step_1").append('<div id="step_1_nav"></div>');  
	$("#step_1_nav").css({  
		"width":this.width+"px",  
		"height":"100px",
		"margin":"0px auto 30px auto"
		}); 
		
		
	$("#step_1_nav").append('<div id="generate_gif_btn">GENERATE GIF</div>');  
	$("#generate_gif_btn").css({   
		"background-color":"#5a5a5a",
		"padding":"8px",    
		"font-family":"Baumans",
		"font-size":'18px',
		"color":"#FFF",
		"text-align":"center",
		"width":this.width-200+"px",  
		"margin":"0px auto 30px auto",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#generate_gif_btn"), 0, {borderRadius:"2px"});   
	
	$("#generate_gif_btn").click(function(event){    
		SITE.action(2);
	});
	 
	$("#generate_gif_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#generate_gif_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	}); 

}; 

Site.prototype.step_2 = function () {   

	this.end 		= this.start + 3;                 
	this.min_start  = this.start -1;
	if(this.min_start < 0) {
		this.min_start = 0;
	}
	this.max_end = this.start + 9;      
	if(this.max_end > this.duration) this.max_end = this.duration;          
	this.units = Math.round(this.duration);
	
    SITE.trace("SITE.start = "+this.start+" this.end = "+this.end); 
	$("#steps").append('<div id="step_2"></div>');  
	$("#step_2").css({  
		"position":"absolute", 
		"width":this.width+"px",  
		"height":this.height+"px", 
		"margin":"0px auto 30px auto"
		});  
		
	$("#step_2").append('<div id="edit_video"></div>');  
	$("#edit_video").css({  
		"width":this.vidW+"px",  
		"height":this.vidH+"px",
		"margin":"0px auto 0px auto"
		}); 
		
	
/*
	this.edit_vid_player.setAttribute('id',this.id+"_edit"); 
	this.edit_vid_player.setAttribute('class',"video-js vjs-default-skin"); 
	this.edit_vid_player.setAttribute('width',this.vidW);   
	this.edit_vid_player.setAttribute('height',this.vidH); 
*/ 
	
	var autoPlay = true;
	if(SITE.config["device_type"] != "desktop") {
		autoPlay = false;
	}
	
	var vidType = "mp4";     
	SITE.trace("user_browser = "+SITE.config["user_browser"]);    
	if(SITE.config["user_browser"] == "Firefox") vidType = "webm";
	var src		 					=  SITE.config['cdn']+this.src+"."+this.vid_type; 
	videojs.options.techOrder 		 = [ 'html5','flash','other supported tech'];
	
	var videoEl =   '<video id="myVideo_edit" "autoplay"="'+autoPlay+'" class="video-js vjs-default-skin" preload="auto" width="'+this.vidW+'" height="'+this.vidH+'" data-setup="{}"><source src="'+src+'" type="video/'+vidType+'" /></video>';
	
	$("#edit_video").append(videoEl); 
	//videojs.players = {};
	SITE.edit_video = videojs("myVideo_edit");
	
	
	SITE.edit_video.ready(function(){

		SITE.edit_video = this; 
		this.volume(0); 
		
		this.play();
		//this.currentTime(SITE.start);
		// this.currentTime(30); 
		this.on("ended", function(){
			this.play(SITE.start);
		});
		//console.log(this);
		if(this.ia == "Flash"){
			this.on("loadedalldata", function(){     
				SITE.trace("loaded ")
				this.currentTime(SITE.start);
			});
			
		}else{
			this.on("loadedmetadata", function(){     
				SITE.trace("loaded ")
				this.currentTime(SITE.start);
			});

		}
	
		this.on("timeupdate", function(){

			if(this.currentTime() > SITE.end) this.currentTime(SITE.start);
		});		
		this.on("error",function(event){
			//console.log(event);
			
		});
		
		
	});
	
	
/*
	
	$("#edit_video").append(this.edit_vid_player); 	  
	
	videojs(this.id+"_edit", { "controls": false, "autoplay": this.vid_auto, "preload": "auto", techOrder: ["html5", "flash", "other supported tech"] }, function(){
  		// Player (this) is initialized and ready.     
		this.volume(0);   
		SITE.edit_video = this;  
		this.on("ended", function(){
			this.play(SITE.start);
		});
		
		this.on("loadedmetadata", function(){     
			SITE.trace("loaded ")
			this.currentTime(SITE.start);
		});
		
		this.on("timeupdate", function(){
			if(this.currentTime() > SITE.end) this.currentTime(SITE.start);
		});
	}); 
	
*/

	
	$("#step_2").append('<div id="slider_holder"></div>');  
	$("#slider_holder").css({ 
		"background-color":"#151515",
		"background-image":"url("+SITE.config["cdn"]+"images/slder_holder_background.png)",
		"background-position":"center center",
		"background-repeat":"no-repeat", 
		"width":this.vidW+"px",  
		"height":"100px",
		"margin":"0px auto 30px auto"
		});  
	  
	$("#slider_holder").append('<div id="slider_instructions">ADJUST START AND END MARKERS TO MAKE YOUR GIF</div>');  
	$("#slider_instructions").css({      
		"color":"#959595",          
		"font-size":"12px",   
		"font-family":"Raleway",
		"text-align":"center",
		"width":this.vidW-100+"px",  
		"padding":"10px 0px 10px 0px",  
		"margin":"0px auto 0px auto"
		});  
		
	$("#slider_holder").append('<div id="slider_range"></div>');  
	$("#slider_range").css({  
		"width":this.vidW-200+"px",  
		"height":"30px",
		"margin":"0px auto 0px auto"
		});  
		
	$("#slider_range").slider({
		range: true,
		min: this.min_start,
		max: this.max_end,
		values: [ this.start, this.end ], 
		step: .1,
		slide: function( event, ui ) {
			//SITE.trace("hey yo this.max = "+$( "#slider_range" ).slider( "values", 1 ))
 		},

		stop: function( event, ui ) {          
			SITE.trace("SITE.duration = "+SITE.duration+" SITE.start = "+SITE.start+" 0 = "+$( "#slider_range" ).slider( "values", 0 ))     
			if(SITE.start != $( "#slider_range" ).slider( "values", 0 )) { 
				SITE.start = $( "#slider_range" ).slider( "values", 0 );
				if(SITE.end > SITE.start + SITE.max) SITE.end = SITE.start + SITE.max;  
				$("#slider_range").slider('values', [SITE.start,SITE.end]);     
				SITE.edit_video.currentTime(SITE.start);
				SITE.trace("change in 0")     
				return;
			}
			
			if(SITE.end != $( "#slider_range" ).slider( "values", 1 )) { 
				SITE.end = $( "#slider_range" ).slider( "values", 1 ); 
				if(SITE.start < SITE.end - SITE.max) SITE.start = SITE.end - SITE.max;  
				$("#slider_range").slider('values', [SITE.start,SITE.end]);     
				SITE.edit_video.currentTime(SITE.start); 
				SITE.trace("change in 1")
			} else {
				SITE.trace("no change in 1")
			}   
			
			
			//SITE.trace("hey yo this.min = "+$( "#slider_range" ).slider( "values", 0 )) 
			//SITE.trace("hey yo this.max = "+$( "#slider_range" ).slider( "values", 1 ))
 		}
    }); 

	$("#slider_holder").append('<div id="slider_instructions2">3 SECONDS MAX</div>');  
	$("#slider_instructions2").css({      
		"color":"#959595",          
		"font-size":"12px",   
		"font-family":"Raleway",
		"text-align":"center",
		"width":this.vidW-100+"px",  
		"padding":"10px 0px 0px 0px",
		"margin":"0px auto 5px auto"
		});

    $("#step_2").append('<div id="step_2_nav"></div>');  
	$("#step_2_nav").css({  
		"width":this.width+"px",  
		"height":"100px",
		"margin":"0px auto 30px auto"
		}); 
		
		
	$("#step_2_nav").append('<div id="resume_btn">RESUME VIDEO</div>');  
	$("#resume_btn").css({ 
		"float":"left",  
		"background-color":"#5a5a5a",
		"padding":"8px",    
		"font-family":"Baumans",
		"font-size":'18px',
		"color":"#FFF",
		"text-align":"center",
		"width":"300px",  
		"margin":"0px 0px 0px 0px",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#resume_btn"), 0, {borderRadius:"2px"});   
	
	$("#resume_btn").click(function(event){    
		SITE.action(1);
	});
	 
	$("#resume_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#resume_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	});
	
	$("#step_2_nav").append('<div id="make_btn">GENERATE THIS GIF</div>');  
	$("#make_btn").css({   
		"float":"right",
		"background-color":"#5a5a5a",
		"padding":"8px",    
		"font-family":"Baumans",
		"font-size":'18px',
		"color":"#FFF",
		"text-align":"center",
		"width":"300px",  
		"margin":"0px 0px 0px 0px",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#make_btn"), 0, {borderRadius:"2px"});   
	
	$("#make_btn").click(function(event){    
		SITE.action(3);
	});
	 
	$("#make_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#make_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	});                                                         	
	

}; 

Site.prototype.step_3 = function () {   

	$("#steps").append('<div id="step_3"></div>');  
	$("#step_3").css({  
		"position":"absolute", 
		"width":this.vidW+"px",  
		"height":this.vidH+"px"
		});  
		
	$("#step_3").append('<div id="new_gif"></div>');  
	$("#new_gif").css({     
		"font-size":"11px", 
		"color":"#fff",  
		"background-color":"#000",
		"width":this.vidW+"px",  
		"height":this.vidH+"px", 
		"margin":"0px auto 30px auto"
		}); 
		
	$("#new_gif").append('<div id="loading_title">GENERATING GIF<div class="vjs-default-skin"><div style="top:68%;display:block" class="vjs-loading-spinner"></div></div></div>');  
	$("#loading_title").css({ 
		"font-family":"Baumans", 
		"font-size":"18px", 
		"text-align":"center",
		"width":this.vidW+"px", 
		"height":this.vidH-120+"px", 
		"padding":"120px 0px 0px 0px"
		});   
		      
	this.start_frame = Math.round(this.start * this.frame_rate); 
	this.end_frame = Math.round(this.end * this.frame_rate);   
	this.vid_duration = Math.round(this.duration * this.frame_rate);   
	
	
	 SITE.trace("SITE.start = "+this.start+" this.end = "+this.end); 
	 SITE.trace("SITE.start_frame = "+this.start_frame+" this.end_frame = "+this.end_frame);                                          	
	$("#new_gif").load(SITE.config['site_url']+'gif_generator.php/?s='+this.start_frame+'&e='+this.end_frame+'&d='+this.vid_duration);   
	
	//this.check_gif();
	
	$("#step_3").append('<div id="step_3_nav"></div>');  
	$("#step_3_nav").css({  
		"width":this.vidW+"px",  
		"height":"100px",
		"margin":"0px auto 30px auto"
		}); 
		
		
	$("#step_3_nav").append('<div id="download_btn">DOWNLOAD</div>');  
	$("#download_btn").css({ 
		"float":"left",  
		"background-color":"#5a5a5a",
		"padding":"8px",    
		"font-family":"Baumans",
		"font-size":'18px',
		"color":"#FFF",
		"text-align":"center",
		"width":"190px",  
		"margin":"0px 10px 0px 0px",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#download_btn"), 0, {borderRadius:"2px"});   
	
	$("#download_btn").click(function(event){    
		SITE.download_gif();
	});
	 
	$("#download_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#download_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	});
	
	$("#step_3").append('<div id="step_3_nav"></div>');  
	$("#step_3_nav").css({  
		"width":this.width+"px",  
		"height":"50px",
		"margin":"0px auto 10px auto"
		}); 
		
		
	$("#step_3_nav").append('<div id="view_btn">VIEW IN GALLERY</div>');  
	$("#view_btn").css({ 
		"float":"left",  
		"background-color":"#5a5a5a",
		"padding":"8px",    
		"font-family":"Baumans",
		"font-size":'18px',
		"color":"#FFF",
		"text-align":"center",
		"width":"190px",  
		"margin":"0px 10px 0px 0px",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#view_btn"), 0, {borderRadius:"2px"});   
	
	$("#view_btn").click(function(event){    
		SITE.view_on_wall();
	});
	 
	$("#view_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#view_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	});  
	
	$("#step_3_nav").append('<div id="another_btn">GENERATE ANOTHER</div>');  
	$("#another_btn").css({ 
		"float":"left",  
		"background-color":"#5a5a5a",
		"padding":"8px",    
		"font-family":"Baumans",
		"font-size":'18px',
		"color":"#FFF",
		"text-align":"center",
		"width":"190px",  
		"margin":"0px 0px 0px 0px",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#another_btn"), 0, {borderRadius:"2px"});   
	
	$("#another_btn").click(function(event){  
		SITE.track("createanother_button","pageview");  
		SITE.action(1);
	});
	 
	$("#another_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#another_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	});  
	
	$("#step_3").append('<div id="social_nav"></div>');  
	$("#social_nav").css({  
		"width":"195px",  
		"height":"100px",
		"margin":"0px auto 30px auto"
		}); 
		
	$("#social_nav").append('<div id="facebook_btn"></div>');  
	$("#facebook_btn").css({ 
		"float":"left",  
		"background-color":"#5a5a5a",  
		"background-image":"url("+SITE.config['cdn']+"images/facebook_btn.png)",
		"background-position":"center center",   
		"background-repeat":"no-repeat",
		"text-align":"center",
		"width":"35px",
		"height":"35px",  
		"margin":"0px 17px 0px 0px",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#facebook_btn"), 0, {borderRadius:"2px"});   
	
	$("#facebook_btn").click(function(event){    
		SITE.share_facebook();
	});
	 
	$("#facebook_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#facebook_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	}); 
	
	
	$("#social_nav").append('<div id="twitter_btn"></div>');  
	$("#twitter_btn").css({ 
		"float":"left",  
		"background-color":"#5a5a5a",  
		"background-image":"url("+SITE.config['cdn']+"images/twitter_btn.png)",
		"background-position":"center center",   
		"background-repeat":"no-repeat",
		"text-align":"center",
		"width":"35px",
		"height":"35px",  
		"margin":"0px 17px 0px 0px",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#twitter_btn"), 0, {borderRadius:"2px"});   
	
	$("#twitter_btn").click(function(event){    
		SITE.share_twitter();
	});
	 
	$("#twitter_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#twitter_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	});
	
	$("#social_nav").append('<div id="pintrest_btn"></div>');  
	$("#pintrest_btn").css({ 
		"float":"left",  
		"background-color":"#5a5a5a",  
		"background-image":"url("+SITE.config['cdn']+"images/pintrest_btn.png)",
		"background-position":"center center",   
		"background-repeat":"no-repeat",
		"text-align":"center",
		"width":"35px",
		"height":"35px",  
		"margin":"0px 17px 0px 0px",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#pintrest_btn"), 0, {borderRadius:"2px"});   
	
	$("#pintrest_btn").click(function(event){    
		SITE.share_pintrest();
	});
	 
	$("#pintrest_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#pintrest_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	});  
	
	
	$("#social_nav").append('<div id="tumblr_btn"></div>');  
	$("#tumblr_btn").css({ 
		"float":"left",  
		"background-color":"#5a5a5a",  
		"background-image":"url("+SITE.config['cdn']+"images/tumblr_btn.png)",
		"background-position":"center center",   
		"background-repeat":"no-repeat",
		"text-align":"center",
		"width":"35px",
		"height":"35px",  
		"margin":"0px 0px 0px 0px",
		"cursor":"pointer"
		}); 
	
	TweenMax.to($("#tumblr_btn"), 0, {borderRadius:"2px"});   
	
	$("#tumblr_btn").click(function(event){    
		SITE.share_tumblr();
	});
	 
	$("#tumblr_btn").mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	
	$("#tumblr_btn").mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	});   
	
	

};   
var alreadyLoadedTrackingScript = false;    
Site.prototype.action = function (val) {       
	
	SITE.trace("action val = "+val)     
	
	if(this.step == 1) {
		var vid_buffer = SITE.view_video.bufferedPercent(); 
		this.trace("vid_buffer = "+vid_buffer);
		if(vid_buffer < .2) return;
	}  
	
	if(this.step == 2) {
		var vid_buffer = SITE.edit_video.bufferedPercent();   
		this.trace("vid_buffer = "+vid_buffer)   
		if(vid_buffer < .2) return;
	}
	 
	if(val == 0) {
		this.step_0();
		//console.log('step 0');
		//SITE.track("ah_gif_step_"+val,"pageview");
	}	 
	if(val == 1){
		 this.step_1();
		 if(!alreadyLoadedTrackingScript){
			 $.ajax({
				url: 'http://www.sonypictures.com/global/scripts/s_code.js',
				dataType: "script",
				success: function(){
					  s.pageName='us:movies:americanhustle:tumblr:gifcreator:choosestartframe.html'
					  s.channel=s.eVar3='us:movies'
					  s.prop3=s.eVar23='us:movies:americanhustle:gifcreator'
					  s.prop4=s.eVar4='us:americanhustle'
					  s.prop5=s.eVar5='us:movies:blog'
					  s.prop11='us'     
					  var s_code=s.t();if(s_code)document.write(s_code);
					 // SITE.track("clicktobegin.html","pageview"); 	
					  alreadyLoadedTrackingScript = true;
				}
			});
		 
			 
		 }else{
			 SITE.track("generateanother.html","pageview"); 
			 
		 }

		
	}
	if(val == 2) {
		this.step_2();
		SITE.track("reviewgif.html","pageview"); 
	}
	if(val == 3){
		this.step_3();
		//SITE.track("ah_gif_step_"+val,"pageview");
		SITE.track("confirmation.html","pageview"); 
	}       	       

	if(this.step == 0) {  
		$("#step_0").remove(); 
		
		////load omniture code

		
	}             
	if(this.step == 1) {  

	
		this.view_video.dispose();
		$("#step_1").remove(); 
	}
	if(this.step == 2) {    
		this.edit_video.dispose(); 
		$("#step_2").remove();
	} 
	if(this.step == 3) $("#step_3").remove(); 
	this.step = val;
   
	

};       

Site.prototype.vid_progress = function (time) {  
	
};

Site.prototype.view_currenttime = function () {  
	
}; 

Site.prototype.check_gif = function () {   
	             
	return;
	TweenMax.killAll(false, false, true)                   
	var gif_url = $("#new_gif_img").attr( "gif_src" );  
	 this.trace("check_gif gif_url = "+gif_url)     
	if(gif_url == undefined) {
		TweenMax.delayedCall(.4,this.check_gif,[],this);
	} else {  
		this.trace("check_gif gif_url = "+gif_url)   
		$.ajax({ url: SITE.config["site_url"]+"post_gif.php?g="+gif_url });
	}
	
};   

Site.prototype.gif_name = function () {  
	//current_gif
	var gif_name = $("#new_gif_img").attr( "gif_name" );   
	this.trace("gif_name = "+gif_name) 
    return gif_name;
}; 

Site.prototype.gif_src = function () {  
	//current_gif
	var gif_url = $("#new_gif_img").attr( "src" );   
	this.trace("gif_url = "+gif_url) 
    return gif_url;
}; 

Site.prototype.post_id = function () {  
	//current_gif
	var post_id = $("#new_gif_img").attr( "post_id" );   
	this.trace("post_id = "+post_id) 
    return post_id;
};

Site.prototype.share_facebook = function () {  
	if(this.post_id() == undefined) return;   
	var share_facebook = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(this.blog_name+"/post/"+this.post_id());
	this.trace("share_facebook = "+share_facebook)  
	SITE.track("postfacebook_button","outboundclick","www.facebook.com"); 
	window.open(
	      share_facebook, 
	      'facebook-share-dialog', 
	      'width=626,height=436');	
};

Site.prototype.share_twitter = function () {  
	if(this.post_id() == undefined) return;   
	var tweet = "Check out #AmericanHustle on Tumblr to create your own animated gif! In theaters December 2013."+this.blog_name+"/post/"+this.post_id();
	this.trace("tweet = "+tweet)  
	SITE.track("posttwitter_button","outboundclick","www.twitter.com");  
	window.open(
	      'http://twitter.com/intent/tweet?text='+encodeURIComponent(tweet), 
	      'twitter-share-dialog', 
	      'width=626,height=436');	
};

Site.prototype.share_pintrest = function () {  
	if(this.post_id() == undefined) return;   
	var pintrest_url = "Check out the Gif I made for American Hustle";
	this.trace("pintrest_url = "+pintrest_url)  
	SITE.track("postpintrest_button","outboundclick","www.pintrest.com");  
	window.open('http://pinterest.com/pin/create/link/?url='+this.blog_name+"/post/"+this.post_id());	
}; 

Site.prototype.share_tumblr = function () {  
	if(this.post_id() == undefined) return;   
	var share_tumblr = this.blog_name+"/post/"+this.post_id();   
	var share_tumblr_title = "Check out &#35;AmericanHustle on Tumblr to create your own animated gif!"
	this.trace("share_tumblr = "+share_tumblr)        
	SITE.track("posttumblr_button","outboundclick","www.tumblr.com"); 
	window.open('http://www.tumblr.com/share?v=3&u='+encodeURIComponent(share_tumblr)+"&t="+encodeURIComponent(share_tumblr_title));	
}; 



Site.prototype.download_gif = function () {  
	//current_gif   
	           
	if(this.gif_name() == undefined) return; 
	//var test_url = "ah_gif_1380855585.gif";
	SITE.track("ah_gif_download","download");       
	window.open(SITE.config['site_url']+'download.php/?f='+this.gif_name()) 
}; 

Site.prototype.view_on_wall = function () {  
	//current_gif   
	           
	if(this.gif_src() == undefined) return;   
	
	window.top.location.href = this.blog_name+"/tagged/AmericanHustleTrailer";
}; 

Site.prototype.track = function(id, type, url, name, position) {  
	                               
	this.trace("track this.tracking = "+this.tracking)           
	if(!this.tracking) return;
	this.trace("!!!!!!!!!!!!!!! track id = "+id+" type = "+type+" url = "+url);
	
	if(type == 'outboundclick'){  
		sCode.trackOutboundClick(url,id);  
	}
	if(type == 'featured'){  
		sCode.trackFeaturedContentClick(url,id);
	}
	
	if(type == 'video'){  
		sCode.trackVideo(id,"start");
	}         
	
	if(type == 'pageview'){     
		sCode.trackPageView(id);
	}
	
	if(type == 'download'){   
		sCode.trackDownload(id);
	}  
	 
	if(type == 'outboundclicktobuy'){  
		sCode.trackOutboundClickToBuy(url,id);
	} 
	
	if(type == 'game') {
		sCode.trackGame(name,position)
	}

} 

