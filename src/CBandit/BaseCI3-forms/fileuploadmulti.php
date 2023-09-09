<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/fileuploadmulti", [
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
	<label class="x-form-label"><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div class="fileupload-container x-fileupload-container">
		<div data-base-cloneable-parent="x-fileuploadmulti-clones-<?php echo $name  ?>">
			<div data-base-cloneable-template="x-fileuploadmulti-clones-<?php echo $name  ?>" class="hide" style="margin-top:5px;">
				<div class="input-group col-md-12" style="position: relative;">
					<!-- the file uploader -->
					<input type="file" class="hide form-control file_input x-fileupload-form" />
					
					<!-- the display file -->
					<input class="form-control x-fileupload-clicktoupload" style="color:green; float:none !important; border-radius: 8px; cursor:pointer; padding-right:45px;" placeholder="Click to upload file" readonly />
					
					<!-- the clear button -->
					<button
						class="btn btn-danger x-fileupload-clearfile"
						style="
							position: absolute;
							height: 27px;
							width: 26px;
							top: 8px;
							right: 10px;
							padding: 3px;
							z-index: 4;
						"
					><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
			</div>
		</div>
		<div class="text-right x-btn-add-container" style="margin-top:10px;">
			<button class="btn btn-primary x-btn-add">+ Add</button>
		</div>
		<textarea 
			style="width: 100%; height: 100px;"
			class="<?php debug("hide"); ?> <?php echo (($class)? $class: "")." "; echo $name." x-form-".$name." "; ?> x-form x-formtype-fileupload"
			<?php echo (($extratags)? $extratags : "")." ";?>
			data-formtype="fileuploadmulti"
			data-name="<?php echo $name  ?>"
			<?php
			echo (($required)? "required": "")." ";
			echo (($datainitvalue)? "value='".$datainitvalue."'": "")." ";
			echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
			?>
		></textarea>
	</div>
</div>