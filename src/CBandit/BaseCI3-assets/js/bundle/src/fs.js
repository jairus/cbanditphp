/*
https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/s
cordova plugin add cordova-plugin-file
*/
var FS = {};
FS.localStore = 1; //set to 1 is want to use local storage instead

FS.writeFile = function(filename, datatowrite, callback){
	if(FS.localStore){
		window.localStorage.setItem(filename, datatowrite);
		callback(true);
		return 0;
	}
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	var writeFile = function(fileEntry, dataObj) {
		// Create a FileWriter object for our FileEntry (log.txt).
		fileEntry.createWriter(function (fileWriter) {
			fileWriter.onwriteend = function() {
				//alert("Successful file write...");
				//readFile(fileEntry);
				this.callback(true);
			}.bind({callback:this.callback});
			fileWriter.onerror = function (e) {
				//alert("Failed file write: " + e.toString());
				this.callback(false);
			}.bind({callback:this.callback});
			// If data object is not passed in,
			// create a new Blob instead.
			fileWriter.write(dataObj);
		}.bind({callback:this.callback}));
	}.bind({callback:callback})
	window.requestFileSystem(/*LocalFileSystem.PERSISTENT*/1, 0, function (fs) {
		//alert('file system open: ' + fs.name);
		fs.root.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
			//alert("fileEntry is file?" + fileEntry.isFile.toString());
			// fileEntry.name == 'someFile.txt'
			// fileEntry.fullPath == '/someFile.txt'
			writeFile(fileEntry, datatowrite);
		}, function(){
			alert("onErrorCreateFile");
		});

	}, function(){
		alert("onErrorLoadFs");
	});
}

FS.readFile = function(filename, callback){
	if(FS.localStore){
		var value = window.localStorage.getItem(filename);
		callback(value);
		return 0;
	}
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
	var readFile =  function(fileEntry) {
		fileEntry.file(function (file) {
			var reader = new FileReader();
			reader.onloadend = function() {
				this.callback(this.reader.result)
				//alert("Successful file read: " + this.result);
				//alert(fileEntry.fullPath + ": " + this.result);
			}.bind({callback:this.callback, reader:reader});
			reader.readAsText(file);
		}.bind({callback:this.callback}), function(){ alert("onErrorReadFile"); });
	}.bind({callback:callback})
	window.requestFileSystem(/*LocalFileSystem.PERSISTENT*/1, 0, function (fs) {
		//alert('file system open: ' + fs.name);
		fs.root.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
			//alert("fileEntry is file?" + fileEntry.isFile.toString());
			// fileEntry.name == 'someFile.txt'
			// fileEntry.fullPath == '/someFile.txt'
			readFile(fileEntry);
		}, function(){
			alert("onErrorCreateFile");
		});

	}, function(){
		alert("onErrorLoadFs");
	});
}

FS.readBinaryFile = function(filename, callback) {
	if(FS.localStore){
		var value = window.localStorage.getItem(filename);
		callback(value);
		return 0;
	}
	var xhr = new XMLHttpRequest();
	xhr.open('GET', filename, true);
	xhr.responseType = 'blob';
	xhr.onload = function() {
		var blob = new Blob([this.response]);
		var url = URL.createObjectURL(blob);
		//pageChapters.recorder.blob = blob;
		callback(blob);
	};
	xhr.send();
}