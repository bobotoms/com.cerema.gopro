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
			height: 200,
			border: false,
			items: [
			{
				border: true,
				padding: 10,
				height: "100%",
				width: 250
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
						xtype: "textfield",
						flex: 1,
						margin: {
							left: 5 	
						},
						fieldLabel: "Titre",
						labelAlign: "top"						
					}
					]
				},
				{
					xtype: "textfield",
					width: "100%",
					border: false,
					fieldLabel: "Commentaires",
					labelAlign: "top"
				},
				{
					xtype: "treepanel",
					fieldLabel: "Eléments",
					labelAlign: "top",
					width: "100%",
					height: 280,
					border: false,
					fieldLabel: "Eléments constitutifs",
					labelAlign: "top",
					rootVisible: false,
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
						sortable: true
    				}, {
						text: 'Valeurs',
						dataIndex: 'values',
						flex: 1,
						width: 150,
						sortable: true
    				}	
					],
					store: App.store.create({
						root:{
							r1: "Eléments",
							children:[
								{
									item:"test",
									description: "xxx",
									values: "12"
								}
							]
						},
						type: "tree"})
				}
				]
			}
			]
		}
		];
		this.callParent();
	}	
	
});