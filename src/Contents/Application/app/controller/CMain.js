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
		"VSaisie",
		"VAddItem"
	],
	
	models: [
	],
	
	init: function()
	{
		var p=this;
		
		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			"button#clickme": {
				click: "clickme_onclick"
			},
			"VSaisie combo#famille": {
				select: "famille_select"
			},
			"VSaisie combo#type": {
				
			},
			"VSaisie button#add_item": {
				click: "add_item_click"
			},
			"VAddItem": {
				show: "VAddItem_onShow"
			}
		});
		
		App.init('VMain',function(){
			p.onLoad(p);
		});
		
	},
	VAddItem_onShow: function(me) {
		App.Elements.getTree({},function(response){
			console.log(response);

			
			var json = response;

            //var jsonstr_decoded = Ext.JSON.decode(jsonstr);
            var reader = App.get(me,'treepanel').getStore().getProxy().getReader();
          	var reader_data = reader.read(json);

            // First read, then load it here.
			//App.get(me,'treepanel').getStore().root.removeAll();
            App.get(me,'treepanel').getStore().loadData(reader_data.records,true);			
			
			//App.get(me,'treepanel').bindStore(store);
			
			//console.log(store);
			//App.get(me,'treepanel').getStore().loadData(root);
		})
	},
	add_item_click: function() {
		App.view.create('VAddItem',{modal: true}).show().center();	
	},
	famille_select: function(me) {
		App.get('VSaisie combo#type').setValue('');
		var store=App.store.create('gopro://types?idFamille='+me.getValue());
		App.get('VSaisie combo#type').bindStore(store);
		App.get('VSaisie combo#type').getStore().load();
	},
	showSaisie: function() {
		App.view.create('VSaisie',{modal: true}).show().center();	
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
				
			}
		};			
	},
	clickme_onclick: function()
	{
		Ext.Msg.alert('Omneedia','hello world!');
	},
	onLoad: function(p)
	{
		App.loadAPI("http://maps.google.com/maps/api/js?sensor=false&callback=GMap");

      	var tab1=Ext.create("Ext.ux.ribbon.Tab", {
			title: 'Accueil',
        	closable: false,
			layout: {
				type: 'hbox',
				align: 'stretch'
			}, 
		  	items: [
			{
				title: 'Ouvrages',
				iconAlign: 'top',
				layout: {
					type: 'table', 
					columns: 4
				},
				items: [{
						text: 'Nouveau',
						iconCls: "new",
						scale: 'large',
						iconAlign: 'top',
						rowspan: 3,
						handler: p.showSaisie
					}
				]
			}
			]
	  	});
			
		App.get('mainform ribbon').addTab(tab1, true);
		
	}
	
	
});
