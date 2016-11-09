function GMap(l,m)
{
	var TMap={};
	TMap.map = new google.maps.Map(document.getElementById('TMapPanel'),{
		zoom: 18,
		center: new google.maps.LatLng(l, m),
		mapTypeId: google.maps.MapTypeId.SATELLITE	
	});
	TMap.marker= new google.maps.Marker({
		position: new google.maps.LatLng(l,m)
	});		
	TMap.marker.setMap(TMap.map);
	GMap('43.299999','5.4');
	
};

App.controller.define('CMain', {

	views: [
		"VMain"
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
			Ext.Msg.alert('Status', 'Click event on '+p.itemId);
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
