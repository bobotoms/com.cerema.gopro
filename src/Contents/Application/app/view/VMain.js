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
					text: "Accueil",
					menu: [
						{
							text: "Saisie",
							itemId: "mnu_saisie"
						}
					]
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
			region: 'north',
			xtype: "ribbon",
			height: 300,
			items: [
			{
            title : 'Home',
				ribbon : [{
					title : 'Clipboard',
					cfg : {
						columns : 2,
						defaults : {
							width : 60
						}
					},
					items : [{
						text : 'Paste',
						iconCls : "paste-icon",
						rowspan : 3,
						width : 50,
						height : 70
					},{
						text : 'Edit',
						iconCls : 'pencil-icon',
						scale : 'small',
						iconAlign : 'left'
					},{
						text : 'Copy',
						scale : 'small',
						iconCls : 'copy-icon',
						iconAlign : 'left'
					},{
						text    : "Cut",
						iconCls : "cut-icon",
						scale : 'small',
						iconAlign : 'left'
					}]
				}]
			}]
		},
		{
			region: "center",			
			split:true,
			layout:"vbox",
			items: [
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
					}]}),
					width: "100%",
					height: 100
				}
			]
		}
	]
	
});
