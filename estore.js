/*	===========================================================================
	Expression Store 2012 Shortcodes & Functions
	===========================================================================
	Version 3.2
	===========================================================================
	Website:	http://www.backbonetechnology.com
	Facebook:	http://www.facebook.com/BackboneTechnology
	Twitter:	https://twitter.com/backbonetech
	Email:		info@backbonetechnology.com
	===========================================================================
	Public Functions:
	---------------------------------------------------------------------------
		1. Misc
	---------------------------------------------------------------------------
			a. error_message_init()
			b. preloader_init()
			c. page_reload()
			d. login_callback()
			e. json_to_img(callback)
			f. preloader_on(), pl_on()
			g. preloader_off(), pl_off()
			h. eslog()
			i. generate_password(digits)
	---------------------------------------------------------------------------
		2. Registration, Login & Account Details
	---------------------------------------------------------------------------
			a. countries_regions_dropdown_init(form, allCountriesAndRegionsJson, callback)
			b. register_customer(customer_data, address_data, callback);
	---------------------------------------------------------------------------
		3. Products
	---------------------------------------------------------------------------
			a. filter_attributes(productModelId, attributeValues, callback)
	---------------------------------------------------------------------------
		4. Shopping Cart
	---------------------------------------------------------------------------
			a. update_cart(options, callback)
			b. update_cart_item(itemIndex, qty, callback)
			c. clear_cart(callback)
			d. clear_cart_item(itemIndex, callback)
			e. add_cart_item(options, callback)
			e. add_cart_items(options, callback)
	---------------------------------------------------------------------------
		5. Wishlist
	---------------------------------------------------------------------------
			a. clear_wishlist(callback)
			b. clear_wishlist_item(itemIndex, callback)
			c. add_wishlist_item(options, callback)
			d. add_wishlist_items(options, callback)
	---------------------------------------------------------------------------
		6. Shipping // all functions required input of "event"
	---------------------------------------------------------------------------
			a. get_shipping_address(callback)
			b. add_shipping_address(event, callback)
			c. add_or_update_shipping_address(event,callback)
			d. clear_shipping_address_fields(event, callback)
			e. update_shipping_address_init(event, addressId, callback)
			f. update_shipping_address(event, callback)
			g. set_shipping_address(addressId, callback)
			h. remove_shipping_address(event, addressId, callback)
	---------------------------------------------------------------------------
		6. Checkout
	---------------------------------------------------------------------------
			a. add_coupon(coupon_code, callback)
			b. set_shipping_method(addressIndex, methodIndex, callback)
	---------------------------------------------------------------------------
		7. Order History
	---------------------------------------------------------------------------
			a. re_add_order(orderId, callback)
			b. set_fav_order(orderId, callback)
			c. unset_fav_order(orderId, callback)
			d. update_fav_order(event, orderId, callback)
			e. set_order_title(orderId, text, callback)
-------------------------------------------------------------------------------------------- */

var estore = new Object();

estore.preloader = '.store #store-preloader';
estore.form_message = 'form .message, form .msg';

$(function()
{
	estore_init();
});

/* -----------------------------------------------------------------------------------------
	Expression Store Init
-------------------------------------------------------------------------------------------- */

function estore_init()
{
	eslog('fn: estore_init');
	
	error_message_init();
	preloader_init();
	json_to_img();
}

/* -----------------------------------------------------------------------------------------
	Misc
-------------------------------------------------------------------------------------------- */

function error_message_init()
{
	//eslog('fn: error_message_init');

	if($(estore.form_message).length)
		if($(estore.form_message).is(':not(:empty)'))
			$(estore.form_message).show();
}

function preloader_init()
{
	//eslog('fn: preloader_init');

	$(estore.preloader).ajaxStart(function()
	{
		$(this).stop(true,true).fadeIn(300);
	}
	).ajaxStop(function()
	{
		$(this).stop(true,true).fadeOut(300);
	});
}

function page_reload()
{
	eslog('fn: page_reload');

	location.reload();
}

function login_callback()
{
	$('body').addClass('loggedin');
}

