<?php
//usage
/*
	$this->load->view("app/content/forms/select", ["label"=>"Select", "name"=>"", "required"=>0, "class"=>"", "html"=>"", "extratags"=>""]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div>
		<select data-type="basic" class="select2-basic form-control x-form <?php 
			echo $name." x-form-".$name." "; 
			echo (($class)? $class: "")."\" ";  
			echo (($name)? "name='".$name."'": "")." ";
			echo (($name)? "data-name='".$name."'": "")." ";
			echo (($extratags)? $extratags: "")." ";
			echo (($required)? "required": "")." ";
		?>><?php echo (($html)? $html : ""); ?></select>
	</div>
</div>