  /*NNds+-					
	sBa:/+syddyo.			
	eBa			`:ymdNMm-
	eBa	 `yddysd-.yBa
	eBa	 /+	 .y	eBa
	eBa	 //	 :y	eBa
	eBackbonetech	eBa
	.ydhs+/dhso/:-.yBa	
					 .:+shmNd-
		
	BACKBONE TECHNOLOGY & EXPRESSION CMS
===============================================================================
	boutique digital agency with offices in Vancouver, Bogota, & Athens
===============================================================================
	Website:	 http://www.backbonetechnology.com
	Blog:			http://www.backbonetechnology.com/blog/
	Facebook:	http://www.facebook.com/backbonetech
	Twitter:	 https://twitter.com/backbonetech
	Pinterest: https://pinterest.com/backbonetech
	LinkedIn:	http://www.linkedin.com/company/backbone-technology-inc.
	Email:		 info@backbonetechnology.com
	Phone:		 604.713.8560
===============================================================================
	Backbone Shortcodes JS
===============================================================================
	Version 3.3
===============================================================================
		1. Browser Fallback, Detection
-------------------------------------------------------------------------------
			- box_sizing_border_fallback();
			- browser_detection();
-------------------------------------------------------------------------------
		2. Ajax URL, Reload
-------------------------------------------------------------------------------
			- * ajax_element(element_id, extra)
			- * ajax_html(url, extra)
			
			- ajax_element_init()
			- ajax_html_init()
			
			- * ajax_element_reload(element_id, extra, selector, callback)
			- * ajax_url_reload(url, extra, selector, callback)
-------------------------------------------------------------------------------
		3. Misc, Animation, Public Function
-------------------------------------------------------------------------------
			- * generate_password(length)
			- animate_to()
			- show_child(selector, callback)
			- hide_cihld(selector, callback)
			- show_if_not_empty()
			- hide_if_empty()
			- js_nav()
			- tab()
			- number_only()
			- clear_empty_img(elements);
			- bold_title(elements)
			- bgimg()
			
			- fn_submit_form()
			- fn_submit_on_enter()
			- password_input()
			- url_encode()
			- url_decode()
-------------------------------------------------------------------------------
		3. CSS Class Framework - Plugins
-------------------------------------------------------------------------------
			- validate()
			- validate_invalid()
			- dropkick()
			- custom_select()
			- placeholder()
			- number_input()
			- pretty_date()
			- imagepreload()
			- syntaxhighlighter();
---------------------------------------------------------------------------------
	Vars, Default Setting
-------------------------------------------------------------------------------*/

var addthis_share = { templates: { twitter: '{{title}} {{url}} via @backbonetech' } };
var addthis_config = {"data_track_clickback":false};
var custom_select_counts = 0;
var ellipsis_count = 0;
var fancybox_default = new Object();

fancybox_default.openEffect =			'elastic';
fancybox_default.closeEffect =			'elastic';
fancybox_default.margin =				20;
fancybox_default.padding =				15;
fancybox_default.wrapCSS =				'style-default';

/*-------------------------------------------------------------------------------
	1. Browser Fallback, Detection
-------------------------------------------------------------------------------*/

// css3 box-sizing ie fallback
function box_sizing_border_fallback()
{
	if(Modernizr)
	{
		//extend modernizer
		Modernizr.addTest("boxsizing", function()
		{
			return Modernizr.testAllProps("boxSizing") && (document.documentMode === undefined || document.documentMode > 7);
		});
		
		//if the <html> tag does dont have a 'boxsizing' class
		if( !($('html').hasClass('boxsizing')) )
		{
			//... then we do this
			$('.boxSized, .boxSized *').each(function()
			{
				//for every element with a .boxSized class (and its children) we do the width calculation that we mentioned in the blog post
				var fullW = $(this).outerWidth(),
					actualW = $(this).width(),
					wDiff = fullW - actualW,
					newW = actualW - wDiff;
				
				$(this).css('width',newW);
			});
		}
	}
}

// detect OS & Browser
function browser_detection()
{
	if($.client)
	{
		$('body').addClass($.client.os);
		$('body').addClass($.client.browser);
	}
}

/*-------------------------------------------------------------------------------
	2. Ajax URL
-------------------------------------------------------------------------------*/

