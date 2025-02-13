const abx = require('com.alcoapps.actionbarextras');

module.exports = function(event) {
	const $ = event.source;
	const onPaypalItemclick = function() {
		require("paypal.dialog")();
	};
	const onSucheItemclick = function() {
		require("search.dialog")();
	};
	const onMenuItem1click = function(e) {
		e.source.checked = !e.source.checked;
		$.toggleGesamtnetz(e.source.checked);
	};
	const onMenuItem4click = function(e) {
		e.source.checked = !e.source.checked;
		$.toggleVeloUnfall(e.source.checked);
	};
	const onMenuItem2click = function(e) {
		require("mapstyle.dialog")();
	};
	const onMenuItem10click = function(e) {
		require("colorlegende.window")();
	};
	
	$.activity.onCreateOptionsMenu = function(e) {
		abx.backgroundColor = '#6699cc';
		abx.subtitle = "Mit dem Rad sicher und gemütlich durch München auf breiten Radwegen";
		abx.statusbarColor = '#6699cc';
		abx.titleFont = "Cairo-Regular";
		var menu = e.menu;
		const menuItem0 = menu.add({
			title : 'Vorrang-Radlnetz',
			checkable : true,
			groupId : 1,
			checked : true,
			enabled : false
		});
		const menuItem1 = menu.add({
			title : 'Gesamtnetz',
			checkable : true,
			groupId : 1,
			checked : true
		});
		const menuItem4 = menu.add({
			title : 'Radlerunfälle 2018',
			checkable : true,
			visible : false,
			groupId : 1,
			enabled : true,
			checked : false
		});

		const menuItem2 = menu.add({
			title : 'Umschaltung Kartenstil',
			groupId : 2,
			checkable : false,
			visible : true,

		});
		const menuItem = menu.add({
			title : 'MunichWays Webseite',
		});
		const paypalItem = menu.add({
			title : 'Finanzielle Unterstützung',
			enabled:true,
			groupId : 3,
		});
		const menuItem10 = menu.add({
			title : 'Bewertungskriterien',
			groupId : 3,
		});

		const sucheItem = menu.add({
			icon : Ti.Android.R.drawable.ic_menu_search,
			showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW,
			enabled : true,
			visible:false,
			title: "Suche …"
		});
		menuItem.addEventListener('click', require('/web.window'));
		menuItem1.addEventListener('click', onMenuItem1click);
		menuItem2.addEventListener('click', onMenuItem2click);
		paypalItem.addEventListener('click', onPaypalItemclick);
		menuItem4.addEventListener('click', onMenuItem4click);
		menuItem10.addEventListener('click', onMenuItem10click);
		sucheItem.addEventListener('click', onSucheItemclick);
		
		require('libs/checkPermissions')(['ACCESS_FINE_LOCATION'], {
			onOK : function(e) {
				$.geolocation = true;
				return;
				Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
				Ti.Geolocation.distanceFilter = 20;
				Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
				Ti.Geolocation.addEventListener('location', $.onLocationChanged);
				$.mapView.userLocation = true;
			},
			onError : function() {
				alert('So, im Falle der Verweigerung funktioniert die App nicht. Schade.');
			}
		});

	};

	Ti.Gesture.addEventListener("orientationchange", function(orientationchangeEvent) {
		const actionBar = $.activity.actionBar;
		if (actionBar) {
			if ([Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT].indexOf(orientationchangeEvent.orientation) > -1) {
				actionBar.hide();
			} else {
				actionBar.show();
			}
		}
	});
};
