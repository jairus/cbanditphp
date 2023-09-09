<?php
//usage
/*
	$this->load->view("app/content/forms/select2basic", [
		"label"=>"Select2 Basic", 
		"name"=>"select2basic", 
		"required"=>0, 
		"datatable"=>"", 
		"datainitvalue"=>"", 
		"dataendpoint"=>"", 
		"class"=>"", 
		"html"=>"",  
		"extratags"=>"" // data-removeblank=1 data-searchtype=1
	]);
	
	for extratags:
		data-removeblank=1 
			- to remove initial blank 
		data-searchtype=1
			- for search types 
			- see controller/api/Select2_controller 'rolessearchtype' function for endpoint example
				
	//javascript events
	
	//when the select2 gets initialized
	elem.find(".x-form-select2basic").off("x-form-init").on("x-form-init", function(){
		alert("select2basic: x-form-init event fired")
	})
	
	//when selected a new value
	//for select2 'change' event, dont turn off change as it is being used by select2 plugin, just add a change event
	elem.find(".x-form-select2basic").on("change", function(){
		alert("select2basic: change event fired")
	})
	
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div>
		<select data-type="basic" class="hide x-select2 select2-basic form-control x-form <?php 
			echo $name." x-form-".$name." "; 
			echo (($class)? $class: "")."\" ";  
			echo (($name)? "name='".$name."'": "")." ";
			echo (($name)? "data-name='".$name."'": "")." ";
			echo (($extratags)? $extratags : "")." ";
			echo (($required)? "required": "")." ";
			echo (($datatable)? "data-table='".$datatable."'": "")." ";
			echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
			echo (($dataendpoint)? "data-endpoint='".$dataendpoint."'": "")." ";
		?>><?php echo (($html)? $html : ""); ?></select>
	</div>
</div>