Elements={
	getTree: function(o,cb) {
		var sql="SELECT idElement,idParent,elements.idType,elements.nomElement,modif FROM elements join types_elements on elements.idType=types_elements.idType order by idParent";
		var db=Elements.using('db');
		db.query(sql,function(e,r){
			var root=[];
			for (var i=0;i<r.length;i++) {
				
			}
		});
	}
};

module.exports=Elements;