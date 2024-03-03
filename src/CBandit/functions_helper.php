<?php
/* 
	SET OF USEFUL FUNCTIONS FOR BASE
*/
//short version of phpinfo();
function nfo(){
	phpinfo();
}

//returns top php version i.e. 7 for 7.2.1
function phpVerHigh(){
	$v = explode(".", PHP_VERSION);
	$v = floatval($v[0]);
	return $v; 
}

//convert string to slug
function slugify($str){
	//some character replace
	$str = str_replace("&", "and", $str);
	$str = str_replace("'", "", $str);
	$str = str_replace("\"", "", $str);
	$str = str_replace("`", "", $str);
	
	$str = preg_replace("/[^a-zA-Z0-9]+/iUs", "--", $str);
	$str = trim($str, "-");
	$str = preg_replace('/_\-\-+/', '-', $str);
	$str = preg_replace('/\-+/', '-', $str);
	if(is_numeric($str[0])){
		$str = "_".$str;
	}
	return strtolower($str);
}

//generic curl request using POST method
function generic_curl($url, $timeout=10, $post=false){	
	$ch = curl_init();
	$url = $url;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
	curl_setopt($ch, CURLOPT_FAILONERROR, 1);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
	if($post!==false){
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
	}
	$iret = array();
	$response = curl_exec($ch);
	$curl_info = curl_getinfo($ch);
	$parts = parse_url($url);
	$ip = gethostbyname($parts['host']);
	$iret['url'] = $url;
	$iret['parts'] = $parts;
	$iret['ip'] = $ip;
	$iret['curl_info'] = $curl_info;
	if (curl_error($ch)) {
		$error = (curl_error($ch));
		$iret['error'] = 1;
		$iret['errormessage'] = $error;
		return $iret;
	}
	$iret['success'] = 1;
	$iret['response'] = $response;
	return $iret;
}

//image handle create from file
function imagecreatefromfile($src){
	$img = @imagecreatefrompng( $src );
	if(!$img){
		$img = @imagecreatefromjpeg ( $src );
	}
	if(!$img){
		$img = @imagecreatefromgif ( $src );
	}
	if(!$img){
		$img = @imagecreatefromwbmp ( $src );
	}
	if(!$img){
		$img = @imagecreatefromgd2 ( $src );
	}
	if(!$img){
		$img = @imagecreatefromgd2part ( $src );
	}
	if(!$img){
		$img = @imagecreatefromgd ( $src );
	}
	if(!$img){
		$img = @imagecreatefromstring ( $src );
	}
	if(!$img){
		$img = @imagecreatefromxbm ( $src );
	}
	if(!$img){
		$img = @imagecreatefromxpm ( $src );
	}
	if(!$img){
		$img = @imagecreatefromwebp ( $src );
	}
	if(!$img){
		return false;
	}
	return $img;
}

//resize an image with bleeding edge
function resize_image($absimgpath, $width="", $height=""){
	//get extension
	$ext = explode(".", $absimgpath);
	$t = count($ext);
	if($t>1){
		$extension = $ext[$t-1];
		unset($ext[$t-1]);
		$name = implode($ext, ".");
	}
	else{
		$name = $ext;
		$extension = "";
	}
	$newname = $name."-".$width."x".$height.".png";
	if(file_exists($newname)){
		return $newname;
	}
	$img = imagecreatefromfile($absimgpath);
	if($img){
		$width_orig = imagesx( $img );
		$height_orig = imagesy( $img );
		$new_width = $width_orig;
		$new_height = $height_orig;
		$src_x = 0;
		$src_y = 0;
		$dst_x = 0;
		$dst_y = 0;
		//if width only is provided
		if(trim($width)&&trim($height)==""){
			$new_width = $width;
			$new_height = $height_orig * $new_width / $width_orig;
			$dst_width = $new_width;
			$dst_height = $new_height;
		}
		//if height only is provided
		else if(trim($width)==""&&trim($height)){
			$new_height = $height;
			$new_width = $width_orig * $new_height / $height_orig;
			$dst_width = $new_width;
			$dst_height = $new_height;
		}
		else{
			$new_width = $width;
			$new_height = $height;

			if($width_orig > $height_orig){
				$dst_width = $new_width;
				$dst_x = 0;
				$dst_height = $height_orig * $dst_width / $width_orig;
				$dst_y = ($new_height - $dst_height) / 2;
			}
			else{
				$dst_height = $new_height;
				$dst_y = 0;
				$dst_width = $width_orig * $dst_height / $height_orig;
				$dst_x = ($new_width - $dst_width) / 2;
			}
		}
		$tmp_img = imagecreatetruecolor( $new_width, $new_height );
		$white = imagecolorallocate($tmp_img, 255, 255, 255);
		$black = imagecolorallocate($tmp_img, 0, 0, 0);
		imagefill($tmp_img, 0, 0, $white);
		imagecopyresampled( $tmp_img, $img, $dst_x, $dst_y, $src_x, $src_y, $dst_width, $dst_height, $width_orig, $height_orig );
		if($new_width>400&&0){
			imagepng ( $tmp_img , $newname, 0);
		}
		else{
			imagepng ( $tmp_img , $newname, 5);
		}

		return $newname;
	}
	else{
		return $absimgpath;
	}
}