// get ajax url of an element
function ajax_element(element_id, extra)
{
	if(!extra) extra = '';
	sclog('ajax_element: /relay.php?ejaxKey=PublicAjaxElementRunner.run&elementInstanceId='+element_id+'&format=html'+extra);
	return '/relay.php?ejaxKey=PublicAjaxElementRunner.run&elementInstanceId='+element_id+'&format=html'+extra;
}

// get ajax url of an article
function ajax_html(url, extra)
{
	if(!extra) extra = '';
	sclog('ajax_html: /relay.php?ejaxKey=PublicAjaxPageRunner.run&format=html&url='+url+extra);
	return '/relay.php?ejaxKey=PublicAjaxPageRunner.run&format=html&url='+url+extra;
}

// class function, generate the ajax url of an element
function ajax_element_init()
{
	$('.ajax-element:not(.ajax-element-on)').each(function()
	{
		var id = $(this).attr('data-ajax-element-id');
		var vars = ($(this).attr('data-ajax-element-var')) ? $(this).attr('data-ajax-element-var') : '';
		
		$(this).attr('href','/relay.php?ejaxKey=PublicAjaxElementRunner.run&format=html&elementInstanceId='+id+vars).addClass('ajax-element-on');
	});
}

// class function, generate the ajax url of an article
function ajax_html_init()
{
	$('.ajax-html:not(.ajax-html-on)').each(function()
	{
		var url = $(this).attr('data-ajax-html-url');
		var vars = ($(this).attr('data-ajax-html-var')) ? $(this).attr('data-ajax-html-var') : '';
		
		$(this).attr('href','/relay.php?ejaxKey=PublicAjaxPageRunner.run&format=html&url='+url+vars).addClass('ajax-html-on');
	});
}

// ajax reload an element
// example:
// ajax_element_reload('1234', '&category=1', $('.element').parents('form'), callback);
function ajax_element_reload(element_id, extra, selector, callback)
{
	sclog('ajax_element_reload: element_id: '+element_id);

	$.get(ajax_element(element_id, extra), function(data)
	{
		selector.replaceWith(data);
		
		sclog('ajax_element_reload: success');
		
		typeof callback === 'function' && callback();
	});
}

// ajax reload an article
// example:
// ajax_html_reload('/shop/', '&category=1', $('.element').parents('form'), callback);
function ajax_html_reload(url, extra, selector, callback)
{
	sclog('ajax_html_reload: url: '+url);

	$.get(ajax_html(url, extra), function(data)
	{
		selector.replaceWith(data);
		
		sclog('ajax_html_reload: success');
		
		typeof callback === 'function' && callback();
	});
}

/*-------------------------------------------------------------------------------
	3. Misc, Animation, Public function
-------------------------------------------------------------------------------*/

// generate random hashcode password with given length
function generate_password(length)
{
	var characters = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>@#&^%*()!+-=?";
	var password = "";
	
	for(var i = 0, n = characters.length; i < length; ++i)
	{
		password += characters.charAt(Math.floor(Math.random() * n));
	}
	
	return password;
}

// assign click event to a single element that animates the page to a given page top position
// example:
//		<a class="animate-to" href="#test" data-offset="-10" data-speed="700" data-easing="easeInOutCirc"></a>
// options:
// 		offset, speed, easing
function animate_to()
{
	$('a.animate-to:not(.animate-to-on)').each(function()
	{
		$(this).click(function(e)
		{
			e.preventDefault();
			
			var id = $(this).attr('href');
			var offset = 0;
			var speed = 700;
			var easing = 'easeInOutCirc';
			var callback;
			
			// speed
			if($(this).data('speed'))
				speed = parseInt($(this).data('speed'));
			
			// offset
			if($(this).data('offset'))
				offset = parseInt($(this).data('offset'));
				
			// easing
			if($(this).data('easing'))
				easing = parseInt($(this).data('easing'));
			
			var top = $(id).offset().top + offset;
			
			// animation
			if(!$('html:animated, body:animated').length)
				$('html,body').animate({scrollTop: top}, speed, easing, function()
				{
					typeof callback === 'function' && callback();
				});
				
			sclog('xpr: animate-to: y:' + top);
		});
		
		$(this).addClass('animate-to-on');
	});
}

