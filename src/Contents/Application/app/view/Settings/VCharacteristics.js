App.view.define('Settings.VCharacteristics',{
	extend: 'Ext.window.Window',
	alias: "widget.VCharacteristics",

	initComponent: function()
	{
		this.title="Caractéristiques";
		this.layout="hbox";
		this.border=false;
		this.width = 820;
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
			itemId: "cboFamille"			
		},
		{
			xtype: "combo",
			fieldLabel: "Type",
			padding: 5,
			labelAlign: "top",
			displayField: "nomType",
			valueField: "idType",
			editable: false,
			store: App.store.create({fields:[],data:[]}),
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
			padding: 5,
			height: "100%",
			title: "Catalogue",
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
			xtype: "grid",
			tbar: [
			'->',
			{
				text: "Ajouter"
			}
			],
			plugins: [
			{
				ptype: "cellediting"
			}
			],
			columns: [
				{
					text: "Nom"
				},
				{
					text: "Type"
				},
				{
					text: "Valeurs"
				},
				{
					text: "Unité"
				}
			],
			store: App.store.create({fields:[],data:[]}),
			border: false,
			itemId: "T1",
			title: "Caractéristiques",
			flex: 1,
			height: "100%",
			border: false
		}
		];
		this.callParent();
	}
});