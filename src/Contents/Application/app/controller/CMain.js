var TMap={};
TMap.click=function(mkr){
	console.log(mkr.getPosition());
};

function GMap(l,m)
{
	
	//if ( typeof l === 'undefined' ) {
	TMap.map = new google.maps.Map(document.getElementById('TMapPanel'),{
		zoom: 10,
		center: new google.maps.LatLng('43.299999','5.4'),
		mapTypeId: google.maps.MapTypeId.MAP	
	});
	TMap.setMarker=function(l,m) {
		var marker=marker.addListener('click', function() {
    		map.setZoom(8);
    		map.setCenter(marker.getPosition());
  		});
		marker.setMap(TMap.map);
		marker.addListener('click', function() {
    		TMap.click(marker);
  		});
		return marker;
	};
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
				TMap.setMarker('43.299999','5.4');
				TMap.setMarker('43.299999','5.5');
				TMap.click
				//App.view.create('VSaisie',{modal: true}).show().center();
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
