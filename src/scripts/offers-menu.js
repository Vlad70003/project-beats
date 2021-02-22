;(function(){
    let offersList = document.querySelector(".offers");
 
    offersList.addEventListener("mouseover", function(event) {
        let cursor = $(event.target);
        let findBlock = cursor.children(".settings__list");
        if (findBlock){
            let settingsGear = findBlock.closest(".settings__gear");
            settingsGear.addClass("block");
        }
    })
    
    offersList.addEventListener("mouseout", function(event) {
        let cursor = $(event.target);
        let findBlock = cursor.find(".settings__gear");
        findBlock.removeClass("block");
    })
})()