//resize image crop inwards
function resize_image_in($imgpath, $width="", $height=""){
	//get extension
	$ext = explode(".", $imgpath);
	$t = count($ext);
	if($t>1){
		$extension = $ext[$t-1];
		unset($ext[$t-1]);
		if(phpVerHigh()>=7){
			$name = implode(".", $ext);
		}
		else{
			$name = implode($ext, ".");
		}
	}
	else{
		$name = $ext;
		$extension = "";
	}
	$newname = $name."-in-".$width."x".$height.".jpg";
	if(file_exists($newname)){
		//return $newname;
	}
	$img = imagecreatefromfile($imgpath);
	if($img){
		$width_orig = imagesx( $img );
		$height_orig = imagesy( $img );
		$new_width = $width_orig;
		$new_height = $height_orig;
		$src_x = 0;
		$src_y = 0;
		$dst_x = 0;
		$dst_y = 0;
		//if width only is provided
		if(trim($width)&&trim($height)==""){
			$new_width = $width;
			$new_height = $height_orig * $new_width / $width_orig;
			$dst_width = $new_width;
			$dst_height = $new_height;
		}
		//if height only is provided
		else if(trim($width)==""&&trim($height)){
			$new_height = $height;
			$new_width = $width_orig * $new_height / $height_orig;
			$dst_width = $new_width;
			$dst_height = $new_height;
		}
		else{
			$new_width = $width;
			$new_height = $height;

			if($width_orig < $height_orig){
				$dst_width = $new_width;
				$dst_x = 0;
				$dst_height = $height_orig * $dst_width / $width_orig;
				if($new_height > $dst_height){
					$multiplier = $new_height / $dst_height;
					$dst_width = $dst_width * $multiplier;
					$dst_x = ($new_width - $dst_width) / 2;
					$dst_height = $new_height;
					$dst_y = 0;
				}
				else{
					$dst_y = ($new_height - $dst_height) / 2;
				}
			}
			else{
				$dst_height = $new_height;
				$dst_y = 0;
				$dst_width = $width_orig * $dst_height / $height_orig;
				if($new_width > $dst_width){
					$multiplier = $new_width / $dst_width;
					$dst_height = $dst_height * $multiplier;
					$dst_y = ($new_height - $dst_height) / 2;
					$dst_width = $new_width;
					$dst_x = 0;
				}
				else{
					$dst_x = ($new_width - $dst_width) / 2;
				}
			}
		}
		$tmp_img = imagecreatetruecolor( $new_width, $new_height );
		$white = imagecolorallocate($tmp_img, 255, 255, 255);
		$black = imagecolorallocate($tmp_img, 0, 0, 0);
		imagefill($tmp_img, 0, 0, $white);
		imagecopyresampled( $tmp_img, $img, $dst_x, $dst_y, $src_x, $src_y, $dst_width, $dst_height, $width_orig, $height_orig );
		imagejpeg ($tmp_img , $newname);
		return $newname;
	}
	else{
		return $imgpath;
	}
}

//to trim args passed to model
function trimArgs($args){
	if(is_array($args)||is_object($args)){
		foreach($args as $key=>$value){
			if(is_scalar($value)){
				$args[$key] = trim($value);
			}
			else{
				$args[$key] = trimArgs($value);
			}
		}
	}
	return $args;
}

//print_r with <pre> tag
function pre($arr){
	echo "<pre>";
	print_r($arr);
	echo "</pre>";
}

//microtime in float format
function microtime_float(){
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

//converts class methods to function declarations
function classMethodsToFunctions($className){
	$reflectionClass = new ReflectionClass($className);
	$methods = $reflectionClass->getMethods();
	if(is_array($methods)){
		foreach($methods as $key => $method){
			$methodName = $method->getName();
			$parameters = $method->getParameters();
			$functionArgs = [];
			$defaultValues = [];
			foreach ($parameters as $param) {
				$paramName = '$' . $param->getName();
				$callArgs[] = $paramName;
				if ($param->isDefaultValueAvailable()) {
					$defaultValue = $param->getDefaultValue();
					$functionArgs[] = "$paramName = " . var_export($defaultValue, true);
				}
				else{
					$functionArgs[] = $paramName;
				}
			}
			$functionArgsString = implode(', ', $functionArgs);
			$callArgsString = implode(', ', $callArgs);
			//function declaration
			$functionDeclaration = "function {$methodName}($functionArgsString) {";
			$functionDeclaration .= '$helpers = new nmg\CBandit\Helpers(); return $helpers->'.$methodName.'('.$callArgsString.'); ';
			$functionDeclaration .= "}";
			//execute
			eval($functionDeclaration);
	
		}
	}
}

//used in paynamics library
function required($args, $required){
	foreach ($required as $key => $value) {
        if(!isset($args[$value]) || !$args[$value])
        {
            $result['error'][] =  $value.' missing';
        }
    }
    return $result;
}

//converts filename to be safe filename
function safeFileName($filename){
	$filename = mb_ereg_replace("([^\w\s\d\-_~,;\[\]\(\).])", '', $filename);
	// Remove any runs of periods (thanks falstro!)
	$filename = mb_ereg_replace("([\.]{2,})", '', $filename);
	return $filename;
}

//for valid PH mobile number format
function formatPHMobileNo($mo){
	if(!trim($mo)){
		return "";
	}
	// Remove all non-numeric characters from the input string
	$mo = preg_replace("/[^0-9]/", "", $mo);
	// Proper format e.g. 639175949630
	if(strpos($mo, "63") !== 0){
		if($mo[0] == "0"){ //if 0917XXXXXXX
			$mo = "63" . substr($mo, 1);
		}
		else if($mo[0] == "9"){ //if 917XXXXXXX
			$mo = "63" . $mo;
		}
		else if(substr($mo, 0, 3) == "+63"){ //if +63917XXXXXXX
			$mo = "63" . substr($mo, 3);
		}
		else if(substr($mo, 0, 2) == "+0"){ //if +0917XXXXXXX
			$mo = "63" . substr($mo, 2);
		}
		else if(substr($mo, 0, 2) == "+9"){ //if +917XXXXXXX
			$mo = "639" . substr($mo, 2);
		}
		else if($mo[0] != "+"){ //if 917XXXXXXX
			$mo = "63" . $mo;
		}
	}
	if(strlen($mo)!=12){ //should be 12 digits
		return "";
	}
	return $mo;
}

//to check if using mobile
function isMobile(){
	$useragent = $_SERVER['HTTP_USER_AGENT'];
	if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4))){
		return true;
	}
	return false;
}

