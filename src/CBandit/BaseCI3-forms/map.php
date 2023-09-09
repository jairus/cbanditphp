<?php
/*
nmg\CBandit\BaseCI3::loadForm("app/content/forms/map", [
	"label" => "Drag Map to Pin Location",
	"name"=>"latlong", 
	"required"=>1, 
	"placeholder"=>"Latitude / Longitude", 
	"datainitvalue"=>"14.58779589882566, 121.06181985958547", 
	"class"=>"", 
	"extratags"=>" readonly "
]);
*/
?>
<style>
	/* map styles */
	
	/* on mobile */
	@media only screen and (max-width: 600px) {
		.map-container{
			width: 520px; 
			height: 400px;
		}
	}
	
	/* on desktop */
	@media only screen and (min-width: 601px) {
		.map-container{
			width: 100%; 
			height: 375px;
		}
	}
	
	.map-container{
		margin-bottom: 20px;
		position: relative;
	}
	#map {
		height: 100%;
	}
	#map-infowindow-content .title {
		font-weight: bold;
	}
	#map-infowindow-content {
		display: none;
	}
	#map #map-infowindow-content {
		display: inline;
	}

	/* from class name gmaps */
	.pac-container {
		z-index: 100000 !important;
	}
		
	.map-pac-card {
		background-color: #fff;
		border: 0;
		border-radius: 2px;
		box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.3);
		padding: 0 0.5em;
		font: 400 18px Arial, sans-serif;
		overflow: hidden;
		font-family: Arial;
		padding: 0;
		width: 100%;
	}
	#map-pac-container{
		width: 100%;
		display: block;
	}
	.map-pac-controls {
		display: inline-block;
		padding: 5px 11px;
	}
	.map-pac-controls label {
		font-family: Arial;
		font-size: 13px;
		font-weight: 300;
	}
	#map-pac-input, #map-pac-input:focus {
		background: #FFFFFF;
		border: 1px solid #D1D5DB;
		box-sizing: border-box;
		box-shadow: 0px 1px 2px rgb(0 0 0 / 5%);
		border-radius: 6px;
		padding: 9px 13px;
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		padding: 10px;
		width: 100%;
		outline: none;
	}	
	.map-pin{
		width: 60px;
		position: absolute;
		z-index: 1000;
		left: 50%;
		margin-left: -30px;
		top: 50%;
		margin-top: -60px;
	}
</style>

