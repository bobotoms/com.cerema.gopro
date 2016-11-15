App = {
	init: function(app,server) {
		app.use('/tmp',server.static(__dirname + require('path').sep+'tmp'));	
		app.post('/evt',function(req,res){
			res.header("Content-Type", "application/json; charset=utf-8");
			var db=App.using('db');
			var ff=[];	
			
			if (req.body.node=="root") {
				var sql="SELECT idElement,parent,new_elements.idType_element,new_elements.nomElement,modif FROM new_elements join types_elements on new_elements.idType_element=types_elements.idType where new_elements.idType="+req.body.type+" order by parent";
				
				var db=Elements.using('db');
				db.query("gopro",sql,function(e,r){
					var root=[];
					var obj={};
					for (var i=0;i<r.length;i++) {
						var id=r[i].idElement;
						var parent=r[i].parent;
						if (!obj[id]) obj[id]={
							id: i,
							name: "c"+i,
							text: r[i].nomElement,
							leaf: true
						};
						if (parent==0) root.push(obj[id]); else {
							if (!obj[parent].children) {
								obj[parent].children=[];
								obj[parent].leaf=false;
							};
							obj[parent].children.push(obj[id]);
						}
					};
					
					res.end(JSON.stringify(root));
				});				
			}
		});
		app.get('/evt',function(req,res){
			res.header("Content-Type", "application/json; charset=utf-8");
			var db=App.using('db');
			var ff=[];	
			var O={};
			var sql="SELECT idElement,parent,new_elements.idType_element,new_elements.nomElement,modif FROM new_elements join types_elements on new_elements.idType_element=types_elements.idType where new_elements.idType=1 order by parent";
			var db=Elements.using('db');
			db.query("gopro",sql,function(e,r){
				var root=[];
				var Root=[];
				var obj={};
				for (var i=0;i<r.length;i++) {
					var id=r[i].idElement;
					var parent=r[i].parent;
					if (!obj[id]) obj[id]={
						id: i,
						name: "c"+i,
						text: r[i].nomElement,
						leaf: true
					};
					O[id]={
						id: i,
						name: "c"+i,
						text: r[i].nomElement,
						parent: parent
					};
					if (parent==0) root.push(obj[id]); else {
						if (!obj[parent].children) {
							obj[parent].children=[];
							obj[parent].leaf=false;
						};
						obj[parent].children.push(obj[id]);
					}
				};
				var itemId=19;
				var i=1;
				var objs=[];
				while (itemId!=0) {
					objs.push(O[itemId]);
					itemId=O[itemId].parent;
				};
				var obj={};
				for (var i=objs.length;i=0;i--) {
					var obj[objs[i].id]=objs[i];
					obj[objs[i].id].leaf=true;
					var parent=obj[objs[i].id].parent;
					delete obj[objs[i].id].parent;
					if (parent==0) root.push(obj[objs[i].id]); else {
						if (!obj[parent].children) {
							obj[parent].children=[];
							obj[parent].leaf=false;
						};
						obj[parent].children.push(obj[objs[i].id]);
					}					
					
				};
				res.end(JSON.stringify(obj,null,4));
			});
		});		
	}
};

module.exports = App;