//to hash a password using SHA 256 with salt
function userPassHash($password){
	$oldpass = md5(md5($password));
	return hash("sha256", $oldpass);
}

//old method of hashing using double md5
function oldUserPassHash($str){
	return md5(md5($str));
}

//get remote IP using various methods
function remoteIP(){
	if(trim($_SERVER['HTTP_CF_CONNECTING_IP'])){
		return $_SERVER['HTTP_CF_CONNECTING_IP'];
	}
	else if(trim($_SERVER['HTTP_X_FORWARDED_FOR'])){
		return $_SERVER['HTTP_X_FORWARDED_FOR'];
	}
	else if(trim($_SERVER['HTTP_X_REAL_IP'])){
		return $_SERVER['HTTP_X_REAL_IP'];
	}
	else{
		return $_SERVER['REMOTE_ADDR'];
	}
}

//random string generator
function randomString($length = 6, $case="uppercase") {
	$str = "";
	$characters = array_merge(range('A','Z'), range('0','9'));
	$max = count($characters) - 1;
	for ($i = 0; $i < $length; $i++) {
		$rand = mt_rand(0, $max);
		$str .= $characters[$rand];
	}
	if($case=="lowercase"){
		$str = strtolower($str);
	}
	else if($case=="password"){
		$str = strtolower($str);
		$str = str_replace("0", "5", $str);
		$str = str_replace("1", "9", $str);
		$str = str_replace("l", "8", $str);
	}
	return $str;
}

//convert number to a non negative or abs number
function nonNegative($n){
	if(!is_numeric($n)){
		return 0;
	}
	if($n*1<=0){
		return 0;
	}
	return $n;
}

function isCLI(){
	if(
		php_sapi_name()=="cli"
	){
		return true;
	}
	return false;
}

function isHTTPS(){
	$scheme = @json_decode($_SERVER['HTTP_CF_VISITOR'], true); //from cloudflare
	return (
		@strtolower($_SERVER['REQUEST_SCHEME'])=="https"
		|| @strtolower($scheme['scheme'])=="https"||$_SERVER['HTTPS']=="on" //from cloudflare
		|| @strtolower($_SERVER['HTTP_X_FORWARDED_PROTO'])=="https" //from cloudflare
		|| @strtolower($_SERVER['HTTP_X_FORWARDED_PORT'])=="443" //from cloudfront try
		|| $_SERVER['HTTP_X_HTTPS']=="yes"
		|| $_SERVER['HTTPS']=="on"
		|| $_SERVER['X-HTTPS']=="on"
	);
}

function isLOCAL(){
	return (strpos(strtolower($_SERVER['HTTP_HOST']), "local.nmgdev.com")!==false);
}

function isNMGDEV(){
	return (strpos(strtolower($_SERVER['HTTP_HOST']), "nmgdev.com")!==false);
}


function getHost(){
	$host = trim($_SERVER['HTTP_HOST']);
	if(!$host && isset($_SERVER['SCRIPT_URI'])) { //if HTTP_HOST is not set get from SCRIPT_URI
		$scriptUri = $_SERVER['SCRIPT_URI'];
		$parsedUrl = parse_url($scriptUri);
		if (isset($parsedUrl['host'])) {
			$host = strtolower($parsedUrl['host']);
		}
	}
	return $host;
}

//for php8 cli echo to flush right away
function pre_flush($arr){
	ob_implicit_flush(true);
	echo "<pre>\n";
	print_r($arr);
	echo "</pre>\n";
	flush();
	ob_flush();
}

//for php8 cli echo to flush right away
function echo_flush($str){
	ob_implicit_flush(true);
	echo $str;
	flush();
	ob_flush();
}

