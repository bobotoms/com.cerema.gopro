var TMap={};


function GMap(l,m)
{
	
	//if ( typeof l === 'undefined' ) {
	TMap.map = new google.maps.Map(document.getElementById('TMapPanel'),{
		zoom: 10,
		center: new google.maps.LatLng('43.299999','5.4'),
		mapTypeId: google.maps.MapTypeId.MAP	
	});
	TMap.markers=[];
	TMap.setMarker=function(l,m) {
		var marker=new google.maps.Marker({
			position: new google.maps.LatLng(l,m),
			animation: google.maps.Animation.DROP
		});
		marker.setMap(TMap.map);
		TMap.markers.push(marker);
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
				/*TMap.setMarker('43.299999','5.4');
				TMap.setMarker('43.299999','5.5');
				TMap.markers[0].addListener('click',function(){
					alert(this.getPosition());
				})*/
				App.view.create('VSaisie',{modal: true}).show().center();
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

      	var tab1=Ext.create("Ext.ux.ribbon.Tab",{
			title: 'Nouveau',
        	closable: false,
			layout: {
				type: 'hbox',
				align: 'stretch'
			}, 
		  	items: [
			{
				title: 'Ouvrages',
				iconAlign: 'top',
				// note that the items are row major
				layout: {type: 'table', columns: 4},
				items: [{
						text: 'Nouveau',
						icon: "images/32/document_plain_new.png",
						scale: 'large',
						iconAlign: 'top',
						rowspan: 3
					},
				]
			}
			]
	  	});
			
		App.get('mainform ribbon').addTab(tab1), true);
		
	}
	
	
});