function json_to_img()
{
	if($('.json-to-img').length)
	{
		eslog('fn: json_to_img');
	
		$('.json-to-img').each(function()
		{
			var json = $.parseJSON($(this).html());
			var target = $(this);
			var type = 'image';
			var resize = '999x150';
			var _class= '';
			var callback = null;
			
			// data-type: image, data
			if($(this).attr('data-type'))
				type = $(this).attr('data-type');
				
			// data-resize
			if(target.attr('data-resize'))
				resize = target.attr('data-resize');
			
			// data-class
			if(target.attr('data-class'))
				_class = target.attr('data-class');
				
			// data-callback
			if(target.attr('data-callback'))
				callback = eval($(this).attr('data-callback'));
			
			$(this).empty();
			
			$(json).each(function(i)
			{
				var obj = json[i];
				var path = '/media/' + resize + '/';
				var img = $('<img />').attr('class',_class).attr('data-filename',obj.filename).attr('alt',obj.altName).attr('data-description',obj.description).attr('title',obj.title);
				
				// data-type action
				if(type == 'image')
					img.attr('src',path + obj.filename);
				else if(type == 'data')
					img.attr('data-src',path + obj.filename);
				
				target.append(img);
			});
			
			target.show();
		});
		
		if(typeof bgimg === 'function')
		{
			bgimg();
			eslog('fn: json_to_img: success');
			typeof callback === 'function' && callback();
		}else{
			eslog('error: json_to_img: shortcodes.js bgimg() is required');
		}
	}
}

function preloader_on(callback)
{
	eslog('fn: preloader_on');

	$(estore.preloader).show(function()
	{
		typeof callback === 'function' && callback();
	});
}

function preloader_off(callback)
{
	eslog('fn: preloader_off');

	$(estore.preloader).hide(function()
	{
		typeof callback === 'function' && callback();
	});
}

function pl_on(callback)
{
	preloader_on(callback);
}

function pl_off(callback)
{
	preloader_off(callback);
}

function eslog(msg)
{
	if(window.console)
		console.log('estore: '+msg);
}

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

/* -----------------------------------------------------------------------------------------
	Registration Functions
-------------------------------------------------------------------------------------------- */

/*
exmaple:
	var form = $('.form-wrap').parents('form');
	var allCountriesAndRegionsJson = '[$allCountriesAndRegionsJson]';
	registration_init(form,allCountriesAndRegionsJson);
*
*/
function countries_regions_dropdown_init(form,data)
{
	xprLog('fn: countries_init');
	
	// elements
	var json = $.parseJSON(data);
	
	// country dropdown
	var select_countries = form.find('[name="countryId"]');
	var select_countries_selected = select_countries.attr('data-value');
	var select_countries_placeholder = select_countries.attr('data-placeholder');
	
	// province / state dropdown
	var select_region = form.find('[name="region"]');
	var select_region_selected = select_region.attr('data-value');
	var select_region_placeholder = select_region.attr('data-placeholder');
	var select_region_class = select_region.attr('class');
	
	// append all countreis data
	select_countries.append('<option value="">'+select_countries_placeholder+'</option>');
	select_region.append('<option value="">'+select_region_placeholder+'</option>');
	
	// pulling all option data
	$.each(json,function(i, country)
	{
		$('<option />')
		.val(country.id)
		.html(country.name)
		.data('officialRegions',country.officialRegions)
		.data('allowCustomRegions',country.allowCustomRegions)
		.appendTo(select_countries);
	});
	
	// countries onchange event, change the state/province options
	select_countries.change(function(e)
	{
		var option = $('option:selected',this);
		var provinces_data = option.data('officialRegions');
		
		if(option.data('allowCustomRegions') != null)
		{			
			// if selected country uses select box
			if(option.data('allowCustomRegions') == '1')
			{
				// change to text input
				if(select_region.hasClass('custom-select')) custom_select_remove('[name=region]');
				select_region.replaceWith('<input type="text" class="required text" name="region">');
				select_region = form.find('[name="region"]');
			}
			else
			{
				// change to select box
				if(select_region.hasClass('custom-select')) custom_select_remove('[name=region]');
				select_region.replaceWith('<select name="region" class="'+select_region_class+'"><option value="">'+select_region_placeholder+'</option></select>');
				select_region = form.find('[name="region"]');
			
				// append all region data
				$.each(provinces_data,function(i,province)
				{
					$('<option />')
					.val(province.id)
					.html(province.name)
					.appendTo(select_region);
				});
				
				// custom select re-apply
				if(form.find('[name=region]').hasClass('custom-select'))
				{
					//custom_select_init(form.find('[name=region]'));
					custom_select();
				}
			}
		}
	});
	
	// init countries & region selected value
	if(!select_countries_selected)
		select_countries_selected = select_countries.find('option:first').val();
		
	if(!select_region_selected)
		select_region_selected = select_region.find('option:first').val();
	
	select_countries.val(select_countries_selected);
	select_countries.change();
	
	select_region.val(select_region_selected);
	select_region.change();
}

