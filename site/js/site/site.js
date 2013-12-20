// make console safe to use
if (typeof console === "undefined"){
	console={};
	console.log = function(){return;}
}
var SITE = new Site();   
(function($) {   
	$(document).ready(function(){  
		$Share.init({
			shareBlogname: config.share_blogname,
			shareUrl: config.share_url,
			shareImage: config.share_image,
			title: config.share_title,
			content: config.share_content,
			tags: config.share_tags
		});
		SITE.config = config;
		SITE.share = $Share; 
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
	
	this.frame_rate = 24;
	this.videoLoaded = false;
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
	this.btn_rollovers = $.parseJSON(this.config.btn_rollovers);
	
	/*
	$("#gif_frame").css({"border":"0"});  
	$("body").append('<div id="site_holder"></div>');    
	$("#site_holder").append('<div id="site_content"></div>');    
	$("#site_content").append('<div id="gif_title">' + this.lang['gif_title'] + '</div>');  
    $("#site_content").append('<div id="steps"></div>');  
	*/
	this.action(0);
	this.createVideo();
	this.createSlider();
};    
Site.prototype.btn_hover_setup = function (btn) {
	if (this.btn_rollovers == false) return;
	btn.mouseenter(function (event){  
		TweenMax.to(this, .2, SITE.btn_rollovers.mouseenter);   
	}); 
	btn.mouseleave(function (event){    
		TweenMax.to(this, .2, SITE.btn_rollovers.mouseleave);     
	});
}
Site.prototype.createSlider = function () {
	$("#slider_instructions").html(this.lang.step_2_slider_instructions);  		
	$("#slider_instructions2").html(this.lang.step_2_slider_instructions2);  
}
Site.prototype.initSlider = function () {
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
				SITE.myPlayer.currentTime(SITE.start);
				SITE.trace("change in 0")     
				return;
			}
			if(SITE.end != $( "#slider_range" ).slider( "values", 1 )) { 
				SITE.end = $( "#slider_range" ).slider( "values", 1 ); 
				if(SITE.start < SITE.end - SITE.max) SITE.start = SITE.end - SITE.max;  
				$("#slider_range").slider('values', [SITE.start,SITE.end]);     
				SITE.myPlayer.currentTime(SITE.start); 
				SITE.trace("change in 1")
			} else {
				SITE.trace("no change in 1")
			}   
 		}
    }); 
}
Site.prototype.createVideo = function () {
	this.vid_type = "mp4";     
	SITE.trace("user_browser = "+SITE.config["user_browser"]);    
	if(SITE.config["user_browser"] == "Firefox") this.vid_type = "webm";

	var src = SITE.config['cdn']+this.src+"."+this.vid_type; 
	var vidType = this.vid_type;
	var videoEl = '<video id="myVideo" class="video-js vjs-default-skin" controls preload="auto" "autoplay"="false" width="'+this.vidW+'" height="'+this.vidH+'" data-setup="{}"><source src="'+src+'" type="video/'+vidType+'" /></video>';
	videojs.options.techOrder = ['html5'];
	$(".step_content").append(videoEl);
	SITE.myPlayer = videojs("myVideo");
	//$("#myVideo").hide();
	SITE.myPlayer.ready(SITE.videoReady());
}
Site.prototype.videoReady = function () {
	SITE.myPlayer.on("play", function(){
		SITE.duration = Math.round(SITE.myPlayer.duration());   
	});
	SITE.myPlayer.on("error",function(event){
	});
	SITE.myPlayer.on("ended", function(){
		if (SITE.step == 2) SITE.myPlayer.play(SITE.start);
	}); 
	SITE.myPlayer.on("loadedmetadata", function(){     
		SITE.trace("loaded");
		SITE.videoLoaded = true;
		if (SITE.step == 2) SITE.myPlayer.currentTime(SITE.start);
	});
	SITE.myPlayer.on("timeupdate", function(){
		if (SITE.step == 1) {
			SITE.start = Math.round(SITE.myPlayer.currentTime()*10)/10;
			SITE.duration = Math.round(SITE.myPlayer.duration());   
		} else if (SITE.step == 2) {
			if(SITE.myPlayer.currentTime() > SITE.end) SITE.myPlayer.currentTime(SITE.start);
		}
	}); 
}
Site.prototype.step_0 = function () {
	$(".step").addClass("step_0").removeClass("step_1").removeClass("step_2").removeClass("step_3");
	$(".step_desc").html(this.lang.step_0_desc);
	$(".step_0 .step_nav").html('<div id="begin_btn" class="step_btn">' + this.lang.step_0_begin_btn + '</div>');
	$("#begin_btn").click(function(event){    
		if (SITE.videoLoaded) SITE.action(1);
	});
	this.btn_hover_setup( $("#begin_btn") );
    SITE.trace("step 0");   
};  
Site.prototype.step_1 = function () {   
	$(".step").removeClass("step_0").addClass("step_1").removeClass("step_2").removeClass("step_3");
	$(".step_desc").html(this.lang.step_1_desc);
	//$("#myVideo").show();
	SITE.myPlayer.play();
	$(".step_nav").html('<div id="generate_gif_btn" class="step_btn">' + this.lang.step_1_generate_gif_btn + '</div>');  
	$("#generate_gif_btn").click(function(event){    
		SITE.action(2);
	});
	this.btn_hover_setup( $("#generate_gif_btn") );
}; 

