Elements={
	getTree: function(o,cb) {
		var sql="SELECT idElement,niveau,elements.idType,elements.nomElement,modif FROM elements join types_elements on elements.idType=types_elements.idType where idParent=1 order by niveau";
		var db=Elements.using('db');

		db.query("gopro",sql,function(e,r){
			var root=[];
			var obj={};
			for (var i=0;i<r.length;i++) {
				var id=r[i].idElement;
				var parent=r[i].niveau;
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