// show an given child element
function show_child(selector, callback)
{
	if($('.show-child:not(.show-child-on)').length)
	{
		sclog('show_child');

		$('.show-child:not(.show-child-on)').each(function(i)
		{
			var target = $(this);
			var callback = null;
			var selector = $(this).attr('data-selector');
			
			callback = eval($(this).attr('data-callback'));
			
			$(selector,this).show(0,function()
			{
				target.addClass('show-child-on');
				typeof callback === 'function' && callback();
			});
		});
	}
}

// hide an given child element
function hide_child(selector, callback)
{
	if($('.hide-child:not(.hide-child-on)').length)
	{
		sclog('hide_child');
		
		$('.hide-child:not(.hide-child-on)').each(function(i)
		{
			var target = $(this);
			var callback = null;
			var selector = $(this).attr('data-selector');
			
			callback = eval($(this).attr('data-callback'));
			
			$(selector,this).hide(0,function()
			{
				target.addClass('hide-child-on');
				typeof callback === 'function' && callback();
			});
		});
	}
}

// show an element if it's not empty
// example:
// 		<div class="show-if-not-empty" data-selector="text" data-length="1"></div>
// options:
//		selector, length
function show_if_not_empty()
{
	$('.show-if-not-empty:not(.show-if-not-empty-on)').each(function()
	{
		var selector = '';
		var length = 1;
		
		// selector
		if($(this).attr('data-selector'))
			selector = $(this).attr('data-selector');
		
		// length
		if($(this).attr('data-length'))
			length = parseInt($(this).attr('data-length'));
	
		if(selector.length)
		{
			if($(selector,this).html().length > length)
				$(this).show();
		}
		else
		{
			if($(this).html().length > length)
				$(this).show();
		}
		
			
		$(this).addClass('show-if-not-empty-on');
	});
}

// hide an element if it's empty
// 		<div class="hide-if-empty" data-selector="text" data-length="1"></div>
// options:
//		selector, length
function hide_if_empty()
{
	$('.hide-if-empty:not(.hide-if-empty-on)').each(function()
	{
		var selector = '';
		var length = 1;
		
		// selector
		if($(this).attr('data-selector'))
			selector = $(this).attr('data-selector');
		
		// length
		if($(this).attr('data-length'))
			length = parseInt($(this).attr('data-length'));
	
		if(selector.length)
		{
			if($(selector,this).html().length < length)
				$(this).hide();	
		}
		else
		{
			if($(this).html().length < length)
				$(this).hide();
		}
		
			
		$(this).addClass('hide-if-empty-on');
	});
}

// a navigation with active, unactive li that is driven by javascript
// example:
//		<nav class="js-nav"></nav>
function js_nav()
{
	$('.js-nav:not(.js-nav-on)').each(function()
	{
		$('> ul > li > a',this).click(function()
		{
			$(this).parents('.js-nav').find('> ul > li.active').removeClass('active');
			$(this).parents('li').addClass('active');
		});
		
		$('> ul > li:first',this).addClass('active');
		
		$(this).addClass('js-nav-on');
	});
}

// a tab UI with active unactive elements that is driven by javascript
function tab()
{
	$('.js-tab:not(.js-tab-on)').each(function()
	{
		// set up global variables
		var container = '.tcontents';
		var item = '.tcontent';
		var menu = $(this);
		var start = 0;
		var speed = 500;
		
		// overwrite selector
		if(menu.attr('data-content'))
			container = menu.attr('data-content');
		
		if(menu.attr('data-item'))
			item = menu.attr('data-item');
		
		if(menu.attr('data-start'))
			start = menu.attr('data-start');
		
		if(menu.attr('data-speed'))
			speed = menu.attr('data-speed');
	
		// menu item & click event
		$('ul li a',this).click(function(e)
		{
			e.preventDefault();
			
			var button = $(this);
			var content_id = button.attr('href');
			var content = $(content_id);
			
			// nav
			menu.find('ul li.active').removeClass('active');
			$(this).parents('li').addClass('active');
			
			// contnet
			$(container).find(item).filter('.active').fadeOut(speed,function()
			{
				$(this).removeClass('active');
				$(container).find(content_id).addClass('active').fadeIn(speed);
			});
		});
		
		// active first
		$('ul li',this).eq(start).addClass('active');
		$(container).find(item).eq(start).addClass('active').show();
		
		$(this).addClass('js-tab-on');
	});
}

