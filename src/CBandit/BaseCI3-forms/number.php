<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/number", [
		"label"=>"Number", 
		"name"=>"number", 
		"required"=>0, 
		"placeholder"=>"", 
		"value"=>"", 
		"datainitvalue"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<input data-formtype="basic" type="number" step="0.01" autocomplete="off" data-parsley-trigger="keyup" data-parsley-type="number" class="form-control x-form <?php 
		echo $name." x-form-".$name." "; 
		echo (($class)? $class: "")."\" ";  
		echo (($name)? "name='".$name."'": "")." ";
		echo (($name)? "data-name='".$name."'": "")." ";
		echo (($extratags)? $extratags : "")." ";
		echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
		echo (($required)? "required": "")." ";
		echo (($datainitvalue!="")? "value='".$datainitvalue."'": "")." ";
		echo (($datainitvalue!="")? "data-initvalue='".$datainitvalue."'": "")." ";
	?>>
</div>