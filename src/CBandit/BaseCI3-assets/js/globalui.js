/*
GlobalUI for base
*/
GlobalUI = {};
GlobalUI.yesnointerval = {};
GlobalUI.yesnointerval = function(){
	$(".x-yesnoswitch-hidden").each(function(){
		var inputobj = $(this);
		var checkboxobj = inputobj.parents(".x-switch-container").find(".x-checkbox");
		var val = inputobj.val();
		if(val=="Yes"){
			checkboxobj.prop("checked", true);
		}
		else if(val=="No"){
			checkboxobj.prop("checked", false);
		}
	});
	$(".x-selectradio-hidden").each(function(){
		var inputobj = $(this);
		var containerobj = inputobj.parents(".x-form-group");
		var objval = inputobj.val();
		containerobj.find(".x-radioselect-input").each(function(){
			var radioobj = $(this);
			var val = radioobj.val();
			if(val==objval){
				radioobj.prop("checked", true);
			}
		})
	});
	$(".x-radio-hidden").each(function(){
		var hiddenobj = $(this);
		var parentradobj = $(hiddenobj).parents(".x-radio-container");
		var val = hiddenobj.val();
		if(hiddenobj.attr("data-valbeforechange")!=val){
			hiddenobj.attr("data-valbeforechange", val);
			try{
				if(val=="Yes"){
					var isDisabled = parentradobj.find(".x-radio-yes input").attr('disabled');
					var isDisabledSet = parentradobj.find(".x-radio-yes input").attr('data-disabledset');
					if(isDisabled){
						if(!isDisabledSet){
							parentradobj.find(".x-radio-yes input").removeAttr("disabled");
							var obj = parentradobj.find(".x-radio-yes input");
							obj.prop("checked", true);
							parentradobj.find(".x-radio-hidden").val(obj.val());
							parentradobj.find(".x-radio-yes input").attr("disabled", true);
							parentradobj.find(".x-radio-yes input").attr('data-disabledset', true);
						}					
					}
					else{
						var obj = parentradobj.find(".x-radio-yes input");
						obj.prop("checked", true);
						parentradobj.find(".x-radio-hidden").val(obj.val());
						Global.log("isDisabledSet")
					}
				}
				else if(val=="No"){
					var isDisabled = parentradobj.find(".x-radio-no input").attr('disabled');
					var isDisabledSet = parentradobj.find(".x-radio-no input").attr('data-disabledset');
					if(isDisabled){
						if(!isDisabledSet){
							parentradobj.find(".x-radio-no input").removeAttr("disabled");
							var obj = parentradobj.find(".x-radio-no input");
							obj.prop("checked", true);
							parentradobj.find(".x-radio-hidden").val(obj.val());
							parentradobj.find(".x-radio-no input").attr("disabled", true);
							parentradobj.find(".x-radio-no input").attr('data-disabledset', true);
						}
					}
					else{
						var obj = parentradobj.find(".x-radio-no input");
						obj.prop("checked", true);
						parentradobj.find(".x-radio-hidden").val(obj.val());
					}
				}
			}
			catch(e){
			}
			if(parentradobj.hasClass("hide") && !parentradobj.attr("data-unhidden") ){
				parentradobj.attr("data-unhidden", true)
				setTimeout(function(){
					var parentradobj = this.parentradobj;
					parentradobj.removeClass("hide");
					
				}.bind({parentradobj:parentradobj}), 500);
			}
		}
	});
	setTimeout(function(){
		GlobalUI.yesnointerval();
	}, 500);
}
setTimeout(function(){
	GlobalUI.yesnointerval();
}, 500);	

/******************
used in GlobalUI.yesNoFormInit
******************/
GlobalUI.yesNoInit = function(obj, callback){
	var parentradobj = obj.parents(".x-radio-container");
	var hiddenobj = parentradobj.find(".x-radio-hidden");
	var radid = "radio"+md5(obj[0].outerHTML+Math.random());
	parentradobj.find(".x-radio-yes input").attr("name", radid+"name");
	var yesid = "radio"+md5(obj[0].outerHTML+Math.random());
	parentradobj.find(".x-radio-yes input").attr("id", yesid+"yes");
	parentradobj.find(".x-radio-yes label").attr("for", yesid+"yes");
	
	parentradobj.find(".x-radio-no input").attr("name", radid+"name");
	
	var noid = "radio"+md5(obj[0].outerHTML+Math.random());
	parentradobj.find(".x-radio-no input").attr("id", noid+"no");
	parentradobj.find(".x-radio-no label").attr("for", noid+"no");
	parentradobj.find(".x-radio-hidden").addClass("x-"+radid);
	parentradobj.find(".x-radio-hidden").attr("data-id", radid);
	parentradobj.find(".x-radio-input").off("click").click(function(e){
		var obj = $(this);
		obj.attr("checked", "checked");
		var parentradobj = obj.parents(".x-radio-container");
		var hiddenobj = parentradobj.find(".x-radio-hidden");
		hiddenobj.val(obj.val());
		if(!hiddenobj.attr("data-valbeforechange")){
			hiddenobj.attr("data-valbeforechange", hiddenobj.attr("data-initvalue"))
		}
		//to avoid change event being triggered even if val didnt change
		if(hiddenobj.attr("data-valbeforechange")!=obj.val()){
			//used for on "change" event
			hiddenobj.trigger("change");
			hiddenobj.trigger("x-form-change");
			hiddenobj.attr("data-valbeforechange", obj.val());
		}
	});	
	//unhide
	parentradobj.removeClass("hide");
	//100ms delay
	setTimeout(function(){
		var obj = this.obj;
		obj.trigger("x-form-init");
		//if object is disabled
		if(obj.attr("disabled")){
			GlobalUI.disableForm(obj);
		}
	}.bind({obj:obj}), 100);
	callback();
}

/******************
used in GlobalUI.select2FormInit
******************/
GlobalUI.populateSelect2 = function(elem, callback){
	var select2obj = elem;
	var initval = elem.attr("data-initvalue");
	if(initval!=""&&typeof initval != null){
		var val = elem.attr("data-initvalue");
		var options = [];
		if(elem.attr("data-type")=="multiple" || elem.attr("multiple")=="multiple"){
			options = Global.parse(val);
		}
		else{
			if(elem.attr("data-noval")){
			}
			else{
				options.push(val);
			}
		}
		//if select element has no options
		if(elem.find("option").length==0){
			for(x in options){
				var option = $("<option></option>");
				option.val(options[x]);
				option.html(options[x]);
				elem.append(option);
			}
		}
		if(elem.attr("data-type")=="multiple" || elem.attr("multiple")=="multiple"){
			try{
				elem.val(options);
			}
			catch(e){
			}
		}
		else{
			elem.val(val);
		}
	}
	var select2tags = (elem.attr("data-tags"))? true : false ;
	var uniqueId = "custom_select2_unique_"+Global.unique(); //for unique id bug
	elem.attr("data-select2-id", uniqueId);
	if(Global.isset(select2obj.data("select2"))){ //if select2 was already initialized
		try{ select2obj.select2("destroy"); } catch(e){}
	}
	select2obj.select2({
		tags: select2tags,
		dropdownParent: select2obj.parent() //for modal display issue
	});
	select2obj.find("option").each(function(key, value){
		var optionobj = $(this);
		var uniqueId = "custom_select2_option_unique_"+Global.unique(); //for unique id bug
		optionobj.attr("data-select2-id", uniqueId);
	})
	//console.log("select2obj.attr('data-name')", select2obj.attr('data-name'), select2obj.attr('data-select2-id'));
	if(Global.isset(select2obj.attr('data-select2-id'))){
		select2obj.on("change", function(e, initialize){
			var obj = $(this);
			obj.trigger("x-form-change");
		});
		select2obj.removeClass("hide");
		//for parsley validation position swap
		var span = select2obj.next();
		span.insertBefore(select2obj);
		var loaderdiv = select2obj.parent().find(".x-selectionloading");
		loaderdiv.remove();
		callback(select2obj);
	}
	/* elem.interval = setInterval(function(){
		var callback = this.callback;
		var select2obj = this.elem;
		try{ select2obj.select2("destroy"); } catch(e){}
		select2obj.select2({
			tags: select2tags,
			dropdownParent: this.elem.parent() //for modal display issue
		});
		//console.log("select2obj.attr('data-name')", select2obj.attr('data-name'), select2obj.attr('data-select2-id'));
		if(Global.isset(select2obj.attr('data-select2-id'))){
			clearInterval(select2obj.interval);
			select2obj.on("change", function(e, initialize){
				var obj = $(this);
				obj.trigger("x-form-change");
			});
			select2obj.removeClass("hide");
			//for parsley validation position swap
			var span = select2obj.next();
			span.insertBefore(select2obj);
			var loaderdiv = select2obj.parent().find(".x-selectionloading");
			loaderdiv.remove();
			callback(select2obj);
		}
	}.bind({elem:elem,callback:callback}), 500); */
	/* //if you want to trigger change event 
	if(Global.isset(elem.attr("data-initchange")) && Global.isset(elem.attr("data-initvalue")) && Global.isset(val)){
		elem.val(val).change();
	} */
}

/******************
used in GlobalUI.select2FormInit
******************/
GlobalUI.select2init = function(parentObj, elem, initcallback){
	if(!Global.isset(initcallback)){
		initcallback  = function(){};
	}
	if(!Global.isset(parentObj.ajaxCache)){
		parentObj.ajaxCache = {};
	}
	if(!Global.isset(parentObj.callbackQueues)){
		parentObj.callbackQueues = {};
	}
	var callback = function(elem, error){
		var elem = this.elem;
		var initcallback = this.initcallback;
		if(!Global.isset(error)){
			//100ms delay
			setTimeout(function(){
				var obj = this.elem;
				var name = obj.attr("data-name");
				var data = GlobalUI.getSelect2Data(obj, true);
				var json = Global.stringify(data);
				obj.attr("data-raw", json);
				obj.trigger("x-form-init");
			}.bind({elem:elem}), 100);
		}
		initcallback(elem);
	}.bind({initcallback:initcallback, elem:elem});
	
	var url = "";
	var data = {};
	if(Global.isset(elem.attr("data-filter"))){
		data.filter = Global.safeParse(elem.attr("data-filter"));
	}
	if(Global.isset(elem.attr("data-endpoint"))){
		url = elem.attr("data-endpoint");
	}
	else if(Global.isset(elem.attr("data-slug"))){
		data.slug = elem.attr("data-slug");
		data.type = elem.attr("data-type");
		url = CONFIG.base_url+"/api/select2data";
	}
	else if(Global.isset(elem.attr("data-table"))){
		data.table = elem.attr("data-table");
		data.type = elem.attr("data-type");
		url = CONFIG.base_url+"/api/select2data";
	}

	if(Global.isset(url)){

		var urlcache = url+Global.stringify(data);
		if(Global.isset(elem.attr("data-searchtype"))){
			var initselect2 = function(){
				var elem = this.elem;
				var select2obj = elem;
				var url = this.url;
				if(Global.isset(select2obj.data("select2"))){ //if select2 was already initialized
					try{ select2obj.select2("destroy"); } catch(e){}
				}
				elem.select2({
					ajax: {
						url: url,
						dataType: 'json',
						delay: 250,
						data: function (params) {
							var query = {
								search: params.term,
								page: params.page || 1
							}
							//Query parameters will be ?search=[term]&page=[page]
							return query;
						},
						success: function(){}
					}
				});
				this.callback();
			}.bind({elem:elem, url:url, callback:callback});
			
			var initvalue = elem.attr("data-initvalue");
			if(initvalue){
				var optionobj = $('<option></option>');
				optionobj.val(initvalue);
				optionobj.attr("selected", true);
				optionobj.html("Loading...");
				elem.append(optionobj);
				
				$.ajax({
					method: "GET",
					data:{'initvalue':initvalue},
					url: url,
					timeout: 30000,
					success: function(result){
						var elem = this.elem;
						var optionobj = this.optionobj;
						var label = result['results'][0]['text'];
						if(Global.isset(label)){
							optionobj.html(label);
							//initialize select2
							this.initselect2();
						}
						else{
							label = elem.val();
							optionobj.html(label);
							//initialize select2
							this.initselect2();
						}
					}.bind({elem:elem,optionobj:optionobj,initselect2:initselect2}),
					error: function(jqXHR, textStatus){
						
					},
				});
			}
			else{
				initselect2();
			}
		}
		else{
			//success function
			var successFunc = function(elem, result){
				elem.html("");
				var name = elem.attr("name");
				if(!Global.isset(elem.attr("data-removeblank"))){
					var option = $("<option></option>");
					option.val("");
					option.html("-");
					if(elem.attr("data-type")=="multiple" || elem.prop("multiple")){
						option.attr("readonly", true);
						option.attr("disabled", true);
					}
					elem.append(option);
				}
				if(Global.isset(result)&&Global.isset(result['data'])){
					var data = result['data'];
					if(typeof result['groups'] != "undefined"){
						var groups = result['groups'];
						groups.forEach(function(value, key){
							var optiongroup = $("<optgroup></optgroup>");
							optiongroup.attr("label", value);
							optiongroup.addClass("optgroup_"+md5(value));
							elem.append(optiongroup);
						});
					}
					Global.asyncEach(data, function(key, item){
						var elem = this.elem;
						var callback = this.callback;
						var parentObj = this.parentObj;
						var option = $("<option></option>");
						option.val(item.value);
						option.html(item.label);
						option.attr('data-raw', Global.stringify(item))
						option.attr('data-md5value', md5(item.value))
						if(!Global.isset(elem.find("[data-md5value='"+md5(item.value)+"']")?.[0])){ //if option doesnt exists yet
							if(Global.isset(item?.group)){
								elem.find(".optgroup_"+md5(item.group)).append(option);
							}
							else{
								elem.append(option);
							}
						}
						
					}.bind({elem:elem, callback:callback, parentObj:parentObj}),
					5, 5, function(){
						var elem = this.elem;
						var callback = this.callback;
						var parentObj = this.parentObj;
						GlobalUI.populateSelect2(this.elem, this.callback);
					}.bind({elem:elem, callback:callback, parentObj:parentObj}));
					/* data.forEach(async function(item, x){
						await setTimeout( function(){ 
							var elem = this.elem;
							var callback = this.callback;
							var parentObj = this.parentObj;
							var option = $("<option></option>");
							option.val(data[x].value);
							option.html(data[x].label);
							option.attr('data-raw', Global.stringify(data[x]))
							option.attr('data-md5value', md5(data[x].value))
							if(Global.isset(data[x].group)){
								elem.find(".optgroup_"+md5(data[x].group)).append(option);
							}
							else{
								elem.append(option);
							}
							if(x+1==data.length){
								GlobalUI.populateSelect2(this.elem, this.callback);
							}
						}.bind({elem:elem, callback:callback, parentObj:parentObj}), 1);
					}) */
				}
				else{
					GlobalUI.populateSelect2(elem, callback);
				}
			}
			//loading...
			elem.parent().find(".x-selectionloading").remove();
			elem.html("");
			elem.addClass("hide");
			elem.parent().find(".select2-container").remove();
			var loaderdiv = $("<div>Loading Selection...</div>").addClass("x-selectionloading").addClass("form-control").addClass("selectionloading");//.css({"padding":"10px", "border":"2px solid #cccccc", "margin":"5px"});
			loaderdiv.insertBefore(elem);
			if(Global.isset(parentObj.ajaxCache["cache_"+md5(urlcache)])){
				if(parentObj.ajaxCache["cache_"+md5(urlcache)] == "fetching..."){
					//queue it
					if(!Global.isset(parentObj.callbackQueues["cache_"+md5(urlcache)])){
						parentObj.callbackQueues["cache_"+md5(urlcache)] = [];
					}
					parentObj.callbackQueues["cache_"+md5(urlcache)].push(
						function(){
							successFunc(this.elem, parentObj.ajaxCache["cache_"+md5(this.urlcache)]);
						}.bind({elem:elem, urlcache:urlcache})
					);
				}
				else{
					//run it with the saved result set
					successFunc(elem, parentObj.ajaxCache["cache_"+md5(urlcache)]);
				}
			}
			else{
				parentObj.ajaxCache["cache_"+md5(urlcache)] = "fetching...";
				$.ajax({
					method: "GET",
					data:data,
					url: url,
					timeout: 30000,
					success: function(result){
						parentObj.ajaxCache["cache_"+md5(urlcache)] = result;
						successFunc(this.elem, result);
						for(x in parentObj.callbackQueues["cache_"+md5(urlcache)]){
							//alert(1);
							parentObj.callbackQueues["cache_"+md5(urlcache)][x]();
						}
					}.bind({elem:elem}),
					error: function(jqXHR, textStatus){
						Global.hideLoading();
						var elem = this.elem;
						var parentObj = this.parentObj;
						//Global.error("Selection fetch error! <br /><br />"+this.elem.attr("data-endpoint")+' <br /><br /> Error: '+textStatus);
						elem.parent().find(".x-selectionloading").text("Selection fetch error! Error: "+textStatus);
						elem.trigger("x-form-error");
						callback(elem, true);
					}.bind({elem:elem, parentObj:parentObj}),
				});
			}
		}
	}
	else{
		//loading...
		elem.parent().find(".x-selectionloading").remove();
		elem.addClass("hide");
		elem.parent().find(".select2-container").remove();
		var loaderdiv = $("<div>Loading Selection...</div>").addClass("x-selectionloading").addClass("form-control").addClass("selectionloading");//.css({"padding":"10px", "border":"2px solid #cccccc", "margin":"5px"});
		loaderdiv.insertBefore(elem);
		elem.find("option").each(function(){
			var obj = $(this);
			obj.attr('data-md5value', md5(obj.attr("value")))
			var data = {};
			data['label'] = obj.text();
			data['value'] = obj.attr("value");
			obj.attr('data-raw', Global.stringify(data));
		})
		GlobalUI.populateSelect2(elem, callback);
	}
};
/******************
get select2 data
******************/
GlobalUI.getSelect2Data = function(select2obj, initialize){
	var value = select2obj.val();
	if(Global.isset(initialize)){
		value = select2obj.attr("data-initvalue");
	}
	if(value){
		var items = Global.parse(value);
		if(Array.isArray(items)){ //for select2multi values
			var data = [];
			for(var x in items){
				var item = items[x];
				var md5value = md5(item);
				var rawjson = select2obj.find("[data-md5value='"+md5value+"']").attr("data-raw");
				var row = Global.parse(rawjson);
				data.push(row);
			}
		}
		else{
			var name = select2obj.attr("data-name");
			var md5value = md5(value);
			var rawjson = select2obj.find("[data-md5value='"+md5value+"']").attr("data-raw");
			var data = Global.parse(rawjson);
		}
	}
	else{
		var data = {};
	}
	return data;
}

