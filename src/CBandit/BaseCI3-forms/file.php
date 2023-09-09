<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/file", [
		"label"=>"File", 
		"name"=>"file", 
		"required"=>0, 
		"extratags"=>""
	]);
	
	//javascript events
	//when the file gets initialized
	elem.find(".x-form-file").off("x-form-init").on("x-form-init", function(){
		alert("file: x-form-init event fired")
	})
	//when the file gets uploaded
	elem.find(".x-form-file").off("x-form-onupload").on("x-form-onupload", function(){
		alert("file: x-form-onupload event fired")
	})
	
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div class="fileupload-container x-fileupload-container">
		<div class="<?php echo $name." x-form-".$name." "; ?> fileuploadurl x-form " data-name="<?php echo $name  ?>" ></div>
		<input type="hidden" name="<?php echo $name  ?>" class="x-hidden-input <?php 
			echo (($class)? $class: "")." ";
			echo $name  ?>_hidden" <?php 
			echo (($required)? "required": "")." "; 
			echo (($extratags)? $extratags : "")." ";
		?> />
		<div class="input-group col-md-10">
			<input type="file" class="form-control fileupload file_input" data-column="<?php echo $name; ?>" />
			<div class="input-group-append">
				<button class="btn-outline-secondary btn-clear-file col-md-2" type="button" data-column="<?php echo $name; ?>">Clear</button>
			</div>
		</div>
	</div>
</div>