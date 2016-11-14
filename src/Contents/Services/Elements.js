Elements={
	getTree: function(o,cb) {
		var sql="SELECT idElement,parent,new_elements.idType_element,new_elements.nomElement,modif FROM new_elements join types_elements on new_elements.idType_element=types_elements.idType where parent=0 and idType=1";
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
				if (parent==1) root.push(obj[id]); else {
					if (!obj[parent].children) {
						obj[parent].children=[];
						obj[parent].leaf=false;
					};
					obj[parent].children.push(obj[id]);
				}
			}
			cb(root);
		});

	}
};

module.exports=Elements;