//convert csv to array
function csvToArr($contents){
	$lines = explode("\n", $contents);
	if(isCLI()){
		//echo_flush("Coverting CSV to Array...\n");
	}
	if(is_array($lines)){
		$t = count($lines);
		foreach($lines as $key=>$line){
			if(isCLI()){
				//echo_flush("Trim $key of $t\n");
			}
			if(!trim($line)){
			 unset($lines[$key]);
			}
		}
	}
	$lines = array_values($lines);
	
	//get fields 
	if(isCLI()){
		//echo_flush("Getting Fields...\n");
	}
	$fields = [];
	$line = $lines[0];
	$liner = str_getcsv(trim($line));
	if(is_array($liner)){
		foreach($liner as $index=>$linervalue){
			$fields[] = trim($linervalue);
		}
	}
	
	//unset header 
	unset($lines[0]);
	
	//get data 
	$datar = [];
	$lines = array_values($lines);
	$t = count($lines);
	foreach($lines as $key=>$line){
		$liner = str_getcsv(trim($line));
		$dataline = [];
		if(is_array($liner)){
			if(isCLI()){
				//echo_flush("Align $key of $t\n");
			}
			foreach($liner as $index=>$linervalue){
				$dataline[$fields[$index]] = trim($linervalue);
			}
			$datar[] = $dataline;
		}
	}
	return $datar;
}

//xml to array associative
function xmlToArrayAssoc($xmlString) {
	$xml = simplexml_load_string($xmlString, 'SimpleXMLElement', LIBXML_NOCDATA);
	$json = json_encode($xml);
	$array = json_decode($json, true);
	return $array;
}

//array to XML
function arrayToXml($data, &$xmlData, $parent_key="") {
	foreach ($data as $key => $value) {
		if (is_null($value)){
			continue;
		}
		else if (is_array($value)) {
			if (array_is_list($value)) {
				arrayToXml($value, $xmlData, $key);
				continue;
			}
			if (is_numeric($key)) {
				$key = $parent_key; // When the array elements don't have specific keys
			}
			$subnode = $xmlData->addChild($key);
			arrayToXml($value, $subnode, $key);
		}
		else {
			$xmlData->addChild("$key", htmlspecialchars("$value"));
		}
	}
}

//to check if array_is_list
if (!function_exists('array_is_list')) {
	function array_is_list(array $arr){
		if ($arr === []) {
			return true;
		}
		return array_keys($arr) === range(0, count($arr) - 1);
	}
}


/************************* FUNCTIONS USING CODE IGNITER 3 INSTANCE FOR BASE **************************/

//short way of getting records
function getRecordById($table, $id){
	$ci = get_instance();
	$ci->db->select("*");
	$ci->db->from($table);
	$ci->db->where("deleted", 0);
	$ci->db->where("id", $id);
	$ci->db->limit(1);
	$record = $ci->db->get()->result_array()[0];
	return $record;
}

//get roles with specific permission
function getRoleWithPerm($roleid, $permission){
	$ci = get_instance();
	$ci->db->select("*");
	$ci->db->from("roles");
	$ci->db->where("deleted", 0);
	$ci->db->like("permissions", '"'.$permission.'"', "both");
	$ci->db->where("id", $roleid);
	$role = $ci->db->get()->result_array()[0];
	if($role['id']){
		return $role;
	}
	return false;
}

//check if logged in user has permission 
function hasPerm($perm, $user="" /*this can be a user row object or user id*/ ){
	if($user){
		if(!$user['id']){ //if object
			$user = getRecordById("users", $user);
		}
		$role = getRecordById("roles", $user['roleid']);
		$perms = @json_decode($role['permissions'], true);
	}
	else{
		$perms = @json_decode($_SESSION['user']['perms'], true);
	}
	if(trim($perm) && is_array($perms) &&  in_array($perm, $perms)){
		return true;
	}
	return false;
}

//check if super admin
function isSuper($user="" /*this can be a user row object or user id*/ ){
	if($user){
		if(!$user['id']){ //if object
			$user = getRecordById("users", $user);
		}
	}
	if(!$user){
		$user = $_SESSION['user'];
	}
	if($user['id']==1){
		return true;
	}
	return false;
}

//setup uploads folder in base
function setupUploadsFolder(){
	$ci = get_instance(); // CI_Loader instance
	//$ci->load->config('config');
	$baseconfig = $ci->config->item('base');
	//automatic creation of uploads directory
	$uploadsdir = rtrim($baseconfig['uploadsdir'], "/");
	if(!is_dir($uploadsdir)){
		@mkdir($uploadsdir, 0777);
		@file_put_contents($uploadsdir."/index.html", "<!DOCTYPE html><html><head><title>403 Forbidden</title></head><body><p>Directory access is forbidden.</p></body></html>");
		$uploadsdirtmp = $uploadsdir."/tmp";
		@mkdir($uploadsdirtmp, 0777);
		@file_put_contents($uploadsdirtmp."/index.html", "<!DOCTYPE html><html><head><title>403 Forbidden</title></head><body><p>Directory access is forbidden.</p></body></html>");
	}
}

