<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/yesnoswitchplain", [
		"label"=>"Display", 
		"name"=>"display", 
		"required"=>0, 
		"datainitvalue"=>"Yes", 
		"class"=>"", 
		"extratags"=>""
	]);
*/

$tempid = "temp".md5(microtime());
?>
<div class="form-group x-form-group" style="background: none">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div class="x-switch-container">
		<div class="switch-button switch-button-yesno">
			<input type="checkbox" class="x-checkbox" name="<?php echo $tempid; ?>" id="<?php echo $tempid; ?>" />
			<span>
				<label for="<?php echo $tempid; ?>"></label>
			</span>
		</div>
		<input type="text" <?php echo ($required)? "required": "" ?> name="<?php echo $name; ?>" data-name="<?php echo $name; ?>" class="<?php
			echo "x-yesnoswitch x-form ";
			echo "hide ";
			echo "x-yesnoswitch-hidden ";
			echo $class." ";
			echo $name." x-form-".$name; 
		?>" <?php
			echo (($extratags)? $extratags : "")." ";
		?> value="<?php echo $datainitvalue; ?>" data-initvalue="<?php echo $datainitvalue; ?>" />
	</div>
</div>