function register_customer(customer_data, address_data, callback)
{
	/*
	customer_data = {
		email: 'andrian@backbonetechnology.com',
		login: 'amazing_andrian',
		newPassword: 'my-awesome-and-secure-pass',
		confirmNewPassword: 'my-awesome-and-secure-pass',

		firstName: 'Andrian',
		lastName: 'Sevastyanov',
		companyName: 'Backbone Inc.',
		streetAddress: 'not gonna tell you',
		apartment: '666',
		postalCode: 'ZIP ZIP',
		city: 'Burnaby',
		phoneNumber: '604-123-1234',
		countryId: 666,
		region: 'my fake region'
	}
	
	address_data = {
		addressId: 19, // optional (a new address will be created if this is not specified)
		firstName: 'Joe',
		lastName: 'Bloe',
		companyName: 'Backbone Inc.',
		streetAddress: '666 Hell Street',
		apartment: '#413',
		postalCode: 'ZIP-ZIP',
		city: 'Lostcity',
		countryId: 1,
		region: 'Fakest Region In Canada',
		phoneNumber: '(604) 111 1111'
	}
	*/
	
	eslog('fn: register_customer');

	$.post('/relay.php?ejaxKey=XC_CustomerAjaxUtil.registerCustomer',
	{
		customer: customer_data,
		shippingAddresses: [address_data]
	},
	function(data)
	{
		eslog('fn: register_customer: '+ data.message);
		
		typeof callback === 'function' && callback(data);
	})
	.error(function()
	{
		eslog('error: register_customer: failed ajax request');
	});
}

/* -----------------------------------------------------------------------------------------
	Products
-------------------------------------------------------------------------------------------- */
/*
exmaple:
	filter_attributes( 1,
		{
			'color': 'white'
		},
		function()
		{
			// callback
		}
	);
*
*/
function filter_attributes(productModelId, attributeValues, callback)
{
	eslog('fn: filter_attributes');

	$.post("/relay.php?ejaxKey=XC_ProductAjaxUtil.filterProductModel",
	{
		productModelId: productModelId, 
		attributeValues: attributeValues
	},
	function(data)
	{	
		var products = data.data.productIds;
		var attributes = data.data.remainingAttributes;
		
		typeof callback === 'function' && callback(products, attributes);
	})
	.error(function()
	{
		eslog('error: filter_attributes: failed ajax request');
	});
}

/* -----------------------------------------------------------------------------------------
	Shopping Cart
-------------------------------------------------------------------------------------------- */

/*
exmaple:
	<a class="blackbtn31 left" onclick="update_cart(event, { item:'#cart-items .product-item', input:'[name=quantity]', syncChildItems:0}, function(){ //callback });">Update Cart</a>

cart table structrue:
	<table>
		<tbody id="cart-items">
			...
		</tbody>
	</table>

cart item structure:
	<tr class="product-item" data-index="[$itemIndex]">
		<td><input type="text" name="quantity" value="[$quantity]"></td>
		...
	</tr>

expand:
	update_cart(event,
	{
		item:'#cart-items .product-item',
		input:'[name=quantity]',
		syncChildItems:0
	},
	function()
	{
		//callback
	});
*
*/