/******************
used in GlobalUI.formTypesInit
******************/
GlobalUI.fileUploadEvents = function(parentElem, callback){

	if(!callback){
		callback = function(){};
	}
	
	/*events*/
	
	//clear button for file uploads
	parentElem.find(".x-btn-clear-file").off("click").click(function(e, initialize){
		var obj = $(this);
		var formgroup = obj.parents(".x-form-group");
		var column = obj.attr("data-column");
		//file upload
		var container = obj.parents(".fileupload-container");
		if(!Global.isset(container[0])){
			//image file upload
			var container = obj.parents(".x-imagefileupload-container");
		}
		container.find("."+column+"_hidden").val("-no file-");
		container.find("."+column+"_input").val("");
		container.find("."+column).val("");
		container.find("."+column).html("");
		if(!initialize){
			if(formgroup.find(".input-group").length>1){
				container.remove();
			}
		}
	});
	
	//take pic
	parentElem.find(".x-btn-takepic").off("click").on("click", function(){
		var obj = $(this);
		var photopreviewimgobj = obj.find(".x-fileuploadimgurl img");
		if(photopreviewimgobj.length){
			photopreviewimgobj.parents("a").trigger("click");
		}
		var column = obj.attr("data-column");
		var container = obj.parents(".x-imagefileupload-container");
		container.find("input").trigger("click");
		return false;
	});
	
	//clear pic
	parentElem.find(".x-btn-clearpic").off("click").on("click", function(){
		var elem = $(this);
		var column = elem.attr("data-column");
		//file upload
		var container = elem.parents(".fileupload-container");
		if(!Global.isset(container[0])){
			//image file upload
			var container = elem.parents(".x-imagefileupload-container");
		}
		container.find("."+column+"_hidden").val("-no file-");
		container.find("."+column+"_input").val("");
		container.find("."+column).val("");
		container.find("."+column).html("");
		container.find(".x-btn-clearpic").addClass("hide");
		container.parents(".x-form-group").find(".x-viewphoto").addClass("hide");
		return false;
	});
	
	//add more
	parentElem.find(".addmore").off("click").on("click", function(){
		var elem = $(this);
		var parentElem = elem.parents(".fileuploadmulti-container");
		var template = parentElem.find(".fileupload-container-template");
		var clone = template.clone();
		clone.removeClass("hide");
		clone.removeClass("fileupload-container-template");
		clone.addClass("x-fileupload-container");
		clone.addClass("fileupload-container");
		clone.find("input").prop( "disabled", false );
		elem.parents(".addmore-container").before(clone);
		GlobalUI.fileUploadEvents(clone);
		clone.find(".x-btn-clear-file").trigger("click", [true]);
		return false;
	});
	
	/* implem */
	
	//file uploader
	parentElem.find(".fileupload").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-fileupload");
		obj.fileuploader({
			"onuploadprogress" : function(bytesuploaded, bytestotal){
			},
			"onselect" : function(src, file){
				var mime = file.type.toLowerCase();
			},
			"autoupload": true,
			"done": function(ret, obj){
				var args = {};
				args['filepath'] = ret['filetarget'];
				args['filename'] = ret['filename'];
				if(Global.isset(ret)&&Global.isset(ret['filetarget'])){
					// ret['column']
					// ret['filename']
					// ret['fileurl']
					// ret['filetarget']
					var html = '<a target="_blank" href="'+ret['fileurl']+'"><i class="fa fa-file"></i> '+ret['filename']+'</a>'
					//parentElem.find('.'+ret['column']+"_hidden").val(ret['filetarget']);
					//parentElem.find('.'+ret['column']).html(html);
					var container = obj.parents(".fileupload-container");
					container.find('.x-hidden-input').val(ret['filetarget'])
					//container.find('.x-form').attr("data-value",ret['filetarget'])
					container.find('.x-form').html(html);
					container.find(".x-form").trigger("x-form-onupload", ret);
				}		
			}
		});
	})
		
	
	
	//for image upload populate
	parentElem.find(".x-imagefileupload").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-imagefileupload");
		var container = obj.parents(".x-imagefileupload-container");
		var div = container.find(".x-fileuploadimgurl");
		var val = div.attr("data-initvalue");
		if(!Global.isset(val)){
			val = container.find(".x-hidden-input").attr("data-initvalue");
		}
		
		//imagefile uploader
		obj.fileuploader({
			"oninit": function(obj){
			},
			"onuploadprogress" : function(bytesuploaded, bytestotal){
			},
			"onselect" : function(src, file){
				var mime = file.type.toLowerCase();
			},
			"autoupload": true,
			"done": function(ret, obj){
				var args = {};
				args['filepath'] = ret['filetarget'];
				args['filename'] = ret['filename'];
				if(Global.isset(ret)&&Global.isset(ret['filetarget'])){
					// ret['column']
					// ret['filename']
					// ret['fileurl']
					// ret['filetarget']
					var html = '<a target="_blank" href="'+ret['fileurl']+'"><img src="'+ret['fileurl']+'" /></a>'
					var container = obj.parents(".x-imagefileupload-container");
					container.find(".x-btn-clearpic").removeClass("hide");
					container.find('.x-hidden-input').val(ret['filetarget'])
					//container.find('.x-form').attr("data-value",ret['filetarget'])
					container.find('.x-fileuploadimgurl').html(html);
					container.find(".x-form").trigger("x-form-onupload", [ret]);
					//x-viewphoto is outside container
					div.parents(".x-form-group").find(".x-viewphoto").removeClass("hide");
					div.parents(".x-form-group").find(".x-viewphoto").attr("href", ret['fileurl']);
				}		
			}
		});
		
		if(Global.isset(val)){
			var pieces = val.split("file?p=");
			var path = Base64.decode(pieces[pieces.length-1]);
			//to indicate that there is already an uploaded image so it wont trigger error
			//see the model's function moveUploaded
			container.find(".x-hidden-input").val("[uploadsdir]/"+path);
			//container.find('.x-form').attr("data-value","[uploadsdir]/"+path)
			var base = path.split(/\//g);
			base = base[base.length-1];
			base = base.split('_').slice(1).join('_');
			var html = $("<a></a>");
			var img = $("<img />");
			html.append(img);
			img.attr("src", val)
			img.attr("alt", base);
			img.attr("title", base);
			html.attr("href", val);
			html.attr("target", "_blank");
			div.html(html);
			container.find(".x-btn-clearpic").removeClass("hide");
			//x-viewphoto is outside container
			div.parents(".x-form-group").find(".x-viewphoto").removeClass("hide");
			div.parents(".x-form-group").find(".x-viewphoto").attr("href", val);
		}
	});


	//image
	parentElem.find("[data-formtype='image']").each(function(){
		var formObj = $(this);
		var formGroupElem = formObj.parents(".x-form-group");
		
		/********** events **********/
		
		formGroupElem.find(".x-btn-takepic").off("click").on("click", function(e, initialize){
			var obj = $(this);
			var formGroupElem = obj.parents(".x-form-group");
			if(!Global.isset(obj.attr("data-hasimage"))){
				formGroupElem.find(".x-image-uploader").trigger("click");
			}
		});
		
		formGroupElem.find(".x-btn-clearpic").off("click").on("click", function(e, initialize){
			var obj = $(this);
			var formGroupElem = obj.parents(".x-form-group");
			formGroupElem.find(".x-btn-clearpic").addClass("hide")
			formGroupElem.find('.x-fileuploadimgurl').html("");
			setTimeout(function(){
				var formGroupElem = this.formGroupElem;
				formGroupElem.find(".x-btn-takepic").removeAttr("data-hasimage");
				//clear textarea 
				var formObj = formGroupElem.find("[data-formtype='image']");
				var basedatajson = GlobalUI.baseDataJSON({
					formtype: "fileupload",
					action: "clear",
					value: ""
				});
				formObj.val(basedatajson);
			}.bind({formGroupElem:formGroupElem}), 100);
			return false;
		});
		
		//imagefile uploader
		formGroupElem.find(".x-image-uploader").fileuploader({
			"oninit": function(obj){
			},
			"onuploadprogress" : function(bytesuploaded, bytestotal){
			},
			"onselect" : function(src, file){
				var mime = file.type.toLowerCase();
			},
			"autoupload": true,
			"done": function(ret, obj){
				if(Global.isset(ret)&&Global.isset(ret['filetarget'])){
					var formGroupElem = obj.parents(".x-form-group");
					var formObj = formGroupElem.find("[data-formtype='image']");
					var basedatajson = GlobalUI.baseDataJSON({
						formtype: "fileupload",
						action: "upload",
						value: ret['filetarget']
					});
					var basedata = Global.parse(basedatajson);
					formObj.val(basedatajson);
					var url = ret['fileurl'];
					var html = '<a target="_blank" href="'+url+'"><img src="'+url+'" /></a>'
					formGroupElem.find(".x-btn-clearpic").removeClass("hide");
					formGroupElem.find('.x-fileuploadimgurl').html(html);
					formGroupElem.find(".x-btn-takepic").attr("data-hasimage", true);
				}		
			}
		});
		
		/****** implementation ******/
		
		var json = formObj.attr("data-initvalue");
		if(Global.isset(json)){
			var basedata = Global.parse(json);
			var url = "/file?p="+Base64.encode(basedata['value']);
			var html = '<a target="_blank" href="'+url+'"><img src="'+url+'" /></a>'
			formGroupElem.find(".x-btn-clearpic").removeClass("hide");
			formGroupElem.find('.x-fileuploadimgurl').html(html);
			formGroupElem.find(".x-btn-takepic").attr("data-hasimage", true);
		}
		
		//100ms delay
		setTimeout(function(){
			var formObj = this.formObj;
			formObj.trigger("x-form-init");
		}.bind({formObj:formObj}), 100);
		callback(formObj);
	})	
	
	
	//for image upload populate
	parentElem.find(".x-imagefileupload, .fileupload").each(function(){
		var obj = $(this);
		//100ms delay
		setTimeout(function(){
			this.obj.trigger("x-form-init");
		}.bind({obj:obj}), 100);
		callback(obj);
	});
};

