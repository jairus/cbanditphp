<?php
namespace nmg\CBandit;

class GlobalClass {

	/*
		echo nmg\CBandit\GlobalClass::nfo();
	*/
	public static function nfo(){
		phpinfo();
	}

	/*
		echo nmg\CBandit\GlobalClass::getInstalledVersion();
	*/
	public static function getInstalledVersion(){
		$installedjson = file_get_contents(dirname(__FILE__)."/../../../../composer/installed.json");
		$installed = @json_decode($installedjson, true);
		$packages = $installed['packages'];
		if(is_array($packages)){
			foreach($packages as $key => $package){
				if($package['name']=="nmg/cbanditphp"){
					return $package['version'];
				}
			}
		}
		return false;
	}
}

?>