<div class="form-group g-mb-16">
	<label class="g-mb-4" for="inputGroup-1_1"><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div class="map-container x-map" <?php echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";?> >
		<div class="map-pac-card" id="map-pac-card">
			<div class="hide">
				<div id="type-selector" class="map-pac-controls">
					<input type="radio" name="type" id="changetype-all" checked="checked"/>
					<label for="changetype-all">All</label>
					<input type="radio" name="type" id="changetype-establishment" />
					<label for="changetype-establishment">establishment</label>
					<input type="radio" name="type" id="changetype-address" />
					<label for="changetype-address">address</label>
					<input type="radio" name="type" id="changetype-geocode" />
					<label for="changetype-geocode">geocode</label>
					<input type="radio" name="type" id="changetype-cities" />
					<label for="changetype-cities">(cities)</label>
					<input type="radio" name="type" id="changetype-regions" />
					<label for="changetype-regions">(regions)</label>
				</div>
				<div id="strict-bounds-selector" class="map-pac-controls">
					<input type="checkbox" id="use-location-bias" value="" checked />
					<label for="use-location-bias">Bias to map viewport</label>

					<input type="checkbox" id="use-strict-bounds" value="" />
					<label for="use-strict-bounds">Strict bounds</label>
				</div>
			</div>
			<div id="map-pac-container">
				<table style="width:100%;">
					<tr>
						<td style="text-align:left; padding-left:8px; padding-right:85px; padding-top: 8px; padding-bottom: 8px;">
							<input id="map-pac-input" type="text" placeholder="Enter the location here to search..." />
						</td>
					</tr>
				</table>
			</div>
		</div>
		<svg version="1.1" class="map-pin"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			 viewBox="0 0 293.334 293.334" style="enable-background:new 0 0 293.334 293.334;" xml:space="preserve">
			<g>
				<g>
					<path style="fill:#ff0000;" d="M146.667,0C94.903,0,52.946,41.957,52.946,93.721c0,22.322,7.849,42.789,20.891,58.878
						c4.204,5.178,11.237,13.331,14.903,18.906c21.109,32.069,48.19,78.643,56.082,116.864c1.354,6.527,2.986,6.641,4.743,0.212
						c5.629-20.609,20.228-65.639,50.377-112.757c3.595-5.619,10.884-13.483,15.409-18.379c6.554-7.098,12.009-15.224,16.154-24.084
						c5.651-12.086,8.882-25.466,8.882-39.629C240.387,41.962,198.43,0,146.667,0z M146.667,144.358
						c-28.892,0-52.313-23.421-52.313-52.313c0-28.887,23.421-52.307,52.313-52.307s52.313,23.421,52.313,52.307
						C198.98,120.938,175.559,144.358,146.667,144.358z"/>
					<circle style="fill:#ff0000;" cx="146.667" cy="90.196" r="21.756"/>
				</g>
			</g>
		</svg>
		<div id="map"></div>
		<div id="map-infowindow-content">
			<span id="map-place-name" class="title"></span><br />
			<span id="map-place-address"></span>
		</div>
		<input data-formtype="basic" autocomplete="off" class="form-control x-form <?php 
			echo "x-name-".$name." x-form-".$name." "; 
			echo (($class)? $class: "")."\" ";  
			echo (($name)? "data-name='".$name."'": "")." ";
			echo (($extratags)? $extratags : "")." ";
			echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
			echo (($required)? "required": "")." ";
			echo (($datainitvalue)? "value='".$datainitvalue."'": "")." ";
			echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
		?>>
		<input id="map-latlong" class="hide" />
		<script>
			var GlobalMapIsReady = false;
			var GlobalMapInterval = {};
			function GlobalMapInitReady(){
				GlobalMapIsReady = true;
			}
			function GlobalMapInit() {
				//set center relative to location
				if(navigator.geolocation && !Global.map.attr("data-initvalue")) {
					navigator.geolocation.getCurrentPosition(function(position){
						var lat = position.coords.latitude;
						var lng = position.coords.longitude;
						//alert("lng: "+lng);
						var latLngStr = lat+", "+lng;
						Global.gmap.setCenter(new google.maps.LatLng(lat,lng));
					}, 
					function(err) {
						//alert(err.message);
					});
				}
				
				if(Global.map.attr("data-initvalue")){
					var latlong = Global.map.attr("data-initvalue");
					var latlongr = latlong.split(",");
					var ilat = parseFloat($.trim(latlongr[0]));
					var ilng = parseFloat($.trim(latlongr[1]));
					//alert("ilng: "+ilng);
					//initialize map
					var map = new google.maps.Map(document.getElementById("map"), {
						center: { lat: ilat, lng: ilng },
						zoom: 18,
						mapTypeControl: false,
					});
					//the google map map objet
					Global.gmap = map;
				}
				else{
					//initialize map
					var map = new google.maps.Map(document.getElementById("map"), {
						center: { lat: 14.603638774111237, lng: 120.97432814504141 },
						zoom: 18,
						mapTypeControl: false,
					});
					//the google map map objet
					Global.gmap = map;
				}
				
				if($(".x-form-<?php echo $name; ?>").attr("disabled")){
					map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
					$("#map-pac-container").remove();
				}
				
				
				map.addListener("center_changed", function(){
					var latLng = map.getCenter();
					var lat = latLng.lat();
					var lng = latLng.lng();
					var latLngStr = lat+", "+lng;
					var maplatlong = document.getElementById("map-latlong");
					maplatlong.value = latLngStr;
					Global.map.trigger("x-change", [latLngStr]);
				});
				
				//initial latlong
				var latLng = map.getCenter();
				var lat = latLng.lat();
				var lng = latLng.lng();
				var latLngStr = lat+", "+lng;
				var maplatlong = document.getElementById("map-latlong");
				maplatlong.value = latLngStr;
				Global.map.trigger("x-init", [latLngStr]);
				
				var biasInputElement = document.getElementById("use-location-bias");
				var strictBoundsInputElement = document.getElementById("use-strict-bounds");
				biasInputElement.addEventListener("change", () => {
					if (biasInputElement.checked) {
						autocomplete.bindTo("bounds", map);
					} else {
						// User wants to turn off location bias, so three things need to happen:
						// 1. Unbind from map
						// 2. Reset the bounds to whole world
						// 3. Uncheck the strict bounds checkbox UI (which also disables strict bounds)
						autocomplete.unbind("bounds");
						autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
						strictBoundsInputElement.checked = biasInputElement.checked;
					}

					input.value = "";
				});
				strictBoundsInputElement.addEventListener("change", () => {
					autocomplete.setOptions({
						strictBounds: strictBoundsInputElement.checked,
					});
					if (strictBoundsInputElement.checked) {
						biasInputElement.checked = strictBoundsInputElement.checked;
						autocomplete.bindTo("bounds", map);
					}
					input.value = "";
				});
				
				/********** AUTO COMPLETE ************/
				
				/********** events **********/
				$("#map-pac-input").on("keypress", function(e){
					if(e.keyCode==13){
						return false;
					}
				})
				setInterval(function(){
					if(Global.isset($("#map-pac-input")[0])){
						var top = $("#map-pac-input").offset().top + 95;
						$(".pac-container").css("top", top)
					}
				}, 100)
				
				/****** implementation ******/
				
				
				
				var card = document.getElementById("map-pac-card");
				//var sessionToken = new google.maps.places.AutocompleteSessionToken();
				var options = {
					fields: ["formatted_address", "geometry", "name"],
					componentRestrictions: { country: "ph" },
					strictBounds: false,
					//sessionToken: "<?php echo session_id(); ?>",
					//sessionToken: sessionToken,
					//types: ["establishment"],
				};
				map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
				var input = document.getElementById("map-pac-input");
				var autocomplete = new google.maps.places.Autocomplete(input, options);
				autocomplete.setComponentRestrictions({
					country: ["ph"],
				});
				// Bind the map's bounds (viewport) property to the autocomplete object,
				// so that the autocomplete requests use the current map bounds for the
				// bounds option in the request.
				autocomplete.bindTo("bounds", map);
				var infowindow = new google.maps.InfoWindow();
				var infowindowContent = document.getElementById("map-infowindow-content");
				infowindow.setContent(infowindowContent);
				var marker = new google.maps.Marker({
					map,
					anchorPoint: new google.maps.Point(0, -29),
				});
				autocomplete.addListener("place_changed", () => {
					infowindow.close();
					marker.setVisible(false);
					var place = autocomplete.getPlace();
					if (!place.geometry || !place.geometry.location) {
						// User entered the name of a Place that was not suggested and
						// pressed the Enter key, or the Place Details request failed.
						window.alert("No details available for input: '" + place.name + "'");
						return;
					}
					// If the place has a geometry, then present it on a map.
					if (place.geometry.viewport && 0) {
						map.fitBounds(place.geometry.viewport);
					} else {
						map.setCenter(place.geometry.location);
						map.setZoom(18);
					}
					marker.setPosition(place.geometry.location);
					marker.setVisible(false);
					infowindowContent.children["map-place-name"].textContent = place.name;
					infowindowContent.children["map-place-address"].textContent =
						place.formatted_address;
					infowindow.open(map, marker);
				});
				// Sets a listener on a radio button to change the filter type on Places
				// Autocomplete.
				function setupClickListener(id, types) {
					var radioButton = document.getElementById(id);
					radioButton.addEventListener("click", () => {
						autocomplete.setTypes(types);
						input.value = "";
					});
				}
				setupClickListener("changetype-all", []);
				setupClickListener("changetype-address", ["address"]);
				setupClickListener("changetype-establishment", ["establishment"]);
				setupClickListener("changetype-geocode", ["geocode"]);
				setupClickListener("changetype-cities", ["(cities)"]);
				setupClickListener("changetype-regions", ["(regions)"]);
			}
			Global.map = $(".x-map");
			
			/********** events **********/
			
			$(".x-form-<?php echo $name; ?>").on("x-form-init", function(e){
				var obj = $(this);
				var val = obj.attr("data-initvalue");
				if(Global.isset(val)){
					Global.map.attr("data-initvalue", val);
					var latlongr = val.split(",");
					var ilat = parseFloat($.trim(latlongr[0]));
					var ilng = parseFloat($.trim(latlongr[1]));
				}
				GlobalMapInterval = setInterval(function(){
					if(GlobalMapIsReady){
						clearInterval(GlobalMapInterval);
						GlobalMapInit();
					}
				}, 200)
			});
			
			Global.map.on("x-init", function(e, latlong){
				$(".x-form-<?php echo $name; ?>").val(latlong);
			})
			Global.map.on("x-change", function(e, latlong){
				$(".x-form-<?php echo $name; ?>").val(latlong);
			})
			
			/****** implementation ******/
			//
			
			
		</script>
		<script 
			class="x-map-script"
			async
			src="https://maps.googleapis.com/maps/api/js?key=AIzaSyABBp8Dy_vv30Ykbmsk9UXN9aPnhpr0loI&callback=GlobalMapInitReady&libraries=places&v=weekly&channel=2"
		></script>
	</div>
</div>