/******************
usage 

var containerobj = $(".x-forms-container");

GlobalUI.fillData(containerobj, filldata, function(key, val, obj){
	//example execution upon callback
	if(key=="id"){
		//do something
	}
});

******************/
GlobalUI.fillData = function(elem, filldata, callback){
	if(!callback){
		callback = function(){};
	}
	try{
		//clear fileuploadurlmultiple
		//elem.find(".x-fileupload-container").remove();
		for(key in filldata){
			var val = filldata[key];
			if(key){
				//if file type (deprecated)
				if(elem.find(".x-form-" + key).hasClass("fileuploadurl")){
					if(Global.isset(val)){
						elem.find(".x-form-" + key).each(function(){
							var obj = $(this);
							var objContainer = obj.parents(".fileupload-container");
							var pieces = val.split("file?p=");
							var path = Base64.decode(pieces[pieces.length-1]);
							//to indicate that there is already an uploaded file so it wont trigger error
							//see the model's function moveUploaded
							objContainer.find("." + key+"_hidden").val("[uploadsdir]/"+path);
							var base = path.split(/\//g);
							base = base[base.length-1];
							base = base.split('_').slice(1).join('_');
							var html = $("<a></a>");
							html.html(" <i class='fa fa-file'></i> "+base);
							html.attr("href", val);
							html.attr("target", "_blank");
							obj.html(html);
						})
						
					}
				}
				//if file multiple
				else if(elem.find(".x-form-" + key).hasClass("fileuploadurlmultiple")){
					elem.find(".x-form-" + key).attr("data-json", val);
					elem.find(".x-form-" + key).each(function(){
						var obj = $(this);
						var json = obj.attr("data-json");
						try{
							var arrval = Global.parse(json);
							
							if(arrval.length >=1){
								arrval.reverse();
								var containertemplate = obj.parents(".fileupload-container-template");
								containertemplate.find("." + key).html("");
								containertemplate.find("input").prop( "disabled", true );
								containertemplate.addClass("hide");
								for(x in arrval){
									var container = containertemplate.clone();
									container.removeClass("fileupload-container-template");
									container.addClass("x-fileupload-container");
									container.addClass("fileupload-container");
									container.removeClass("hide");
									container.addClass("clone");
									container.find("input").prop( "disabled", false );
									container.find("." + key).html("");
									var val = arrval[x];
									if(Global.isset(val)){
										var pieces = val.split("file?p=");
										var path = Base64.decode(pieces[pieces.length-1]);
										
										//to indicate that there is already an uploaded file so it wont trigger error
										//see the model's function moveUploaded
										container.find("." + key+"_hidden").val("[uploadsdir]/"+path);
										var base = path.split(/\//g);
										base = base[base.length-1];
										base = base.split('_').slice(1).join('_');
										
										var aobj = $("<a></a>");
										aobj.html(" <i class='fa fa-file'></i> "+base);
										aobj.attr("href", val);
										aobj.attr("target", "_blank");
										container.find("." + key).html(aobj);
										
									}
									containertemplate.after(container);
								}
							}
						}
						catch(e){
							
						}
					})
					
				}
				//if image file type
				else if(elem.find(".x-form-" + key).hasClass("x-fileuploadimgurl")){
					if(Global.isset(val)){
						elem.find(".x-form-" + key).each(function(){
							var obj = $(this);
							var objContainer = obj.parents(".x-imagefileupload-container");
							var pieces = val.split("file?p=");
							var path = Base64.decode(pieces[pieces.length-1]);
							//to indicate that there is already an uploaded image so it wont trigger error
							//see the model's function moveUploaded
							objContainer.find("." + key+"_hidden").val("[uploadsdir]/"+path);
							var base = path.split(/\//g);
							base = base[base.length-1];
							base = base.split('_').slice(1).join('_');
							var html = $("<a></a>");
							var img = $("<img />");
							html.append(img);
							img.attr("src", val)
							img.attr("alt", base);
							img.attr("title", base);
							html.attr("href", val);
							html.attr("target", "_blank");
							obj.html(html);
							obj.parents(".x-imagefileupload-container").find(".x-btn-clearpic").removeClass("hide");
							obj.parents(".x-form-group").find(".x-viewphoto").attr("href", val);
						});
					
					}
				}
				//if passwordtype
				else if(elem.find(".x-form-" + key).attr("data-formtype")=="password"){
					elem.find(".x-form-" + key).val("");
					elem.find(".x-form-" + key).removeAttr("required");
					elem.find(".x-form-" + key).attr("data-initvalue", "");
				}
				//if passwordtype
				else if(elem.find(".x-form-" + key).hasClass("passwordtype")){
					elem.find(".x-form-" + key).val("");
					elem.find(".x-form-" + key).removeAttr("required");
					elem.find(".x-form-" + key).attr("data-initvalue", "");
				}
				else{
					elem.find(".x-form-" + key).val(val);
					elem.find(".x-form-" + key).attr("data-initvalue", val);
				}
				
				elem.find(".x-form-" + key).each(function(){
					var obj = $(this);
					callback(key, val, obj);
				})
				
			}
		};
	}
	catch(e){
		Global.error(e.message);
	}
}

/******************
usage 

var obj = $(".x-form-sample");

GlobalUI.disableForms(obj);

******************/
GlobalUI.disableForm = function(obj, fromlabel){
	obj.attr("readonly", true);
	obj.find("*").attr("readonly", true);
	obj.attr("disabled", true);
	obj.find("*").attr("disabled", true);
	obj.removeAttr("name");
	if(obj.hasClass("x-yesno")){
		//obj.parents(".x-radio-container").find(".x-radio-input-container").remove();
		//obj.parents(".x-radio-container").find("*").attr("disabled", true);
		var val = obj.val();
		obj.parents(".x-radio-container").css("display","none");
		if(obj.parents(".x-form-group").find(".x-tempdiv").length==0){
			var tempdiv = $("<div></div>");
			tempdiv.html(val);
			tempdiv.addClass("x-tempdiv");
			obj.parents(".x-form-group").append(tempdiv);
		}
	}
	else if(obj.hasClass("x-wysywygbasic")){
		var val = obj.val();
		obj.parents(".x-wysywygbasic-container").addClass("form-control");
		obj.parents(".x-wysywygbasic-container").css("min-height", "300px");
		obj.parents(".x-wysywygbasic-container").css("overflow", "scroll");
		obj.parents(".x-wysywygbasic-container").html(val);
	}
	else if(obj.hasClass("x-wysywyg")){
		var val = obj.val();
		obj.parents(".x-wysywyg-container").addClass("form-control");
		obj.parents(".x-wysywyg-container").css("min-height", "300px");
		obj.parents(".x-wysywyg-container").css("overflow", "scroll");
		obj.parents(".x-wysywyg-container").html(val);
	}
	else if(obj.hasClass("x-select2draggable")){
		var inputname = obj.attr("name");
		var initvalue = obj.attr("data-initvalue");
		var datatype = obj.attr("data-type");
		var containerobj = obj.parents(".x-select2draggable-container");
		containerobj.find(".x-select2draggable-select2-container").addClass("hide");
		containerobj.find(".x-list-container").css("margin-top", "0px");
		containerobj.find(".x-tb-action").addClass("hide");
	}
	else if(obj.hasClass("x-select2-processed")){
		var inputname = obj.attr("name");
		var initvalue = obj.attr("data-initvalue");
		var datatype = obj.attr("data-type");
		if(datatype=="multiple"){}
		else{
			obj.parent().find("span.select2-selection__arrow").remove(); //remove arrow
		}
		obj.parent().find(".select2").off("keydown").on("keydown", function(e, initialize){
			var obj = $(this);
			obj.parent().find(".select2-dropdown--below").remove();
			return false;
		});
	}
	else if(obj.attr("data-formtype")=="fileuploadmulti"){
		obj.parents(".x-form-group").find("*").css("cursor", "pointer");
		obj.parents(".x-form-group").find(".x-fileupload-clearfile").remove();
		obj.parents(".x-form-group").find(".x-fileupload-clicktoupload").removeAttr("disabled");
		obj.parents(".x-form-group").find(".x-fileupload-clicktoupload").attr("placeholder", "No File");
		obj.parents(".x-form-group").find(".x-btn-add-container").addClass("hide");
	}
	else if(obj.attr("data-formtype")=="fileupload"){
		obj.parents(".x-form-group").find("*").css("cursor", "pointer");
		obj.parents(".x-form-group").find(".x-fileupload-clearfile").remove();
		obj.parents(".x-form-group").find(".x-fileupload-clicktoupload").removeAttr("disabled");
		obj.parents(".x-form-group").find(".x-fileupload-clicktoupload").attr("placeholder", "No File");
	}
	else if(obj.parents(".fileuploadmulti-container").html()){
		var parentobj = obj.parents(".fileuploadmulti-container");
		parentobj.find(".addmore-container").addClass("hide");
		parentobj.find(".input-group").addClass("hide");
		parentobj.find("*").attr("disabled", true);
	}
	else if(obj.parents(".fileupload-container").html()){
		var parentobj = obj.parents(".fileupload-container");
		parentobj.find(".addmore-container").addClass("hide");
		parentobj.find(".input-group").addClass("hide");
		parentobj.find("*").attr("disabled", true);
	}
	else if(obj.attr("type")=="checkbox"){
		obj.click(function(){
			return false;
		})
	}
}

/******************
usage 

var containerobj = $(".x-forms-container");

GlobalUI.disableForms(containerobj);

******************/
GlobalUI.disableForms = function(parentElem){
	var elem = parentElem;
	//set everything to readonly
	elem.find(".x-form-group *").attr("readonly", true);
	//disabled forms
	elem.find(".x-form-group *").attr("disabled", true);
	
	var items = [];
	elem.find(".x-form").each(function(){
		var obj = $(this);
		items.push(obj);
	})
	Global.asyncEach(items, function(key, item){
		var obj = item;
		GlobalUI.disableForm(obj);
	},
	10, 10, function(){
		
	});
}

/******************
usage 

var containerobj = $(".x-forms-container");

var serializeddata = GlobalUI.getFormData(containerobj);

******************/
GlobalUI.getFormData = function(elem){
	//set name using data-name before serialize
	var names = [];
	elem.find(".x-form").each(function(){
		var obj = $(this);
		var name = obj.attr("data-name");
		var formtype = obj.attr("data-formtype");
		if(obj.hasClass("x-wysywygbasic")){
			var container = obj.parents(".x-wysywygbasic-container");
			var codeobj = container.find(".codeview .note-codable"); 
			if(Global.isset(codeobj[0])){
				obj.val(codeobj.val()); //get data in code view
			}
		}
		else if(obj.hasClass("x-wysywyg")){
			var container = obj.parents(".x-wysywyg-container");
			var codeobj = container.find(".codeview .note-codable"); 
			if(Global.isset(codeobj[0])){
				obj.val(codeobj.val()); //get data in code view
			}
		}
		if(formtype=="fileupload"){
			obj.parents(".x-form-group").find(".x-fileupload-clicktoupload").removeAttr("required");
			if(Global.isset(obj.attr("required"))){
				obj.parents(".x-form-group").find(".x-fileupload-clicktoupload").attr("required", true);
			}
			var fileinfojson = obj.data("fileinfo");
			var fileinfo = Global.parse(fileinfojson);
			var basedata = Global.parse(obj.val());
			if(!Global.isset(basedata?.['basedata'])){ //if no structure
				var basedata = {};
				basedata['basedata'] = "Yes";
				basedata['formtype'] = "fileupload";
				if(Global.isset(fileinfo?.["filetarget"])){ //if has new file uploaded
					basedata['action'] = "upload";
					basedata['value'] = fileinfo?.["filetarget"];
				}
				else{
					basedata['action'] = "do nothing";
					basedata['value'] = obj.val();
				}
				var json = Global.stringify(basedata);
				obj.val(json)
			}
					
		}
		if(!Global.isset(obj.attr("name")&&Global.isset(name))){
			obj.attr("name", name);
			if(obj.hasClass("x-select2")){
				if(Global.isset(obj.attr("data-type"))&&obj.attr("data-type").toLowerCase()=="multiple"){
					obj.attr("name", name+"[]"); //array name
				}
			}
			names.push(name)
		}
	});
	//disable radio from yesno form to exclude from serialization
	elem.find(".x-radio-input").attr("disabled", true);
	var formdata = elem.serialize();
	//enable radio again
	elem.find(".x-radio-input").attr("disabled", false);
	//remove name again
	for(name of names){
		elem.find(".x-form-"+name).removeAttr("name");
	}
	return formdata;
}

/******************
usage 

var containerobj = $(".x-forms-container");

GlobalUI.formTypesInit(containerobj, function(obj){
	
});

******************/
GlobalUI.formTypesInit = function(elem, callback, reinitiate /* provision to allow reinitialization*/){
	
	if(Global.isset(reinitiate)){
		//to reinitiate select2
		elem.find(".x-select2-processed").addClass("x-select2").removeClass("x-select2-processed");
		elem.find(".x-tableform-processed").addClass("x-tableform").removeClass("x-tableform-processed");
	}
	if(!callback){
		callback = function(){};
	}
	
	//remove previously process select2 spans
	elem.find("span.select2").remove();
	
	//select2
	elem.find(".x-select2").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-select2");
		if(1 || !obj.hasClass("x-select2-processed")){ //to avoid double initialization use GlobalUI.select2FormInit if you want to reinitiate
			GlobalUI.select2FormInit(obj, function(){ 
				this.obj.addClass("x-select2-processed"); 
				if(this.obj.attr("disabled")){
					GlobalUI.disableForm(this.obj);
				}
				this.callback(this.obj);
			}.bind({obj:obj,callback:callback}));
		}
	});
	
	//selectradio
	elem.find(".x-selectradio").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-selectradio");
		if(1 || !obj.hasClass("x-selectradio-processed")){ 
			GlobalUI.selectRadioInit(obj, function(){ 
				this.obj.addClass("x-selectradio-processed"); 
				if(this.obj.attr("disabled")){
					GlobalUI.disableForm(this.obj);
				}
				this.callback(this.obj);
			}.bind({obj:obj,callback:callback}));
		}
	});
	
	//select2draggable
	elem.find(".x-select2draggable").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-select2draggable");
		if(1 || !obj.hasClass("x-select2draggable-processed")){ //to avoid double initialization use GlobalUI.select2FormInit if you want to reinitiate
			GlobalUI.select2DraggableInit(obj, function(){ 
				this.obj.addClass("x-select2draggable-processed"); 
				if(this.obj.attr("disabled")){
					GlobalUI.disableForm(this.obj);
				}
				this.callback(this.obj);
			}.bind({obj:obj,callback:callback}));
		}
	});
	
	//tableform
	elem.find(".x-tableform").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-tableform");
		if(1 || !obj.hasClass("x-tableform-processed")){ //to avoid double initialization use GlobalUI.tableFormInit if you want to reinitiate
			GlobalUI.tableFormInit(obj, function(){
				this.obj.addClass("x-tableform-processed"); 
				if(this.obj.attr("disabled")){
					GlobalUI.disableForms(this.obj);
				}
				this.callback(this.obj);
			}.bind({obj:obj,callback:callback}));
		}
	});
	
	//yesno
	elem.find(".x-yesno").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-yesno");
		GlobalUI.yesNoFormInit(obj, function(){
			var obj = this.obj;
			var callback = this.callback;
			callback(obj);
		}.bind({obj:obj,callback:callback}));
	});
	
	//yesnoswitch
	elem.find(".x-yesnoswitch").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-yesnoswitch");
		GlobalUI.yesNoSwitchFormInit(obj, function(){
			var obj = this.obj;
			var callback = this.callback;
			callback(obj);
		}.bind({obj:obj,callback:callback}));
	});
	
	//file upload form multi
	elem.find("[data-formtype='fileuploadmulti']").each(function(){
		var obj = $(this);
		//file upload form multi
		GlobalUI.fileUploadFormMultiInit(obj, function(){
			var obj = this.obj;
			var callback = this.callback;
			callback(obj);
		}.bind({obj:obj,callback:callback}));
	})
	
	//file upload form
	elem.find("[data-formtype='fileupload']").each(function(){
		var obj = $(this);
		GlobalUI.fileUploadFormInit(obj, function(){
			var obj = this.obj;
			var callback = this.callback;
			callback(obj);
		}.bind({obj:obj,callback:callback}));
	})
	
	//file upload events
	GlobalUI.fileUploadEvents(elem, callback);
	
	//datepicker classic
	elem.find(".datepicker").each(function(){
		var obj = $(this);
		/********** events **********/
		//show date picker only on form click
		obj.on("click", function(){
			$(".x-formtype-datepicker").datepicker("hide")
			$(this).datepicker("show");
		})
		/****** implementation ******/
		obj.addClass("x-formtype-datepicker");
		obj.val(obj.attr("data-initvalue"));
		obj.datepicker({"dateFormat":"yy-mm-dd"});
		//turn off on focus so date picker wont show upon upon parseley validation
		obj.off("focus");
		if(obj.val()==""||obj.val()=="0000-00-00"){
			obj.val("");
		}
		//100ms delay
		setTimeout(function(){
			this.obj.trigger("x-form-init");
		}.bind({obj:obj}), 100);
		callback(obj);
	});
	
	//datetimepicker
	elem.find(".datetimepicker").each(function(){
		var obj = $(this);
		/********** events **********/
		//show date picker only on form click
		obj.on("click", function(){
			$(".x-formtype-datetimepicker").datetimepicker("hide");
			$(this).datetimepicker("show");
		})
		/****** implementation ******/
		obj.addClass("x-formtype-datetimepicker");
		obj.val(obj.attr("data-initvalue"));
		obj.datetimepicker({
			autoclose: true,
			componentIcon: '.s7-date',
			navIcons:{
				rightIcon: 's7-angle-right',
				leftIcon: 's7-angle-left'
			}
		});
		//turn off on focus so date picker wont show upon upon parseley validation
		obj.off("focus");
		if(obj.val()==""||obj.val()=="0000-00-00 00:00:00"||obj.val()=="0000-00-00"){
			obj.val("");
		}
		//100ms delay
		setTimeout(function(){
			
			this.obj.trigger("x-form-init");
		}.bind({obj:obj}), 100);
		callback(obj);
	});
	
	
	//wysywyg
	elem.find(".x-wysywyg").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-wysywyg");
		obj.summernote({
		  height: 300,
		  toolbar: [
			['style', ['style']],
			['font', ['bold', 'italic', 'underline', 'clear']],
			// ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
			['fontname', ['fontname']],
			['fontsize', ['fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['height', ['height']],
			['table', ['table']],
			['insert', ['link', 'picture', 'hr']],
			['view', ['fullscreen', 'codeview']],   // remove codeview button 
			['help', ['help']]
		  ]
		});
		//100ms delay
		setTimeout(function(){
			this.obj.trigger("x-form-init");
		}.bind({obj:obj}), 100);
		callback(obj);
	});
	
	//wysywygbasic
	elem.find(".x-wysywygbasic").each(function(){
		var obj = $(this);
		obj.addClass("x-formtype-wysywygbasic");
		obj.summernote({
		  height: 300,
		  toolbar: [
			//['style', ['style']],
			['font', ['bold', 'italic', 'underline']],
			// ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
			//['fontname', ['fontname']],
			//['fontsize', ['fontsize']],
			//['color', ['color']],
			//['para', ['ul', 'ol']],
			//['height', ['height']],
			//['table', ['table']],
			['insert', ['link']],
			//['view', ['fullscreen', 'codeview']],
			//['view', ['codeview']],
			//['help', ['help']]
		  ]
		});
		//100ms delay
		setTimeout(function(){
			this.obj.trigger("x-form-init");
		}.bind({obj:obj}), 100);
		callback(obj);
	});
	
	//basic form types
	elem.find("[data-formtype=basic]").each(function(){
		var obj = $(this);
		
		/********** events **********/
		
		obj.off("keydown").on("keydown", function(e, initialize){
			var obj = $(this);
			if(e.which==13 && obj[0].nodeName.toLowerCase()!="textarea"){
				return false;
			}
		});
		
		/****** implementation ******/
		
		obj.addClass("x-formtype-basic");
		var val = Global.toString(obj.attr("data-initvalue"));
		if(val!=""){
			obj.val(val);
		}
		//100ms delay
		setTimeout(function(){
			this.obj.trigger("x-form-init");
		}.bind({obj:obj}), 100);
		callback(obj);
	});
	
	//for final initialization just to make sure that all forms has already been initialized
	elem.find(".x-form").each(function(){
		var obj = $(this);
		setTimeout(function(){
			this.obj.trigger("x-form-initfinal");
		}.bind({obj:obj}), 100);
	});
}

