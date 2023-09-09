<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/select2multi", [
		"label"=>"Select2 Multi", 
		"name"=>"select2multi", 
		"required"=>0, 
		"placeholder"=>"", 
		"value"=>"", 
		"class"=>"", 
		"html"=>"", 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div>
		<select data-type="multiple" multiple class="hide x-select2 select2-basic form-control x-form <?php 
			echo $name." x-form-".$name." "; 
			echo (($class)? $class: "")."\" ";  
			echo (($name)? "name='".$name."[]'": "")." ";
			echo (($name)? "data-name='".$name."'": "")." ";
			echo (($extratags)? $extratags : "")." ";
			echo (($required)? "required": "")." ";
			echo (($datatable)? "data-table='".$datatable."'": "")." ";
			echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
			echo (($dataendpoint)? "data-endpoint='".$dataendpoint."'": "")." ";
		?>><?php echo (($html)? $html : ""); ?></select>
	</div>
</div>