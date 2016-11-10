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
			height: 200,
			border: true,
			labelAlign: "top",
			flex: 1,
			rootVisible: true,
			store: App.store.create({root:{},type: "tree"})
		},
		{
			width: 100
		},
		{
			html: "yes",
			flex: 1
		}
		];
		this.callParent();
	}
});