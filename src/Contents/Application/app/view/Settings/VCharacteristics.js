App.view.define('Settings.VCharacteristics',{
	extend: 'Ext.window.Window',
	alias: "widget.VCharacteristics",

	initComponent: function()
	{
		this.title="Caractéristiques";
		this.layout="hbox";
		this.border=false;
		this.width = 700;
        this.height = 430;
		this.bodyStyle="background-color: white";
		this.tbar=[
		{
			xtype: "combo",
			fieldLabel: "Famille",
			padding: 5,
			labelAlign: "top",
			displayField: "nomFamille",
			valueField: "idFamille",
			editable: false,
			store: App.store.create('gopro://familles{nomFamille+,idFamille}',{autoLoad: true}),
			itemId: "cboType"			
		},
		{
			xtype: "combo",
			fieldLabel: "Type",
			padding: 5,
			labelAlign: "top",
			displayField: "nomType",
			valueField: "idType",
			editable: false,
			store: App.store.create('gopro://types{nomType+,idType}',{autoLoad: false}),
			itemId: "cboType"
		}	
		];
        this.bbar = [
			'->',
            {
				text: "Valider",
				itemId: "validate"
			}
        ];	
		this.items = [
		{
			xtype: "treepanel",
			height: "100%",
			border: false,
			flex: 1,
			rootVisible: false,
			useArrows: true,
			itemId: "T0",
			viewConfig: {
                plugins: {
                   ptype: 'treeviewdragdrop',
                   enableDrag: true,
                   enableDrop: false
                }
            },			
			store: App.store.create("App.Elements.getAllByType",{autoLoad: false,type:"tree"})
		},
		{
			width: 70,
			height: "100%",
			bodyStyle: "background-color:#EEEEEE",
			border: false,
			layout: "vbox",
			items: [
			{
				flex: 1,
				border: false,
				width: 5
			},
			{
				flex: 1,
				border: false,
				width: 5
			}
			]
		},
		{
			xtype: "treepanel",
			height: "100%",
			border: false,
			itemId: "T1",
			flex: 1,
			rootVisible: false,
			useArrows: true,
			height: "100%",
			border: false,
			viewConfig: {
                plugins: {
                   ptype: 'treeviewdragdrop',
                   enableDrag: false,
                   enableDrop: true,
				   appendOnly: false
                }
            },			
			store: App.store.create({fields:"",data:[],type:"tree"})
		}
		];
		this.callParent();
	}
});