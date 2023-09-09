<?php
//usage
/*
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/image", [
		"label"=>"Image File", 
		"name"=>"imagefile", 
		"dataimgwidth"=>"300", 
		"dataimgheight"=>"300", 
		"displaywidth"=>"",
		"displayheight"=>"",
		"required"=>1, 
	]);
	
	//javascript events
	//when the imagefile gets initialized
	elem.find(".x-form-imagefile").off("x-form-init").on("x-form-init", function(){
		alert("imagefile: x-form-init event fired")
	})
	//when the imagefile gets uploaded
	elem.find(".x-form-imagefile").off("x-form-onupload").on("x-form-onupload", function(){
		alert("imagefile: x-form-onupload event fired")
	})
*/

if($dataimgwidth){
	$propw = "width";
	$displayw = $dataimgwidth;
}
else{
	$propw = "min-width";
	$displayw = "300";
}

if($dataimgheight){
	$proph = "height";
	$displayh = $dataimgheight;
}
else{
	$proph = "min-height";
	$displayh = $displayw*.5;
}
if($displayheight){
	$displayh = $displayheight;
}
if($displaywidth){
	$displayw = $displaywidth;
}
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div class="x-image-container image-container">
		<textarea data-formtype='image' type="text" name="<?php echo $name  ?>" class="
			<?php 
				debug("hide"); 
				echo (($class)? $class: "")." ";
				echo "x-form ";
				echo $name." ";
				echo "x-form-".$name." ";
			?>" 
			<?php 
				echo (($required)? "required": "")." "; 
			?>
			data-name="<?php echo $name; ?>"
			data-imgwidth="<?php echo $dataimgwidth; ?>" 
			data-imgheight="<?php echo $dataimgheight; ?>"
		></textarea>
		<div class="input-group col-md-10">
			<input accept='image/*'  type="file" class="<?php debug("hide"); ?> form-control x-image-uploader" 
				data-name="<?php echo $name; ?>"
				data-imgwidth="<?php echo $dataimgwidth; ?>" 
				data-imgheight="<?php echo $dataimgheight; ?>"
			/>
			<div 
				class="x-btn-takepic btn-takepic" 
				style="
					border-radius: 8px; 
					<?php echo $propw; ?>:<?php echo $displayw+10; ?>px; 
					<?php echo $proph; ?>: <?php echo $displayh+10; ?>px;
					border: 1px solid #cccccc; 
					margin-bottom:5px;
				"  >
				<button class="x-btn-clearpic btn-clearpic hide" data-column="<?php echo $name; ?>"><i class="fa fa-times" aria-hidden="true"></i></button>
				<div class="x-fileuploadimgurl fileuploadimgurl"></div>
			</div>
		</div>
		
	</div>
</div>
									
														