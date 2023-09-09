<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/accountverified", [
		"label"=>"Account Verified", 
		"name"=>"accountverified", 
		"required"=>0, 
		"value"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div>
		<select data-type="basic" class="hide select2 select2-basic form-control x-form <?php 
			echo $name." x-form-".$name." "; 
			echo (($class)? $class: "")."\" ";  
			echo (($name)? "name='".$name."'": "")." ";
			echo (($name)? "data-name='".$name."'": "")." ";
			echo (($extratags)? $extratags : "")." ";
			echo (($required)? "required": "")." ";
			echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
		?>>
		<option value='0'>No</option><option value='1'>Yes</option>
		</select>
	</div>
</div>