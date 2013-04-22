backbone.install
================

plugins &amp; css for backbone team

/*-------------------------------------------------------------------------------
  2012-11-06
-------------------------------------------------------------------------------

- shortcodes.js 
	1) clear_empty_img(elements)
		- jQuery removeAttr is not longer working in IE, replace with blank.gif instead of removing the src

- estore.js
	1) add new functions for wishlist
		- clear_wishlist(event,callback)
		- clear_wishlist_item(event, cart_item_id, callback)
		- add_to_wishlist(event, options, callback)

- plugins.js
	1) update some of the plugins to the newest verion
	
- base.css
	1) add two more default classes for placeholder plugin where you can set different colors for normal state & focus state
		- .placeholder{ }
		- .placeholderFocus{ }
