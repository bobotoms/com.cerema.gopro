App = {
	init: function(app,server) {
		app.use('/tmp',server.static(__dirname + require('path').sep+'tmp'));	
		app.post('/evt',function(req,res){
			res.header("Content-Type", "application/json; charset=utf-8");
			var db=App.using('db');
			var ff=[];	
			if (req.body.node=="root") {
				var sql="SELECT idElement,idParent,elements.idType,elements.nomElement,modif FROM elements join types_elements on elements.idType=types_elements.idType where idParent=1";
				db.query("gopro",sql,function(e,o){
					for (var i=0;i<o.length;i++)
					{
						ff.push({
							text: o[i].nomElement,
							id: 'K_'+i,
							leaf: false
						});
					};
					res.end(JSON.stringify(ff));	
				});
			} else {
				var sql="SELECT idElement,idParent,elements.idType,elements.nomElement,modif FROM elements join types_elements on elements.idType=types_elements.idType where idParent="+req.body.node.split('_')[1];
				db.query("gopro",sql,function(e,o){
					for (var i=0;i<o.length;i++)
					{
						ff.push({
							text: o[i].nomElement,
							id: 'L'+i,
							leaf: false
						});
					};
					res.end(JSON.stringify(ff));	
				});
			}
		});
	}
};

module.exports = App;