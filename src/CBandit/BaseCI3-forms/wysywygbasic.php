<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/wysywygbasic", [
		"label"=>"Wysywyg Basic", 
		"name"=>"wysywygbasic",
		"required"=>0, 
		"placeholder"=>"", 
		"value"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div class="x-wysywygbasic-container">
		<textarea class="form-control x-wysywygbasic x-form <?php 
			echo $name." x-form-".$name." "; 
			echo (($class)? $class: "")."\" ";  
			echo (($name)? "name='".$name."'": "")." ";
			echo (($name)? "data-name='".$name."'": "")." ";
			echo (($extratags)? $extratags : "")." ";
			echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
			echo (($required)? "required": "")." ";
		?>><?php echo (($value)? $value : ""); ?></textarea>
	</div>
</div>