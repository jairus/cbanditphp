<?php
//usage
/*
	$selections = array();
	$s = array();
	$s['label'] = "Yes";
	$s['value'] = "Yes";
	$s['extratags'] = "";
	$selections[] = $s;
	$s = array();
	$s['label'] = "No";
	$s['value'] = "No";
	$s['extratags'] = "";
	$selections[] = $s;
	nmg\CBandit\BaseCI3::loadForm("app/content/forms/radio", ["label"=>"Display", "name"=>"display", "required"=>0, "datatable"=>"", "datainitvalue"=>"", "dataendpoint"=>"", "class"=>"", "selections"=>$selections, "extratags"=>""]);
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div>
		<?php
		if(is_array($selections)){
			foreach($selections as $key=>$value){
				$rand = md5(microtime().rand(99999,999999));
				$radid = "rad-".$name."-".$rand;
				?>
				<div class="am-radio inline">
					<input class="<?php echo $name." x-form-".$name." "; ?> x-form" <?php echo $selection['extratags']; ?> type="radio" value="<?php echo $selection['value']; ?>" name="<?php echo $name; ?>" data-name="<?php echo $name; ?>" id="<?php echo $radid; ?>">
					<label for="<?php echo $radid; ?>"><?php echo $selection['label']; ?></label>
				</div>
				<?php
			}
		}
		?>
	</div>
					  
					  
	<?php
	/*
	<div>
		<select data-type="basic" class="hide x-select2 select2-basic form-control <?php 
			echo $name." x-form-".$name." "; 
			echo (($class)? $class: "")."\" ";  
			echo (($name)? "name='".$name."'": "")." ";
			echo (($extratags)? $extratags : "")." ";
			echo (($required)? "required": "")." ";
			echo (($datatable)? "data-table='".$datatable."'": "")." ";
			echo (($datainitvalue)? "data-initvalue='".$datainitvalue."'": "")." ";
			echo (($dataendpoint)? "data-endpoint='".$dataendpoint."'": "")." ";
		?>><?php echo (($html)? $html : ""); ?></select>
	</div>
	*/
	?>
</div>