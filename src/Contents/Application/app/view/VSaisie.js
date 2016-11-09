App.view.define('VSaisie', {

    extend: 'Ext.window.Window',
	alias: "widget.VSaisie",

initComponent: function()
	{
		this.title="Saisie";
		this.layout="vbox";
		this.border=false;
		this.width = 700;
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
				xtype: "combo",
				fieldLabel: "Famille",
				labelAlign: "top"
			},
			{
				xtype: "combo",
				labelAlign: "top"
			},
			{
				xtype: "combo",
				fieldLabel: "Végétation",
				labelAlign: "top"
			},
			{
				xtype: "datefield",
				fieldLabel: "Date visite",
				labelAlign: "top"
			}
			]
		},
		{
			layout: "hbox",
			width: "100%",
			items: [
			{
				xtype: "combo",
				fieldLabel: "Type"
			},
			{
				xtype: "combo"
			},
			{
				xtype: "combo",
				fieldLabel: "Météo"
			},
			{
				xtype: "datefield",
				fieldLabel: "Date visite"
			}
			]
		}			
		];
		this.callParent();
	}	
	
});