;(function(){
    let hamburger = document.querySelector(".hamburger");
    let hideMenu = document.querySelector(".hide-menu");
    let hideMenuClose = document.querySelector(".hide-menu__close");
    
    hamburger.addEventListener("click", function(event){
        if(event){
            hideMenu.style.display = "block";
        }  
    })
    
    hideMenuClose.addEventListener("click", function(event){
        if(event){
            hideMenu.style.display = "none";
        }
    })
})()
