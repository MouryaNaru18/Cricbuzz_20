var check = [false, false, false, false];
var div = ["dcricket", "dmovies", "dvideogames", "dcoding"];
var hobby = ["Cricket", "Movies", "Video Games", "Coding"];
function showDescription() {
    
    var hobbies = "Confirm with clicking on OK. Hobbies Selected are: ";
    var checked = false;
    
    for(var j=0; j<4; j++){
        if(document.getElementById(hobby[j]).checked){
            hobbies = hobbies +'\n' + hobby[j];
            check[j] = true;
            checked = true;
        }
        else{
            check[j]=false;
        }
    }
    if(!checked) hobbies = "You have not selected any hobby";
    let des = confirm(hobbies);
    if (des) {
        for(var i=0; i<4;i++){
            if(check[i]){
                document.getElementById(div[i]).style.display = "block";
            }
            else {document.getElementById(div[i]).style.display = "none"};
        }
    }
    
}



