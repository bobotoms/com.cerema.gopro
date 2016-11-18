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
					text: "Général",
					menu: [
						{
							text: "Ouvrages",
							menu: [
								{
									text: "Nouveau"
								},
								{
									text: "Carte"
								},
								{
									text: "Liste"
								}
							]
						}
					]
				},
				{
					text: "Visites"
				}
			]		
		},
		{
			region: 'north',
			xtype: "ribbon"
		},
		{
			region: "south",
			title: "Actualités",
			itemId: "wiki",
			height: 200,
			layout: "fit",
			animCollapse: true,
			collapsible: true
		},
		{
			region: "center",			
			split:true,
			layout:"fit",
			itemId: "CPanel",
			items: [
				{
					id: "MyGMapPanel",
					itemId: "map",
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
					hidden: true,
					itemId: "gridO",
					columns: [
						{
							text: "Ouvrage",
							flex: 1,
							dataIndex: "nomOuvrage"
						},
						{
							text: "Dpt",
							width: 150,
							dataIndex: "nomDepartement"
						}
					],
					store: App.store.create("App.Ouvrages.getAll",{autoLoad: true})
				},
				{
					xtype: "VCharacteristics",
					itemId: "setup_characteristics",
					hidden: true
				}
			]
		}
	]
	
});
