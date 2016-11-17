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
					width: 250,
					margin: {
						left: 10,
						top: 10
					}
				},
				{
					xtype: "textfield",
					fieldLabel: "Longitude",
					width: 250,
					margin: {
						left: 10,
						top: 10
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
						store: App.store.create('gopro://familles{nomFamille+,idFamille}',{autoLoad:true}),
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
					layout: "hbox",
					width: "100%",
					height: 200,
					items: [
						{
							xtype: "treepanel",
							flex: 2,
							height: "100%",
							border: false,
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
								dataIndex: 'text',
								width: 250,
								sortable: true
							}, {
								text: 'Description',
								dataIndex: 'description',
								flex: 1,
								sortable: true,
								editor: {
									xtype: "textfield"
								}
							}
							],
							plugins : { ptype : 'cellediting' },
							store: App.store.create({fields:["text","description","values"],data:[],type: "tree"})
						},
						{
							border: true,
							width: 2,
							height: "100%"
						},
						{
							xtype: 'propertygrid',
							flex: 1,
							border: false,
							labelAlign: "top",
							height: "100%",
							layout: 'fit',
							source: {
								ali: "Plastique",
								type: "Z1"
							},
							sourceConfig: {
								ali: {
									displayName: 'Matière',
									editor: {
										xtype: 'combobox',
										store: App.store.create({fields:["id","name"],data:[{id: "0",name:"Plastique"},{id: "1",name:"Métal"}]}),
										displayField: 'name',
										valueField: 'name'
									},
									renderer: function(v){
										return v;
									}
								},
								alxi: {
									displayName: 'Type',
									editor: {
										xtype: 'textfield'
									}
								}								
							}
						}
					]
				}
				]
			}
			]
		}
		];
		this.callParent();
	}	
	
});