function update_cart(options, callback)
{
	eslog('fn: update_cart');
	
	// preparing the data
	var array = [];
	
	$(options.item).each(function()
	{
		var data_item = new Object();
		data_item.itemIndex = $(this).attr('data-index');
		data_item.quantity = $(options.input,this).val();
		data_item.syncChildItems = options.syncChildItems;
		array.push(data_item);
	});
	
	eslog('fn: update_cart: array: '+array);
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.updateQuantities", { items: array }, function(data)
	{
		eslog('fn: update_cart_item: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: update_cart: failed ajax request');
	});
}

/*
exmaple:
	update_cart_item(
		[$itemIndex],
		$(this).parents('tr').find('[name=quantity]').val(),
		function()
		{
			//callback
		}
	);
*
*/
function update_cart_item(itemIndex, qty, callback)
{
	eslog('fn: update_cart_item');

	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.updateQuantity",
	{
		itemIndex: itemIndex,
		quantity: qty
	},
	function(data)
	{
		eslog('fn: update_cart_item: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: update_cart_item: failed ajax request');
	});
}

/*
exmaple:
	clear_cart(function()
	{
		//callback
	});
*
*/
function clear_cart(callback)
{
	eslog('fn: clear_cart');
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.resetCart",function(data)
	{
		eslog('fn: clear_cart: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: clear_cart: failed ajax request');
	});
}

/*
example:
	clear_cart_item(
		[$itemIndex],
		function()
		{
			//callback
		}
	);
*
*/
function clear_cart_item(itemIndex, callback)
{
	eslog('fn: clear_cart_item');

	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.removeItem", {
		itemIndex: itemIndex
	},
	function(data)
	{
		eslog('fn: clear_cart_item: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: clear_cart_item: failed ajax request');
	});
}

/*
example:
	add_cart_item(
		{
			productId: 37,
			quantity:2,
			attributes: {
				
				// String Configurable
				"extr-ingr-notes":{
					value: "note text"
				},
				
				// Option Configurable
				"attibute-code":{
					"items":	["option1","option2"]
				},
				
				// Product Configurable Multiple
				"my-product-options":{
					"items": [
						{
							productId:1,
							quantity:2
						},
						{
							productId:2,
							quantity:3
						}
					]
				},
				
				// Product Configurable Single
				"my-display-product-options":{
					item: {
						productId: 28,
						quantity: 2
					}
				}
				
				// Options Display
				no need to specify
			}
		},
		function()
		{
			//callback
		}
	);
*
*/
function add_cart_item(options, callback)
{
	eslog('fn: add_cart_item');
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.addItem", options, function(data)
	{
		eslog('fn: add_cart_item: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: add_cart_item: failed ajax request');
	});
}

function add_cart_items(options, callback)
{
	eslog('fn: add_cart_items');
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.addItems",
	{
		items: options
	},
	function(data)
	{
		eslog('fn: add_cart_items: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: add_cart_items: failed ajax request');
	});
}

/* -----------------------------------------------------------------------------------------
	Wishlist
-------------------------------------------------------------------------------------------- */

function add_wishlist_item(options, callback)
{
	eslog('fn: add_to_wishlist');
	
	options.cartType = 'wishlist';
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.addItem", options, function(data)
	{
		eslog('fn: add_wishlist_item: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: add_wishlist_item: failed ajax request');
	});
}

function add_wishlist_items(options, callback)
{
	eslog('fn: add_wishlist_items');
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.addItems",
	{
		items: options,
		cartType: "wishlist"
	},
	function(data)
	{
		eslog('fn: add_wishlist_items: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: add_wishlist_items: failed ajax request');
	});
}

function clear_wishlist(callback)
{
	eslog('fn: clear_wislist');
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.resetCart",
	{
		cartType: 'wishlist'
	},
	function(data)
	{
		eslog('fn: clear_wislist: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: clear_wishlist: failed ajax request');
	});
}

