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
			},
			"VAddItem button#AddItem": {
				click: "AddItem_click"
			},
			"VAddItem button#RemoveItem": {
				click: "RemoveItem_click"
			}
		});
		
		App.init('VMain',function(){
			p.onLoad(p);
		});
		
	},
	AddItem_click: function(me) {
		var tree = App.get(me.up('window'),"treepanel#T0");
        var selModel = tree.getSelectionModel();
        var node = selModel.getLastSelected(); 
		console.log(node);
		/*console.log(App.get(me.up('window'),"treepanel#T1").getRootNode());
		App.get(me.up('window'),"treepanel#T1").getRootNode().appendChild(node.parentNode);*/
		App.Elements.getSelect(node.data.id,me.up('window').type_item,function(r){
			console.log(r);
			for (var i=0;i<r.length;i++) {
				console.log(r[i].id);
				if (i>0) var xnode=App.get(me.up('window'),"treepanel#T1").getRootNode().store.getNodeById(r[i-1].id);
				console.log(xnode);
				if (!xnode) App.get(me.up('window'),"treepanel#T1").getRootNode().appendChild(r[i]);
				App.get(me.up('window'),"treepanel#T1").expandAll();
				xnode=null;
			}
			/*var xnode=App.get(me.up('window'),"treepanel#T1").getStore().getNodeById(pp.data.id);
			//console.log(xnode);
			App.get(me.up('window'),"treepanel#T1").getStore().loadData(r);
			App.get(me.up('window'),"treepanel#T1").getStore().on('load',function(){
			alert(App.get(me.up('window'),"treepanel#T1").getStore().getNodeById(r[0].id));	
			});*/
			
			
		});
		
		
	},
	RemoveItem_click: function(me) {
		
	},
	VAddItem_onShow: function(me) {
		//alert(me.type_item);
		App.get(me,'treepanel#T0').getStore().getProxy().extraParams.type=me.type_item;
		App.get(me,'treepanel#T0').getStore().load();
		App.get(me,'treepanel#T0').getStore().on('load',function(){
			App.get(me,'treepanel#T0').expandAll();
		});
		/*App.Elements.getTree({},function(response){

			/*var json = response;
			var json = [
			{
				text: "test",
				leaf: false,
				children: [
					{
						text: "toto"
					}
				]
			},
			{
				text: "test 2",
				leaf: false
			}			
			];

            var reader = App.get(me,'treepanel').getStore().getProxy().getReader();
          	var reader_data = reader.read(json);

            App.get(me,'treepanel').getStore().loadData(reader_data.records,true);	
			
		})*/
	},
	add_item_click: function(me) {
		App.view.create('VAddItem',{modal: true,type_item: App.get(me.up('window'),'combo#type').getValue()}).show().center();	
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
