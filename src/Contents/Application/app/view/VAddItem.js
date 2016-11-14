App.view.define('VAddItem',{
	extend: 'Ext.window.Window',
	alias: "widget.VAddItem",

	initComponent: function()
	{
		this.title="Catalogue";
		this.layout="hbox";
		this.border=false;
		this.width = 700;
        this.height = 430;
		this.bodyStyle="background-color: white";
        this.bbar = [
            
        ];	
		this.items = [
		{
			xtype: "treepanel",
			height: "100%",
			border: false,
			flex: 1,
			rootVisible: false,
			useArrows: true,
			store: Ext.create('Ext.data.TreeStore', {
				autoLoad: true,
				proxy: {
					type: 'ajax',
					url: '/evt',
					actionMethods: {
						read: 'POST'
					},
					reader: {
						type: 'json'
					}					
				}
			})
		},
		{
			width: 100,
			height: "100%",
			bodyStyle: "background-color:#EEEEEE",
			border: false,
			layout: "vbox",
			padding: 10,
			items: [
			{
				flex: 1,
				border: false
			},
			{
				border: false,
				xtype: "button",
				text: ">>",
				width: "100%"
			},
			{
				border: false,
				xtype: "button",
				text: "<<",
				width: "100%"
			},
			{
				flex: 1,
				border: false
			}
			]
		},
		{
			xtype: "treepanel",
			height: "100%",
			border: false,
			flex: 1,
			rootVisible: false,
			useArrows: true,
			height: "100%",
			border: false
		}
		];
		this.callParent();
	}
});