/******************
usage 

var obj = $(".x-form-example");

obj.on("x-form-init", function(){
	
});

obj.on("x-form-error", function(){
	
});

GlobalUI.tableFormInit(obj, function(obj){});

******************/
GlobalUI.tableFormInit = function(elem, callback){
	var endpoint = elem.attr("data-endpoint");
	var page = elem.attr("data-page");
	var initpage = elem.attr("data-initpage");
	//add edit delete
	var btnadd = parseInt(elem.attr("data-btnadd"));
	var btnedit = parseInt(elem.attr("data-btnedit"));
	var btndelete = parseInt(elem.attr("data-btndelete"));
	
	if(!btnadd){
		elem.find(".x-tableform-btn-add-container").remove();
	}
	if(!btnedit){
		elem.find(".x-tableform-controls").addClass("hide");
	}
	
	//hide modal
	$("."+elem.attr("data-modalcontainerclass")).addClass("hide");
	//remove required replace with x-required
	$("."+elem.attr("data-modalcontainerclass")).find(".x-form").each(function(){
		var obj = $(this);
		if(obj.attr("required")){
			obj.addClass("x-required")
		}
		obj.removeAttr("required");
	});
	//loader
	elem.find(".x-tableform-loader-container").removeClass("hide");
	//clear body
	elem.find(".x-tbodytr").remove();
	//get data
	var data = {};
	if(!Global.isset(page)){
		page = initpage;
	}
	elem.attr("data-page", page);
	data['page'] = page;
	$.ajax({
		method: "POST",
		url: endpoint,
		data: data,
		timeout: 30000,
		success: function(result){
			var elem = this.elem;
			var callback = this.callback;
			var labelsjson = "";
			if(elem.attr("data-labels")){
				labelsjson = Base64.decode(elem.attr("data-labels"));
			}
			var labels = Global.parse(labelsjson);
			if(result['success']){
				//events
				elem.find(".x-tableform-btn-add").off("click").click(function(){
					var obj = $(this);
					var elem = obj.parents(".x-tableform-processed");
					var modalobj = buildModal(elem, "");
					modalobj.find(".modal-title").html("Add");
					elem.trigger("x-form-modalshow", [modalobj]);
					return false;
				})
				
				//implem
				var data = result['data'];
				//build head
				var parentElementHead = elem.find("thead");
				var templatehead = elem.find(".x-theadtr-template");
				elem.find(".x-theadtr").remove();
				var clone = templatehead.clone();
				clone.removeClass("x-theadtr-template");
				clone.removeClass("hide");
				clone.addClass("x-theadtr");
				parentElementHead.append(clone);
				var th = clone.find(".x-tableformth-template");
				clone.find(".x-tableformth").remove();
				for(x in labels){
					var label = labels[x];
					var cloneth = th.clone();
					cloneth.removeClass("x-tableformth-template");
					cloneth.removeClass("hide");
					cloneth.addClass("x-tableformth");
					cloneth.addClass("x-tableformth-"+x);
					cloneth.addClass("tableformth-"+x);
					cloneth.html(label)
					cloneth.insertBefore(clone.find(".x-tableform-controls"));
				}
				function buildModal(elem, id){
					var bodydiv = $("<form></form>");
					var modalclass = "x-tableform-modal-"+elem.attr("data-name");
					var modalhtml = $("."+elem.attr("data-modalcontainerclass")).html();
					bodydiv.addClass(modalclass);
					bodydiv.html(modalhtml)
					var controlslayer = $("<div class='row'></div>");
					var deletediv = $("<div class='col-md-4 text-left'></div>");
					var controlsdiv = $("<div class='col-md-8'></div>");
					var savebtn = $("<button class='btn btn-primary btn-green x-btn x-btn-save'>Save</button>");
					controlsdiv.append(savebtn);
					controlsdiv.append("&nbsp;");
					var cancelbtn = $("<button data-dismiss='modal' class='btn btn-danger x-btn x-btn-cancel'>Cancel</button>");
					controlsdiv.append(cancelbtn);
					if(btndelete && id){
						var deletebtn = $("<button class='btn btn-danger x-btn x-btn-delete'>Delete</button>");
						deletediv.append(deletebtn);
					}
					//modalobj
					//remove current temp modal
					$(".x-modal-temp").remove();
					//copy mod delete
					var modalobj = $(".x-mod-delete").clone();
					controlslayer.append(deletediv);
					controlslayer.append(controlsdiv);
					modalobj.removeClass("x-mod-delete");
					modalobj.removeClass("md-fullColor");
					modalobj.find(".modal-dialog").removeClass("modal-full-color");
					modalobj.addClass("x-modal-temp");
					modalobj.attr("data-backdrop", "static");
					modalobj.attr("data-keyboard", false);
					$("body").prepend(modalobj);
					modalobj.modal("show");
					//modalobj.find(".modal-title").html("Update Record")
					modalobj.find(".modal-title").html("Update")
					modalobj.find(".modal-body").html(bodydiv)
					modalobj.find(".modal-footer").html(controlslayer)
					modalobj.attr("data-name", elem.attr("data-name"));
					//events
					//save
					modalobj.find(".x-btn-save").off("click").click(function(){
						Global.confirm("Confirm Saving?", function(n){
							if(n){
								var modalobj = $(".x-modal-temp");
								var id = modalobj.attr("data-id");
								var elem = $(".x-form-"+modalobj.attr("data-name"));
								//set required fields
								modalobj.find(".x-form").each(function(){
									var obj = $(this);
									if(obj.hasClass("x-required")){
										obj.attr("required", true);
									}
								})
								modalobj.attr("data-parsley-validate", true);
								var parsley = modalobj.parsley();
								if(!parsley.validate()){
									return false;
								}
								modalobj.find(".x-form").each(function(){
									var obj = $(this);
									if(obj.hasClass("x-required")){
										//unset required fields
										obj.removeAttr("required");
									}
								})
								var endpoint = elem.attr("data-endpoint");
								modalobj.find("form").find(".x-extra-action").remove();
								modalobj.find("form").find(".x-extra-id").remove();
								var xaction = $("<input type='hidden' class='x-extra-action' name='x-action' />")
								var idinput = $("<input type='hidden' class='x-extra-id' name='id' />")
								if(Global.isset(id)){
									xaction.val("edit");
									idinput.val(id);
								}
								else{
									xaction.val("add");
								}
								modalobj.find("form").append(xaction);
								modalobj.find("form").append(idinput);
								var formdata = GlobalUI.getFormData(modalobj.find("form"));
								modalobj.find(".x-btn-save").html("Saving... Please Wait...");
								modalobj.find(".x-btn").attr("disabled", true);
								$.ajax({
									method: "POST",
									url: endpoint,
									data: formdata,
									timeout: 30000,
									success: function(result){
										var elem = this.elem;
										var modalobj = this.modalobj;
										modalobj.find(".x-btn-save").html("Save");
										modalobj.find(".x-btn").attr("disabled", false);
										if(result['error']){
											Global.error(result['error']);
										}
										else{
											Global.success("Success!");
											elem.attr("data-page", 1);
											GlobalUI.tableFormInit(elem);
											modalobj.modal("hide");
										}
									}.bind({elem:elem,modalobj:modalobj}),
									error: function(jqXHR, textStatus){
										var elem = this.elem;
										var modalobj = this.modalobj;
										modalobj.find(".x-btn-save").html("Save");
										modalobj.find(".x-btn").attr("disabled", false);
										modalobj.modal("hide");
									}.bind({elem:elem,modalobj:modalobj})
								});
							}
						}.bind({elem:elem}))
						
					}.bind({elem:elem}));
					//delete
					modalobj.find(".x-btn-delete").off("click").click(function(){
						Global.confirm("Confirm Deletion?", function(n){
							if(n){
								var modalobj = $(".x-modal-temp");
								var id = modalobj.attr("data-id");
								var elem = $(".x-form-"+modalobj.attr("data-name"));
								var endpoint = elem.attr("data-endpoint");
								modalobj.find("form").find(".x-extra-action").remove();
								modalobj.find("form").find(".x-extra-id").remove();
								var xaction = $("<input type='hidden' class='x-extra-action' name='x-action' />")
								var idinput = $("<input type='hidden' class='x-extra-id' name='id' />")
								if(Global.isset(id)){
									xaction.val("delete");
									idinput.val(id);
								}
								modalobj.find("form").append(xaction);
								modalobj.find("form").append(idinput);
								var formdata = GlobalUI.getFormData(modalobj.find("form"));
								modalobj.find(".x-btn-delete").html("Deleting... Please Wait...");
								modalobj.find(".x-btn").attr("disabled", true);
								$.ajax({
									method: "POST",
									url: endpoint,
									data: formdata,
									timeout: 30000,
									success: function(result){
										var elem = this.elem;
										var modalobj = this.modalobj;
										modalobj.find(".x-btn-delete").html("Delete");
										modalobj.find(".x-btn").attr("disabled", false);
										if(result['error']){
											Global.error(result['error']);
										}
										else{
											Global.success("Record Deleted!");
											elem.attr("data-page", 1);
											GlobalUI.tableFormInit(elem);
											modalobj.modal("hide");
										}
									}.bind({elem:elem,modalobj:modalobj}),
									error: function(jqXHR, textStatus){
										var elem = this.elem;
										var modalobj = this.modalobj;
										modalobj.find(".x-btn-delete").html("Delete");
										modalobj.find(".x-btn").attr("disabled", false);
										modalobj.modal("hide");
									}.bind({elem:elem,modalobj:modalobj})
								});
							}
						}.bind({elem:elem}))
						
					}.bind({elem:elem}));
					//implem
					if(Global.isset(id)){
						modalobj.attr("data-id", id);
						var initvaluesjson = elem.find(".x-tbodytr-"+id).attr("data-json");
						var initvalues = Global.parse(initvaluesjson);
						GlobalUI.fillData(modalobj, initvalues, function(key, val, obj){
							//example execution upon callback
							if(key=="id"){
								//do something
							}
						});
					}
					//initialize GlobalUI
					GlobalUI.formTypesInit(modalobj, function(obj){}, true);
					return modalobj;
				}
				if(data.length){
					//hide no records 
					elem.find(".x-tableform-norecords-container").addClass("hide");
					if(btnedit){
						elem.find(".x-tableform-controls").removeClass("hide");
					}
					//build body
					var parentElementBody = elem.find("tbody");
					var templatebody = elem.find(".x-tbodytr-template");
					elem.find(".x-tbodytr").remove();
					for(i in data){
						var row = data[i];
						var clone = templatebody.clone();
						//events
						if(btnedit){
							clone.find(".x-tableform-btn-edit").off("click").click(function(){
								var obj = $(this);
								var elem = obj.parents(".x-tableform-processed");
								var id = obj.parents("tr").attr("data-id");
								var modalobj = buildModal(elem, id);
								elem.trigger("x-form-modalshow", [modalobj]);
								return false;
							})
							
						}
						
						//implem
						clone.removeClass("x-tbodytr-template");
						clone.removeClass("hide");
						clone.addClass("x-tbodytr");
						
						clone.attr("data-json", Global.stringify(row));
						if(Global.isset(row['id'])){
							clone.addClass("x-tbodytr-"+row['id']);
							clone.attr("data-id", row['id']);
						}
						clone.insertBefore(parentElementBody.find(".x-tableform-paging-container"));
						//parentElementBody.append(clone);
						var th = clone.find(".x-tableformtd-template");
						clone.find(".x-tableformtd").remove();
						for(x in labels){
							var label = labels[x];
							var clonetd = th.clone();
							clonetd.removeClass("x-tableformtd-template");
							clonetd.removeClass("hide");
							clonetd.addClass("x-tableformtd");
							clonetd.addClass("x-tableformtd-"+x);
							clonetd.addClass("tableformtd-"+x);
							if(Global.isset(row[x+"-html"])){
								clonetd.html(row[x+"-html"])
							}
							else{
								clonetd.html(row[x])
							}
							clonetd.insertBefore(clone.find(".x-tableform-controls"));
						}
					}
					//hide loader
					elem.find(".x-tableform-loader-container").addClass("hide");
					//build paging
					var pages = parseInt(result['pages']);
					var page = elem.attr("data-page");
					if(pages>1){
						elem.find(".x-tableform-paging-container").removeClass("hide");
						var selectobj = elem.find(".x-tableform-paging-select");
						selectobj.change(function(){
							var obj = $(this);
							var elem = obj.parents(".x-tableform-processed");
							var val = obj.val();
							elem.attr("data-page", val);
							GlobalUI.tableFormInit(elem);
						})
						selectobj.html("");
						selectobj.attr("data-initvalue", page)
						for(i=1; i<=pages; i++){
							var optionobj = $("<option></option>")
							optionobj.val(i);
							optionobj.html(i);
							selectobj.append(optionobj);
						}
						GlobalUI.select2init(elem, selectobj, function(){});
					}
				}
				else{
					//show no records
					elem.find(".x-tableform-norecords-container").removeClass("hide");
					elem.find(".x-tableform-controls").addClass("hide");
					//hide loader
					elem.find(".x-tableform-loader-container").addClass("hide");
				}
			}
			//100ms delay
			setTimeout(function(){
				this.elem.trigger("x-form-init");
			}.bind({elem:elem}), 100);
			callback();
		}.bind({elem:elem,callback:callback}),
		error: function(jqXHR, textStatus){
			var elem = this.elem;
			var callback = this.callback;
			Global.error("Table form error! <br /><br />"+this.obj.attr("data-endpoint")+' <br /><br /> Error: '+textStatus);
			elem.trigger("x-form-error");
			callback();
		}.bind({elem:elem,callback:callback}),
	});
}

/******************
usage 

var obj = $(".x-form-example");

obj.on("x-form-init", function(){
	
});

obj.on("x-form-error", function(){
	
});

GlobalUI.select2FormInit(obj, function(obj){});

******************/
GlobalUI.select2FormInit = function(obj, callback){
	obj.parents(".x-form-group").find("span.select2, span.select2-container").remove();
	GlobalUI.select2init(obj, obj, callback);
}