function number_only()
{
	if($.isFunction($.fn.ForceNumericOnly))
	{
		$('.number-only:not(.number-only-on)').each(function()
		{
			$(this).ForceNumericOnly().addClass('number-only-on');
		});
	}
}

function clear_empty_img(elements)
{		
	$("img").each(function()
	{
		$(this).error(function()
		{
			var src = $(this).attr('src');
			$(this).attr('data-src',src).attr('src','/media/templates/blank.gif').hide();
		});
		
		// for ie
		if($.browser.msie)
			$(this).attr("src", $(this).attr("src"));
	});
	
	$(elements).hide();
}

function bold_title(elements)
{	
	$('.bold-title:not(.bold-title-on):contains({), .bold-title:not(.bold-title-on):contains(})').each(function()
	{
		var text = $(this).html().replace(/{/g,'<strong>').replace(/}/g,'</strong>');
		$(this).html(text);
		
		$(this).addClass('bold-title-on');
	});
}

function ajax_login(callback)
{
	$('.ajax-login:not(.ajax-login-on)').each(function()
	{
		$(this).click(function(e)
		{
			e.preventDefault();
			
			if($(this).parents('form').valid())
			{
				$(this).parents('form').ajaxSubmit({
					success:function()
					{
						typeof callback === 'function' && callback();
					}
				});
			}
		});
		
		$(this).addClass('ajax-login-on');
	});
}

function url_encode()
{
	if($.isFunction($.URLEncode))
	{
		$('.url-encode:not(.url-encode-on)').each(function(i)
		{
			var href = $.URLEncode($(this).attr('href'));
			$(this).attr('href',href);
			
		}).addClass('url-encode-on');
	}
}

function url_decode()
{
	if($.isFunction($.URLDecode))
	{
		$('.url-decode:not(.url-decode-on)').each(function(i)
		{
			var href = $.URLDecode($(this).attr('href'));
			$(this).attr('href',href);
			
		}).addClass('url-decode-on');
	}
}

/* -----------------------------------------------------------
	Ellipsis
--------------------------------------------------------------
	note:
		- required css width & height to the element
		
	options:
		
	
	example:
		<div class="ellipsis">text here</div>
		
-------------------------------------------------------------- */

function ellipsis()
{
	if($.isFunction($.fn.ellipsis))
	{
		sclog('ellipsis');
		
		if(!ellipsis_count)
			$(window).load(function()
			{
				ellipsis_config();
			});
		else
			ellipsis_config();
	}
}

function ellipsis_config()
{
	$('.ellipsis:not(.ellipsis-on)').each(function()
	{
		// default values
		var _ellipsis = '...';
		var _setTitle = '';
		var _live = false;
	
		// overwrites
		if($(this).attr('data-ellipsis-ellipsis'))
			_ellipsis = $(this).attr('data-ellipsis-ellipsis');
		
		if($(this).attr('data-ellipsis-setTitle'))
			_setTitle = $(this).attr('data-ellipsis-setTitle');
		
		if($(this).attr('data-ellipsis-live'))
			_live = $(this).attr('data-ellipsis-live');
	
		$(this).ellipsis({
			ellipsis: _ellipsis,
			setTitle: _setTitle,
			live: _live
		});
		
	}).addClass('ellipsis-on');
	
	ellipsis_count++;
}

/* -----------------------------------------------------------
	Readmore
--------------------------------------------------------------
	options:
		- length
		- ellipsis
		- ignoreHTML (true or false)
		- restrict (separated by comma, no space)
		- callback
		
	example:
		<div class="readmore" data-length="200" data-ellipsis="..." data-ignoreHTML="true" data-restrict="img,table,span" data-callback="">...</div>
-------------------------------------------------------------- */