function clear_wishlist_item(itemIndex, callback)
{
	eslog('fn: clear_wishlist_item');

	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.removeItem", {
		itemIndex: itemIndex,
		cartType: 'wishlist'
	},
	function(data)
	{
		eslog('fn: clear_wishlist_item: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: clear_wishlist_item: failed ajax request');
	});
}

/* -----------------------------------------------------------------------------------------
	Shipping
-------------------------------------------------------------------------------------------- */

/*
example:
	get_shipping_address(function()
	{
		//callback
	});
*
*/
function get_shipping_address(callback)
{
	eslog('fn: get_shipping_address');

	$.post('/relay.php?ejaxKey=XC_CustomerAjaxUtil.getShippingAddresses',function(data)
	{
		eslog('fn: get_shipping_address: '+data.message);
		typeof callback === 'function' && callback();
		
		return data.data;
	})
	.error(function()
	{
		eslog('error: get_shipping_address: failed ajax request');
	});
}

/*
example:
	add_shipping_address(
		event,
		function()
		{
			//callback
		}
	);
*
* note: 1) must do the form validation before calling this function
* 		2) put event as the function is pulling the e.target
*/
function add_shipping_address(event, callback)
{
	if(!event)
	{
		eslog('error: add_shipping_address: event parameter is needed');
	}
	else
	{
		eslog('fn: add_shipping_address');
		
		var element = (event.currentTarget) ? $(event.currentTarget) : $(event.srcElement);
		var form = element.parents('form');
		var form_data = form.serialize();
		
		if(form.valid())
		{
			$.post('/relay.php?ejaxKey=XC_CustomerAjaxUtil.addShippingAddress&'+form_data,function(data)
			{
				eslog('fn: add_shipping_address: '+data.message);
				get_shipping_address(event, callback);
			})
			.error(function()
			{
				eslog('error: add_shipping_address: failed ajax request');
			});
		}
	}
}

/*
example:
	add_or_update_shipping_address(
		event,
		function()
		{
			//callback
		}
	);
*
* note: 1) must do the form validation before calling this function
		2) must have a <input type="hidden" name="addressId"> in the form
*/
function add_or_update_shipping_address(event, callback)
{
	if(!event)
	{
		eslog('error: add_or_update_shipping_address: event parameter is needed');
	}
	else
	{
		eslog('fn: add_or_update_shipping_address');
	
		var element = (event.currentTarget) ? $(event.currentTarget) : $(event.srcElement);
		var form = element.parents('form');
		var value = "";
		
		log(form.find('[name=addressId]').val());
		
		if(form.find('[name=addressId]').length)
			value = form.find('[name=addressId]').val();
		
		if(value.length)
			update_shipping_address(event, callback);
		else
			add_shipping_address(event, callback);
	}
}

/*
example:
	clear_shipping_address_fields(
		event,
		function()
		{
			//callback
		}
	);
*
*/
function clear_shipping_address_fields(event, callback)
{
	if(!event)
	{
		eslog('error: clear_shipping_address_fields: event parameter is needed');
	}
	else
	{
		eslog('fn: clear_shipping_address_fields');
	
		var element = (event.currentTarget) ? $(event.currentTarget) : $(event.srcElement);
		var form = element.parents('form');
		
		form.find('[name=addressId]').val('');
		form.find('[name=firstName]').val('');
		form.find('[name=lastName]').val('');
		form.find('[name=companyName]').val('');
		form.find('[name=apartment]').val('');
		form.find('[name=streetAddress]').val('');
		form.find('[name=city]').val('');
		form.find('[name=countryId]').val('').change();
		form.find('[name=region]').val('').change();
		form.find('[name=postalCode]').val('');
		form.find('[name=phoneNumber]').val('');
		
		typeof callback === 'function' && callback();
	}
}

