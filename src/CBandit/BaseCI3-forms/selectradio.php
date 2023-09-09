<?php
//usage
/*
	$radiooptions = array();
	$radiooptions["5 - Excellent"] = 5;
	$radiooptions["4 - Good"] = 4;
	$radiooptions["3 - Average"] = 3;
	$radiooptions["2 - Poor"] = 2;
	$radiooptions["1 - Unacceptable"] = 1;
	$this->load->view("app/content/forms/selectradio", [
		"label"=>"selectradio", 
		"name"=>"selectradio", 
		"required"=>0, 
		"datainitvalue"=>"", 
		"class"=>"", 
		"options"=>$radiooptions,  
	]);
*/
$tempid = "temp".md5(microtime());
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div>
		<?php
		foreach($options as $key=>$value){
			?>
			<div class="am-radio inline x-radioselect-<?php echo $value; ?> x-radioselect-input-container">
				<input class="x-radioselect-input" type="radio" value="<?php echo $value; ?>" name="<?php echo $tempid; ?>" id="<?php echo $tempid.$value; ?>">
				<label for="<?php echo $tempid.$value; ?>"><?php echo $key; ?></label>
			</div>
			<?php
		}
		?>
	</div>
	<input autocomplete="off" class="hide form-control x-selectradio x-selectradio-hidden x-form <?php 
		echo "x-name-".$name." x-form-".$name." "; 
		echo (($class)? $class: "")."\" ";  
		echo (($name)? "data-name='".$name."'": "")." ";
		echo (($extratags)? $extratags : "")." ";
		echo (($required)? "required": "")." ";
		echo (($datainitvalue)? "value='".$datainitvalue."'": "")." ";
		echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
	?>>
</div>