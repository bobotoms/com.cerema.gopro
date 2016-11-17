var TMap={};

function hideForms() {
	var form=App.get('mainform panel#CPanel');
	for (var i=0;i<form.items.length;i++) form.items.items[i].hide();	
};

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
		"VAddItem",
		"Settings.VCharacteristics"
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
			"VSaisie treepanel": {
				beforeedit: "treeSaisie_beforeedit",
				itemclick: "treeSaisie_click"
			},
			"VAddItem": {
				show: "VAddItem_onShow"
			},
			"VAddItem button#AddItem": {
				click: "AddItem_click"
			},
			"VAddItem button#RemoveItem": {
				click: "RemoveItem_click"
			},
			"VAddItem button#validate": {
				click: "validate_catalog"
			},
			"VCharacteristics combo#cboType": {
				select: "charact_cbotype_select"
			},
			"VCharacteristics combo#cboFamille": {
				select: "charact_cboFamille_select"
			},
			"VCharacteristics treepanel#T0": {
				itemclick: "treeT0_click"
			},
			"VCharacteristics grid#T1": {
				edit: "charact_grid_edit"
			},
			"VCharacteristics button#add": {
				click: "charact_validate_click"
			}
		});
		
		App.init('VMain',function(){
			p.onLoad(p);
		});
		
	},
	treeSaisie_click: function(me,o) {
/*		console.log(me);
		console.log(o);
		alert(o.data.name);*/
		App.DB.get('gopro://elements{idType_element}?idElement='+o.data.name,function(r){
			console.log(r);
		});
	},
	charact_validate_click: function(me) {
		App.DB.get('gopro://@caracteristiques',function(r) {
			var e={};
			for (var i=0;i<r.data.length;i++) {
				e[r.data[i].COLUMN_NAME]='';
			};
			var sm = App.get(me.up('panel').up('panel'),"treepanel#T0").getSelectionModel().getSelection();
			if (sm.length==0) {
				Ext.Msg.alert('GOPRO',"Vous devez sélectionner un élement du catalogue.");
				return;	
			};
			e.idType=sm[0].data.type_element;
			e.actif=1;
			console.log(e);
			App.get(me.up('panel').up('panel'),'grid#T1').getStore().insert(0, e);
		});	
	},
	charact_grid_edit: function(ed,o) {
		var data=o.record.data;
		delete data.creation;
		delete data.modif;
		App.DB.post("gopro://caracteristiques",data,function(r){
			o.grid.getStore().load();
		});
	},
	treeT0_click: function(me,store) {
		var store=App.store.create('gopro://caracteristiques?idType='+store.data.type_element);
		App.get('VCharacteristics grid#T1').bindStore(store);
		store.load();
		//console.log();
	},
	charact_cboFamille_select: function(me) {
		App.get(me.up('panel'),'combo#cboType').setValue('');
		App.get(me.up('panel'),'grid#T1').getStore().removeAll();
		App.get(me.up('panel'),'treepanel#T0').getRootNode().removeAll();
		var store=App.store.create('gopro://types{nomType+,idType}?idFamille='+me.getValue());
		App.get(me.up('panel'),'combo#cboType').bindStore(store);
		App.get(me.up('panel'),'combo#cboType').getStore().load();
	},	
	charact_cbotype_select: function(me,store) {
		console.log(store);	
		App.get(me.up('panel'),'treepanel#T0').getRootNode().removeAll();
		App.get(me.up('panel'),'grid#T1').getStore().removeAll();
		App.get(me.up('panel'),'treepanel#T0').getStore().getProxy().extraParams.type=store.data.idType;
		App.get(me.up('panel'),'treepanel#T0').getStore().load();
		App.get(me.up('panel'),'treepanel#T0').getStore().on('load',function(){
			App.get(me.up('panel'),'treepanel#T0').expandAll();
		});		
	},
	treeSaisie_beforeedit: function(ed, obj, eo) {
		// si c'est un container, on n'édite pas !
		if (!obj.record.data.leaf) return false;
		console.log(obj.record);
	},
	validate_catalog: function(me) {
		var clone = function(node) {
  			var result = node.copy(),
      		len = node.childNodes ? node.childNodes.length : 0,
      		i;
  			for (i = 0; i < len; i++) result.appendChild(clone(node.childNodes[i]));
  			return result;
		};
		var CStore=App.get(me.up('window'),"treepanel#T1").getStore();
		var oldRoot = CStore.getRootNode(),
    	newRoot = clone(oldRoot);
		App.get('VSaisie treepanel').getStore().setRootNode(newRoot);
		me.up('window').close();
	},
	AddItem_click: function(me) {
		var tree = App.get(me.up('window'),"treepanel#T0");
        var selModel = tree.getSelectionModel();
        var node = selModel.getLastSelected(); 
		App.Elements.getSelect(node.data.id,me.up('window').type_item,function(r){
			if (!r[r.length-1].leaf) r[r.length-1].text="<b>"+r[r.length-1].text+"</b>";
			console.log(r);
			for (var i=0;i<r.length;i++) {	
				
				var xnode=App.get(me.up('window'),"treepanel#T1").getRootNode().store.getNodeById('c'+r[i].parent);			
				if (!xnode) {
					if (!App.get(me.up('window'),"treepanel#T1").getRootNode().store.getNodeById(r[i].id)) App.get(me.up('window'),"treepanel#T1").getRootNode().appendChild(r[i]); 
				} else {
					if (!App.get(me.up('window'),"treepanel#T1").getRootNode().store.getNodeById(r[i].id)) xnode.appendChild(r[i]);
				};
				App.get(me.up('window'),"treepanel#T1").expandAll();
			}
		});
	},
	RemoveItem_click: function(me) {
		
	},
	VAddItem_onShow: function(me) {
		App.get(me,'treepanel#T0').getStore().getProxy().extraParams.type=me.type_item;
		App.get(me,'treepanel#T0').getStore().load();
		App.get(me,'treepanel#T0').getStore().on('load',function(){
			App.get(me,'treepanel#T0').expandAll();
		});
	},
	add_item_click: function(me) {
		App.view.create('VAddItem',{modal: true,type_item: App.get(me.up('window'),'combo#type').getValue()}).show().center();	
	},
	famille_select: function(me) {
		App.get('VSaisie combo#type').setValue('');
		var store=App.store.create('gopro://types{idType,nomType+}?idFamille='+me.getValue());
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
	hideForms: function()
	{
		var form=App.get('mainform');
		for (var i=0;i<form.items.length;i++) form.items[i].remove();
	},
	showMap: function(p)
	{
		hideForms();
		App.get("mainform panel#map").show();
	},
	showGrid: function(p)
	{
		hideForms();
		App.get("mainform grid#gridO").show();		
	},
	showSettingsCharacteristics: function(p) {
		hideForms();
		App.get("mainform panel#setup_characteristics").show();
		//App.view.create("Settings.VCharacteristics",{modal: true}).show().center();	
	},
	onLoad: function(p)
	{
		App.loadAPI("http://maps.google.com/maps/api/js?sensor=false&callback=GMap");

      	var tab1=Ext.create("Ext.ux.ribbon.Tab", {
			title: 'Général',
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
					},
					{
						text: 'Carte',
						iconCls: "map_ico",
						scale: 'large',
						iconAlign: 'top',
						rowspan: 3,
						handler: p.showMap
					},
					{
						text: 'Liste',
						iconCls: "list_ico",
						scale: 'large',
						iconAlign: 'top',
						rowspan: 3,
						handler: p.showGrid
					}
				]
			}
			]
	  	});

		var tab2=Ext.create("Ext.ux.ribbon.Tab", {
			title: 'Visites',
        	closable: false,
			layout: {
				type: 'hbox',
				align: 'stretch'
			}, 
		  	items: [
			
			]
	  	});
		
		var tab3=Ext.create("Ext.ux.ribbon.Tab", {
			title: 'Synchronisation',
        	closable: false,
			layout: {
				type: 'hbox',
				align: 'stretch'
			}, 
		  	items: [
			
			]
	  	});
		
		var tab4=Ext.create("Ext.ux.ribbon.Tab", {
			title: 'Administration',
        	closable: false,
			layout: {
				type: 'hbox',
				align: 'stretch'
			}, 
		  	items: [
			{
				title: 'Paramètres',
				iconAlign: 'top',
				layout: {
					type: 'table', 
					columns: 4
				},
				items: [{
						text: 'Caractéristiques',
						iconCls: "characteristics",
						scale: 'large',
						iconAlign: 'top',
						rowspan: 3,
						handler: p.showSettingsCharacteristics
				}]
			}
			]
	  	});		
			
		App.get('mainform ribbon').addTab(tab1, true);
		App.get('mainform ribbon').addTab(tab2, false);
		App.get('mainform ribbon').addTab(tab3, false);
		App.get('mainform ribbon').addTab(tab4, false);		
	}
	
	
});
