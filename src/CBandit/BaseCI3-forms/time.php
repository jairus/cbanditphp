<?php
//usage
/*
	$this->load->view("app/content/forms/time", [
		"label"=>"Time", 
		"name"=>"time", 
		"required"=>0, 
		"placeholder"=>"HH:mm", 
		"datainitvalue"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<input data-formtype="basic" type="time" autocomplete="off" class="form-control x-form <?php 
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
