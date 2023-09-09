<?php
//usage
/*
	$this->load->view("app/content/forms/password", [
		"label"=>"Password", 
		"name"=>"password", 
		"required"=>0, 
		"placeholder"=>"Input password to update", 
		"value"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
if(!$placeholder){
	$placeholder = "Input password to update";
}
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<input data-formtype="password" autocomplete="off" type="password" class="form-control x-form <?php 
		echo $name." x-form-".$name." "; 
		echo (($class)? $class: "")."\" ";  
		echo (($name)? "data-name='".$name."'": "")." ";
		echo (($extratags)? $extratags : "")." ";
		echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
		echo (($required)? "required": "")." ";
		echo (($value)? "value='".$value."'": "")." ";
	?>>
</div>