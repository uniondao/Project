var user_lan = localStorage.getItem("language");
var currentLan = "cn";
if(user_lan == null){
    currentLan = "en";
}else{
    currentLan = user_lan;
}

$(document).on("click",".lan",function(e){
    let lan = $(this).attr('lan');
    localStorage.setItem("language",lan);
    window.location.reload();
})