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
				autoLoad: false,
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
			border: false
		},
		{
			html: "yes",
			flex: 1,
			height: "100%",
			border: false
		}
		];
		this.callParent();
	}
});