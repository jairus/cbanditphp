<?php
//usage
/*
	$this->load->view("app/content/forms/input", ["label"=>"Input", "name"=>"input", "required"=>1, "placeholder"=>"", "value"=>"", "class"=>"", "extratags"=>""]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<input data-formtype="basic" type="email" autocomplete="off" class="form-control x-form <?php 
		echo $name." x-form-".$name." "; 
		echo (($class)? $class: "")."\" ";  
		echo (($name)? "data-name='".$name."'": "")." ";
		echo (($extratags)? $extratags : "")." ";
		echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
		echo (($required)? "required": "")." ";
		echo (($value)? "value='".$value."'": "")." ";
	?>>
</div>