//URL shortener
function shortURL($url){
	$url = trim($url);
	$ci = get_instance();
	$ci->load->database();
	$ci->db->select("*"); 
	$ci->db->from("shorturls"); 
	$ci->db->where("url", $url); 
	$ci->db->where("deleted", 0); 
	$record = $ci->db->get()->result_array()[0];
	if($record['id']){
		return site_url("l/".$record['short']);
	}
	else{
		do{
			$short = randomString(6, "lowercase");
			$ci->db->select("*"); 
			$ci->db->from("shorturls"); 
			$ci->db->where("short", $short); 
			$ci->db->where("deleted", 0); 
			$record = $ci->db->get()->result_array()[0];
		}while($record['id']);
		$idata = array();
		$idata['short'] = $short;
		$idata['url'] = $url;
		$ci->db->insert("shorturls", $idata);
		return site_url("l/".$short);
	}
}

//get s3 url when s3 is enabled in base
function getS3URL($abspath){
	$ci = get_instance(); // CI_Loader instance
	$baseconfig = $ci->config->item('base');
	$uploadsdir = rtrim($baseconfig['uploadsdir'], "/");
	$path = str_replace($uploadsdir, "", $abspath);
	$s3path = trim($path, "/");
	try {
		//config 
		$prodbucket = array();
		$prodbucket['name'] = $baseconfig['s3_prod_name'];
		$prodbucket['region'] = $baseconfig['s3_prod_region'];
		$prodbucket['access_key_id'] = $baseconfig['s3_prod_access_key_id'];
		$prodbucket['secret_access_key'] = $baseconfig['s3_prod_secret_access_key'];
		
		$defaultbucket = array();
		$defaultbucket['name'] = $baseconfig['s3_default_name'];
		$defaultbucket['region'] = $baseconfig['s3_default_region'];
		$defaultbucket['access_key_id'] = $baseconfig['s3_default_access_key_id'];
		$defaultbucket['secret_access_key'] = $baseconfig['s3_default_secret_access_key'];
		
		if($prodbucket['name']&&$prodbucket['region']&&$defaultbucket['access_key_id']&&$prodbucket['secret_access_key']){
			$s3 = new S3Client([
				'version' => 'latest',
				'region'  => $prodbucket['region'],
				'credentials' => [
					'key'    => $prodbucket['access_key_id'],
					'secret' => $prodbucket['secret_access_key'],
				]
			]);
			$bucket = $prodbucket['name'];
		}
		else{ //default to dev
			$s3 = new S3Client([
				'version' => 'latest',
				'region'  => $defaultbucket['region'],
				'credentials' => [
					'key'    => $defaultbucket['access_key_id'],
					'secret' => $defaultbucket['secret_access_key'],
				]
			]);
			$bucket = $defaultbucket['name'];
		}
		$result = $s3->getObject(array(
			'Bucket' => $bucket,
			'Key'    => $s3path
		));
		$r = $result->toArray();
		$url = $r['@metadata']['effectiveUri'];
		//$url = $s3->getObjectUrl($bucket, $s3path); //this function only builds the s3 url
		return $url;
	} catch (Aws\S3\Exception\S3Exception $e) {
		return false;
	}
}

//upload to S3 bucket
function uploadToS3($abspath){
	$ci = get_instance(); // CI_Loader instance
	$baseconfig = $ci->config->item('base');
	$uploadsdir = rtrim($baseconfig['uploadsdir'], "/");
	$path = str_replace($uploadsdir, "", $abspath);
	$s3path = trim($path, "/");
	try {
		//config 
		$prodbucket = array();
		$prodbucket['name'] = $baseconfig['s3_prod_name'];
		$prodbucket['region'] = $baseconfig['s3_prod_region'];
		$prodbucket['access_key_id'] = $baseconfig['s3_prod_access_key_id'];
		$prodbucket['secret_access_key'] = $baseconfig['s3_prod_secret_access_key'];
		
		$defaultbucket = array();
		$defaultbucket['name'] = $baseconfig['s3_default_name'];
		$defaultbucket['region'] = $baseconfig['s3_default_region'];
		$defaultbucket['access_key_id'] = $baseconfig['s3_default_access_key_id'];
		$defaultbucket['secret_access_key'] = $baseconfig['s3_default_secret_access_key'];

		if($prodbucket['name']&&$prodbucket['region']&&$prodbucket['access_key_id']&&$prodbucket['secret_access_key']){
			$s3 = new S3Client([
				'version' => 'latest',
				'region'  => $prodbucket['region'],
				'credentials' => [
					'key'    => $prodbucket['access_key_id'],
					'secret' => $prodbucket['secret_access_key'],
				]
			]);
			$bucket = $prodbucket['name'];
		}
		else{ //default to dev
			$s3 = new S3Client([
				'version' => 'latest',
				'region'  => $defaultbucket['region'],
				'credentials' => [
					'key'    => $defaultbucket['access_key_id'],
					'secret' => $defaultbucket['secret_access_key'],
				]
			]);
			$bucket = $defaultbucket['name'];
		}
		$s3->putObject([
			'Bucket' => $bucket,
			'Key'    => $s3path,
			'Body'   => fopen($abspath, 'r'),
			'ACL'    => 'public-read',
		]);
		
	} catch (Aws\S3\Exception\S3Exception $e) {
		//echo "There was an error uploading the file.\n";
		echo $e;
		exit();
	}
}


