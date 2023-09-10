/*
CHARTS
*/
var CHARTS = {};

/*
var data = {};
data['startdate'] = "2021-03-01";
data['enddate'] = "2021-03-31";
data['uri'] = "pie";
CHARTS.fetch(
	data,
	//success
	function(result){
		
	},
	//error
	function(error){
		
	}
);
*/
CHARTS.fetch = function(data, successcb, errorcb){
	CHARTS.ajax({
		method: "POST",
		url: data['uri'],
		data: data,
		success: function(result){
			successcb(result);
		},
		error:errorcb
	});
}


/******************************* UI FUNCTIONS ***********************************/

CHARTS.pieUI = function(elem, obj, result){
	var pie = obj.find(".x-pie");
	var info = obj.find(".x-pie-info");
	var piedata = result['data']['piedata'];
	var infodata = result['data']['infodata'];
	//pie
	var colors = [];
	for(row of piedata){
		colors.push(row['color'])
	}
	var legendContainer = pie.parent().next().find(".legend");
	$.plot(pie, piedata, {
		series:{
			pie:{
				show: true,
				highlight: {
					opacity: 0.1
				}
			}
		},
		grid:{
			hoverable: true
		},
		legend:{
			container: legendContainer
		},
		colors: colors  
	});
	//info
	for(x in infodata){
		$(obj.find(".x-pie-info").find('.x-title')[x]).text(infodata[x]['label']);
		$(obj.find(".x-pie-info").find('.x-toggle')[x]).attr("data-end", infodata[x]['data']);
	}
	info.find('.x-toggle').each(function(i, e){
		var _el       = $(this);
		var prefix    = '';
		var suffix    = '';
		var start     = 0;
		var end       = 0;
		var decimals  = 0;
		var duration  = 2.5;
		if( _el.data('prefix') ){ prefix = _el.data('prefix'); }
		if( _el.data('suffix') ){ suffix = _el.data('suffix'); }
		if( _el.data('start') ){ start = _el.data('start'); }
		if( _el.data('end') ){ end = _el.data('end'); }
		if( _el.data('decimals') ){ decimals = _el.data('decimals'); }
		if( _el.data('duration') ){ duration = _el.data('duration'); }
		var count = new CountUp(_el.get(0), start, end, decimals, duration, { 
		  suffix: suffix,
		  prefix: prefix,
		});
		count.start();
	});
}


/*** USEFUL FUNCTIONS *********************************************************************************************************/

CHARTS.ajax = function(options){
	Global.log(options.data);
	var noloading = "";
	if(Global.isset(options.data) && Global.isset(options.data.noloading)){
		noloading = options.data.noloading;
	}
	if(Global.isset(noloading)){
		delete options.data.noloading;
	}
	else {
		Global.loading();
	}
	$.ajax({
		method: options.method,
		dataType: 'json',
		timeout: 30000,
		url: "/api/charts/" + options.url,
		data: options.data,
		beforeSend: function(xhr){
			if(Global.isset(options.headers)){
				$.each(options.headers, function(key, value){
					xhr.setRequestHeader(key, value);
				});
			}
		},
		success: function(result, textStatus, jqXHR){
			if(Global.isset(result.error)){
				options.error(result.error, result);
			}
			else {
				options.success(result)
			}
			Global.hideLoading();
		},
		error: function(jqXHR, textStatus, errorThrown){
			options.error("Connection error");
			Global.hideLoading();
		}
	});
}