function readmore_init()
{
	if($.isFunction($.fn.readmore))
	{	
		$('.readmore:not(.readmore-on)').each(function()
		{
			var length = 200;
			var ellipsis = '...';
			var ignoreHTML = false;
			var restrict = '';
			var callback = null;
		
			// length
			if($(this).attr('data-length'))
				length = parseInt($(this).attr('data-length'));
				
			// ellipsis
			if($(this).attr('data-ellipsis'))
				ellipsis = $(this).attr('data-ellipsis');
				
			// ignoreHTML
			if($(this).attr('data-ignorehtml'))
				ignoreHTML = eval($(this).attr('data-ignorehtml'));
			
			// restrict
			if($(this).attr('data-restrict'))
				restrict = parseInt($(this).attr('restrict'));
				
			// callback
			if($(this).attr('data-callback'))
				callback = eval($(this).attr('data-callback'));
			
			$(this).readmore({length: length, ellipsis: ellipsis, ignoreHTML: ignoreHTML, restrict: restrict, callback: callback});
			
			$(this).addClass('readmore-on');
		});
	}
}


/* -----------------------------------------------------------
	Password Input & Label
--------------------------------------------------------------		
	options:
		- parent-class
		- label-class
		- placeholder
	
	example:
		<input type="password" class="password-input" data-parent-class="" data-label-class="">
		
-------------------------------------------------------------- */
function password_input()
{
	$('.password-input:not(.password-input-on)').each(function()
	{
		// structure init
		$(this).wrap('<div class="password-input-wrap" />');
		$(this).after('<span class="password-label" />');
		
		// variables
		var wrap = $(this).parents('.password-input-wrap');
		var input = $(this);
		var label = wrap.find('.password-label');
		
		// options
		var parent_class = '';
		var label_class = '';
		var placeholder = '';
		
		// overwrite option values
		if(input.attr('data-parent-class'))
			parent_class = input.attr('data-parent-class');
		
		if(input.attr('data-label-class'))
			label_class = input.attr('data-label-class');
			
		if(input.attr('data-label-class'))
			label_class = input.attr('data-label-class');
			
		if(input.attr('data-placeholder'))
			placeholder = input.attr('data-placeholder');
		
		wrap.addClass(parent_class);
		label.addClass(label_class).text(placeholder);
		
		// events
		label.bind('click focus',function()
		{
			$(this).hide();
			input.focus();
		});
		
		input.focus(function()
		{
			label.hide();
		});
		
		input.blur(function()
		{
			if(!$(this).val().length)
				label.show();
		});
		
		input.change(function()
		{
			if($(this).val().length)
				label.hide();
			else
				label.show();
		});
		
		$(this).addClass('password-input-on');
	});
}

function select_value()
{
	$('.select-value').each(function()
	{
		var value = $(this).data('value');
		$(this).val(value).change();
	});
}

/* -----------------------------------------------------------
	Background Image Framework
--------------------------------------------------------------
	options:
		- position (cotnainer)
		- src (img)
		
	example:
		<div class="bgimg" data-position="50% 50%"><img src="image_url" alt="" data-src=""></div>
-------------------------------------------------------------- */
function bgimg()
{
	$('.bgimg:not(.bgimg-on)').each(function()
	{
		var target = $('img:first',this);
		var img = '';
		
		
		// data-src
		if(target.length)
		{
			if(target.data('src'))
				img = target.data('src');
			else
				img = target.attr('src');
				
			// background img style
			if(img.toLowerCase().search(/png|jpg|gif|jpeg/) != -1 || img.toLowerCase().search(/relay/g) != -1)
			{
				// data-position
				if($(this).attr('data-position'))
					$(this).css({background:'url("'+img+'") '+$(this).data('position')+' no-repeat'});
				else
					$(this).css({background:'url("'+img+'") 50% 50% no-repeat'});
				
	
				$('img',this).hide();
				
				$(this).addClass('bgimg-on');
			}
		}
	});
}

/* -----------------------------------------------------------
	Submit Parent Form
--------------------------------------------------------------
	options:
		- callback
--------------------------------------------------------------
	example:
		<a class="fn-submit-form" data-callback="submit_form_callback">Submit</a>
		
		<script>
			function submit_form_callback()
			{
				...
			}
		</script>
-------------------------------------------------------------- */
function fn_submit_form()
{
	$('.fn-submit-form:not(.fn-submit-form-on)').each(function()
	{
		// on click
		$(this).click(function(e)
		{
			e.preventDefault();
			
			$(this).parents('form').submit();
		});
		
		$(this).addClass('fn-submit-form-on');
	});
}

/* -----------------------------------------------------------
	Submit Form on enter
-------------------------------------------------------------- */