//coverts base file or image to a safe url
function fileUrlSafe($abspath){
	$ci = get_instance(); // CI_Loader instance
	if(trim($abspath)){
		$bdata = @json_decode($abspath, true);
		if($bdata['basedata']=="Yes"){
			$path = $bdata['value'];
			$path = base64_encode($path);
			$url = site_url("file")."?p=".$path;
			return $url;
		}
		$baseconfig = $ci->config->item('base');
		$delim = trim($baseconfig['uploadsdir'], "/");
		$delim = explode("/", $delim);
		$delim = $delim[count($delim)-1];	
		$pieces = explode("/".$delim."/", dirname($abspath));
		if(!$pieces[1]){
			//for windows system that uses backslash
			$pieces2 = explode("\\".$delim."/", dirname($abspath));
			if($pieces2[1]){
				$pieces = $pieces2;
			}
		}
		$path = trim($pieces[1], "/")."/".basename($abspath);
		$uploadsdir = rtrim($baseconfig['uploadsdir'], "/");
		$abspath = $uploadsdir."/".$path;
		if(!file_exists($abspath)||!trim($abspath)||!trim($path)){
			//return "";
		}
		$path = base64_encode($path);
		$url = site_url("file")."?p=".$path;
		return $url;
	}
	else{
		return "";
	}
}

//coverts base file or image to a safe url with url shortener
function fileUrlSafeShort($abspath){
	$ci = get_instance(); // CI_Loader instance
	$baseconfig = $ci->config->item('base');
	$s3enabled = $baseconfig['s3_enabled'];
	if($s3enabled){
		if(trim($abspath)){
			$delim = trim($baseconfig['uploadsdir'], "/");
			$delim = explode("/", $delim);
			$delim = $delim[count($delim)-1];	
			$pieces = explode("/".$delim."/", dirname($abspath));
			if(!$pieces[1]){
				//for windows system that uses backslash
				$pieces2 = explode("\\".$delim."/", dirname($abspath));
				if($pieces2[1]){
					$pieces = $pieces2;
				}
			}
			$path = trim($pieces[1], "/")."/".basename($abspath);
			$uploadsdir = rtrim($baseconfig['uploadsdir'], "/");
			$abspath = $uploadsdir."/".$path;
			if(strpos($path, "tmp/")===0){
				$url = fileUrlSafe($abspath);
				if($url){
					return shortURL($url);
				}
			}
			else{
				$url = getS3URL($abspath);
				if($url!==false){
					return $url;
				}
				else{
					if(file_exists($abspath)){
						//attempt to upload
						uploadToS3($abspath);
						$url = getS3URL($abspath);
						if($url!==false){
							return $url;
						}
					}
					else{
						return "";
					}
				}
			}
		}
		else{
			return "";
		}
	}
	else{
		$url = fileUrlSafe($abspath);
		if($url){
			return shortURL($url);
		}
	}
	return "";
}

//used by moveUploaded function for uploading files
function repath($currpath){
	$ci = get_instance(); // CI_Loader instance
	//$ci->load->config('config');
	$baseconfig = $ci->config->item('base');
	$uploadsdir = rtrim($baseconfig['uploadsdir'], "/");
	//to indicate that there is already an uploaded image so it wont trigger error see -add view
	$currpath = str_replace("[uploadsdir]", $uploadsdir, $currpath);
	return $currpath;
}

//used for uploading files 
function moveUploaded($tmppath, $slug /* the folder name to upload the file */){
	$ci = get_instance(); // CI_Loader instance
	$baseconfig = $ci->config->item('base');
	$uploadsdir = rtrim($baseconfig['uploadsdir'], "/");
	$move = false;
	if(trim($tmppath)!="-no file-"){ 
		if(trim($tmppath) && file_exists(repath($tmppath))){ 
			$move = true;
		}
		else if(trim($tmppath) && $baseconfig['s3_enabled']){ //if file does not exists but s3 enabled
			if(strpos($tmppath, "[uploadsdir]")===0){ //if already uploaded
				$dir = $uploadsdir."/".$slug."/";
				@mkdir($dir, 0777);
				$newpath = $dir.basename($tmppath);
				return $newpath;
			}
			else{
				return "";
			}
		}
		else{
			return "";
		}
	} 
	else{ 
		return "";; 
	}
	if($move){
		//to indicate that there is already an uploaded image so it wont trigger error see -add view
		$origtmppath = $tmppath;
		$tmppath = str_replace("[uploadsdir]", $uploadsdir, $tmppath);
		$newpath = "";
		if(@file_exists($tmppath)){
			$dir = $uploadsdir."/".$slug."/";
			@mkdir($dir, 0777);
			$newpath = $dir.basename($tmppath);
			rename($tmppath, $newpath);
			if($baseconfig['s3_enabled']){
				//upload to s3 if new file
				if(strpos($origtmppath, "[uploadsdir]")!==0){
					uploadToS3($newpath); 
				}
			}
		}
		return $newpath;
	}
}

