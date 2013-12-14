var SITE = new Site();   
(function($) {   
	$(document).ready(function(){  
		SITE.config = config; 
		delete config;
		if($('html.video'))SITE.build();  
	});      
})(jQuery); 
function Site() { 
	this.d = new Date();
	this.n = this.d.getTime(); 
	this.id = "gif_creator_"+this.n; 
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
	if(this.debugging) console.log("trace", val); 
};  
Site.prototype.build = function () {   
	this.build_lang();
    this.vidW = this.config.video_width;    
	this.vidH = this.config.video_height;    
    this.width = this.config.video_width;
	this.height = this.config.video_height+200;  
	this.debugging = this.config.debugging;
	this.tracking = this.config.tracking;
	this.src = "themes/"+this.config.theme+"/video/video";
	
	$("#gif_frame").css({"border":"0"});  
	$("body").append('<div id="site_holder"></div>');    
	$("#site_holder").append('<div id="site_content"></div>');    
	$("#site_content").append('<div id="gif_title">' + this.lang['gif_title'] + '</div>');  
    $("#site_content").append('<div id="steps"></div>');  
	this.action(0)
};    
Site.prototype.btn_hover_setup = function (btn) {
	/*btn.mouseenter(function (event){  
		TweenMax.to(this, .2, {backgroundColor:"#ffc500", color:"#000", overwrite:2});   
	}); 
	btn.mouseleave(function (event){    
		TweenMax.to(this, .2, {backgroundColor:"#5a5a5a", color:"#FFF", overwrite:2});     
	});*/
}
Site.prototype.step_0 = function () {   
	$("#steps").append('<div id="step_0" class="step"></div>');  
	$("#step_0").append('<div id="step_0_desc" class="step_desc content_font">' + this.lang['step_0_desc'] + '</div>');  
    $("#step_0").append('<div id="poster_holder" class="step_content"></div>');  
	$("#step_0").append('<div id="step_0_nav" class="step_nav"></div>');  
	$("#step_0_nav").append('<div id="begin_btn" class="step_btn">' + this.lang['step_0_begin_btn'] + '</div>');  
	$("#begin_btn").click(function(event){    
		SITE.action(1);
	});
	this.btn_hover_setup( $("#begin_btn") );
    SITE.trace("step 0")   
};  
Site.prototype.step_1 = function () {   
	$("#steps").append('<div id="step_1" class="step"></div>');  
	$("#step_1").append('<div id="step_1_desc" class="step_desc content_font">' + this.lang['step_1_desc'] + '</div>');  
   	$("#step_1").append('<div id="video_player" class="step_content"></div>');  
	                         
	this.vid_type = "mp4";     
	SITE.trace("user_browser = "+SITE.config["user_browser"]);    
	if(SITE.config["user_browser"] == "Firefox") this.vid_type = "webm";

	var src = SITE.config['cdn']+this.src+"."+this.vid_type; 
	var vidType = this.vid_type;
	var videoEl = '<video id="myVideo" class="video-js vjs-default-skin" controls preload="auto" width="'+this.vidW+'" height="'+this.vidH+'" data-setup="{}"><source src="'+src+'" type="video/'+vidType+'" /></video>';
	videojs.options.techOrder = [  'html5','flash', 'other supported tech'];
	$("#video_player").append(videoEl); 
	SITE.myPlayer = videojs("myVideo");
    SITE.myPlayer.ready(function(){
	    SITE.view_video = this; 
		SITE.view_video.play();
		this.on("play", function(){
			SITE.duration = Math.round(SITE.view_video.duration());   
		});
		this.on("error",function(event){
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
		    //SITE.trace("this.duration() = "+this.duration());
		}); 
    });

	$("#step_1").append('<div id="step_1_nav" class="step_nav"></div>');  
	$("#step_1_nav").append('<div id="generate_gif_btn" class="step_btn">' + this.lang.step_1_generate_gif_btn + '</div>');  
	//TweenMax.to($("#generate_gif_btn"), 0, {borderRadius:"2px"});   
	$("#generate_gif_btn").click(function(event){    
		SITE.action(2);
	});
	this.btn_hover_setup( $("#generate_gif_btn") );
}; 

