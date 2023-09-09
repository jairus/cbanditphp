<?php
//usage
/*
	$this->load->view("app/content/forms/integer", [
		"label"=>"Integer", 
		"name"=>"integer", 
		"required"=>0, 
		"placeholder"=>"", 
		"datainitvalue"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<input data-formtype="basic" autocomplete="off" type="number" data-parsley-trigger="keyup" data-parsley-type="integer" class="form-control x-form <?php 
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