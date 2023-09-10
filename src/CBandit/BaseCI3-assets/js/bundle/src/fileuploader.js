/*
<input type="file" class="selector" />
<script>
	var uploaders = $(".selector").fileuploader({
		//"loading" : function(){}, //custom loader
		//"hideLoading" : function(){}, //custom hide loader
		//"compressimage" : true, //used when what is being uploaded is an image
		"onuploadprogress" : function(filedetailsobj, bytesuploaded, bytestotal){
			Global.log("onuploadprogress --------");
			Global.log(filedetailsobj.name + " - "+((bytesuploaded/bytestotal)*100).toFixed(2));
		},
		"onselect" : function(b64content, filedetailsobj){
			Global.log("onselect--------");
			Global.log(filedetailsobj.name);
			var mime = filedetailsobj.type.toLowerCase();
		},
		"autoupload": false,
		"done": function(ret){
			Global.log("done --------");
			var args = {};
			args['fileurl'] = ret['fileurl'];
			args['filepath'] = ret['filetarget'];
			args['filename'] = ret['filename'];
			Global.log(args['filename']);
		}
	});
	//to trigger
	for(x in uploaders){
		uploaders[x].upload();
	}
</script>
*/

if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      var dataURL = this.toDataURL(type, quality).split(',')[1];
      setTimeout(function() {
        var binStr = atob( dataURL ),
            len = binStr.length,
            arr = new Uint8Array(len);
        for (var i = 0; i < len; i++ ) {
          arr[i] = binStr.charCodeAt(i);
        }
        callback( new Blob( [arr], {type: type || 'image/png'} ) );
      });
    }
  });
}

