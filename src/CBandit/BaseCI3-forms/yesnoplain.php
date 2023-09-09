<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/yesno", [
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
	<div class="x-radio-container hide">
		<div>
			<div class="am-radio inline x-radio-yes x-radio-input-container">
				<input class="x-radio-input" type="radio" value="Yes" name="<?php echo $tempid; ?>" id="<?php echo $tempid."yes"; ?>">
				<label for="<?php echo $tempid."yes"; ?>">Yes</label>
			</div>
			<div class="am-radio inline x-radio-no x-radio-input-container">
				<input class="x-radio-input" type="radio" value="No" name="<?php echo $tempid; ?>" id="<?php echo $tempid."no"; ?>">
				<label for="<?php echo $tempid."no"; ?>">No</label>
			</div>
		</div>
		<input type="text" <?php echo ($required)? "required": "" ?> name="<?php echo $name; ?>" data-name="<?php echo $name; ?>" class="<?php
			echo "x-yesno x-form ";
			echo "hide ";
			echo "x-radio-hidden ";
			echo $class." ";
			echo $name." x-form-".$name; 
		?>" <?php
			echo (($extratags)? $extratags : "")." ";
		?> value="<?php echo $datainitvalue; ?>" data-initvalue="<?php echo $datainitvalue; ?>" />
	</div>
</div>