Elements={
	getTree: function(o,cb) {
		var sql="SELECT idElement,idParent,elements.idType,elements.nomElement,modif FROM elements join types_elements on elements.idType=types_elements.idType order by idParent";
		var db=Elements.using('db');
		db.query(sql,function(e,r){
			var root=[];
			var obj={};
			for (var i=0;i<r.length;i++) {
				var id=r[i].idElement;
				var parent=r[i].idElement;
				if (!obj[id]) obj[id]={
					text: r[i].nomElement,
					children:[]
				};
				if (parent==1) root.push(obj[id]); else obj[parent].children.push(obj[id]);
			}
			cb(root);
		});
	}
};

module.exports=Elements;