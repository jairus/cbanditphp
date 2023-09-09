<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/accountpassword", [
		"label"=>"Account Password", 
		"name"=>"accountpassword", 
		"required"=>0, 
		"placeholder"=>"Input password to update", 
		"value"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<input data-formtype="basic" autocomplete="off" type="password" class="form-control passwordtype x-form <?php 
		echo $name." x-form-".$name." "; 
		echo (($class)? $class: "")."\" ";  
		echo (($name)? "data-name='".$name."'": "")." ";
		echo (($extratags)? $extratags : "")." ";
		echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
		echo (($required)? "required": "")." ";
		echo (($value)? "value='".$value."'": "")." ";
	?>>
</div>