Site.prototype.step_2 = function () {   
	this.end = this.start + 3;                 
	this.min_start = this.start -1;
	if(this.min_start < 0) {
		this.min_start = 0;
	}
	this.max_end = this.start + 9;      
	if(this.max_end > this.duration) this.max_end = this.duration;          
	this.units = Math.round(this.duration);
	
    SITE.trace("SITE.start = "+this.start+" this.end = "+this.end); 
	$("#steps").append('<div id="step_2" class="step"></div>');  		
	$("#step_2").append('<div id="edit_video" class="step_content"></div>');  

	var autoPlay = true;
	if(SITE.config["device_type"] != "desktop") {
		autoPlay = false;
	}
	
	var vidType = "mp4";     
	SITE.trace("user_browser = "+SITE.config["user_browser"]);    
	if(SITE.config["user_browser"] == "Firefox") vidType = "webm";
	var src = SITE.config['cdn']+this.src+"."+this.vid_type; 
	videojs.options.techOrder = [ 'html5','flash','other supported tech'];
	
	var videoEl = '<video id="myVideo_edit" "autoplay"="'+autoPlay+'" class="video-js vjs-default-skin" preload="auto" width="'+this.vidW+'" height="'+this.vidH+'" data-setup="{}"><source src="'+src+'" type="video/'+vidType+'" /></video>';
	
	$("#edit_video").append(videoEl); 
	SITE.edit_video = videojs("myVideo_edit");
	SITE.edit_video.ready(function(){
		SITE.edit_video = this; 
		this.volume(0); 
		this.play();
		this.on("ended", function(){
			this.play(SITE.start);
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
			if(this.currentTime() > SITE.end) this.currentTime(SITE.start);
		});		
		this.on("error",function(event){
		});
	});

	$("#step_2").append('<div id="slider_holder"></div>');  
	$("#slider_holder").css({ 
		"background-image":"url("+SITE.config["cdn"]+"images/slder_holder_background.png)",
		});  
	  
	$("#slider_holder").append('<div id="slider_instructions" class="content_font">' + this.lang.step_2_slider_instructions + '</div>');  		
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
 		}
    }); 

	$("#slider_holder").append('<div id="slider_instructions2" class="content_font">' + this.lang.step_2_slider_instructions2 + '</div>');  
    $("#step_2").append('<div id="step_2_nav" class="step_nav"></div>');  
	$("#step_2_nav").append('<div id="resume_btn" class="step_btn float_left">' + this.lang.step_2_resume_btn + '</div>');  
	$("#resume_btn").click(function(event){    
		SITE.action(1);
	});
	this.btn_hover_setup( $("#resume_btn") );
	
	$("#step_2_nav").append('<div id="make_btn" class="step_btn float_right">' + this.lang.step_2_make_btn + '</div>');  
	$("#make_btn").click(function(event){    
		SITE.action(3);
	});
	this.btn_hover_setup( $("#make_btn") );
}; 

