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
			items: [
			{
				xtype: "combo",
				fieldLabel: "Famille"
			},
			{
				xtype: "combo"
			},
			{
				xtype: "combo",
				fieldLabel: "Végétation"
			},
			{
				xtype: "datefield",
				fieldLabel: "Date visite"
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