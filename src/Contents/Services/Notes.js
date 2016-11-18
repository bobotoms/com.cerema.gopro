Notes = {
	getAll: function(o,cb) {
		Notes.using('db').model('gopro','SELECT * FROM notes join users on users.idUser=notes.idUser',cb);
	}
};

module.exports=Notes;