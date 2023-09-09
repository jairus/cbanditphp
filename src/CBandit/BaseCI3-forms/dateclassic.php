<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/dateclassic", ["label"=>"Date Classic", "name"=>"dateclassic", "required"=>0, "placeholder"=>"YYYY-MM-DD", "value"=>"", "class"=>"", "extratags"=>"");
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<input autocomplete="off" class="datepicker form-control x-form <?php 
		echo $name." x-form-".$name." "; 
		echo (($class)? $class: "")."\" ";  
		echo (($name)? "name='".$name."'": "")." ";
		echo (($name)? "data-name='".$name."'": "")." ";
		echo (($extratags)? $extratags : "")." ";
		echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
		echo (($required)? "required": "")." ";
		echo (($value)? "value='".$value."'": "")." ";
	?>>
</div>

