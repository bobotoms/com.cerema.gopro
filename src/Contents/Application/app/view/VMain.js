App.view.define('VMain', {

    extend: 'Ext.Panel',
	alias : 'widget.mainform',
	border: false,
	
	layout: "border",
	
	items: [
		{
			region: 'north',
			height: 25,
			minHeight: 25,
			border:false,
			baseCls: 'cls-header',
			xtype: "Menu",
			itemId: "MenuPanel",
			menu: [
				{
					text: "Accueil"
				},
				{
					text: "Gestion"
				},
				{
					text: "Requête"
				},
				{
					text: "Documentation"
				},
				{
					text: "Administration"
				}
			]		
		},
		{
			region: "center",			
			split:true,
			layout:"vbox",
			items: [
				{
					layout: "hbox",
					width: "100%",
					items: [
					{
						xtype: "combo",
						fieldLabel: "Maitrise d'ouvrage",
						labelAlign: "top",
						padding: 5,
						border: false
					},
					{
						xtype: "combo",
						fieldLabel: "Département",
						labelAlign: "top",
						padding: 5,
						border: false
					},
					{
						xtype: "combo",
						fieldLabel: "Axe routier",
						labelAlign: "top",
						padding: 5,
						border: false
					},
					{
						xtype: "combo",
						fieldLabel: "Famille d'ouvrage",
						labelAlign: "top",
						padding: 5,
						border: false
					},
					{
						xtype: "combo",
						fieldLabel: "Type d'ouvrage",
						labelAlign: "top",
						padding: 5,
						border: false
					}						
					]
				},
				{
					id: "MyGMapPanel",
					html: '<div id="TMapPanel" style="width:100%;height:100%"></div>',
					padding: 0,
					flex: 1,
					border: false,
					width: "100%",
					border: false,
					split: true
				},
				{
					xtype: "grid",
					columns: [],
					store: App.store.create({fields:[],data:[]}),
					width: "100%",
					height: 300
				}
			]
		}
	]
	
});
