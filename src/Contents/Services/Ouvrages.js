Ouvrages = {
	getAll: function(o,cb) {
		var db=Ouvrages.using('db');
		db.model("gopro",db.sql("OAGetAll"),cb);
	}
};

module.exports = Ouvrages;