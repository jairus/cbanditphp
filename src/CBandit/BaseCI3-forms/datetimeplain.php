<?php
//usage
/*
	$this->load->view("app/content/forms/datetimeplain", [
		"label"=>"Date Time", 
		"name"=>"datetime", 
		"required"=>0, 
		"placeholder"=>"YYYY-MM-DD HH:mm", 
		"datainitvalue"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group" style="margin:0px; padding:0px;">
	<input inputmode="none" autocomplete="off" class="datetimepicker form-control x-form <?php 
		echo $name." x-form-".$name." "; 
		echo (($class)? $class: "")."\" ";  
		echo (($name)? "name='".$name."'": "")." ";
		echo (($name)? "data-name='".$name."'": "")." ";
		echo (($extratags)? $extratags : "")." ";
		echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
		echo (($required)? "required": "")." ";
		echo (($datainitvalue)? "value='".$datainitvalue."'": "")." ";
		echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
	?>>
</div>
