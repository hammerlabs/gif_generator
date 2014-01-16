* place the contents of the /site folder in the Apache/PHP server's web root 
* the contents of the /cdn folder can be placed on the CDN web root
* new images are saved to the site/gifs folder and PHP will need permissions to write files there
* the site/themes/default/settings.php file has all the relevant configuration info centralized in it, but you'll likely only need to change the test and production settings for:
  * the Tumblr API like CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_SECRET
  * the Twitter API
  * the FB API
  * the CDN paths

* installing this on the Tumblr theme requires the following steps:
  * log in to tumblr account
  * click the gear icon along the top
  * select the tumblr blog you want to add this to from the apps list along the left side of the screen
  * in the form that appears, click the "customize" button in the theme section
  * scroll to the bottom of the left grey pane and click "Add a page"
  * in the white form that comes up from there, click the button next to "show a link to this page" and enter "GIF Generator"
  * in the second row, set the url to be {blog name}/gif-generator
  * leave page title blank
  * in the content region, click the HTML button and paste this: 

    <p style="width: 100%;"><iframe frameborder="0" height="620" id="gifgenerator_frame" scrolling="no" src="http://demo.hammerlabs.com/pompeii/gif_generator/site/" width="760" style="margin: auto; display: block;"></iframe></p>

  * change the URL in the src attribute of the iframe tag to point whereever you have the site installed
  * update the preview, be sure its working ok, then click save and then the back arrow to exit
  * create another page now by clicking the "Add a page" button again
  * in the white form that comes up from there, click the button next to "show a link to this page" and enter "gif gallery"
  * in the second row, set the url to be {blog name}/tagged/{tag}
    * the tag used is found in the site/themes/default/settings.php file as the $share_tags and $view_on_wall_link variables
  * leave page title blank
  * in the content region, just enter a period, this page is a special/magic page and preview won't work
  * click save and then the back arrow to exit

if you don't have a Tumblr CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_SECRET:
  * Register the Application in Tumblr: http://www.tumblr.com/oauth/apps
  * Add OAuth Consumer Key and Secret Key to site/themes/default/settings.php variables
  * edit site/connect.php to have the keys as well and then set the URL to $callback_url
  * Generate the Token by loading site/connect.php into your browser
  * Load the site/connect.php in the browser which will load site/callback.php and provide the tokens you will need.
  * Add new tokens to the variables to site/themes/default/settings.php


**************
Setting up a Twitter Application for gif generator sharing

You'll need to create a Twitter Application to allow gif generator to share the user images as tweets on behalf of
the user. Then you'll need to configure the gif generator to use this application for sharing, by specifying the application's CONSUMER_KEY and CONSUMER_SECRET strings.

This process needs to be repeated for each environment, since you'll need a different twitter application for each. 
Steps to create and configure a twitter application for an environment:
- Log in at dev.twitter.com
- Open the user options drop down (click on avatar at header), and select "My Applications"
- Click on "Create new Application"
- On the Create an Application form, enter an appropiate Name and Description for the app. For Website you can use the main tumblr's blog url. For callback you need to set a url pointing to /site/twitteroauth under the domain and path where the ihustle app is installed for the environment you're creating the app for. For staging that means using a callback url being: http://stage.sonypictures.com/{path to gif generator}/site/twitteroauth
-Agree with terms by checking the agreement box, fill in the captcha, and hit "Create your Twitter Application"
-After the app has been created, switch to the "Settings" tab and change the Application Type to "Read and Write"
-This is a good moment to change the icon of the application.
-Go back to the "Details" tab and take note of the values for "Consumer key" and "Consumer Secret" under the Oauth Settings.
-Edit the file /site/themes/default/settings.php, and copy those values into the define statements for them under the environment case corresponding with the environment you're creating the twitter application for. These look like this (replace the dots with the consumer key and secret you got from the Details tab):
    define("TWITTER_CONSUMER_KEY", "...."); 
    define("TWITTER_CONSUMER_SECRET", "...."); 
