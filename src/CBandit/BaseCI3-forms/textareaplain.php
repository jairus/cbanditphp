<?php
//usage
/*
	$this->load->view("app/content/forms/textarea", [
		"label"=>"Text Area", 
		"name"=>"textarea", 
		"required"=>0, 
		"placeholder"=>"", 
		"value"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group" style="margin:0px">
	<textarea data-formtype="basic" class="form-control x-form <?php 
		echo $name." x-form-".$name." "; 
		echo (($class)? $class: "")."\" ";  
		echo (($name)? "name='".$name."'": "")." ";
		echo (($name)? "data-name='".$name."'": "")." ";
		echo (($extratags)? $extratags : "")." ";
		echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
		echo (($required)? "required": "")." ";
	?>><?php echo (($value)? $value : ""); ?></textarea>
</div>