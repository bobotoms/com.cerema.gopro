Elements={
	getTree: function(o,cb) {
		var sql="SELECT idElement,parent,new_elements.idType_element,new_elements.nomElement,modif FROM new_elements join types_elements on new_elements.idType_element=types_elements.idType where parent=0 and new_elements.idType=1";
		var db=Elements.using('db');

		db.query("gopro",sql,function(e,r){
			console.log(e);
			console.log(r);
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
				if (parent==0) root.push(obj[id]); /*else {
					if (!obj[parent].children) {
						obj[parent].children=[];
						obj[parent].leaf=false;
					};
					obj[parent].children.push(obj[id]);
				}*/
			}
			cb(root);
		});

	},
	getSelect: function(itemId,cb) {
		var db=Elements.using('db');
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
			var i=1;
			var objs=[];
			while (itemId!=0) {
				objs.push(O[itemId]);
				itemId=O[itemId].parent;
			};
			var Obj=-1;
			for (var i=objs.length-1;i>=0;i--) {
				if (objs[i-1]) {
					objs[i].leaf=false;
					objs[i].children=[];
					delete objs[i].parent;
				} else {
					objs[i].leaf=true;
					delete objs[i].parent;
				};
			};
			for (var i=objs.length-1;i>=0;i--) {
				if (Obj==-1) Obj=objs[i]; 
				else {
					if (!objs[i+1].children) objs[i-1].children=[];
					objs[i+1].children.push(objs[i]);
				};			

			};
			cb(Obj);
		});		
	}
};

module.exports=Elements;