function fn_submit_on_enter()
{
	$('.fn-submit-on-enter:not(.fn-submit-on-enter-on)').each(function()
	{	
		$(this).keypress(function(e)
		{
			e.preventDefault();
			
			if(e.keyCode == 13)
				$(this).parents('form').submit();
		});
	});
}

/* -----------------------------------------------------------
	Ajax Submit Form
-------------------------------------------------------------- */

function fn_submit_form_ajax()
{
	$('.fn-submit-form-ajax:not(.fn-submit-form-ajax-on)').each(function()
	{
		// on click
		$(this).click(function(e)
		{
			e.preventDefault();
	
			var options = new Object();
			
			// url
			if($(this).attr('data-url'))
				options.url = $(this).attr('data-url');
			
			// callback			
			if($(this).attr('data-callback'))
				options.callback = eval($(this).attr('data-callback'));
			
			if($(this).parents('form').valid())
			{
				$(this).parents('form').ajaxSubmit({
					url: options.url,
					success: function()
					{
						typeof options.callback === 'function' && options.callback();
					}
				});
			}
		
		}).addClass('fn-submit-form-ajax-on');
	});
}

/* -----------------------------------------------------------
	First Item Active Class
-------------------------------------------------------------- */

function active_first_item()
{
	$('.active-first-item:not(.active-first-item-on)').each(function()
	{
		var selector = '.item';
		
		// selector
		if($(this).attr('data-selector'))
			selector = $(this).attr('data-selector');
			
		$(selector,this).eq(0).addClass('active');		
		$(this).addClass('active-first-item-on');
	});
}

/* -----------------------------------------------------------
	Plugin Framework
-------------------------------------------------------------- */
function validate()
{
	if($.isFunction($.fn.validate))
	{	
		$('.validate:not(.validate-on)').each(function()
		{
			// error container
			var error_selector = '';
			if($(this).attr('data-validate-error'))
			{
				error_selector = $(this).attr('data-validate-error');
				error_selector = $(error_selector,this);
			}
			
			log(error_selector);
			
			$(this).parents('form').validate(
			{
				errorLabelContainer: error_selector,
				invalidHandler: validate_invalid
			});
			
			$(this).addClass('validate-on');
		});
	}
}

function validate_invalid(form,validator)
{
	setTimeout(function()
	{
		$(form.target).find('.custom-select.error').parents('.custom-select-wrap').addClass('error');
		$(form.target).find('.custom-select.valid').parents('.custom-select-wrap').removeClass('error');
		
		$(form.target).find('.password-input.error').parents('.password-input-wrap').addClass('error');
		$(form.target).find('.password-input.valid').parents('.password-input-wrap').removeClass('error');
	},
	200);
}

/* -----------------------------------------------------------
	Fancybox
--------------------------------------------------------------
	options:
		please checkout the API on: http://www.fancybox.net/api
		
	option example:
		<a class="fancybox" data-options="{modal:true, overlayOpacity:1, overlayColor:'#000'}"></a>
		
	callback function example:
		<a class="fancybox" data-options="{beforeLoad:'order_form_start()'}"></a>
		<script> function order_form_start(){ ... } </script>
	
	note:
		please avoid the structure error with single & double quotes
-------------------------------------------------------------- */

function fancybox()
{
	if($.isFunction($.fn.fancybox))
	{
		$('.fancybox:not(.fancybox-on)').each(function()
		{
			var target = $(this);
			var options_client = new Object();
			
			// step 1 - set default & overwrite the client options
			if(target.attr('data-options'))
				options_client = parse_options($(this).attr('data-options'));
				
			if(!options_client.openEffect)		options_client.openEffect = 	fancybox_default.openEffect;
			if(!options_client.closeEffect)		options_client.closeEffect = 	fancybox_default.closeEffect;
			if(!options_client.margin)			options_client.margin = 		fancybox_default.margin;
			if(!options_client.padding)			options_client.padding = 		fancybox_default.padding;
			if(!options_client.wrapCSS)			options_client.wrapCSS = 		fancybox_default.wrapCSS;
			
			// step 2 - check the fancybox type
			if($(this).attr('data-type'))
			{
				if($(this).attr('data-type') == 'media')
				{
					if(!options_client.helpers) options_client.helpers = new Object();
					options_client.helpers.media = new Object();
				}
			}
			
			// step 3 - add shortcodes() on event 'afterLoad'
			if(target.attr('data-fancybox-type') || target.hasClass('fancybox.ajax') || target.attr('data-type'))
			{
				if(target.attr('data-fancybox-type') == 'ajax' || target.hasClass('fancybox.ajax') || target.attr('data-type') == 'ajax')
				{
					var after_show = (options_client.afterShow) ? options_client.afterShow : null;
					
					options_client.afterShow = function()
					{
						shortcodes();
						typeof after_show === 'function' && after_show();
					}
				}
			}
			
			// step 4 - apply fancybox with options_result
			target.fancybox(options_client).addClass('fancybox-on');
		});
	}
}