(function ( $ ) {
    $.fn.fileuploader = function(args) {
		if(!Global.isset(args['endpoint'])){
			args['endpoint'] = CONFIG.api_base_url+"fileupload";
		}
        if(typeof args['autoupload'] == "undefined"){
			args['autoupload'] = true;
		}
		var objarr = this;
		for(i=0; i<objarr.length; i++){
			var obj = $(objarr[i]);
			
			/********** events **********/
			obj.off("x-upload").on("x-upload", function(e, initialize){
				var obj = $(this);
				var args = obj.data("args");
				var input = obj[0];
				if (input.files && input.files[0]) {
					if(Global.isset(args)&&Global.isset(args['loading'])){
						args['loading']()
					}
					else{
						Global.loading();
					}
					//extra params
					var datadash = $(input).data();
					var dataparams = {};
					for(x in datadash){
						dataparams[x] = datadash[x];
					}
					var reader = [];
					//supports multiple tag
					for(fi = 0; fi<input.files.length; fi++){
						if(input.files[fi].type=="image/jpeg"||input.files[fi].type=="image/jpg"){
							var options = {
								//canvas: false,
								//pixelRatio: window.devicePixelRatio,
								//downsamplingRatio: 0.5,
								orientation: true //to flip 
							};
							loadImage(
								input.files[fi],
								function(img, data) {
									var args = this.args;
									var file = this.file;
									var dataparams = this.dataparams;
									var obj = this.obj;
									var elem = document.createElement('canvas');
									var newwidth = img.width;
									var newheight = img.height;
									//if compress
									if(Global.isset(this.args)&&Global.isset(this.args['compressimage'])){
										newwidth = 800;
										newheight = newwidth * img.height / img.width;
										if(newwidth > img.width){
											newwidth = img.width;
											newheight = img.height;
										}
									}
									elem.width = newwidth;
									elem.height = newheight;
									var ctx = elem.getContext('2d');
									ctx.drawImage(img, 0, 0, newwidth, newheight);
									var compressedfileurl = ctx.canvas.toDataURL("image/jpeg", 0.92);
									function dataURLtoBlob( dataUrl, callback ){
										var req = new XMLHttpRequest;
										req.open( 'GET', dataUrl );
										req.responseType = 'arraybuffer'; // Can't use blob directly because of https://crbug.com/412752
										req.onload = function fileLoaded(e){
											// If you require the blob to have correct mimemime type
											var mime = this.getResponseHeader('content-type');
											callback( new Blob([this.response], {type:mime}) );
										};
										req.send();
									}
									dataURLtoBlob(compressedfileurl, 
										function(blob){
											var args = this.args;
											var compressedfileurl = this.compressedfileurl;
											var file = this.file;
											var dataparams = this.dataparams;
											var obj = this.obj;
											if(Global.isset(args)&&Global.isset(args['onselect'])){
												args['onselect'](compressedfileurl, file, dataparams)
											}
											//form data
											var fd = new FormData();
											fd.append("file", blob, file.name);
											for(x in dataparams){
												fd.append(x, dataparams[x]);
											}
											//ajax upload
											var url = args['endpoint'];
											var xhr = new XMLHttpRequest();
											xhr.open("POST", url, true);
											//on ready
											xhr.onreadystatechange = function() {
												var args = this.args;
												var obj = this.obj;
												if (xhr.readyState == 4 && xhr.status == 200) {
													// Every thing ok, file uploaded
													var ret = {};
													try{
														var str = xhr.responseText;
														ret = JSON.parse(str);
														ret = ret['data'];
													}
													catch(e){
														alert(e.message);
													}
													args['done'](ret, obj);
												}
												if(Global.isset(args)&&Global.isset(args['hideLoading'])){
													args['hideLoading']()
												}
												else{
													Global.hideLoading();
												}
											}.bind({args:args, obj:obj});
											//upload progress
											xhr.upload.addEventListener("progress", function(evt){
												var args = this.args;
												var file = this.file;
												if (evt.lengthComputable) {
													if(Global.isset(args)&&Global.isset(args['onuploadprogress'])){
														args['onuploadprogress'](file, evt.loaded, evt.total)
													}
												}
											}.bind({args:args, file:file}), false);
											xhr.send(fd);	
										}.bind({
											args:args, 
											compressedfileurl: compressedfileurl, 
											file:file, 
											dataparams:dataparams, 
											obj:obj
										})
									);
								}.bind({
									args:args, 
									file:input.files[fi], 
									dataparams:dataparams, 
									obj:obj
								})
								,
								options // Options
							);
						}
						else{
							reader[fi] = new FileReader();
							reader[fi].onload = function (e) {
								var args = this.args;
								var file = this.file;
								var reader = this.reader;
								var dataparams = this.dataparams;
								var obj = this.obj;
								
								if(Global.isset(args)&&Global.isset(args['onselect'])){
									args['onselect'](reader.result, file, dataparams)
								}
								//form data
								var fd = new FormData();
								fd.append("file", file);
								for(x in dataparams){
									fd.append(x, dataparams[x]);
								}
								//ajax upload
								var url = args['endpoint'];
								var xhr = new XMLHttpRequest();
								xhr.open("POST", url, true);
								//on ready
								xhr.onreadystatechange = function() {
									var args = this.args;
									var obj = this.obj;
									if (xhr.readyState == 4 && xhr.status == 200) {
										// Every thing ok, file uploaded
										var ret = {};
										try{
											var str = xhr.responseText;
											ret = JSON.parse(str);
											ret = ret['data'];
										}
										catch(e){
											alert(e.message);
										}
										args['done'](ret, obj);
									}
									if(Global.isset(args)&&Global.isset(args['hideLoading'])){
										args['hideLoading']()
									}
									else{
										Global.hideLoading();
									}
								}.bind({
									args:args, 
									obj:obj
								});
								//on upload
								xhr.upload.addEventListener("progress", function(evt){
									var args = this.args;
									var file = this.file;
									if (evt.lengthComputable) {
										if(Global.isset(args)&&Global.isset(args['onuploadprogress'])){
											args['onuploadprogress'](file, evt.loaded, evt.total)
										}
									}
								}.bind({
									args:args, 
									file:file
								}), false);
								xhr.send(fd);
							}.bind({
								args:args, 
								file:input.files[fi], 
								reader:reader[fi], 
								dataparams:dataparams, 
								obj:obj
							});
							reader[fi].readAsDataURL(input.files[fi]);
						}
					}
				}
			}).data("args", args);
			
			obj.off("change").on("change", function(e, initialize){
				var obj = $(this);
				var args = obj.data("args");
				var input = obj[0];
				if(args['autoupload']){
					obj.trigger("x-upload", ['true']);
				}
				else{
					if (input.files && input.files[0]) {
						//extra params
						var datadash = $(input).data();
						var dataparams = {};
						for(x in datadash){
							dataparams[x] = datadash[x];
						}
						var reader = [];
						//supports multiple tag
						for(fi = 0; fi<input.files.length; fi++){
							if(input.files[fi].type=="image/jpeg"||input.files[fi].type=="image/jpg"){
								var options = {
									//canvas: false,
									//pixelRatio: window.devicePixelRatio,
									//downsamplingRatio: 0.5,
									orientation: true //to flip 
								};
								loadImage(
									input.files[fi],
									function(img, data) {
										var args = this.args;
										var file = this.file;
										var dataparams = this.dataparams;
										var elem = document.createElement('canvas');
										var newwidth = img.width;
										var newheight = img.height;
										//if compress
										if(Global.isset(args)&&Global.isset(args['compressimage'])){
											newwidth = 800;
											newheight = newwidth * img.height / img.width;
											if(newwidth > img.width){
												newwidth = img.width;
												newheight = img.height;
											}
										}
										elem.width = newwidth;
										elem.height = newheight;
										var ctx = elem.getContext('2d');
										ctx.drawImage(img, 0, 0, newwidth, newheight);
										var compressedfileurl = ctx.canvas.toDataURL("image/jpeg", 0.92);
										if(Global.isset(args)&&Global.isset(args['onselect'])){
											args['onselect'](compressedfileurl, file, dataparams)
										}
									}.bind({args:args, file:input.files[fi], dataparams:dataparams}),
									options // Options
								);
							}
							else{
								reader[fi] = new FileReader();
								reader[fi].onload = function (e) {
									var args = this.args;
									var reader = this.reader;
									var file = this.file;
									var dataparams = this.dataparams;
									if(Global.isset(args)&&Global.isset(args['onselect'])){
										args['onselect'](reader.result, file, dataparams)
									}
								}.bind({args:args, file:input.files[fi], reader:reader[fi], dataparams:dataparams});
								reader[fi].readAsDataURL(input.files[fi]);
							
							}
						}
					}
				}
			}).data("args", args);
			
			/****** implementation ******/
			
		}
		return objarr;
    };
}( jQuery ));