/*
example:
	update_shipping_address_init(
		event,
		[$addressId],
		function()
		{
			//callback
		}
	);
*
*/
function update_shipping_address_init(event, addressId, callback)
{
	if(!event)
	{
		eslog('error: update_shipping_address_init: event parameter is needed');
	}
	else
	{
		eslog('fn: update_shipping_address_init');
		
		var element = (event.currentTarget) ? $(event.currentTarget) : $(event.srcElement);
		var container = element.parents('tr');
		
		var id = addressId;
		var firstname = container.find('.firstName').html();
		var lastname = container.find('.lastName').html();
		var companyname = container.find('.companyName').html();
		var apartment = container.find('.apartment').html();
		var street = container.find('.streetAddress').html();
		var city = container.find('.city').html();
		var country = container.find('.countryName').attr('data-value');
		var region = container.find('.region').attr('data-value');
		var postal = container.find('.postalCode').html();
		var phone = container.find('.phoneNumber').html();
		
		$('[name=addressId]').val(id);
		$('[name=firstName]').val(firstname);
		$('[name=lastName]').val(lastname);
		$('[name=companyName]').val(companyname);
		$('[name=apartment]').val(apartment);
		$('[name=streetAddress]').val(street);
		$('[name=city]').val(city);
		$('[name=countryId]').val(country).change();
		$('[name=region]').val(region).change();
		$('[name=postalCode]').val(postal);
		$('[name=phoneNumber]').val(phone);
		
		typeof callback === 'function' && callback();
	}
}

/*
example:
	clear_shipping_address_fields(
		event,
		function()
		{
			//callback
		}
	);
*
*/
function update_shipping_address(event, callback)
{
	if(!event)
	{
		eslog('error: update_shipping_address: event parameter is needed');
	}
	else
	{
		eslog('fn: update_shipping_address');
		
		var element = (event.currentTarget) ? $(event.currentTarget) : $(event.srcElement);
		var form = element.parents('form');
		var form_data = form.serialize();
		
		if(form.valid())
		{
			$.post("/relay.php?ejaxKey=XC_CustomerAjaxUtil.updateShippingAddress", form_data, function(data)
			{
				eslog('fn: update_shipping_address: '+data.message);
				typeof callback === 'function' && callback();
			})
			.error(function()
			{
				eslog('error: update_shipping_address: failed ajax request');
			});
		}
	}
}


/*
example:
	set_shipping_address(
		[$addressId],
		function()
		{
			//callback
		}
	);
*
*/
function set_shipping_address(addressId, callback)
{
	eslog('fn: set_shipping_address');
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.setShippingAddress",
	{
		addressId: addressId // this is the id of an existing address that's the database
		//,itemIndex: 1	// index of the item we want this address to be applied to; can be left out, in which case all items in the cart will use this shipping address
	},
	function(data)
	{
		eslog('fn: set_shipping_address: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: set_shipping_address: failed ajax request');
	});
}

/*
example:
	remove_shipping_address(
		event,
		[$addressId],
		function()
		{
			//callback
		}
	);
*
*/
function remove_shipping_address(event, addressId, callback)
{
	if(!event)
	{
		eslog('error: remove_shipping_address: event parameter is needed');
	}
	else
	{
		eslog('fn: remove_shipping_address');
		
		var element = (event.currentTarget) ? $(event.currentTarget) : $(event.srcElement);
	
		$.post('/relay.php?ejaxKey=XC_CustomerAjaxUtil.removeShippingAddress',
		{
			addressId: addressId
		},
		function(data)
		{
			eslog('fn: remove_shipping_address: '+shipping_address_id+', '+data.message);
			
			element.parents('tr, .item').fadeOut(300,function()
			{
				element.remove();
				typeof callback === 'function' && callback();
			});
		})
		.error(function()
		{
			eslog('error: remove_shipping_address: failed ajax request');
		});
	}
}

/* -----------------------------------------------------------------------------------------
	Checkout
-------------------------------------------------------------------------------------------- */

/*
example:
	add_coupon(
		$('[name="couponCode"]').val(),
		function()
		{
			//callback
		}
	);
*
*/
function add_coupon(coupon_code, callback)
{
	eslog('fn: add_coupon');

	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.addCouponCode",
	{
		code: coupon_code
	},
	function(data)
	{
		eslog('fn: add_coupon: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: add_coupon: failed ajax request');
	});
}

