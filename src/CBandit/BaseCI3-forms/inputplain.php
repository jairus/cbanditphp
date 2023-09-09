<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/inputplain", [
		"label"=>"Input", 
		"name"=>"input", 
		"required"=>1, 
		"placeholder"=>"", 
		"datainitvalue"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group" style="margin:0px; padding:0px;">
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
</div>