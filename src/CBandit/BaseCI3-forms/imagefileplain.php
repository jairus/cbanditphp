<?php
//usage
/*
	$this->load->view("app/content/forms/imagefile", [
		"label"=>"Image File", 
		"name"=>"imagefile", 
		"dataimgwidth"=>"300", 
		"dataimgheight"=>"300", 
		"displaywidth"=>"",
		"displayheight"=>"",
		"required"=>1, 
		"extratags"=>""
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
<div class="form-group x-form-group" style=" margin:0px; padding:0px">
	<div class="x-imagefileupload-container imagefileupload-container">
		<input type="hidden" name="<?php echo $name  ?>" class="x-hidden-input <?php 
			echo (($class)? $class: "")." ";
			echo $name  ?>_hidden" <?php 
			echo (($required)? "required": "")." "; 
			echo (($extratags)? $extratags : "")." ";
		?> />
		<div class="input-group col-md-10">
			<input accept='image/*' type="file" class="hide form-control x-imagefileupload imagefileupload 
			<?php 
			
			echo $name;
			?>_input" 
			data-imgwidth="<?php echo $dataimgwidth; ?>" 
			data-imgheight="<?php echo $dataimgheight; ?>"
			data-column="<?php echo $name; ?>" />
			<div style="border-radius: 8px; <?php echo $propw; ?>:<?php echo $displayw+10; ?>px; <?php echo $proph; ?>: <?php echo $displayh+10; ?>px; border: 1px solid #cccccc; margin-bottom:5px;" class="x-btn-takepic btn-takepic" data-column="<?php echo $name; ?>">
				<button class="x-btn-clearpic btn-clearpic hide" data-column="<?php echo $name; ?>"><i class="fa fa-times" aria-hidden="true"></i></button>
				<div class="<?php echo $name; ?> x-form-<?php echo $name; ?> x-form x-fileuploadimgurl fileuploadimgurl" data-name="<?php echo $name; ?>">

				</div>
			</div>
			<!--
			<div style="<?php echo $propw; ?>:<?php echo $displayw+10; ?>px;" class="text-center" style="padding-top:5px;">
				<a class='x-viewphoto hide' href='#' target='_blank'>View Photo</a>
			</div>
			-->
		</div>
		
	</div>
</div>
									
														