Elements={
	getAllByType: function(o,cb) {
		var db=Elements.using('db');
		var ff=[];	
			var sql="SELECT idElement,parent,elements.idType_element,elements.nomElement,modif FROM elements join types_elements on elements.idType_element=types_elements.idType where elements.idType="+o.type+" order by parent";
			console.log(sql);
			var db=Elements.using('db');
			db.query("gopro",sql,function(e,r){
				var root=[];
				var obj={};
				for (var i=0;i<r.length;i++) {
					var id=r[i].idElement;
					var parent=r[i].parent;
					if (!obj[id]) obj[id]={
						id: id,
						name: "c"+id,
						text: r[i].nomElement,
						type_element: idType_element,
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

				cb(root);
			});				
	},
	getSelect: function(itemId,idType,cb) {
		var db=Elements.using('db');
		var ff=[];	
		var O={};
		var sql="SELECT idElement,parent,elements.idType_element,elements.nomElement,modif FROM elements join types_elements on elements.idType_element=types_elements.idType where elements.idType="+idType+" order by parent";
		var db=Elements.using('db');
		db.query("gopro",sql,function(e,r){
			var root=[];
			var Root=[];
			var obj={};
			for (var i=0;i<r.length;i++) {
				var id=r[i].idElement;
				var parent=r[i].parent;
				if (!obj[id]) obj[id]={
					id: id,
					//name: "c"+id,
					text: r[i].nomElement,
					leaf: true
				};
				O[id]={
					id: id,
					//name: "c"+id,
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
			var i=1;
			var objs=[];
			if (!obj[itemId].leaf) O[itemId].text="<b>"+O[itemId].text+"</b>";
			console.log(obj[itemId]);
			while (itemId!=0) {
				objs.push(O[itemId]);
				itemId=O[itemId].parent;
			};
			var Obj=-1;
			for (var i=objs.length-1;i>=0;i--) {
				if (objs[i-1]) {
					objs[i].leaf=false;
					objs[i].children=[];
					objs[i].id="c"+objs[i].id;
				} else {
					objs[i].leaf=true;
					objs[i].id=Elements.using('shortid').generate();
				};
			};
			var Obj=[];
			
			for (var i=objs.length-1;i>=0;i--) Obj.push(objs[i]); 
			
			cb(Obj);
			
		});		
	}
};

module.exports=Elements;