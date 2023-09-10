var LOCALDATA = {};

LOCALDATA.get = function(key, callback=()=>{}){
	key = "LOCALDATA_"+key;
	localforage.getItem(key, (error, data) => {
		callback(data);
	});
}

LOCALDATA.save = function(key, data, callback=()=>{}){
	key = "LOCALDATA_"+key;
	localforage.setItem(key, data, ()=>{
		callback();
	});
}

LOCALDATA.purge = function(key, callback){
	key = "LOCALDATA_"+key;
	LOCALDATA.save(key, "", callback);
}