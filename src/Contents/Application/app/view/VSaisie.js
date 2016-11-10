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
			height: 150,
			items: [
			{
				border: true,
				width: 200
			},
			{
				padding: 10,
				layout: "vbox",
				flex: 1,
				height: "100%",
				items: [
				{
					layout: "hbox",
					items: [
					{
						xtype: "combo",
						fieldLabel: "Famille",
						labelAlign: "top"
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