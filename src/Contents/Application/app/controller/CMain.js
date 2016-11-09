function GMap(l,m)
{
	var TMap={};
	
	if ( typeof l === 'undefined' ) {
		TMap.map = new google.maps.Map(document.getElementById('TMapPanel'),{
			zoom: 10,
			center: new google.maps.LatLng('43.299999','5.4'),
			mapTypeId: google.maps.MapTypeId.MAP	
		});	
	} else {
		TMap.map = new google.maps.Map(document.getElementById('TMapPanel'),{
			zoom: 10,
			center: new google.maps.LatLng(l, m),
			mapTypeId: google.maps.MapTypeId.MAP	
		});		
		TMap.marker= new google.maps.Marker({
			position: new google.maps.LatLng(l,m)
		});		
		TMap.marker.setMap(TMap.map);
	}
};

App.controller.define('CMain', {

	views: [
		"VMain",
		"VSaisie"
	],
	
	models: [
	],
	
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			"button#clickme": {
				click: "clickme_onclick"
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	Menu_onClick: function(p)
	{
		if (p.itemId) {
			if (p.itemId=="mnu_saisie") {
				App.get('VSaisie',{modal: true}).show().center();
			}
		};			
	},
	clickme_onclick: function()
	{
		Ext.Msg.alert('Omneedia','hello world!');
	},
	onLoad: function()
	{
		App.loadAPI("http://maps.google.com/maps/api/js?sensor=false&callback=GMap");	
		
	}
	
	
});
