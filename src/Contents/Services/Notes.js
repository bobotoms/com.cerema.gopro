Notes = {
	getAll: function(o,cb) {
		Notes.using('db').model('gopro','SELECT concat(nom+" "+prenom) nomprenom, * FROM notes join users on users.idUser=notes.idUser',cb);
	}
};

module.exports=Notes;