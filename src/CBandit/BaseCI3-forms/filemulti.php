<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/filemulti", [
		"label"=>"File Multi", 
		"name"=>"filemulti", 
		"required"=>0, 
		"extratags"=>""
	]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div class="fileuploadmulti-container">
		<div class="fileupload-container-template fileupload-container multiple">
			<div class="<?php echo $name." x-form-".$name." ".$class; ?> fileuploadurlmultiple x-form " data-name="<?php echo $name  ?>"></div>
			<input type="hidden" name="<?php echo $name  ?>[]" class="x-hidden-input <?php 
				echo (($class)? $class: "")." ";
				echo $name  ?>_hidden" <?php 
				echo (($required)? "required": "")." "; 
				echo (($extratags)? $extratags : "")." ";
			?> />
			<div class="input-group col-md-12">
				<input type="file" class="form-control fileupload filemulti_input" data-column="<?php echo $name; ?>" <?php
					echo (($extratags)? $extratags : "")." ";
				?>/>
				<div class="input-group-append">
					<button class="btn btn-outline-secondary btn-danger btn-clear-file col-md-2" type="button" data-column="<?php echo $name; ?>" style="width:43px"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
			</div>
		</div>
		<div class="addmore-container"><button class="btn btn-primary btn-green addmore">Add More</button></div>
	</div>
</div>		
														
																							