<?php
namespace nmg\CBandit;

class BaseCI3 {
	public function loadForm($formfilename, $args){
		$ci = get_instance();
		$absfile = dirname(__FILE__)."/BaseCI3-forms/".$formfilename;
		if (pathinfo($formfilename, PATHINFO_EXTENSION) !== "php") {
			$absfile .= ".php";
		}
		$ci->load->view($absfile, $args);
	}
}

?>