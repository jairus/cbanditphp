<?php
//usage
/*
	$this->load->view("app/content/forms/accountstatus", [
		"label"=>"Account Status", 
		"name"=>"accountstatus", 
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
		<select data-type="basic" class="hide x-select2 select2-basic form-control x-form <?php 
			echo $name." x-form-".$name." "; 
			echo (($class)? $class: "")."\" ";  
			echo (($name)? "name='".$name."'": "")." ";
			echo (($name)? "data-name='".$name."'": "")." ";
			echo (($extratags)? $extratags : "")." ";
			echo (($required)? "required": "")." ";
			echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
		?>>
		<option value='Active'>Active</option>
		<option value='Inactive'>Inactive</option>
		<option value='Suspended'>Suspended</option>
		</select>
	</div>
</div>