function fancybox_gallery(class_name)
{
	if($.isFunction($.fn.fancybox))
	{
		$(class_name).fancybox({
			openEffect: fancybox_default.openEffect,
			closeEffect: fancybox_default.closeEffect,
			prevEffect: fancybox_default.prevEffect,
			nextEffect: fancybox_default.nextEffect,
			wrapCSS: fancybox_default.wrapCSS,
			margin: fancybox_default.margin,
			padding: fancybox_default.padding,
			mouseWheel: false,
			minWidth: 400,
			helpers:
			{
				title:
				{
					type: 'inside'
				},
				buttons	: {}
			}
		});
	}
}

/* -----------------------------------------------------------
	Plugin - Input
-------------------------------------------------------------- */

function dropkick()
{
	if($.isFunction($.fn.dropkick))
	{
		$('.dropkick:not(.dropkick-on)').each(function()
		{
			$(this).dropkick({
				change: function()
				{
					$(this).change();
				}
			});
			
			$(this).addClass('dropkick-on');
		});
	}
}

function custom_select(callback)
{
	if($.isFunction($.fn.customSelect))
	{
		if($.browser.msie && parseInt($.browser.version) == 6)
		{
			log('custom select does not support on ie 6');
		}
		else
		{
			// step 1 - scripted custom select
			$('.custom-select.custom-select-on').each(function()
			{
				$(this).parents('.custom-select-wrap').find('> *:not(select.custom-select)').remove();
				$(this).removeClass('custom-select-on');
				
				if($(this).parents('.custom-select-wrap').length)
					$(this).unwrap();
			});
			
			// step 2 - un-scripted custom select
			$('.custom-select:not(.custom-select-on)').each(function()
			{
				var style = ($(this).attr('data-custom-select-style')) ? $(this).attr('data-custom-select-style') : 'default';
				var width = ($(this).attr('data-custom-select-width')) ? $(this).attr('data-custom-select-width') : 0;
				$(this).wrap('<div class="custom-select-wrap width-'+width+'" />').customSelect({customClass:'style-'+style}).addClass('custom-select-on');
			});
			
			// step 3 - live event (only script once on each page load)
			if(!custom_select_counts)
			{
				$('.custom-select').live('keypress',function()
				{
					$(this).change();
				});
				
				$('.custom-select').live('change',function()
				{
					if($(this).val())
						if($(this).val().length)
							$(this).parents('.custom-select-wrap').addClass('has-value');
					else
						$(this).parents('.custom-select-wrap').removeClass('has-value');
				});
				
				custom_select_counts = 1;
			}
			
			// step 4 - callback
			typeof callback === 'function' && callback();
		}
	}
}

function custom_select_remove(element,callback)
{
	$(element).each(function(i)
	{
		$(this).parents('.custom-select-wrap').find('> *:not(select.custom-select)').remove();
		$(this).removeClass('custom-select-on');
		
		if($(this).parents('.custom-select-wrap').length)
			$(this).unwrap();
	});
	
	typeof callback === 'function' && callback();
}

function custom_radio()
{
	if($.isFunction($.fn.ezMark))
	{
		$('.custom-checkbox:not(.custom-checkbox-on)').each(function()
		{
			$(this).ezMark({
				checkboxCls: 'checkbox',
				checkedCls: 'checked'
			}).addClass('custom-checkbox-on').parents('.field:first').addClass('custom-checkbox-wrap');
		});
		
		$('.custom-radio:not(.custom-radio-on)').each(function()
		{
			$(this).ezMark({
				radioCls: 'radio',
				selectedCls: 'selected'
			}).addClass('custom-radio-on').parents('.field:first').addClass('custom-radio-wrap');
		});
	}
}


