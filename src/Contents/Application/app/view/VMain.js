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
			height: 200,
			layout: "fit",
			animCollapse: true,
			collapsible: true,
			items: [
				{
					xtype: "grid",
					columns: [
					{
						header: "Date",
						width: 100,
						dataIndex: "dat"
					},
					{
						header: "",
						width: 50,
						dataIndex: "x"
					},
					{
						header: "",
						width: 50,
						dataIndex: "y"
					},
					{
						header: "Evènement",
						flex: 1,
						dataIndex: "evt"
					}						
					],
					store: App.store.create({fields:["dat","x","y","evt"],data:[{
						dat: "17/05/2016",
						x: "N",
						y: "JG",
						evt: "Réunion des inspecteurs - Visioconférence - Lyon 14h"
					},{
						dat: "21/05/2016",
						x: "L",
						y: "RH",
						evt: "Inspection RN 122 - Jean-Claude. Faire visite détaillée du filet en présence éboulis signalé"
					},{
						dat: "25/06/2016",
						x: "N",
						y: "JG",
						evt: "Rappel: faire remonter vos inscriptions pour la journée thématique"
					}]})
				}				
			]
		},
		{
			region: "center",			
			split:true,
			layout:"fit",
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
							text: "Dpt",
							flex: 1
						}
					],
					store: App.store.create({fields:[],data:[]})
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
