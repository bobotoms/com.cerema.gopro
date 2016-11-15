Elements={
	getSelect: function(itemId,idType,cb) {
		var db=Elements.using('db');
		var ff=[];	
		var O={};
		var sql="SELECT idElement,parent,new_elements.idType_element,new_elements.nomElement,modif FROM new_elements join types_elements on new_elements.idType_element=types_elements.idType where new_elements.idType="+idType+" order by parent";
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
					name: "c"+id,
					text: r[i].nomElement,
					leaf: true
				};
				O[id]={
					id: id,
					name: "c"+id,
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
					//delete objs[i].parent;
				} else {
					objs[i].leaf=true;
					objs[i].id=Elements.using('shortid').generate();
					//delete objs[i].parent;
				};
			};
			var Obj=[];
			for (var i=objs.length-1;i>=0;i--) {
				Obj.push(objs[i]); 
				/*else {
					if (!Obj.children) Obj.children=[];
					Obj.children.push(objs[i]);
					//if (!objs[i+1].children) objs[i-1].children=[];
					//objs[i+1].children.push(objs[i]);

				};*/			

			};
			
			cb(Obj);
			
		});		
	}
};

module.exports=Elements;