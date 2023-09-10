var User   = {};
User.perms = [];
User.data = {};
User.role = "";
User.init = function(callback){
	Global.loading();
	try{
		User.perms = JSON.parse(User['perms']);
	}
	catch(e){
		User.perms=[];
	}
	callback();
}

//to hide show UI Elements
User.setPerms = function(){
	$(".perms").each(function(){
		var elem = $(this);
		var perms = elem.attr("data-perms");
		try{
			perms = JSON.parse(perms);
			for(i=0; i<perms.length; i++){
				var perm = perms[i];
				var perm2 = perm;
				//to accomodate both -create and -add perms
				if(perm.lastIndexOf("-create")>-1 && perm.lastIndexOf("-create")==perm.length-7){
					perm2 = perm.replace(new RegExp("-create" + '$'), '-add');
				}
				if(perm.lastIndexOf("-add")>-1 && perm.lastIndexOf("-add")==perm.length-4){
					perm2 = perm.replace(new RegExp("-add" + '$'), '-create');
				}
				if(User.perms.indexOf(perm)>-1 || User.perms.indexOf(perm2)>-1||User.role=="SUPER_ADMIN"){
					if(!elem.hasClass("hide")){
						elem.show();
					}
					return;
				}
			}
		}
		catch(e){};
		elem.hide();
		return;
	});
	//hide delete buttons in data table
	$(".icon-crud-container button.delete").hide();
}

User.hasPerm = function(perm){
	if(User.data['perms'] && User.data['perms'].indexOf(perm)>=0){
		return true;
	}
	return false;
}	

User.isSuper = function(){
	if(User.data['id']==1){
		return true;
	}
	else if(User.hasPerm("immsadmin")){
		return true;
	}
	return false;
}