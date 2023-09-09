<?php
//usage
/*
	$this->load->view("app/content/forms/peso", [
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
if(!$placeholder){
	$placeholder = "";
}
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div style="position: relative; height: 45px;">
		<div class="form-control" style="position: absolute; width: 100%; z-index:0; padding-top:12px;">
			PHP
		</div>
		<input min="0.00" style="padding-left: 40px; position: absolute; width: 100%; background: none; z-index:1" data-formtype="basic" type="number" step="0.01" autocomplete="off" data-parsley-trigger="keyup" data-parsley-type="number" class="form-control x-form <?php 
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
</div>