/******************
usage 

var obj = $(".x-form-example");

obj.on("x-form-init", function(){
	
});

obj.on("x-form-error", function(){
	
});

GlobalUI.yesNoFormInit(obj, function(obj){});

******************/
GlobalUI.yesNoFormInit = function(obj, callback){
	GlobalUI.yesNoInit(obj, callback);
}


/******************
usage 

var obj = $(".x-form-example");

obj.on("x-form-init", function(){
	
});


GlobalUI.selectRadioInit(obj, function(obj){});

******************/
GlobalUI.selectRadioInit = function(obj, callback){
	var containerobj = obj.parents(".x-form-group");
	var objval = obj.attr("data-initvalue");
	objval = (Global.isset(objval))? objval : "";
	var radid = "radio"+md5(obj[0].outerHTML+Math.random());
	
	containerobj.find(".x-radioselect-input").each(function(){
		var radioobj = $(this);
		var parentobj = radioobj.parents(".x-radioselect-input-container");
		radioobj.off("click").click(function(){
			var radioobj = $(this);
			var val = radioobj.val();
			var containerobj = radioobj.parents(".x-form-group");
			var obj = containerobj.find(".x-selectradio-hidden");
			obj.val(val);
			obj.trigger("change");
			obj.trigger("x-form-change");
		})
		radioobj.attr("name", radid);
		var val = radioobj.val();
		if(val==objval){
			radioobj.prop("checked", true);
		}
		radioobj.attr("id", radid+val);
		parentobj.find("label").attr("for", radid+val);
		
	})
	
	//100ms delay
	setTimeout(function(){
		var obj = this.obj;
		obj.trigger("x-form-init");
		//if object is disabled
		if(obj.attr("disabled")){
			GlobalUI.disableForm(obj);
		}
	}.bind({obj:obj}), 100);
	callback();
	
}


/******************
usage 

var obj = $(".x-form-example");

obj.on("x-form-init", function(){
	
});

obj.on("x-form-error", function(){
	
});

GlobalUI.yesNoSwitchFormInit(obj, function(obj){});

******************/
GlobalUI.yesNoSwitchFormInit = function(obj, callback){
	var microtime = (Date.now() % 1000) / 1000;
	var tempid = "temp-"+md5(microtime+"-"+Math.random());
	var checkboxcontainerobj = obj.parents(".x-switch-container");
	var checkboxobj = obj.parents(".x-switch-container").find(".x-checkbox");
	var inputobj = obj.parents(".x-switch-container").find(".x-yesnoswitch-hidden");
	/********** events **********/
	checkboxobj.off("click").click(function(){
		var checkboxobj = $(this);
		var inputobj = checkboxobj.parents(".x-switch-container").find(".x-yesnoswitch-hidden");
		if(checkboxobj.is(":checked")){
			inputobj.val("Yes");
		}
		else{
			inputobj.val("No");
		}
		inputobj.trigger("change");
		inputobj.trigger("x-form-change");
	})
	
	/****** implementation ******/
	checkboxcontainerobj.find("label").attr("for", tempid);
	checkboxobj.attr("name", tempid);
	checkboxobj.attr("id", tempid);
	var val = Global.toString(inputobj.attr("data-initvalue"));
	if(val!=""){
		inputobj.val(val);
	}
	else{
		inputobj.val(val);
	}
	if(val=="Yes"){
		checkboxobj.prop("checked", true);
	}
	else{
		checkboxobj.prop("checked", false);
	}
	//100ms delay
	setTimeout(function(){
		var obj = this.obj;
		obj.trigger("x-form-init");
		//if object is disabled
		if(obj.attr("disabled")){
			GlobalUI.disableForm(obj);
		}
	}.bind({obj:obj}), 100);
	callback();
}

/******************
usage 

var obj = $(".x-form-example");

obj.on("x-form-init", function(){
	
});

obj.on("x-form-add", function(){
	
});

obj.on("x-form-drop", function(){
	
});

obj.on("x-form-deleted", function(){
	
});

obj.on("change", function(){
	
});

GlobalUI.select2DraggableInit(obj, function(obj){});

******************/
GlobalUI.select2DraggableInit = function(obj, callback){
	var dataendpoint = obj.attr("data-endpoint");
	var containerobj = obj.parents(".x-select2draggable-container");
	var formobj = containerobj.find(".x-select2draggable");
	var select2obj = containerobj.find(".x-select2draggable-select2");
	var addobj = containerobj.find(".x-add");
	var listobj = containerobj.find(".x-list");

	var bodyZoom = $(window).width() / $('body').width();
	containerobj.find(".list-group").css("zoom", (100/(bodyZoom*100)*100)+"%")
	var setDataFunction = function(containerobj){
		var listobj = containerobj.find(".x-list");
		var values = [];
		listobj.find(".x-item").each(function(){
			var obj = $(this);
			var value = obj.attr("data-value");
			values.push(value);
		});
		formobj.val(Global.stringify(values));
	};
	
	var addItemFunction = function(containerobj, data){
		var formobj = containerobj.find(".x-select2draggable");
		var listobj = containerobj.find(".x-list");
		var template = listobj.find(".x-template");
		if(!Global.isset(listobj.find(".x-item-"+data['value']).attr("data-value"))){
			var clone = template.clone();
			clone.find(".x-delete").off("click").click(function(){
				var obj = $(this);
				var containerobj = obj.parents(".x-select2draggable-container"); 
				var itemobj = obj.parents(".x-item");
				var formobj = containerobj.find(".x-select2draggable");
				
				itemobj.remove();
				setDataFunction(containerobj);
				formobj.trigger("change");
				formobj.trigger("x-form-change");
				formobj.trigger("x-form-delete");
				/* Global.confirm("Confirm delete?", function(n){
					if(n){
						itemobj.remove();
						setDataFunction(containerobj);
						formobj.trigger("change");
						formobj.trigger("x-form-change");
						formobj.trigger("x-form-delete");
					}
				}); */
				return false;
			});
			clone.off("drop").on("drop", function(){
				var obj = $(this);
				var containerobj = obj.parents(".x-select2draggable-container"); 
				var formobj = containerobj.find(".x-select2draggable");
				setDataFunction(containerobj);
				formobj.trigger("change");
				formobj.trigger("x-form-change");
				formobj.trigger("x-form-drop", obj);
			})
			clone.removeClass("hide");
			clone.removeClass("x-template");
			clone.addClass("x-item");
			clone.addClass("x-item-"+data['value']);
			clone.attr("data-json", Global.stringify(data));
			clone.attr("data-value", data['value']);
			clone.find(".x-tb-content").html(data['label']);
			listobj.append(clone);
			var list = listobj[0];
			setTimeout(()=>{
				new Sortable(list, {
					animation: 150,
					ghostClass: 'sortable-target'
				});
			}, 100)
			
			return clone;
		}
	}
	
	/* events */
	addobj.off("click").click(function(){
		var obj = $(this);
		var containerobj = obj.parents(".x-select2draggable-container"); 
		var select2obj = containerobj.find(".x-select2draggable-select2");
		var addobj = containerobj.find(".x-add");
		var listobj = containerobj.find(".x-list");
		var formobj = containerobj.find(".x-select2draggable");
		var data = GlobalUI.getSelect2Data(select2obj);
		if(Global.isset(data['value'])){
			if(!Global.isset(listobj.find(".x-item-"+data['value']).attr("data-value"))){
				var clone = addItemFunction(containerobj, data);
				setDataFunction(containerobj);
				formobj.trigger("x-form-add", [clone]);
				formobj.trigger("change");
				formobj.trigger("x-form-change");
			}
			else{
				Global.error("Item is already in the list");
			}
		}
		else{
			
		}
		return false;
	});
	select2obj.off("change").change(function(){
		var obj = $(this);
		var containerobj = obj.parents(".x-select2draggable-container"); 
		var select2obj = containerobj.find(".x-select2draggable-select2");
		var addobj = containerobj.find(".x-add");
		var listobj = containerobj.find(".x-list");
		var data = GlobalUI.getSelect2Data(obj);
		if(Global.isset(data['value'])){
			addobj.attr("disabled", false);
			if(!Global.isset(listobj.find(".x-item-"+data['value']).attr("data-value"))){
				
			}
			else{
				addobj.attr("disabled", true);
			}
		}
		else{
			addobj.attr("disabled", true);
		}
		
	});
	/* implem */
	addobj.attr("disabled", true);
	//remove previously process select2 spans
	containerobj.find("span.select2").remove();
	listobj.find(".x-item").remove();
	//select2obj.attr("data-removeblank", 1);
	select2obj.attr("data-endpoint", dataendpoint);
	GlobalUI.select2FormInit(select2obj, function(){
		var obj = this.obj;
		var containerobj = obj.parents(".x-select2draggable-container"); 
		var select2obj = containerobj.find(".x-select2draggable-select2");
		var value = containerobj.find(".x-select2draggable").attr("data-initvalue");
		var values = Global.parse(value);
		for(x in values){
			var val = values[x];
			if(Global.isset(val)){
				var json = select2obj.find("option[value="+val+"]").attr("data-raw");
				if(Global.isset(json)){
					var data = Global.parse(json);
					var clone = addItemFunction(containerobj, data);
					formobj.trigger("x-form-addinit", [clone]);
				}
			}
		}
		setDataFunction(containerobj);
		var list = listobj[0];
		setTimeout(()=>{
			new Sortable(list, {
				animation: 150,
				ghostClass: 'sortable-target'
			});
			obj.trigger("x-form-init");
		}, 100)
		
	}.bind({obj:obj}));	
	//containerobj.find('.x-sortable').sortable();
}

GlobalUI.isBaseData = function(str){
	var data = Global.parse(str);
	if(Global.isset(data?.['basedata'])&&data?.['basedata']=="Yes"){
		return data;
	}
	return false;
}

/*
var json = GlobalUI.baseDataJSON({
	formtype: "fileupload",
	action: "upload",
	value: "xxx",
	extra: ""
});
formObj.val(json);
*/
GlobalUI.baseDataJSON = function(args){
	var formtype = args?.['formtype'];
	var action = args?.['action'];
	var value = args?.['value'];
	var extra = args?.['extra'];
	var basedata = {};
	basedata['basedata'] = "Yes";
	basedata['formtype'] = formtype; // fileupload
	basedata['action'] = action; //clear, upload, do nothing
	basedata['value'] = value;
	basedata['extra'] = extra;
	var json = Global.stringify(basedata);
	return json;
}