//to copy a file to another folder
function moveFile($tmppath, $slug){
	$ci = get_instance(); // CI_Loader instance
	$baseconfig = $ci->config->item('base');
	$uploadsdir = rtrim($baseconfig['uploadsdir'], "/");
	$retpath = "";
	if(file_exists($tmppath) && is_file($tmppath)){
		$dir = $slug."/";
		$absdir = $uploadsdir."/".$dir;
		@mkdir($absdir, 0777);
		$basename = basename($tmppath);
		$newpath = $absdir.$basename;
		$retpath = $dir.$basename;
		copy($tmppath, $newpath);
		//rename($tmppath, $newpath);
		if($baseconfig['s3_enabled']){
			uploadToS3($newpath); 
		}
	}
	return $retpath;
}

//to purify html in wysywyg
function purifyHTML($dirty_html, $config = false){
	//upload images
	$matches = array();
	preg_match_all("/\"data:([^;]+);base64,([^\"]+)\"/iUs", $dirty_html, $matches);
	$filepathr = array();
	$searchr = $matches[0];
	$mimer = $matches[1];
	$b64r = $matches[2];
	if(is_array($mimer)){
		$ci = get_instance(); // CI_Loader instance
		$baseconfig = $ci->config->item('base');
		//automatic creation of uploads directory
		$uploadsdir = rtrim($baseconfig['uploadsdir'], "/");
		if(!is_dir($uploadsdir)){
			@mkdir($uploadsdir, 0777);
			@file_put_contents($uploadsdir."/index.html", "<!DOCTYPE html><html><head><title>403 Forbidden</title></head><body><p>Directory access is forbidden.</p></body></html>");
		}
		$uploadsdirwysywyguploads = $uploadsdir."/wysywyguploads";
		if(!is_dir($uploadsdirwysywyguploads)){
			@mkdir($uploadsdirwysywyguploads, 0777);
			@file_put_contents($uploadsdirwysywyguploads."/index.html", "<!DOCTYPE html><html><head><title>403 Forbidden</title></head><body><p>Directory access is forbidden.</p></body></html>");
		}
	
		$mimes = new \Mimey\MimeTypes;
		foreach($mimer as $key=> $mime){
			$content = @base64_decode($b64r[$key]);
			$filename = md5($content).".".$mimes->getExtension($mime);
			$filepath  = $uploadsdirwysywyguploads."/".$filename;
			@file_put_contents($filepath, $content);
			if($baseconfig['s3_enabled']){
				uploadToS3($filepath); 
			} 
			$filepathr[] = fileUrlSafeShort($filepath);
		}
		$dirty_html = str_replace($searchr, $filepathr, $dirty_html);
	}
	//remove scripts
	$clean_html = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $dirty_html);
	//further clean
	$clean_html = preg_replace("/font-size:\s*[^;\"]+;/iUs", "", $clean_html);
	$clean_html = preg_replace("/font-size:\s*[^;\"]+\"/iUs", "\"", $clean_html);
	$clean_html = preg_replace("/font-family:\s*[^;\"]+;/iUs", "", $clean_html);
	$clean_html = preg_replace("/font-family:\s*[^;\"]+\"/iUs", "\"", $clean_html);
	$clean_html = preg_replace("/data-[^=]+\s*=\s*['\"]{1}.*['\"]{1}/iUs", "", $clean_html);
	return $clean_html;
}

//for elements to be hidden when not in debug mode e.g. <div class="<?php debug('hide'); ? >" >
function debug($type=""){
	if(!isset($_GET['debug'])){
		if($type=="hide"){
			echo " hide ";
		}
	}
}

//copy db table
function copy_table($source_table, $destination_table){
	// Load the necessary CodeIgniter database libraries
	$ci =& get_instance();
	$ci->load->database();
	// Drop the destination table if it exists
	$ci->db->query("DROP TABLE IF EXISTS `$destination_table`");
	// Get the source table structure
	$query = $ci->db->query("SHOW CREATE TABLE `$source_table`");
	$row = $query->row_array();
	$create_table_query = $row['Create Table'];

	// Adjust the destination table name in the create table query
	$create_table_query = str_replace("CREATE TABLE `$source_table`", "CREATE TABLE `$destination_table`", $create_table_query);
	// Execute the create table query for the destination table
	$ci->db->query($create_table_query);
	// Copy the data from the source table to the destination table
	$ci->db->query("INSERT INTO `$destination_table` SELECT * FROM `$source_table`");
	// Get the index creation statements from the source table structure
	preg_match_all('/ALTER TABLE [`"]?' . $destination_table . '[`"]? .*?(?=;|$)/i', $create_table_query, $matches);
	$index_statements = $matches[0];

	// Execute the index creation statements for the destination table
	foreach ($index_statements as $index_statement) {
		$ci->db->query($index_statement);
	}
	return true;
}

//create a backup table
function create_backup_table($source_table){
	// Generate backup table name
	$backup_date = date('Ymd');
	$backup_number = get_backup_number($source_table);
	$destination_table = $source_table . '-bak-' . $backup_date . '-' . $backup_number;
	// Call the copy_table function to create the backup table
	copy_table($source_table, $destination_table);
	return $destination_table;
}

//get the backup number for backup table
function get_backup_number($table){
	// Load the necessary CodeIgniter database libraries
	$ci =& get_instance();
	$ci->load->database();
	// Get the number of existing backup tables
	$backup_date = date('Ymd');
	$backup_number = 0;
	do{
		$backup_number+=1;
		$backup_table = $table . '-bak-'.$backup_date.'-'.$backup_number;
		$query = $ci->db->query("SHOW TABLES LIKE '$backup_table'");
		$existing_backups = $query->num_rows();
		
	} while($existing_backups > 0);
	return $backup_number;
}

