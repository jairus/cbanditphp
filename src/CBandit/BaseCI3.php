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
	public static function loadForm($formfilename, $args){		
		$absfile = dirname(__FILE__)."/BaseCI3-forms/".$formfilename;
		if (pathinfo($formfilename, PATHINFO_EXTENSION) !== "php") {
			$absfile .= ".php";
		}
		extract($args);
		include_once($absfile);
	}
}

?>