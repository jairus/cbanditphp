<?php
namespace nmg\CBandit;

class BaseCI3 {
	/* 
		nmg\CBandit\BaseCI3::loadForm("input", [
			"label"=>"Name", 
			"name"=>"name", 
			"required"=>0, 
			"placeholder"=>"", 
			"datainitvalue"=>"", 
			"class"=>"", 
			"extratags"=>""
		]);
	*/
	public static function loadForm($formfilename, $args=[], $ret = false){
		$formfilename = str_replace("../", "", $formfilename); //mitigation
		$formfilename = str_replace("./", "", $formfilename); //mitigation
		$formfilename = trim($formfilename, "/");  //mitigation
		$absfile = dirname(__FILE__)."/BaseCI3-forms/".$formfilename;
		if (pathinfo($formfilename, PATHINFO_EXTENSION) !== "php") {
			$absfile .= ".php";
		}
		if(!$ret){
			extract($args);
			include($absfile);
		}
		else{
			ob_start();
			extract($args);
			include($absfile);
			$output = ob_get_clean();
			return $output;
		}
	}
}

?>