//number to code
function num2code($number){
	$alpha = range('A','Z');
	$num = range('0','9');
	$alphanum = array_merge($num, $alpha);
	$format = [$alphanum,$alphanum,$alphanum,$alphanum,$alphanum,$alphanum]; // range 0 - 2,176,782,335 (2176782335)
	$formatreverse = array_reverse($format);
	$code = array();
	if(is_array($formatreverse)){
		foreach($formatreverse as $key=>$reference){
			$base = count($reference);
			$mod = $number % $base;
			$char = $reference[$mod];
			$code[] = $char;
			$number = floor($number / $base);
		}
	}
	$code = implode("", array_reverse($code));
	return $code;
}

//get the microtime per day
function getMicrotimeOfDay() {
	// Get the current Unix timestamp
	$currentTime = time();
	// Get the start of the current day in Unix timestamp
	$startOfDay = strtotime('today', $currentTime);
	// Get the current microtime
	$currentMicrotime = microtime(true);
	// Calculate the microtime of the day value
	$microtimeOfDay = ($currentMicrotime - $startOfDay) * 1000000; //max 86,400,000,000 (86400000000)
	return intval($microtimeOfDay);
}

//unique number per day
function uniquePerDay(){
	$num = intval(getMicrotimeOfDay() / 40); // 0 - 2,160,000,000 (2160000000)
	//$num = 2176782335; //max of num2code should be ZZZZZZ
	return num2code($num);
}

//generate a unique code with prefix
function generateCode($prefix="CO"){
	$code = $prefix.date("Ymd").uniquePerDay();
	return $code;
}

//for api return handling
function apiResponse($ret){
	$ci = get_instance(); // CI_Loader instance
	$ret['elapsed_time'] = $ci->benchmark->elapsed_time('start', 'end');
	if(!is_array($ret)){
		$ret['data'] = $ret;
	}
	header('Content-Type: application/json');
	json_print($ret);
	exit();
}

function validDate($date) {
    $pattern = '/^\d{4}-\d{2}-\d{2}$/';
    if (!preg_match($pattern, $date)) {
        return false;
    }
    $dateParts = explode('-', $date);
    // Check if the date is valid using checkdate function
    $year = (int)$dateParts[0];
    $month = (int)$dateParts[1];
    $day = (int)$dateParts[2];
    return checkdate($month, $day, $year);
}

//for api return handling
function apiSuccess($data=[]){
	$ci = get_instance(); // CI_Loader instance
	$ret['data'] = $data;
	$ret['success'] = 1;
	$ret['elapsed_time'] = $ci->benchmark->elapsed_time('start', 'end');
	header('Content-Type: application/json');
	json_print($ret);
	exit();
}

//for api return handling
function apiError($error=""){
	$ci = get_instance(); // CI_Loader instance
	$ret = [];
	$ret['error'] = $error;
	$ret['elapsed_time'] = $ci->benchmark->elapsed_time('start', 'end');
	header('Content-Type: application/json');
	json_print($ret);
	exit();
}

function sanitizeHandle($input) {
	// Remove any characters that are not alphanumeric or underscore
	$cleaned = preg_replace('/[^a-zA-Z0-9_]/', '', $input);
	// If the first character is a number, replace it with an underscore
	if (isset($cleaned[0]) && is_numeric($cleaned[0])) {
		$cleaned[0] = '_';
	}
	return $cleaned;
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function isValidPhilippineMobileNumber($phoneNumber) {
    // Check if the phone number starts with 639 and has 11 digits
    return preg_match('/^639\d{9}$/', $phoneNumber) === 1;
}

function validUsername($username){
	$username = strtolower(trim($username));
	if(!isValidEmail($username)){
		$username = formatPHMobileNo($username); //probably a mobile number
		if(!isValidPhilippineMobileNumber($username)){
			return false;
		}
	}
	return $username;
}

function is_assoc($array) {
    return array_keys($array) === range(0, count($array) - 1);
}

function sanitize_for_json($value){
	$value = str_replace('\\', '\\\\', $value);
	$value = str_replace('"', '\"', $value);
	return $value;
}

function json_print($data){
	if (is_array($data) || is_object($data)) {
		if(is_assoc($data)){
			echo_flush("[");
			if(is_array($data)){
				$count = count($data);
				foreach($data as $key => $item){
					json_print($item);
					if($key+1<$count){
						echo_flush(",");
					}
				}
			}
			echo_flush("]");
		}
		else{
			echo_flush("{");
			if(is_array($data)){
				$keys = array_reverse(array_keys($data));
				foreach($data as $key => $item){
					echo_flush('"'.sanitize_for_json($key).'":');
					json_print($item);
					if($keys[0]!=$key){
						echo_flush(",");
					}
				}
			}
			echo_flush("}");
		}
	}
	else{
		if(is_string($data)){
			echo_flush('"'.sanitize_for_json($data).'"');
		}
		else if(is_bool($data)){
			echo_flush(($data)? "true" : "false");
		}
		else{
			echo_flush($data);
		}
	}
}
?>