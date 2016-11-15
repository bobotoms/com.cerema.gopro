App.view.define('VSaisie', {

    extend: 'Ext.window.Window',
	alias: "widget.VSaisie",

	initComponent: function()
	{
		this.title="Saisie";
		this.layout="vbox";
		this.border=false;
		this.width = 900;
        this.height = 630;
		this.bodyStyle="background-color: white";
        this.bbar = [
            '->', {
                text: 'Enregistrer',
				itemId: "Record"
            }, {
                text: 'Quitter',
				itemId: "Exit",
				handler: function(me) {
					me.up('window').close();
				}
            }
        ];	
		this.items = [
		{
			layout: "hbox",
			width: "100%",
			height: 400,
			border: false,
			items: [
			{
				border: true,
				layout: "vbox",
				border: false,
				items: [
				{
					border: true,
					margin: {
						left: 10,
						top: 10
					},
					height: 200,
					width: 250,
					baseCls: "bridge"
				},
				{
					xtype: "textfield",
					fieldLabel: "Latitude",
					margin: {
						left: 10,
						top: 10,
						right: 15
					}
				},
				{
					xtype: "textfield",
					fieldLabel: "Longitude",
					margin: {
						left: 10,
						top: 10,
						right: 15
					}
				}
				]
			},
			{
				padding: 10,
				layout: "vbox",
				border: false,
				flex: 1,
				height: "100%",
				items: [
				{
					layout: "hbox",
					width: "100%",
					border: false,
					items: [
					{
						xtype: "combo",
						fieldLabel: "Famille",
						itemId: "famille",
						editable: false,
						store: App.store.create('gopro://familles',{autoLoad:true}),
						displayField: "nomFamille",
						valueField: "idFamille",
						labelAlign: "top"
					},
					{
						xtype: "combo",
						fieldLabel: "Type",
						itemId: "type",
						editable: false,
						width: 150,
						margin: {
							left: 5 	
						},
						store: App.store.create({fields:[],data:[]}),
						displayField: "nomType",
						valueField: "idType",
						labelAlign: "top"
					},
					{
						xtype: "combo",
						flex: 1,
						margin: {
							left: 5 	
						},
						fieldLabel: "Département",
						store: App.store.create("gopro://departements"),
						editable: false,
						displayField: "nomDepartement",
						valueField: "idDepartement",
						labelAlign: "top"						
					}
					]
				},
				{
					xtype: "textfield",
					width: "100%",
					border: false,
					fieldLabel: "Nom de l'ouvrage",
					labelAlign: "top"
				},
				{
					html: "Eléments:",
					border: false,
					margin:{
						bottom: 4
					}
				},
				{
					xtype: "treepanel",
					width: "100%",
					height: 200,
					border: true,
					rootVisible: false,
					tbar:[
					'->',
					{
						text: "Ajouter",
						itemId: "add_item"
					}
					],
					columns: [
					{
						xtype: 'treecolumn',
						text: 'Eléments',
						dataIndex: 'item',
						width: 150,
						sortable: true
    				}, {
						text: 'Description',
						dataIndex: 'description',
						flex: 1,
						sortable: true,
						editor: {
							xtype: "textfield"
						}
    				}, {
						text: 'Valeurs',
						dataIndex: 'values',
						flex: 1,
						width: 150,
						sortable: true
    				}	
					],
					plugins : { ptype : 'cellediting' },
					store: App.store.create({fields:["item","description","values"],data:[{
									item: "new",
									description: "ma description",
									values: "mes values",
						leaf: false,
						children:[
							{
								item: "new",
									description: "ma description",
									values: "mes values",leaf: true
							}
						]
						
					}],type: "tree"})
				}
				]
			}
			]
		}
		];
		this.callParent();
	}	
	
});