Site.prototype.step_2 = function () {   
	$(".step").removeClass("step_0").removeClass("step_1").addClass("step_2").removeClass("step_3");
	$(".step_desc").html(this.lang.step_2_desc);

	this.end = this.start + 3;                 
	this.min_start = this.start -1;
	if (this.min_start < 0) this.min_start = 0;
	this.max_end = this.start + 9;      
	if (this.max_end > this.duration) this.max_end = this.duration;          
	this.units = Math.round(this.duration);
    SITE.trace("SITE.start = "+this.start+" this.end = "+this.end); 

	SITE.myPlayer.volume(0); 
	SITE.myPlayer.currentTime(SITE.start);
	SITE.myPlayer.play();

	$(".step_nav").html('<div id="resume_btn" class="step_btn float_left">' + this.lang.step_2_resume_btn + '</div>');  
	$("#resume_btn").click(function(event){    
		SITE.action(1);
	});
	this.btn_hover_setup( $("#resume_btn") );
	
	$(".step_nav").append('<div id="make_btn" class="step_btn float_right">' + this.lang.step_2_make_btn + '</div>');  
	$("#make_btn").click(function(event){    
		SITE.action(3);
	});
	this.btn_hover_setup( $("#make_btn") );
	
	SITE.initSlider();
}; 