Site.prototype.step_3 = function () {   
	$("#steps").append('<div id="step_3" class="step"></div>');  
	$("#step_3").append('<div id="step_3_desc" class="step_desc content_font">' + this.lang['step_3_desc'] + '</div>');  
	$("#step_3").append('<div id="new_gif" class="content"></div>');  
	$("#new_gif").append('<div id="loading_title">' + this.lang.step_3_generating_gif + '<div class="vjs-default-skin"><div class="vjs-loading-spinner"></div></div></div>');  
		      
	this.start_frame = Math.round(this.start * this.frame_rate); 
	this.end_frame = Math.round(this.end * this.frame_rate);   
	this.vid_duration = Math.round(this.duration * this.frame_rate);   

	SITE.trace("SITE.start = "+this.start+" this.end = "+this.end); 
	SITE.trace("SITE.start_frame = "+this.start_frame+" this.end_frame = "+this.end_frame);                                          	
	$("#new_gif").load(SITE.config['webroot']+'gif_generator.php?theme='+SITE.config['theme']+'&s='+this.start_frame+'&e='+this.end_frame+'&d='+this.vid_duration);   

	$("#step_3").append('<div id="step_3_nav" class="step_nav"></div>');  		
	$("#step_3_nav").append('<div id="download_btn" class="step_btn float_left">' + this.lang.step_3_download_btn + '</div>');  
	$("#download_btn").click(function(event){    
		SITE.download_gif();
	});	 
	this.btn_hover_setup( $("#download_btn") );
		
	$("#step_3_nav").append('<div id="view_btn" class="step_btn float_left">' + this.lang.step_3_view_btn + '</div>');  
	$("#view_btn").click(function(event){    
		SITE.view_on_wall();
	});
	this.btn_hover_setup( $("#view_btn") );
	
	$("#step_3_nav").append('<div id="another_btn" class="step_btn float_left">' + this.lang.step_3_another_btn + '</div>');  
	$("#another_btn").click(function(event){  
		SITE.track("createanother_button","pageview");  
		SITE.action(1);
	});
	this.btn_hover_setup( $("#another_btn") );
	
	$("#step_3").append('<div id="social_nav"></div>');  

	this.build_social_btn("facebook_btn").click(function(event){    
		SITE.share_facebook();
	});
	this.build_social_btn("twitter_btn").click(function(event){    
		SITE.share_twitter();
	});
	this.build_social_btn("pintrest_btn").click(function(event){    
		SITE.share_pintrest();
	});
	this.build_social_btn("tumblr_btn").click(function(event){    
		SITE.share_tumblr();
	});
};   
Site.prototype.build_social_btn = function(id) {
	$("#social_nav").append('<div id="'+id+'" class="social_btn"></div>');  
	this.btn_hover_setup( $("#"+id) );
	return $("#"+id);
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
	}	 
	if(val == 1){
		 this.step_1();
		 if(!alreadyLoadedTrackingScript){
			 $.ajax({
				url: '//www.sonypictures.com/global/scripts/s_code.js',
				dataType: "script",
				success: function(){
					  s.pageName='us:movies:pompeii:tumblr:gifcreator:choosestartframe.html'
					  s.channel=s.eVar3='us:movies'
					  s.prop3=s.eVar23='us:movies:pompeii:gifcreator'
					  s.prop4=s.eVar4='us:pompeii'
					  s.prop5=s.eVar5='us:movies:blog'
					  s.prop11='us'     
					  var s_code=s.t();if(s_code)document.write(s_code);
					  alreadyLoadedTrackingScript = true;
				}
			});
		 }else{
			SITE.track("generateanother_button","outboundclick","generateanother.html"); 
		 }
	}
	if(val == 2) {
		this.step_2();
		SITE.track("adjustlength.html","pageview"); 
	}
	if(val == 3){
		this.step_3();
		SITE.track("gifconfirmation.html","pageview"); 
	}       	       
	if(this.step == 0) {  
		$("#step_0").remove(); 
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
Site.prototype.gif_name = function () {  
	//current_gif
	var gif_name = $("#user_gif").attr( "gif_name" );   
	this.trace("gif_name = "+gif_name) 
    return gif_name;
}; 
Site.prototype.gif_src = function () {  
	//current_gif
	var gif_url = $("#user_gif").attr( "src" );   
	this.trace("gif_url = "+gif_url) 
    return gif_url;
}; 
Site.prototype.post_id = function () {  
	//current_gif
	var post_id = $("#user_gif").attr( "post_id" );   
	this.trace("post_id = "+post_id) 
    return post_id;
};
Site.prototype.share_facebook = function () {  
	if(this.post_id() == undefined) return;   
	var share_facebook = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(this.config.shareblog_name+"/post/"+this.post_id());
	this.trace("share_facebook = "+share_facebook)  
	SITE.track("postfacebook_button","outboundclick","www.facebook.com"); 
	window.open(
	      share_facebook, 
	      'facebook-share-dialog', 
	      'width=626,height=436');	
};
Site.prototype.share_twitter = function () {  
	if(this.post_id() == undefined) return;   
	var tweet = this.config.share_content+this.config.shareblog_name+"/post/"+this.post_id();
	this.trace("tweet = "+tweet)  
	SITE.track("posttwitter_button","outboundclick","www.twitter.com");  
	window.open(
	      'http://twitter.com/intent/tweet?text='+encodeURIComponent(tweet), 
	      'twitter-share-dialog', 
	      'width=626,height=436');	
};
Site.prototype.share_pintrest = function () {  
	if(this.post_id() == undefined) return;   
	this.trace("share_pintrest = "+this.config.shareblog_name+"/post/"+this.post_id())        
	SITE.track("postpintrest_button","outboundclick","www.pintrest.com");  
	window.open('http://pinterest.com/pin/create/link/?url='+this.config.shareblog_name+"/post/"+this.post_id());	
}; 
Site.prototype.share_tumblr = function () {  
	if(this.post_id() == undefined) return;   
	var share_tumblr = this.config.shareblog_name+"/post/"+this.post_id();   
	var share_tumblr_title = this.config.share_content;
	this.trace("share_tumblr = "+share_tumblr)        
	SITE.track("posttumblr_button","outboundclick","www.tumblr.com"); 
	window.open('http://www.tumblr.com/share?v=3&u='+encodeURIComponent(share_tumblr)+"&t="+encodeURIComponent(share_tumblr_title));	
}; 
Site.prototype.download_gif = function () {  
	if(this.gif_name() == undefined) return; 
	SITE.track("gif_download","download");       
	window.open(SITE.config['webroot']+'download.php/?f='+this.gif_name()) 
}; 
Site.prototype.view_on_wall = function () {  
	if(this.gif_src() == undefined) return;   
	window.top.location.href = this.config.shareblog_name+this.config.view_on_wall_link;
}; 
Site.prototype.track = function(id, type, url, name, position) {  
	this.trace({id:id, type:type, url:url, name:name, position:position});
	if (typeof sCode == 'undefined' || !this.tracking) return;
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