/* -----------------------------------------------------------
	Placeholder
-------------------------------------------------------------- */

function placeholder()
{
	if($.isFunction($.fn.placeholder))
	{
		$("[placeholder]:not(.placeholder-on)").each(function()
		{
			$(this).bind('keyup change',function()
			{
				if($(this).val().length)
					$(this).addClass('has-text');
				else
					$(this).removeClass('has-text');
			});
		
			$(this).placeholder().addClass('placeholder').addClass('placeholder-on');
		});
		
		if(!$.support.placeholder)
			$.validator.addMethod("placeholder", function(value, element){
				return value!=$(element).attr("placeholder");
			}, $.validator.messages.required);
	}
}

/* -----------------------------------------------------------
	Webforms2 - Number Type Input (Modernizr input type needed)
-------------------------------------------------------------- */

function number_input()
{
	if($.isFunction($.fn.spinner))
	{
		if(typeof Modernizr != 'undefined')
		{
			if(!Modernizr.inputtypes.number)
			{		
				$('.number-input:not(.number-input-on)').each(function()
				{
					var $input = $(this);
					$input.wrap('<div class="number-input-wrap cf" />').spinner(
					{
						min: $input.attr('min'),
						max: $input.attr('max'),
						step: $input.attr('step')
					});
					
					$(this).addClass('number-input-on');
				});
			}
		}
	}
}
	
/* -----------------------------------------------------------
	Pretty Date - Date formatter
-------------------------------------------------------------- */

function pretty_date()
{
	if($.isFunction($.fn.prettyDate))
	{
		$('.pretty-date:not(.pretty-date-on)').each(function()
		{
			$(this).prettyDate().addClass('pretty-date-on');
		});
	}
}

/* -----------------------------------------------------------
	Image Preloader
-------------------------------------------------------------- */

function imgpreload()
{
	if($.isFunction($.fn.imgpreload))
	{
		$('.imgpreload:not(.imgpreload-on)').each(function()
		{
			var callback = null;
			var selector = 'img';
			
			// overwrite param
			if($(this).attr('data-selector'))
				selector = $(this).attr('data-selector');
			
			if($(this).attr('data-callback'))
				callback = eval($(this).attr('data-callback'));
			
			// imgpreload
			$(selector,this).imgpreload(function()
			{
				typeof callback === 'function' && callback();
			});
			
			$(this).addClass('imgpreload-on');
		});
	}
}

/* -----------------------------------------------------------
	CSS3 Pie - use with caution :P
-------------------------------------------------------------- */

function pie()
{
	if(window.PIE)
	{
		$('.pie:not(.pie-on)').each(function()
		{
			PIE.attach(this);
			$(this).addClass('pie-on');
		});
	}
}



/* -----------------------------------------------------------
	Message Log
-------------------------------------------------------------- */

function log(msg)
{
	if(window.console)
		console.log('xpr: ' + msg);
}

function sclog(msg)
{
	if(window.console)
		console.log('shortcodes: ' + msg);
}

/* -----------------------------------------------------------
	Expression JS Framework Init
-------------------------------------------------------------- */

function shortcodes()
{
	// 1. browser fallback, detection
	box_sizing_border_fallback();
	browser_detection();

	// 2. ajax url
	ajax_element_init();
	ajax_html_init();
	
	// 3. misc, animation
	animate_to();
	show_child();
	hide_child();
	show_if_not_empty();
	hide_if_empty();
	url_encode();
	url_decode();
	
	// 4. typography
	bold_title();
	ellipsis();
	readmore_init();
	
	// 5. navigation, UI
	js_nav();
	tab();
	
	// 6. media, video, photo, gallery
	bgimg();
	clear_empty_img('img[src=""], img[src="/media/"]');
	fancybox();
	imgpreload();
	pie();
	
	// 7. form
	fn_submit_form();
	fn_submit_form_ajax();
	password_input();
	select_value();
	ajax_login();
	number_only();
	placeholder();
	number_input();
	pretty_date();
	custom_select();
	custom_radio();
	validate();
	
	sclog('shortcodes');
}

$(function()
{
	shortcodes();
});