Site.prototype.step_3 = function () {   
	$(".step").removeClass("step_0").removeClass("step_1").removeClass("step_2").addClass("step_3");
	$(".step_desc").html(this.lang.step_3_desc);

	//$("#step_3").append('<div id="new_gif" class="content"></div>');  
	$(".step_content").append('<div id="loading_title">' + this.lang.step_3_generating_gif + '<div class="vjs-default-skin"><div class="vjs-loading-spinner"></div></div></div>');  
		      
	this.start_frame = Math.round(this.start * this.frame_rate); 
	this.end_frame = Math.round(this.end * this.frame_rate);   
	this.vid_duration = Math.round(this.duration * this.frame_rate);   

	SITE.trace("SITE.start = "+this.start+" this.end = "+this.end); 
	SITE.trace("SITE.start_frame = "+this.start_frame+" this.end_frame = "+this.end_frame);                                          	
	$(".step_content").load(SITE.config['webroot']+'gif_generator.php?theme='+SITE.config['theme']+'&s='+this.start_frame+'&e='+this.end_frame+'&d='+this.vid_duration);   

	//$("#step_3").append('<div id="step_3_nav" class="step_nav"></div>');  		
	$(".step_nav").html('<div id="download_btn" class="step_btn float_left">' + this.lang.step_3_download_btn + '</div>');  
	$("#download_btn").click(function(event){    
		SITE.download_gif();
	});	 
	this.btn_hover_setup( $("#download_btn") );
		
	$(".step_nav").append('<div id="view_btn" class="step_btn float_left">' + this.lang.step_3_view_btn + '</div>');  
	$("#view_btn").click(function(event){    
		SITE.view_on_wall();
	});
	this.btn_hover_setup( $("#view_btn") );
	
	$(".step_nav").append('<div id="another_btn" class="step_btn float_left">' + this.lang.step_3_another_btn + '</div>');  
	$("#another_btn").click(function(event){  
		SITE.track("createanother_button","pageview");  
		//SITE.action(1);
		location.reload();
	});
	this.btn_hover_setup( $("#another_btn") );
	
	$(".step_3").append('<div id="social_nav"></div>');  

	this.build_social_btn("facebook_btn").click(function(event){    
		SITE.share_facebook();
	});
	this.build_social_btn("twitter_btn").click(function(event){    
		SITE.share_twitter();
	});
	this.build_social_btn("pinterest_btn").click(function(event){    
		SITE.share_pinterest();
	});
	this.build_social_btn("tumblr_btn").click(function(event){    
		SITE.share_tumblr();
	});
};   
Site.prototype.build_social_btn = function(id) {
	$("#social_nav").append('<div id="'+id+'" class="social_btn"></div>');  
	//this.btn_hover_setup( $("#"+id) );
	return $("#"+id);
};
var alreadyLoadedTrackingScript = false;    
Site.prototype.action = function (val) {       
	SITE.trace("action val = "+val)     
	if (this.step == 1) {
		var vid_buffer = SITE.myPlayer.bufferedPercent(); 
		this.trace("vid_buffer = "+vid_buffer);
		//if(vid_buffer < .2) return;
	} else if (this.step == 2) {
		var vid_buffer = SITE.myPlayer.bufferedPercent();   
		this.trace("vid_buffer = "+vid_buffer)   
		//if(vid_buffer < .2) return;
	}
	if (val == 0) {
		this.step_0();
	} else if (val == 1){
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
	} else if (val == 2) {
		this.step_2();
		SITE.track("adjustlength.html","pageview"); 
	} else if (val == 3){
		this.step_3();
		SITE.track("gifconfirmation.html","pageview"); 
	}       	       
	/*if (this.step == 0) {  
		$("#step_0").remove(); 
	} else if (this.step == 1) {  
		this.view_video.dispose();
		$("#step_1").remove(); 
	} else if (this.step == 2) {    
		this.edit_video.dispose(); 
		$("#step_2").remove();
	} else if (this.step == 3) {
		$("#step_3").remove(); 
	}*/
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
Site.prototype.post_url = function () {  
    return "http://"+this.config.share_blogname+"/post/"+this.post_id();
};
Site.prototype.share_content = function (content) {  
    return content.replace("{tumblr_post}", this.post_url());
};
Site.prototype.share_facebook = function () {  
	//if(this.post_id() == undefined) return;   
	SITE.track("postfacebook_button","outboundclick","www.facebook.com"); 
	SITE.share.facebookFeed({
		"content":this.share_content(this.config.share_content),
		"shareImage":location.href + SITE.gif_src()
	});
};
Site.prototype.share_twitter = function () {  
	if(this.post_id() == undefined) return;   
	SITE.track("posttwitter_button","outboundclick","www.twitter.com");  
	SITE.share.twitterMedia({"content":this.share_content(this.config.share_content)});
};
Site.prototype.share_pinterest = function () {  
	if(this.post_id() == undefined) return;   
	SITE.track("postpintrest_button","outboundclick","www.pintrest.com");  
	SITE.share.pinterest({"content":this.share_content(this.config.share_content)});
}; 
Site.prototype.share_tumblr = function () {  
	if(this.post_id() == undefined) return;   
	SITE.track("posttumblr_button","outboundclick","www.tumblr.com"); 
	SITE.share.tumblr({"content":this.share_content(this.config.share_content)});
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