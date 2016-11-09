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
			padding: 10,
			border: false,			
			items: [
			{
				width: 200,
				height: "100%"
			},
			{
				flex: 1,
				layout: "vbox",
				width: "100%",
				border: false,
				items: [
				{
					layout: "hbox",
					width: "100%",
					padding: 10,
					border: false,
					items: [
					{
						xtype: "combo",
						fieldLabel: "Famille",
						labelAlign: "top"
					},
					{
						xtype: "combo",
						fieldLabel: "Agent",
						labelAlign: "top",
						margin:{left: 5}
					},
					{
						xtype: "combo",
						fieldLabel: "Végétation",
						labelAlign: "top",
						margin:{left: 5}
					},
					{
						xtype: "datefield",
						fieldLabel: "Date visite",
						labelAlign: "top",
						margin:{left: 5},
						flex: 1
					}
					]
				},
				{
					layout: "hbox",
					width: "100%",
					padding: 10,
					border: false,
					items: [
					{
						xtype: "combo",
						fieldLabel: "Type",
						labelAlign: "top"
					},
					{
						xtype: "combo",
						fieldLabel: "Agent",
						labelAlign: "top",
						margin:{left: 5}
					},
					{
						xtype: "combo",
						fieldLabel: "Météo",
						labelAlign: "top",
						margin:{left: 5}
					},
					{
						xtype: "textfield",
						fieldLabel: "Hauteur",
						width: 50,
						labelAlign: "top",
						margin:{left: 5}
					},
					{
						xtype: "textfield",
						fieldLabel: "Longueur",
						width: 50,
						labelAlign: "top",
						margin:{left: 5}
					},
					{
						xtype: "textfield",
						fieldLabel: "Surface",
						labelAlign: "top",
						flex: 1,
						margin:{left: 5}
					}
					]
				}					
				]
			}
			]
		},
		{
			layout: "hbox",
			flex: 1,
			padding: 10,
			width: "100%",
			border: false,
			items: [
			{
				xtype: "grid",
				columns: [{
					header: "",
					width: 100
				},
				{
					header: "",
					width: 10
				},
				{
					header: "",
					width: 10
				},
				{
					header: "",
					width: 10
				},
				{
					header: "",
					width: 10
				},
				{
					header: "",
					width: 10
				},
				{
					header: "",
					width: 100
				}],
				store: App.store.create({fields:["","","","","","",""],data:[]}),
				height: "100%",
				flex: 2
			},
			{
				html: "",
				flex: 1,
				height: "100%"
			}
			]
		},
		{
			xtype: "htmleditor",
			width: "100%",
			fieldLabel: "Synthèse de la visite",
			labelAlign: "top",
			padding: 10,
			height: 200
		}
		];
		this.callParent();
	}	
	
});