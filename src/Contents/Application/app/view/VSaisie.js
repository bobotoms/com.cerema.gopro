App.view.define('VSaisie', {

    extend: 'Ext.window.Window',
	alias: "widget.VSaisie",

initComponent: function()
	{
		this.title="Saisie";
		this.layout="vbox";
		this.border=false;
		this.width = 430;
        this.height = 630;
		this.bodyStyle="background-color: white";
        this.bbar = [
            '->', {
                text: 'Enregistrer',
				itemId: "Record"
            }, {
                text: 'Quitter',
				itemId: "Exit"
            }
        ];	
		this.items = [

		];
		this.callParent();
	}	
	
});