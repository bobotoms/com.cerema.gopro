App.view.define('VSaisie', {

    extend: 'Ext.window.Window',
	alias: "widget.VSaisie",

	initComponent: function()
	{
		this.title="Saisie";
		this.layout="vbox";
		this.border=false;
		this.width = 950;
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
				xtype: "textfield",
				bindTo: "idOuvrage",
				hidden: true
			},
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
					fieldLabel: "Longitude",
					bindTo: "oa_y",
					width: 250,
					margin: {
						left: 10,
						top: 10
					}
				},
				{
					xtype: "textfield",
					fieldLabel: "Latitude",
					bindTo: "oa_x",
					width: 250,
					margin: {
						left: 10,
						top: 10
					}
				},
				{
					xtype: "textfield",
					fieldLabel: "PR Début",
					bindTo: "PRDebut",
					width: 250,
					margin: {
						left: 10,
						top: 10
					}
				},
				{
					xtype: "textfield",
					fieldLabel: "PR Fin",
					bindTo: "PRFin",
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
						bindTo: "idFamille",
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
						bindTo: "idType",
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
						bindTo: "idDepartement",
						store: App.store.create("gopro://departements",{autoLoad:true}),
						editable: false,
						displayField: "nomDepartement",
						valueField: "idDepartement",
						labelAlign: "top"						
					},
					{
						xtype: "combo",
						flex: 1,
						margin: {
							left: 5 	
						},
						fieldLabel: "Géologie",
						bindTo: "idGeologie",
						store: App.store.create("gopro://geologies",{autoLoad:true}),
						editable: false,
						displayField: "nomGeologie",
						valueField: "idGeologie",
						labelAlign: "top"						
					}
					]
				},
				{
					xtype: "textfield",
					width: "100%",
					border: false,
					fieldLabel: "Nom de l'ouvrage",
					bindTo: "nomOuvrage",
					labelAlign: "top"
				},
				{
					xtype: "textfield",
					width: "100%",
					border: false,
					fieldLabel: "Etiquette",
					bindTo: "etiquetteOuvrage",
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
								text: "Ajouter/Modifier",
								iconCls: "update",
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
							border: false,
							flex: 1,
							height: "100%",
							layout: "fit",
							items: [
							{
								xtype: 'propertygrid',
								flex: 1,
								border: false,
								height: "100%",
								source: {

								},
								sourceConfig: {

								}
							}								
							]
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