<?php
//usage
/*
	<!-- PUT THIS OUTSIDE FORM -->
	<!-- change 'userstable' -->
	<style>
		.tableform-userstable .tableformth-username{
			width: 45%;
			font-weight: bold;
		}
		.tableform-userstable .tableformth-name{
			width: 45%;
			font-weight: bold;
		}
		.tableform-userstable .tableform-controls{
			width: 10%;
			text-align: center !important;
		}
	</style>
	<div class="x-userstable-modal x-tableform-modal hide">
		<?php
		$this->load->view("app/content/forms/input", [
			"label"=>"Email Login", 
			"name"=>"username", 
			"placeholder"=>"Email Login",
			"required"=>1, 
			"value"=>"", 
			"class"=>"", 
			"extratags"=>""
		]);
		?>
		<?php
		$this->load->view("app/content/forms/input", [
			"label"=>"Name", 
			"placeholder"=>"Name",
			"name"=>"name", 
			"required"=>1, 
			"value"=>"", 
			"class"=>"", 
			"extratags"=>""
		]);
		?>
	</div>
	<!-- // PUT THIS OUTSIDE FORM -->
	<?php
	$this->load->view("app/content/forms/table", [
		"name"=>"userstable", 
		"modalcontainerclass"=>"x-userstable-modal",
		"dataendpoint"=>site_url("api/table/users")."?status=Active", 
		"datainitpage"=>1,
		"labels"=>array(
			"username"=>"Email Login",
			"name"=>"Name"
		),
		"btnadd"=>true, //true or false
		"btnedit"=>true, //true or false
		"btndelete"=>true, //true or false
		"class"=>"", 
		"extratags"=>""
	]);
	?>
*/
?>
<div class="form-group x-form-group">
	<div 
		class="x-tableform x-form-<?php echo $name; ?> tableform-<?php echo $name; ?>  <?php echo $class; ?>" <?php echo $extratags; ?> 
		data-btnadd="<?php echo ($btnadd)?1:0; ?>" 
		data-btnedit="<?php echo ($btnedit)?1:0; ?>" 
		data-btndelete="<?php echo ($btndelete)?1:0; ?>" 
		data-name="<?php echo $name; ?>" 
		data-endpoint="<?php echo $dataendpoint; ?>" 
		data-initpage="<?php echo (intval($datainitpage))? intval($datainitpage): 1; ?>" 
		data-labels="<?php echo base64_encode(json_encode($labels)); ?>"
		data-modalcontainerclass="<?php echo $modalcontainerclass; ?>" 
	>
		<table class="x-tableform-table table table-sm table-hover table-bordered table-striped" style='background: white'>
			<thead>
				<tr>
					<th class="text-right x-tableform-btn-add-container" colspan=1000>
						<button class="btn btn-primary btn-green x-tableform-btn-add"><i class="fa fa-plus"></i> Add</button>
					</th>
				</tr>
				<tr class="x-theadtr-template hide">
					<th class="tableformth x-tableformth-template hide">Header</th>
					<th class="x-tableform-controls tableform-controls"></th>
				</tr>
			</thead>
			<tbody>
				<tr class="x-nothing hide">
					<td class="text-center" style="padding: 20px;" colspan=1000>
						Please Wait...
					</td>
				</tr>
				<tr class="x-tableform-loader-container">
					<td class="text-center" style="padding: 20px;" colspan=1000>
						Please Wait...
					</td>
				</tr>
				<tr class="x-tableform-norecords-container hide">
					<td class="text-center" style="padding: 20px;" colspan=1000>
						No Records
					</td>
				</tr>
				<tr class="x-tbodytr-template hide">
					<td class="tableformtd x-tableformtd-template hide"></td>
					<th class="x-tableform-controls tableform-controls">
						<button class="btn x-tableform-btn-edit btn-green"><i class="icon icon-left fa fa-edit icon-crud"></i></button>
					</th>
				</tr>
				<tr class="x-tableform-paging-container text-center hide">
					<td class="x-tableform-paging" colspan=1000>
						Page: <select class="x-tableform-paging-select" data-initvalue=1 style="width:80px !important;">
							<option value="1" selected>1</option>
						</select>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>