<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/date", [
		"label"=>"Date", 
		"name"=>"date", 
		"required"=>0, 
		"placeholder"=>"YYYY-MM-DD", 
		"datainitvalue"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<input data-min-view="2" data-date-format="yyyy-mm-dd" autocomplete="off" class="datetimepicker form-control x-form <?php 
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

