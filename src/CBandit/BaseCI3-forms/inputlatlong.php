<?php
//usage
/*
	$this->load->view("app/content/forms/inputlatlong", [
		"label"=>"Input", 
		"name"=>"input", 
		"required"=>1, 
		"placeholder"=>"", 
		"datainitvalue"=>"", 
		"class"=>"", 
		"extratags"=>""
	]);
*/
if(!$placeholder){
	$placeholder = "e.g. 14.652159255370558, 121.032945794256";
}
?>
<div class="form-group x-form-group">
	
	<table style="width: 100%">
		<tr>
			<td><label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label></td>
			<td style="text-align:right; padding-right:5px;">
				<div>
					<a href="https://maps.google.com" target="_blank">Open Google Maps</a>
				</div>
			</td>
		</tr>
	</table>
	<input data-formtype="basic" autocomplete="off" class="form-control x-form <?php 
		echo "x-name-".$name." x-form-".$name." "; 
		echo (($class)? $class: "")."\" ";  
		echo (($name)? "data-name='".$name."'": "")." ";
		echo (($extratags)? $extratags : "")." ";
		echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
		echo (($required)? "required": "")." ";
		echo (($datainitvalue)? "value='".$datainitvalue."'": "")." ";
		echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
	?>>
</div>