GlobalUI.fileUploadFormInit = function(obj, callback){
	var formObj = obj;
	var formGroup = formObj.parents(".x-form-group");
	var uploadContainer = formGroup.find(".x-fileupload-container");
	
	/********** events **********/
	//clear file button
	uploadContainer.find(".x-fileupload-clearfile").off("click").click(function(e, initialize){
		var obj = $(this);
		Global.confirm("Confirm Delete?", function(n){
			var obj = this.obj;
			if(n){
				obj.addClass("hide");
				var formGroup = obj.parents(".x-form-group");
				var formObj = formGroup.find("[data-formtype='fileupload']");
				var uploadContainer = formGroup.find(".x-fileupload-container");
				var fileuploadForm = uploadContainer.find(".x-fileupload-form");
				fileuploadForm.val("");
				formGroup.find(".x-fileupload-clicktoupload").attr("data-href", "");
				formGroup.find(".x-fileupload-clicktoupload").val("");
				//clear file info
				formObj.data("fileinfo", "");
				formObj.val(GlobalUI.baseDataJSON({
					formtype: "fileupload",
					action: "clear",
					value: ""
				}));
			}
		}.bind({obj:obj}));
		return false;
	});
	//click to upload text
	uploadContainer.find(".x-fileupload-clicktoupload").off("keydown").keydown(function(e, initialize){
		var obj = $(this);
		return false;
	});
	uploadContainer.find(".x-fileupload-clicktoupload").off("click").click(function(e, initialize){
		var obj = $(this);
		var formGroup = obj.parents(".x-form-group");
		var formObj = formGroup.find("[data-formtype='fileupload']");
		var uploadContainer = formGroup.find(".x-fileupload-container");
		var fileuploadForm = uploadContainer.find(".x-fileupload-form");
		var fileinfojson = formObj.data("fileinfo");
		var fileinfo = Global.parse(fileinfojson);
		var href = obj.attr("data-href");
		if(Global.isset(href)){
			var ahref = $("<a class='hide'>hidden link</a>");
			ahref.attr("target", "_blank");
			ahref.attr("href", href);
			ahref[0].click();
		}
		else{
			fileuploadForm.trigger("click");
		}
		return false;
	});
	//set upload event
	var fileuploadForm = uploadContainer.find(".x-fileupload-form");
	fileuploadForm.fileuploader({
		"onuploadprogress" : function(file, bytesuploaded, bytestotal){
			var formObj = this.formObj;
			var uploadContainer = this.uploadContainer;
			var percent = Math.round(bytesuploaded / bytestotal * 100, 0);
			uploadContainer.find(".x-fileupload-clicktoupload").val(file['name']+" - "+percent+"%");
		}.bind({formObj:formObj,uploadContainer:uploadContainer}),
		"onselect" : function(src, file){
			var mime = file.type.toLowerCase();
		},
		"autoupload": true,
		"done": function(ret, obj){
			var formObj = this.formObj;
			var uploadContainer = this.uploadContainer;
			var args = {};
			args['filepath'] = ret['filetarget'];
			args['filename'] = ret['filename'];
			if(Global.isset(ret)&&Global.isset(ret['filetarget'])){
				// ret['column']
				// ret['filename']
				// ret['fileurl']
				// ret['filetarget']
				uploadContainer.find(".x-fileupload-clearfile").removeClass("hide");
				uploadContainer.find(".x-fileupload-clicktoupload").attr("data-href", ret['fileurl'])
				//uploadContainer.find(".x-fileupload-clicktoupload").val(ret['filename']);
				var json = Global.stringify(ret);
				formObj.data("fileinfo", json);
				formObj.val(GlobalUI.baseDataJSON({
					formtype: "fileupload",
					action: "upload",
					value: ret['filetarget']
				}));
				formObj.trigger("x-form-upload");
				
			}		
		}.bind({formObj:formObj,uploadContainer:uploadContainer})
	});
	
	
	/****** implementation ******/
	//set initial value display
	var initvalue = formObj.attr("data-initvalue");
	if(Global.isset(initvalue)){
		//if base data format
		if(basedata = GlobalUI.isBaseData(initvalue)){
			if(Global.isset(basedata?.['value'])){
				var displaytextr = basedata['value'].split("/");
				if(Global.isset(displaytextr[displaytextr.length-1])){
					var displaytext = "File";
					try{
						displaytext = displaytextr[displaytextr.length-1];
						displaytext = displaytext.split('_').slice(1).join('_');;
					}
					catch(e){
					}
				}
				else{
					displaytext = "File";
				}
				uploadContainer.find(".x-fileupload-clicktoupload").attr("data-href", "/file?p="+Base64.encode(basedata['value']));
				uploadContainer.find(".x-fileupload-clicktoupload").val(displaytext);	
			}
		}
		//if file format regular
		else{
			uploadContainer.find(".x-fileupload-clicktoupload").attr("data-href", initvalue);
			var displaytextr = initvalue.split("/file?p=");
			if(Global.isset(displaytextr[1])){
				var displaytext = displaytextr[1];
				try{
					displaytext = Base64.decode(displaytext);
					var basename = displaytext.split(/\//g);
					basename = basename[basename.length-1];
					basename = basename.split('_').slice(1).join('_');;
					if(basename!=""){
						displaytext = basename;
					}
				
				}
				catch(e){
					displaytext = "File";
				}
			}
			else{
				displaytext = "File";
			}
			uploadContainer.find(".x-fileupload-clicktoupload").val(displaytext);	
			formObj.val(GlobalUI.baseDataJSON({
				formtype: "fileupload",
				action: "",
				value: initvalue
			}));
		}
		uploadContainer.find(".x-fileupload-clearfile").removeClass("hide");
	}
	else{
		uploadContainer.find(".x-fileupload-clicktoupload").removeAttr("data-href");
		uploadContainer.find(".x-fileupload-clicktoupload").val("");	
		uploadContainer.find(".x-fileupload-clearfile").addClass("hide");
	}
	formObj.trigger("x-form-init");
	callback(formObj);
}

GlobalUI.fileUploadFormMultiInit = function(obj, callback){
	var formObj = obj;
	var formGroup = formObj.parents(".x-form-group");
	var uploadContainer = formGroup.find(".x-fileupload-container");
	
	/********** events **********/
	
	formObj.on("x-updateform", function(e, data){
		var formObj = $(this);
		var formGroup = formObj.parents(".x-form-group");
		var name = formObj.attr("data-name");
		var valuer = [];
		formGroup.find("[data-base-cloneable-item='x-fileuploadmulti-clones-"+name+"']").each(function(){
			var cloneObj = $(this);
			var json = cloneObj.attr("data-json");
			var basedata = Global.parse(json);
			if(Global.isset(basedata?.['value'])){
				valuer.push(basedata);
			}
		})
		formObj.val(GlobalUI.baseDataJSON({
			formtype: "fileuploadmulti",
			action: "",
			value: valuer
		}));
	});
	
	formObj.on("x-add-clone", function(e, data){
		var formObj = $(this);
		var name = formObj.attr("data-name");
		GlobalUI.clone({
			container: uploadContainer, //(optional) the container jquery element. if no value set, defaults to $("body")
			name: "x-fileuploadmulti-clones-"+name, //value of data-base-cloneable-parent and data-base-cloneable-template
			data: data, //(optional) data you want to pass to clone as data-json tag
			success: function(cloneObj, parentObj, data){
				var uploadContainer = parentObj.parents(".x-fileupload-container");
				var formObj = uploadContainer.find(".x-form");
				var name = formObj.attr("data-name");
				
				/********** events **********/
				
				//clear file button
				cloneObj.find(".x-fileupload-clearfile").off("click").click(function(e, initialize){
					var obj = $(this);
					Global.confirm("Confirm Delete?", function(n){
						var obj = this.obj;
						var cloneObj = obj.data("cloneObj");
						if(n){
							obj.addClass("hide");
							var clones = formGroup.find("[data-base-cloneable-item]");
							var clone = obj.parents("[data-base-cloneable-item]");
							var formObj = formGroup.find("[data-formtype='fileuploadmulti']");
							var cloneObj = obj.data("cloneObj");
							var fileuploadForm = cloneObj.find(".x-fileupload-form");
							fileuploadForm.val("");
							cloneObj.find(".x-fileupload-clicktoupload").attr("data-href", "");
							cloneObj.find(".x-fileupload-clicktoupload").val("");
							var basedatajson = GlobalUI.baseDataJSON({
								formtype: "fileupload",
								action: "clear",
								value: ""
							});
							cloneObj.attr("data-json", basedatajson);
							formObj.trigger("x-updateform");
							//clear file info
							/* formObj.data("fileinfo", "");
							formObj.val(GlobalUI.baseDataJSON({
								formtype: "fileupload",
								action: "clear",
								value: ""
							})); */
							if(clones.length>1){
								clone.remove();
							}
						}
					}.bind({obj:obj}));
					return false;
				}).data("cloneObj", cloneObj);
				
				//click to upload text
				cloneObj.find(".x-fileupload-clicktoupload").off("keydown").keydown(function(e, initialize){
					var obj = $(this);
					return false;
				});
				
				cloneObj.find(".x-fileupload-clicktoupload").off("click").click(function(e, initialize){
					var obj = $(this);
					var cloneObj = obj.data("cloneObj");
					var fileuploadForm = cloneObj.find(".x-fileupload-form");
					var href = obj.attr("data-href");
					if(Global.isset(href)){
						var ahref = $("<a class='hide'>hidden link</a>");
						ahref.attr("target", "_blank");
						ahref.attr("href", href);
						ahref[0].click();
					}
					else{
						fileuploadForm.trigger("click");
					}
					return false;
				}).data("cloneObj", cloneObj);
				
				//set upload event
				var fileuploadForm = cloneObj.find(".x-fileupload-form");
				fileuploadForm.fileuploader({
					"onuploadprogress" : function(file, bytesuploaded, bytestotal){
						var formObj = this.formObj;
						var cloneObj = this.cloneObj;
						var percent = Math.round(bytesuploaded / bytestotal * 100, 0);
						cloneObj.find(".x-fileupload-clicktoupload").val(file['name']+" - "+percent+"%");
					}.bind({formObj:formObj,cloneObj:cloneObj}),
					"onselect" : function(src, file){
						var mime = file.type.toLowerCase();
					},
					"autoupload": true,
					"done": function(ret, obj){
						var formObj = this.formObj;
						var cloneObj = this.cloneObj;
						var args = {};
						args['filepath'] = ret['filetarget'];
						args['filename'] = ret['filename'];
						if(Global.isset(ret)&&Global.isset(ret['filetarget'])){
							// ret['column']
							// ret['filename']
							// ret['fileurl']
							// ret['filetarget']
							cloneObj.find(".x-fileupload-clearfile").removeClass("hide");
							cloneObj.find(".x-fileupload-clicktoupload").attr("data-href", ret['fileurl'])
							//cloneObj.find(".x-fileupload-clicktoupload").val(ret['filename']);
							var json = Global.stringify(ret);
							formObj.data("fileinfo", json);
							var basedatajson = GlobalUI.baseDataJSON({
								formtype: "fileupload",
								action: "upload",
								value: ret['filetarget']
							});
							cloneObj.attr("data-json", basedatajson)
							formObj.trigger("x-updateform");
							formObj.trigger("x-form-upload");
						}		
					}.bind({formObj:formObj,cloneObj:cloneObj})
				});
				
				/****** implementation ******/
				
				var basedata = Global.parse(Global.stringify(data));
				
				if(Global.isset(basedata?.['value'])){
					var displaytextr = basedata['value'].split("/");
					if(Global.isset(displaytextr[displaytextr.length-1])){
						var displaytext = "File";
						try{
							displaytext = displaytextr[displaytextr.length-1];
							displaytext = displaytext.split('_').slice(1).join('_');;
						}
						catch(e){
						}
					}
					else{
						displaytext = "File";
					}
					cloneObj.find(".x-fileupload-clicktoupload").attr("data-href", "/file?p="+Base64.encode(basedata['value']));
					cloneObj.find(".x-fileupload-clicktoupload").val(displaytext);	
				}
				else{
					cloneObj.find(".x-fileupload-clearfile").addClass("hide");
				}
			},
			error: function(error){
				alert(error);
			},
			delete: function(parentObj){
				
			}
		});
	})
	
	uploadContainer.find(".x-btn-add-container").off("click").on("click", function(e, initialize){
		var obj = $(this);
		var uploadContainer = obj.parents(".x-fileupload-container");
		var formObj = uploadContainer.find(".x-form");
		var name = formObj.attr("data-name");
		formObj.trigger("x-add-clone", [{}]);
		return false;
	});
	
	
	/****** implementation ******/
	
	//set initial value display
	var initvalue = formObj.attr("data-initvalue");
	if(Global.isset(initvalue)){
		uploadContainer.find("[data-base-cloneable-item]").remove();
		//if base data format
		if(mbasedata = GlobalUI.isBaseData(initvalue)){
			var items = mbasedata['value'];
			Global.asyncEach(items, function(key, item){
				var formObj = this.formObj;
				if(Global.isset(item?.['value'])){
					formObj.trigger("x-add-clone", [item]);
					formObj.attr("data-hasclone", 1);
				}
			}.bind({formObj:formObj}),
			10, 10, function(){
				var formObj = this.formObj;
				if(!Global.isset(formObj.attr("data-hasclone"))){
					formObj.trigger("x-add-clone", [{}]);
				}
			}.bind({formObj:formObj}));
			
		}
		else{
			uploadContainer.find("[data-base-cloneable-item]").remove();
			formObj.trigger("x-add-clone", [{}]);
		}
	}
	else{
		uploadContainer.find("[data-base-cloneable-item]").remove();
		formObj.trigger("x-add-clone", [{}]);
	}
	
	formObj.trigger("x-form-init");
	callback(formObj);
}



/**************************************** PAGE ADD FUNCTIONS **********************************************************************************************/

GlobalUI.PageAdd = {};
GlobalUI.PageAdd.ajaxPage = function(pageObj, href){
	url = href;
	//parameters
	if(url.indexOf(pageObj.landingpage+"/view")>=0){
		url = url.replace(pageObj.landingpage+"/view?", pageObj.landingpage+"/view/true?params="+pageObj.paramsjson+"&");
	}
	else if(url.indexOf(pageObj.landingpage+"/edit")>=0){
		url = url.replace(pageObj.landingpage+"/edit?", pageObj.landingpage+"/edit/true?params="+pageObj.paramsjson+"&");
	}
	else if(url.indexOf(pageObj.landingpage+"/add?")>=0){
		url = url.replace(pageObj.landingpage+"/add?", pageObj.landingpage+"/add/true?params="+pageObj.paramsjson+"&");
	}
	else if(url.indexOf(pageObj.landingpage+"/add")>=0){
		url = url.replace(pageObj.landingpage+"/add", pageObj.landingpage+"/add/true?params="+pageObj.paramsjson+"&");
	}
	else if(url.indexOf(pageObj.landingpage)>=0){
		url = url.replace(pageObj.landingpage, pageObj.landingpage+"/index/true");
	}
	Global.loading();
	$.ajax({
		method: "GET",
		url: url,
		timeout: 30000,
		success: function(result){
			Global.hideLoading();
			$(".main-content").html(result);
		},
		error: function(jqXHR, textStatus){
			Global.hideLoading();
			Global.error('Failed from '+textStatus);
		}
	});
}
	
GlobalUI.PageAdd.initFinal = function(pageObj){
	/*********** EVENTS **************/
	
	//unbind pop state
	$(window).unbind("popstate")
	//set fetch on links and data-ct (counter)
	$(window).bind("popstate", function(e) {
		var href = window.location.href;
		GlobalUI.PageAdd.ajaxPage(pageObj, href);
	});
	
	/******* IMPLEMENTATION **********/
	//to hide show UI Elements
	User.setPerms();
	pageObj.elem.removeClass("hide");
	Global.hideLoading();
}

GlobalUI.PageAdd.initCallback = function(pageObj){
	
	//to be able to add get params in endpoint
	if(pageObj.endpoint.indexOf("?")<0){
		pageObj.endpoint = pageObj.endpoint+"?_="+(new Date()).getTime();
	}
	
	/*********** EVENTS **************/
	
	pageObj.elem.find(".x-tab").off("click").on("click", function(e, initialize){
		var elem = pageObj.elem;
		var obj = $(this);
		var hash = obj.find("a").attr("href");
		history.pushState(null, null, hash);
	});
	
	//action buttons
	pageObj.elem.find(".x-actionbutton").click(function(e, initialize){
		var obj = $(this);
		//back button
		if(obj.hasClass("x-btn-back") && !Global.isset(initialize)){
			if(obj.hasClass("noback")){
				return false;
			}
			var dataserialized = $.trim(GlobalUI.getFormData(pageObj.elem.find('#add-form')));
			var dataserializedMd5 = md5(dataserialized);			
			if(pageObj.dataserializedMd5 != dataserializedMd5){
				Global.confirm("You haven't saved, are you sure you want to leave this page?", function(n){
					if(n){
						var href = obj.attr("href");
						history.pushState(null, null, href);
						GlobalUI.PageAdd.ajaxPage(pageObj, href);
					}
				});
			}
			else{
				Global.loading();
				var href = obj.attr("href");
				history.pushState(null, null, href);
				GlobalUI.PageAdd.ajaxPage(pageObj, href);
			}
			return false;
		}
		else{
			var href = obj.attr("href");
			history.pushState(null, null, href);
			GlobalUI.PageAdd.ajaxPage(pageObj, href);
			return false;
		}
	})
	
	//audit logs button
	pageObj.elem.find(".x-btn-logs").on("click", function(){
		var table = $(this).attr("data-table");
		var tableid = $(this).attr("data-tableid");
		pageAuditLogs.loadLogs(table, tableid, pageObj.landingpage);
	});
	
	pageObj.elem.find(".x-btn-save").off("click").on("click", function(e, initialize){
		var elem = pageObj.elem;
		var obj = $(this);
		var parsley = pageObj.elem.find('#add-form').parsley();
		if(!parsley.validate()){
			var errorobj = $(elem.find(".parsley-errors-list.filled")[0]);
			var tabpaneobj = errorobj.parents(".tab-pane.cont");
			var id = tabpaneobj.attr("id");
			elem.find("a[data-toggle=\"tab\"][href=\"#"+id+"\"]").trigger("click")
			return false;
		}
		elem.find('#add-form').trigger("submit");
		return false;
	});
	
	pageObj.elem.find(".nav-tabs [data-toggle=\"tab\"]").off("click").on("click", function(e, initialize){
		var elem = pageObj.elem;
		var obj = $(this);
		var href = obj.attr("href");
		history.pushState(null, null, href);
	});
	
	//submit form
	pageObj.elem.find('#add-form').submit(function(){
		var parsley = pageObj.elem.find('#add-form').parsley();
		if(!parsley.validate()){
			return false;
		}
		if(pageObj.action == "edit"){
			Global.loading();
			var data = GlobalUI.getFormData(pageObj.elem.find('#add-form'));
			$.ajax({
				method: "PUT",
				url: pageObj.endpoint+"&id="+ pageObj.urlParameterId + "&own=" + Global.get("own")+"&"+pageObj.forwardqs,
				timeout: 30000,
				data: data,
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				success: function(result){
					result = result['data'];
					if(Global.isset(result)&&Global.isset(result["success"])){
						if(Global.isset(result["href"])){
							pageObj.elem.find(".x-mod-success .btn-okay").attr("data-href", result["href"]);
						}
						if(Global.isset(result["message"])){
							pageObj.elem.find(".x-mod-success .modal-body p").html(result["message"]);
						}
						else{
							pageObj.elem.find(".x-mod-success .modal-body p").html("Record has been successfully updated");
						}
						pageObj.elem.find( ".x-mod-success" ).modal( "show" );
						Global.hideLoading();
					}
					else if(Global.isset(result)&&Global.isset(result["error"])){
						var error = result["error"];
						pageObj.elem.find(".mod-error .modal-body p").html(error);
						pageObj.elem.find( ".mod-error" ).modal( "show" );
						Global.hideLoading();
					}
				},
				error: function(jqXHR, textStatus){
					Global.hideLoading();
					alert('Failed from '+textStatus);
				}
			});
			return false;
		}
		else if(pageObj.action == "add"){
			var data = GlobalUI.getFormData(pageObj.elem.find('#add-form'));
			//call api here to pass the data
			Global.loading();
			$.ajax({
				method: "POST",
				url: pageObj.endpoint,
				timeout: 30000,
				data: data,
				success: function(result){
					result = result['data'];
					if(Global.isset(result)&&Global.isset(result["success"])){
						pageObj.elem.find(".x-mod-success .modal-body p").html("Record has been successfully added");
						pageObj.elem.find(".x-mod-success").modal( "show" );
						pageObj.success	= 1;
						Global.hideLoading();
					}
					else if(Global.isset(result)&&Global.isset(result["error"])){
						var error = result["error"];
						pageObj.elem.find(".mod-error .modal-body p").html(error);
						pageObj.elem.find( ".mod-error" ).modal( "show" );
						pageObj.success	= 0;
						Global.hideLoading();
					}
				},
				error: function(jqXHR, textStatus){
					Global.hideLoading();
					alert('Failed from '+textStatus);
				}
			});
			Global.log(data);
			return false;
		}
	});
	//success ok
	pageObj.elem.find(".x-mod-success .btn-okay").click(function(){
		var obj = $(this);
		if(pageObj.action == "edit"){
			var href = obj.attr("data-href");
			if(Global.isset(href)){
				self.location = href;
			}
			else{
				pageObj.elem.find( ".x-mod-success" ).modal( "hide" ); //hide only when editing
				pageObj.elem.find( ".x-mod-success" ).on('hidden.bs.modal', function () {
					//refresh page on press of ok button (needs refreshing so no issue with tmp file uploads)
					GlobalUI.PageAdd.ajaxPage(pageObj, window.location.href);
				})
				Global.hideLoading();
			}
		}
		else if(pageObj.action == "add"){
			if(pageObj.success==1){
				//self.location = pageObj.landingpage;
			}
			//add success
			pageObj.elem.find(".x-mod-success").on("hidden.bs.modal", function(){
				if(pageObj.success==1){
					//self.location = pageObj.landingpage;
					pageObj.elem.find(".x-btn-back").trigger("click", true);
				}
				Global.hideLoading();
			});
			Global.hideLoading();
		}
	});
	//delete 
	pageObj.elem.find(".x-btn-delete").unbind("click").click(function(){
		pageObj.elem.find( ".x-mod-delete" ).modal( "show" );
	});
	//proceed deleted
	pageObj.elem.find(".md-fullColor-proceed").unbind("click").click(function(){
		Global.loading();
		$.ajax({
			method: "DELETE",
			url: pageObj.endpoint+"&id="+pageObj.urlParameterId+"&"+pageObj.forwardqs,
			timeout: 30000,
			success: function(result){
				result = result['data'];
				//alert(result['success']);
				if(result['success']){
					pageObj.elem.find( ".x-mod-success-delete" ).modal( "show" );
					Global.hideLoading();
				}
				else if(Global.isset(result)&&Global.isset(result["error"])){
					var error = result["error"];
					pageObj.elem.find(".mod-error .modal-body p").html(error);
					pageObj.elem.find( ".mod-error" ).modal( "show" );
					Global.hideLoading();
				}
			},
			error: function(jqXHR, textStatus){
				Global.hideLoading();
				alert('Failed from '+textStatus);
			}
		});
	});
	//success ok
	pageObj.elem.find(".x-mod-success-delete .btn-okay").unbind("click").click(function(){
	});
	//delete modal
	pageObj.elem.find(".x-mod-success-delete").on("hidden.bs.modal", function(){
		pageObj.elem.find(".x-btn-back").trigger("click", true);
	});
	
	/******* IMPLEMENTATION **********/
	
	Global.loading();
	if(window.location.hash) {
		pageObj.elem.find("[href='"+window.location.hash+"']").trigger("click");
	}	
	pageObj.elem.find(".x-btn-save").removeAttr("disabled");
	//parameters
	var paramsjson = pageObj.paramsjson;
	//forward qs
	pageObj.elem.find(".x-btn-back").attr("href", pageObj.landingpage+"?params="+paramsjson+(pageObj.forwardqs?"&"+pageObj.forwardqs:""));
	/* FORM TYPES */
	GlobalUI.formTypesInit(pageObj.elem, function(obj){
		//the md5 of data populate on every initialization
		//serialized data
		var dataserialized = $.trim(GlobalUI.getFormData(pageObj.elem.find('#add-form')));
		var dataserializedMd5 = md5(dataserialized);
		pageObj.dataserialized = dataserialized;
		pageObj.dataserializedMd5 = dataserializedMd5;
		//sample callback execution
		//if(obj.hasClass("x-form-sampleselect")){
		//	obj.trigger("change");
		//}
	});
	//audit_logs
	pageObj.elem.find(".x-btn-logs").attr("data-tableid", pageObj.urlParameterId);
	/* MAIN BUTTONS DISPLAY */
	//view
	if(pageObj.action == "view"){
		pageObj.elem.find(".x-btn-logs").show();
		pageObj.elem.find(".x-btn-back").show();
		//pageObj.elem.find(".panel-body").find('*').attr("disabled", "disabled");
		GlobalUI.disableForms(pageObj.elem);
		pageObj.elem.find(".x-btn-delete").addClass("hide");
	}
	//edit
	else if(pageObj.action == "edit"){
		pageObj.elem.find(".x-btn-save, .x-btn-back, .x-btn-delete, .x-btn-logs").show();
	}
	//add
	else if(pageObj.action == "add"){
		pageObj.elem.find(".x-btn-save, .x-btn-back").show();
		pageObj.elem.find(".x-btn-delete").addClass("hide");
	}
	//custom init
	pageObj.initCustom();
	//disable back button initially
	if(pageObj.action!="add"){
		pageObj.elem.find(".x-btn-back").attr("disabled", true);
	}
	pageObj.elem.find(".x-btn-back").addClass("noback");
	//serialized data
	var dataserialized = $.trim(GlobalUI.getFormData(pageObj.elem.find('#add-form')));
	var dataserializedMd5 = md5(dataserialized);
	pageObj.dataserialized = dataserialized;
	pageObj.dataserializedMd5 = dataserializedMd5;
	setTimeout(function(){
		//serialized data
		var dataserialized = $.trim(GlobalUI.getFormData(pageObj.elem.find('#add-form')));
		var dataserializedMd5 = md5(dataserialized);
		pageObj.dataserialized = dataserialized;
		pageObj.dataserializedMd5 = dataserializedMd5;
		pageObj.elem.find(".x-btn-back").attr("disabled", false);
		pageObj.elem.find(".x-btn-back").removeClass("noback");
	}, 1000);
	//final init
	GlobalUI.PageAdd.initFinal(pageObj);
}

GlobalUI.PageAdd.populateContents = function(pageObj){
	//to be able to add get params in endpoint
	if(pageObj.endpoint.indexOf("?")<0){
		pageObj.endpoint = pageObj.endpoint+"?_="+(new Date()).getTime();
	}
	pageObj.record = {};
	if(pageObj.action == "view" || pageObj.action == "edit"){
		//audit_logs
		var url = pageObj.endpoint+"&id="+pageObj.urlParameterId+"&"+pageObj.forwardqs;
		if(Global.isset(pageObj.urlParameterLogId)){
			url = pageObj.endpoint+"&id="+pageObj.urlParameterId+"&logid="+pageObj.urlParameterLogId+"&"+pageObj.forwardqs;
		}
		//get the data
		$.ajax({
			method: "GET",
			url: url, //audit_logs
			timeout: 30000,
			success: function(data){
				data = data['data'];
				if(!Global.isset(data[0]) ){
					self.location = pageObj.landingpage;
					return;
				}
				var filldata = data[0];
				pageObj.record = Global.parse(Global.stringify(filldata));
				GlobalUI.fillData(pageObj.elem, filldata, function(key, val, obj){
					//example execution upon callback
					if(key=="id"){
						//do something
					}
				});
				GlobalUI.PageAdd.initCallback(pageObj);
			},
			error: function(jqXHR, textStatus){
				Global.hideLoading();
				alert('Failed from '+textStatus);
			}
		});
	}
	else{
		GlobalUI.PageAdd.initCallback(pageObj);
	}
}

/**************************************** PAGE DATA TABLE FUNCTIONS **********************************************************************************************/

GlobalUI.PageTable = {};

GlobalUI.PageTable.ajaxPage = function(pageObj, href){
	var url = href;
	//parameters
	if(url.indexOf(pageObj.landingpage+"/view")>=0){
		url = url.replace(pageObj.landingpage+"/view?", pageObj.landingpage+"/view/true?params="+pageObj.paramsjson+"&");
	}
	else if(url.indexOf(pageObj.landingpage+"/edit")>=0){
		url = url.replace(pageObj.landingpage+"/edit?", pageObj.landingpage+"/edit/true?params="+pageObj.paramsjson+"&");
	}
	else if(url.indexOf(pageObj.landingpage+"/add?")>=0){
		url = url.replace(pageObj.landingpage+"/add?", pageObj.landingpage+"/add/true?params="+pageObj.paramsjson+"&");
	}
	else if(url.indexOf(pageObj.landingpage+"/add")>=0){
		url = url.replace(pageObj.landingpage+"/add", pageObj.landingpage+"/add/true?params="+pageObj.paramsjson+"&");
	}
	else if(url.indexOf(pageObj.landingpage)>=0){
		url = url.replace(pageObj.landingpage, pageObj.landingpage+"/index/true");
	}
	Global.loading();
	$.ajax({
		method: "GET",
		url: url,
		timeout: 30000,
		success: function(result){
			Global.hideLoading();
			$(".main-content").html(result);
		},
		error: function(jqXHR, textStatus){
			Global.hideLoading();
			Global.error('Failed from '+textStatus);
		}
	});
}

GlobalUI.PageTable.initFinal = function(pageObj){
	/*********** EVENTS **************/
	
	//unbind pop state
	$(window).unbind("popstate")
	//set fetch on links and data-ct (counter)
	$(window).bind("popstate", function(e) {
		var href = window.location.href;
		GlobalUI.PageTable.ajaxPage(pageObj, href);
	});
	
	/******* IMPLEMENTATION **********/
	pageObj.elem.removeClass("hide");
}

GlobalUI.PageTable.initCallback = function(pageObj){
	var len = pageObj.elem.find(".x-page-table td:nth-child(1)").length;
	var tablepagesinfo = pageObj.dataTable.page.info();
	var columns = pageObj.columns;
	
	/*********** EVENTS **************/
	
	//filter
	
	pageObj.elem.find(".x-showhidefilter").off("click").on("click", function(e, initialize){
		var elem = pageObj.elem;
		var obj = $(this);
		headerfilter = $(elem.find(".dataTable").find("thead")[1]);
		//headerfilter = elem.find(".x-filters-head");
		if(headerfilter.hasClass("hide")){
			headerfilter.removeClass("hide");
			localforage.setItem('filter', 'show', function(){});
		}
		else{
			headerfilter.addClass("hide");
			localforage.setItem('filter', 'hide', function(){});
		}
	});
	
	//audit_logs
	pageObj.elem.find(".btn-logs").on("click", function(){
		var table = $(this).attr("data-table");
		var tableid = $(this).attr("data-tableid");
		pageAuditLogs.loadLogs(table, tableid, pageObj.landingpage);
	});
	
	//add button
	pageObj.elem.find(".btn-add").unbind("click").click(function(){
		Global.loading();
	});	
	
	/******* IMPLEMENTATION **********/
	
	//filter
	headerfilter = $(pageObj.elem.find(".dataTable").find("thead")[1]);
	//headerfilter.addClass("hide");
	localforage.getItem('filter', function(error, data){
		var pageObj = this.pageObj;
		var elem = pageObj.elem;
		headerfilter = $(elem.find(".dataTable").find("thead")[1]);
		if(data=="show"){
			headerfilter.removeClass("hide");
		}
		else{
			headerfilter.addClass("hide");
		}
	}.bind({pageObj:pageObj}));
	
	//add class to each row
	pageObj.elem.find(".x-page-table tbody tr").each(function (key){
		var obj = $(this);
		obj.addClass("x-tr-row");
	});

	//counter
	pageObj.elem.find(".x-page-table td:nth-child(1)").each(function (key){
		var elem = $(this);
		if ( pageObj.dataTable.data().any() ) {
			 elem.html(key+1+tablepagesinfo.start);
		}
	});
	pageObj.elem.find(".x-page-table td:nth-child(1)").attr("data-column", "defaultcounter").addClass("x-td-defaultcounter");
	pageObj.elem.find(".x-page-table td:nth-child(1)").attr("data-column", "defaultcounter").addClass("defaultcounter");
	
	//add class and column name
	var n = 2;
	for(field of columns['fields']){
		pageObj.elem.find(".x-page-table td:nth-child("+n+")").attr("data-column", field).addClass("x-td-"+field);
		n++;
	}
	
	//action
	pageObj.elem.find(".x-page-table td:nth-child("+n+")").attr("data-column", "defaultactions").addClass("x-td-defaultactions");
	pageObj.elem.find(".x-page-table td:nth-child("+n+")").attr("data-column", "defaultactions").addClass("defaultactions");
	
	//hide columns
	for(hiddenfield of columns['hidden']){
		pageObj.elem.find(".x-th-"+hiddenfield).addClass("hide");
		pageObj.elem.find(".x-td-"+hiddenfield).addClass("hide");
	}
	
	//file columns
	for(field of columns['files']){
		pageObj.elem.find(".x-td-"+field).addClass("x-td-type-file");
	}
	pageObj.elem.find(".x-td-type-file").each(function key(){
		var elem = $(this);
		var cellvalue = elem.text();
		var pieces = cellvalue.split("file?p=");
		var path = Base64.decode(pieces[pieces.length-1]);
		var base = path.split(/\//g);
		base = base[base.length-1];
		base = base.split('_').slice(1).join('_');;
		if(base!=""){
			var html = $("<a></a>");
			html.html(" <i class='fa fa-file'></i> "+base);
			html.attr("href", cellvalue);
			html.attr("target", "_blank");
			elem.html(html);
		}
	});
	
	//multi file columns
	for(field of columns['multifiles']){
		pageObj.elem.find(".x-td-"+field).addClass("x-td-type-multifile");
	}
	pageObj.elem.find(".x-td-type-multifile").each(function key(){
		var elem = $(this);
		var cellvalue = elem.text();
		elem.html("");
		try{
			var arr = Global.parse(cellvalue);
			for(x in arr){ 
				cellvalue = arr[x];
				var pieces = cellvalue.split("file?p=");
				var path = Base64.decode(pieces[pieces.length-1]);
				var base = path.split(/\//g);
				base = base[base.length-1];
				base = base.split('_').slice(1).join('_');;
				if(base!=""){
					var html = $("<a></a>");
					html.html(" <i class='fa fa-file'></i> "+base);
					html.attr("href", cellvalue);
					html.attr("target", "_blank");
					elem.append(html);
					elem.append("&nbsp;");
				}
			}
		}
		catch(e){
		}
	});
	
	//image file columns
	for(field of columns['imagefiles']){
		pageObj.elem.find(".x-td-"+field).addClass("x-td-type-imagefile");
	}
	pageObj.elem.find(".x-td-type-imagefile").each(function key(){
		var elem = $(this);
		var cellvalue = elem.text();
		var pieces = cellvalue.split("file?p=");
		var path = Base64.decode(pieces[pieces.length-1]);
		var base = path.split(/\//g);
		base = base[base.length-1];
		base = base.split('_').slice(1).join('_');;
		if(base!=""){
			var html = $("<a></a>");
			html.attr("href", cellvalue);
			html.attr("target", "_blank");
			var img = $("<img />")
			img.css("width", "150px");
			img.attr("src", cellvalue);
			html.append(img);
			elem.html(html);
		}
	});
	
	//actions
	pageObj.elem.find(".x-td-defaultactions").each(function (){
		var elem = $(this);
		var json = elem.text();
		var r = Global.parse(json);
		var id = r['id'];
		elem.parent().attr("data-json", json); //add id to TR
		elem.parent().attr("data-id", id); //add id to TR
		elem.html('<div class="icon-crud-container" data-id="'+id+'">' +
			'<a href="'+pageObj.landingpage+'/view?id='+id+(pageObj.forwardqs?"&"+pageObj.forwardqs:"")+'" class="actionbutton perms x-actionbutton-view" data-perms=\'["'+pageObj.slug+'-view","'+pageObj.slug+'-edit","'+pageObj.slug+'-delete"]\'><button class="ab"><i class="icon icon-left fa fa-file-text-o icon-crud recordview"></i></button></a>' +
			'<a href="'+pageObj.landingpage+'/edit?id='+id+(pageObj.forwardqs?"&"+pageObj.forwardqs:"")+'" class="actionbutton perms x-actionbutton-edit" data-perms=\'["'+pageObj.slug+'-edit"]\'><button class="ab"><i class="icon icon-left fa fa-edit icon-crud recordedit"></i></button></a>'
		);
	});
	
	//action buttons
	pageObj.elem.find(".actionbutton").click(function(){
		var href = $(this).attr("href");
		history.pushState(null, null, href);
		GlobalUI.PageTable.ajaxPage(pageObj, href);
		return false;
	});
	//add params on add button
	pageObj.elem.find(".btn-add").attr("href", pageObj.landingpage+"/add"+(pageObj.forwardqs?"?"+pageObj.forwardqs:""));
	//remove the desc / asc icon
	pageObj.elem.find(".x-th-defaultcounter").removeClass('sorting_desc');
	pageObj.elem.find(".x-th-defaultcounter").removeClass('sorting_asc');
	
	//hide buttons depending on perms
	User.setPerms();
	
	//custom init
	pageObj.initCustom();
	//final init
	GlobalUI.PageTable.initFinal(pageObj);
	
}

GlobalUI.PageTable.populateContents = function(pageObj){
	var elem = pageObj.elem;
	
	//to be able to add get params in endpoint
	if(pageObj.endpoint.indexOf("?")<0){
		pageObj.endpoint = pageObj.endpoint+"?_="+(new Date()).getTime();
	}
	
	//parameters (params)
	//JSON structure
	/*
		{
			"search":"",
			"columns":["","","","",""],
			"order":0,
			"dir":"desc",
			"start":0,
			"length":0
		}
	*/
	var paramsjson = pageObj.paramsjson;
	var p_order = pageObj.datatableordering;
	var p_length = 10;
	var p_start = 0;
	var p_searchcols = [];
	var p_search = "";
	try{
		var params = Global.parse(paramsjson);
		if(Global.isset(params['order'])){
			var dir = "asc";
			if(Global.isset(params['dir'])){
				dir = params['dir'];
			}
			p_order =  [ params['order'], dir ] ;
		}
		if(Global.isset(params['length'])){
			p_length = params['length'] * 1;
		}
		if(Global.isset(params['start'])){
			p_start = params['start'] * 1;
		}
		if(Global.isset(params['columns'])){
			try{
				for(x in params['columns']){
					p_searchcols.push({"search":params['columns'][x]});
				}
			}
			catch(e){
			}
		}
		if(Global.isset(params['search'])){
			p_search = params['search'];
		}
		pageObj.paramsjson = Global.stringify(params);
	}
	catch(e){}
	pageObj.dataTable = elem.find('.x-page-table').DataTable({
		"lengthMenu": [[10, 25, 50, 100, 500], [10, 25, 50, 100, 500]],
		//parameters
		"order": [p_order],
		"pageLength": p_length,
		"displayStart": p_start,
		"searchCols": p_searchcols,
		"search": {
			"search": p_search
		},
		"initComplete": function () {
			this.api().columns().every( function () {
				var column = this
				//head filter
				var columnelem = $($($(column.header()).parents("table").find("thead")[1]).find("th")[column.index()]);
				//setup search 
				var tableObj = columnelem.parents(".dataTables_wrapper");
				var searchContainer = tableObj.find(".x-search-container");
				var searchForm = searchContainer.find("[type='search']");
				if($(".x-search-container-new").length){
					//searchContainer.removeClass("hide");
					searchForm.attr("placeholder", "Search...");
					searchForm.parents(".am-datatable-header").css("padding", "10px");
					$(".x-search-container-new").append(searchForm);
				}
				//select2
				var select2 = columnelem.attr("data-select2");
				if(Global.isset(select2)){
					var datatable = columnelem.attr("data-table");
					var dataendpoint = columnelem.attr("data-endpoint");
					var datavalues = columnelem.attr("data-values");
					var headfilter = $('<select class="x-select2 x-headerfilter form-control input-sm" ></select>');
					headfilter.attr("data-type", "basic");
					if(Global.isset(datavalues)){
						try{
							var dataarr = Global.parse(datavalues);
							for(val in dataarr){
								var html = dataarr[val];
								var option = $("<option></option>");
								option.val(val);
								option.html(html);
								headfilter.append(option);
							}
						}
						catch(e){
						}
					}
					else if(Global.isset(datatable)){
						headfilter.attr("data-table", datatable);
					}
					else if(Global.isset(dataendpoint)){
						headfilter.attr("data-endpoint", dataendpoint);
					}
					headfilter.attr("data-index", column.index());
					headfilter.appendTo( columnelem.empty() ) //filter on the head
					headfilter.on("change", function(){
						$($(this).parents("table").find(".footerfilter")[$(this).attr("data-index")]).val($(this).val());
						var val = $(this).val();
						column.search( val ? val : '',false ,false ).draw();
					})
					
					//footer filter
					var footerfilter = $('<select class="x-select2 footerfilter form-control input-sm" ></select>');
					footerfilter.attr("data-type", "basic");
					if(Global.isset(datavalues)){
						try{
							var dataarr = Global.parse(datavalues);
							for(val in dataarr){
								var html = dataarr[val];
								var option = $("<option></option>");
								option.val(val);
								option.html(html);
								footerfilter.append(option);
							}
						}
						catch(e){
						}
					}
					else if(Global.isset(datatable)){
						footerfilter.attr("data-table", datatable);
					}
					else if(Global.isset(dataendpoint)){
						footerfilter.attr("data-endpoint", dataendpoint);
					}
					footerfilter.attr("data-index", column.index());
					footerfilter.appendTo( $(column.footer()).empty() ) //filter on the head
					footerfilter.on("change", function(){
						$($(this).parents("table").find(".x-headerfilter")[$(this).attr("data-index")]).val($(this).val());
						var val = $(this).val();
						column.search( val ? val : '',false ,false ).draw();
					})
				}
				else{
					var headfilter = $('<input type="text" placeholder="Filter" class="headerfilter x-headerfilter form-control input-sm" />');
					headfilter.attr("data-index", column.index());
					headfilter.appendTo( columnelem.empty() ) //filter on the head
					headfilter.on( 'keyup', function () {
						clearInterval(pageObj.filterInterval);
						pageObj.filterInterval = setTimeout(() => {
							$($(this).parents("table").find(".footerfilter")[$(this).attr("data-index")]).val($(this).val());
							/*
							var val = $.fn.dataTable.util.escapeRegex(
								$(this).val()
							);
							*/
							var val = $(this).val();
							column.search( val ? val : '',false ,false ).draw();
						}, 1000)
					});
					
					//footer filter
					var footerfilter = $('<input type="text" placeholder="Filter" class="footerfilter form-control input-sm" />');
					footerfilter.appendTo( $(column.footer()).empty() ) //filter on the footer
					footerfilter.attr("data-index", column.index());
					footerfilter.on( 'keyup', function () {
						clearInterval(pageObj.footerInterval);
						pageObj.footerInterval = setTimeout(() => {
							$($(this).parents("table").find(".x-headerfilter")[$(this).attr("data-index")]).val($(this).val());
							/*
							var val = $.fn.dataTable.util.escapeRegex(
								$(this).val()
							);
							*/
							var val = $(this).val();
							column.search( val ? val : '',false ,false ).draw();
						}, 1000)
						
					} );
				}
				
			} );
			try{
				var params = Global.parse(pageObj.paramsjson);
				if(Global.isset(params['columns'])){
					try{
						for(x in params['columns']){
							$(pageObj.elem.find(".x-headerfilter")[x]).attr("data-initvalue", params['columns'][x]);
							$(pageObj.elem.find(".footerfilter")[x]).attr("data-initvalue", params['columns'][x]);
							$(pageObj.elem.find(".x-headerfilter")[x]).val(params['columns'][x]);
							$(pageObj.elem.find(".footerfilter")[x]).val(params['columns'][x]);
						}
					}
					catch(e){
					}
				}
			}
			catch(e){}
			
			//select2
			pageObj.elem.find(".x-select2").each(function(){
				var elem = $(this);
				GlobalUI.select2init(pageObj, elem, function(){ });
			});	
		},
		"autoWidth": false,
		"columnDefs": [ 
			{
				"targets": 'no-sort',
				"orderable": false,
			},
			{
				"targets": 'sort',
				"orderable": true,
			},
			{
				"targets": 0,
				"orderable": false
			},
			{
				/* "width": "14%", */
				"targets": pageObj.elem.find(".x-columns th").length - 1,
				"orderable": false
			}
			
		],
		"processing": true,
		"serverSide": true,
		"pagingType": "full_numbers",
		"drawCallback": function(settings){
			GlobalUI.PageTable.initCallback(pageObj);
		},
		"ajax": {
			//parameters
			"url": pageObj.endpoint+"&getdata=datatable"+(pageObj.forwardqs?"&"+pageObj.forwardqs:""), //forward qs
			"dataSrc": function ( json ) {
				pageObj.elem.find('.btn-xls').attr("href", pageObj.endpoint+"&getdata=download&exportref="+ json['exportref'])+(pageObj.forwardqs?"&"+pageObj.forwardqs:""); //forward qs
				return json['data'];
			},
			"data": function(d){
				//parameters
				if(pageObj.paramsloaded){ //if no longer initialization (skip in initial load to avoid pushstates)
					var params = {};
					hasparams = false ; 
					if(Global.isset(d)){
						if(Global.isset(d.search) && Global.isset(d.search.value)){ 
							params['search'] = d.search.value;
							hasparams = true;
						}
						if(Global.isset(d.columns)){ 
							var hascols = false;
							try{
								for(x in d.columns){
									var value = d.columns[x].search.value;
									if(Global.isset(value)){
										hascols = true;
										params['columns'] = [];
									}
								}
								if(hascols){
									for(x in d.columns){
										var value = d.columns[x].search.value;
										params['columns'].push(value);
									}
								}
							}
							catch(e){}
						}
						if(Global.isset(d.order) && Global.isset(d.order[0])){
							params['order'] = d.order[0].column;
							params['dir'] = d.order[0].dir;
							hasparams = true;
						}
						if(Global.isset(d.start)){ 
							params['start'] = d.start;
							hasparams = true;
						}
						if(Global.isset(d.length)){ 
							params['length'] = d.length;
							hasparams = true;
						}
						//forward qs
						var url = pageObj.landingpage;
						if(hasparams){
							var paramsjson = encodeURIComponent(Global.stringify(params));
							pageObj.paramsjson = paramsjson;
							url = url +"?params="+paramsjson+(pageObj.forwardqs?"&"+pageObj.forwardqs:"");
						}
						else{
							url = url +(pageObj.forwardqs?"?"+pageObj.forwardqs:"");
						}
						history.pushState(null, null, url);
					}
				}
				pageObj.paramsloaded = true;
			}
		},
		//parameters
		//"deferLoading": 1, //defer loading
		/* dom: "<'row am-datatable-header'<'col-sm-6'l><'col-sm-6'f>>" +
			 "<'row am-datatable-header'<'col-sm-12 custom-search input-sm'>>" +
			 "<'row am-datatable-body'<'col-sm-12'tr>>" +
			 "<'row am-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>" */
			 
		dom: "<'row am-datatable-header'<'col-sm-12 hide x-search-container'f>>" +
				 "<'row am-datatable-header'<'col-sm-12 custom-search input-sm'>>" +
				 "<'row am-datatable-body'<'col-sm-12'tr>>" +
				 "<'row am-datatable-footer'<'col-sm-5 mt-3'l><'col-md-7'<'float-right'<'float-left mt-3 mr-10'i><'float-left'p>>>>"+
				 ""
	});
	//if we want to add further custom search
	//pageObj.elem.find(".custom-search").html("hello world");
	pageObj.elem.find(".custom-search").parent().hide();	
}

/*
<div class="x-cloneable">
	<button class="x-add">Add</button>
	<div data-base-cloneable-parent="x-test">
		<div data-base-cloneable-template="x-test" class="hide">
			<button data-base-cloneable-delete >Delete</button>
			the template
		</div>
	</div>
</div>
<script>
	$(".x-add").off("click").click(function(e, initialize){
		var elem = $(".x-cloneable");
		GlobalUI.clone({
			//container: elem, //(optional) the container jquery element. if no value set, defaults to $("body")
			name: "x-test", //value of data-base-cloneable-parent and data-base-cloneable-template
			success: function(cloneObj, parentObj){
				//alert(parentObj.find("[data-base-cloneable-item]").length);
			},
			error: function(error){
				alert(error);
			},
			delete: function(parentObj){
				//alert(parentObj.find("[data-base-cloneable-item]").length);
			}
		});
		return false;
	});
</script>
*/

GlobalUI.clone = function(args){
	/*
	data-base-cloneable-parent
	data-base-cloneable-template
	data-base-cloneable-item
	data-base-cloneable-delete
	*/
	//callbacks
	var successcb = args['success'];
	var errorcb = args['error'];
	var deletecb = args['delete'];
	if(typeof successcb != "function"){
		successcb = function(){};
	}
	if(typeof errorcb != "function"){
		errorcb = function(){};
	}
	if(typeof deletecb != "function"){
		deletecb = function(){};
	}
	//container
	var containerobj = args['container'];
	if(!Global.isset(containerobj)){
		containerobj = $("body");
	}
	if(containerobj.length==0 || typeof containerobj.html != "function" ){
		errorcb("Invalid container");
		return false;
	}
	//data
	var data = args['data'];
	if(!Global.isset(data)){
		data = {};
	}
	//name of the clone
	var name = args['name'];
	if(!Global.isset(name)){
		errorcb("Please input the name of the clone template");
		return false;
	}
	var parentObj = containerobj.find("[data-base-cloneable-parent='"+name+"']");
	var iscontainerparent = false;
	if(parentObj.length<=0){
		//check if actual container is the parent 
		if(containerobj.attr("data-base-cloneable-parent")==name){
			parentObj = containerobj;
			iscontainerparent = true;
		}
	}
	parentObj.each(function(){
		var obj = $(this);
		var parentname = obj.attr("data-base-cloneable-parent");
		var parentnamemd5 = md5(parentname);
		obj.attr("data-base-cloneable-parentmd5", parentnamemd5);
	})
	//to make sure underscores arent found
	if(iscontainerparent){
		parentObj = $("[data-base-cloneable-parentmd5='"+md5(name)+"']");
	}
	else{
		parentObj = containerobj.find("[data-base-cloneable-parentmd5='"+md5(name)+"']");
	}
	var template = containerobj.find("[data-base-cloneable-template='"+name+"']");
	if(parentObj.length==0){
		errorcb("data-base-cloneable-parent=\""+name+"\" not found!");
		return false;
	}
	if(template.length==0){
		errorcb("data-base-cloneable-template=\""+name+"\" not found!");
		return false;
	}
	if(parentObj.length>1){
		errorcb("Multiple instances of data-base-cloneable-parent=\""+name+"\" found!\n\ndata-base-cloneable-parent value must be unique.");
		return false;
	}
	if(template.length>1){
		errorcb("Multiple instances of data-base-cloneable-template=\""+name+"\" found!\n\ndata-base-cloneable-template value must be unique.");
		return false;
	}
	var cloneObj = template.clone();
	cloneObj.removeClass("hide");
	cloneObj.removeAttr("data-base-cloneable-template");
	cloneObj.attr("data-base-cloneable-item", name)
	var json = Global.stringify(data);
	cloneObj.attr("data-json", json);
	//update clone 
	/** events **/
	cloneObj.find("[data-base-cloneable-delete]").off("click").click(function(e, initialize){
		var deletecb = this.deletecb;
		var cloneObj = this.cloneObj;
		cloneObj.remove();
		deletecb(parentObj);
		/*
		Global.confirm("Confirm Delete?", function(n){
			if(n){
				this.cloneObj.remove();
			}
		}.bind({cloneObj:cloneObj}));
		*/
		return false;
	}.bind({parentObj:parentObj, cloneObj:cloneObj, deletecb:deletecb}));
	/** implementation **/		
	//append clone
	successcb(cloneObj, parentObj, data);
	parentObj.append(cloneObj);
	
}