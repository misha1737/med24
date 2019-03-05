

var filter=false;

$(" .filter-off").click(function() {

if(filter){
	filter=false;

	$(" .filter").css("display","none")


}
	else{

	filter=true;

	$(" .filter").css("display","block")
} 


//$(" .filter-off").addClass("filter-on");
//$(" .filter-off").removeClass("filter-off");
//console.log("123");

});

$(" .filterSend").click(function() {
filter=false;

	$(" .filter").css("display","none");

});


var optionCatalog=localStorage.getItem("optionCatalogList");
if (optionCatalog===null){
	localStorage.setItem("optionCatalogList",'false');
}else{
	
	
}

function setList(){
$(" .catelogElemet").addClass("productBlockList");
$(".catelogElemet").removeClass("productBlock");
$(" .glyphicon-th").removeClass("selected");
$(" .glyphicon-th-list").addClass("selected");
//
}

function setNotList(){
$(" .catelogElemet").addClass("productBlock");
$(" .catelogElemet").removeClass("productBlockList");
$(" .glyphicon-th-list").removeClass("selected");
$(" .glyphicon-th ").addClass("selected");
//localStorage.setItem("optionCatalogList",false);
}

$(" .glyphicon-th-list").click(function() {
setList();
localStorage.setItem("optionCatalogList",'true');
});

$(" .glyphicon-th").click(function() {
setNotList();
localStorage.setItem("optionCatalogList",'false');

});


