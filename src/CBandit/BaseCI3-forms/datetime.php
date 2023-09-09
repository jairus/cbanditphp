<?php
//usage
/*
	$this->load->view("app/content/forms/datetime", [
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
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
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