/*
example:
	remove_coupon(
		$('[name="couponCode"]').val(),
		function()
		{
			//callback
		});
*
*/
function remove_coupon(coupon_code, callback)
{
	eslog('fn: remove_coupon');
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.removeCouponCode", 
	{
		code: coupon_code
	},
	function(data)
	{
		eslog('fn: remove_coupon: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: remove_coupon: failed ajax request');
	});
}

/*
example:
	set_shipping_method(
		$('option:selected',this).attr('data-address-index'),
		$(this).val(),
		function()
		{
			// callback
		}
	);
*
* note: must use the name "couponCode" in order to add coupon on submit order
*/
function set_shipping_method(addressIndex, methodIndex, callback)
{	
	if(addressIndex != null && methodIndex != null)
	{
		log('fn: set_shipping_method');
		
		$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.setShippingMethod",
		{
			addressIndex: addressIndex, // this is the index of an address set in the cart, see setShippingAddress
			methodIndex: methodIndex   // index of the shipping method you wish to set
		},
		function(data)
		{
			log('fn: set_shipping_method: '+data.message);
			typeof callback === 'function' && callback();
		})
		.error(function()
		{
			eslog('error: set_shipping_method: failed ajax request');
		});
	}
	else
	{
		log('fn: set_shipping_method: either adress index or method index is null. function returns callback');
		typeof callback === 'function' && callback();
	}
}

/* -----------------------------------------------------------------------------------------
	Order History
-------------------------------------------------------------------------------------------- */

/*
example:
	re_add_order(
		[$id],
		funciton()
		{
			//callback
		}
	);
*
*/
function re_add_order(orderId, callback)
{
	eslog('fn: re_add_order');
	
	$.post("/relay.php?ejaxKey=XC_CartAjaxUtil.readdOrder",
	{
		orderId: orderId
	},
	function(data)
	{
		eslog('fn: re_add_order: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: re_add_order: failed ajax request');
	});
}

/*
example:
	set_fav_order(
		[$id],
		function()
		{
			//callback
		}
	);
*
*/
function set_fav_order(orderId, callback)
{
	eslog('fn: set_fav_order');
	
	$.post('/relay.php?ejaxKey=XC_CustomerAjaxUtil.favourOrder',
	{
		orderId: orderId
	},
	function(data)
	{
		eslog('fn: set_fav_order: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: set_fav_order: failed ajax request');
	});
}

/*
example:
	unset_fav_order(
		[$id],
		function()
		{
			//callback
		}
	);
*
*/
function unset_fav_order(orderId, callback)
{
	eslog('fn: unset_fav_order');
	
	$.post('/relay.php?ejaxKey=XC_CustomerAjaxUtil.unfavourOrder',
	{
		orderId: orderId
	},
	function(data)
	{
		eslog('fn: unset_fav_order: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: unset_fav_order: failed ajax request');
	});
}

/*
example:
	update_fav_order(
		event,
		[$id],
		function()
		{
			//callback
		}
	);
*
*/
function update_fav_order(event, orderId, callback)
{
	if(!event)
	{
		eslog('error: update_fav_order: event parameter is needed');
	}
	else
	{
		eslog('fn: update_fav_order');
	
		var element = (event.currentTarget) ? $(event.currentTarget) : $(event.srcElement);
		
		if(element.is(':checked'))
			set_fav_order(event, orderId, callback);
		else
			unset_fav_order(event, orderId, callback);
	}
}

/*
example:
	set_order_title(
		[$id],
		"title here",
		function()
		{
			//callback
		}
	);
*
*/
function set_order_title(orderId, text, callback)
{
	eslog('fn: set_order_title');
	
	$.post('/relay.php?ejaxKey=XC_CustomerAjaxUtil.setOrderTitle',
	{
		orderId: orderId,
		title: text
	},
	function(data)
	{
		eslog('fn: set_order_title: '+data.message);
		typeof callback === 'function' && callback();
	})
	.error(function()
	{
		eslog('error: set_order_title: failed ajax request');
	});
}

