<?php
//usage
/*
	$this->load->view("app/content/forms/select2draggable", [
		"label"=>"Select2 Draggable", 
		"name"=>"select2draggable", 
		"required"=>0, 
		"dataendpoint"=>"", 
		"class"=>"", 
		"select2html"=>"",  
	]);
				
	//javascript events
	
	//when the select2 gets initialized
	elem.find(".x-form-select2draggable").off("x-form-init").on("x-form-init", function(){
		alert("select2basic: x-form-init event fired")
	})
	
	//when selected a new value
	elem.find(".x-form-select2draggable").off("x-form-add").on("x-form-add", function(){
		alert("select2draggable: x-form-add event fired")
	})
	
	//when drop after dragging
	elem.find(".x-form-select2draggable").off("x-form-drop").on("x-form-drop", function(){
		alert("select2draggable: x-form-drop event fired")
	})
	
*/
?>
<div class="form-group x-form-group">
	<label><?php echo $label; ?> <?php echo ($required)? "<code>*</code>": "" ?></label>
	<div class="x-select2draggable-container select2draggable-container">
		<style>
		.sortable-target{
			background: var(--main-color) ;
			opacity: 0.4;
		}
		.list-container{
			margin-top: 20px;
		}
		.list-container .list-group{
			margin-bottom:0px;
		}
		.list-container .list-group-item{
			cursor:pointer;
		}
		.list-container .list-group-item table{
			width: 100%
		}
		.list-container .list-group-item table .tb-no{
			width: 5%
		}
		.list-container .list-group-item table .tb-content{
			width: 85%
		}
		.list-container .list-group-item table .tb-action{
			width: 10%
		}
		.select2draggable-select2-container table{
			width: 100%;
		}
		.select2draggable-select2-container .tb-select2{
			width: 100%;
			padding-right: 10px;
		}
		.select2draggable-select2-container .tb-add{
			text-align: right;
		}
		.select2draggable-select2-container .tb-add button{
			height: 40px;
		}

		.select2draggable-container .list-group-item{
			padding: 5px;
			padding-left: 10px;
			padding-right: 10px;
		}

		.select2draggable-container .btn-danger{
			width: 30px;
			height: 30px;
			padding: 5px;
		}

		</style>
		<div class="x-select2draggable-select2-container select2draggable-select2-container">
			<table>
				<tr>
					<td class="tb-select2">
						<select data-type="basic" style="width:100%" class="x-select2draggable-select2 select2-basic form-control">
							<?php echo (($select2html)? $select2html : ""); ?>
						</select>
					</td>
					<td class="tb-add">
						<button class="btn btn-green x-add"><i class="fa fa-plus"></i> Add</button>
					</td>
				</tr>
			</table>
		</div>
		<textarea data-formtype="basic" class="<?php debug('hide'); ?> form-control x-select2draggable x-form <?php 
			echo $name." x-form-".$name." "; 
			echo (($class)? $class: "")."\" ";  
			echo (($name)? "name='".$name."'": "")." ";
			echo (($name)? "data-name='".$name."'": "")." ";
			echo (($extratags)? $extratags : "")." ";
			echo (($placeholder)? "placeholder='".$placeholder."'": "")." ";
			echo (($required)? "required": "")." ";
			echo (($dataendpoint)? "data-endpoint='".$dataendpoint."'": "")." ";
			echo (($datainitvalue!="")? "data-initvalue='".$datainitvalue."'": "")." ";
		?>><?php echo (($datainitvalue)? $datainitvalue : ""); ?></textarea>
		<div class="x-list-container list-container">
			<div class="x-list list-group">
				<div class="list-group-item x-template hide">
					<table>
						<tr>
							<td class="x-tb-no tb-no hide"></td>
							<td class="x-tb-content tb-content"></td>
							<td class="x-tb-action tb-action text-right">
								<button class="btn btn-danger x-delete">X</button>
							</td>
						</tr>
					</table>
				</div>
			</div>	
		</div>
	</div>
</div>