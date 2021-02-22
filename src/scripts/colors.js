;(function(){
    let blockWidth = item => {
        let reqItemWidth = 0;
        let screenWidth = $(window).width();
        let conteiner = item.closest(".colors__list");
        let titleBlocks = conteiner.find(".color__link");
        let titleWidth = titleBlocks.width() * titleBlocks.length;
    
        let textConteiner = item.find(".color__item-desc");
        let marginLeft = parseInt(textConteiner.css("margin-left"));
        let marginRight = parseInt(textConteiner.css("margin-right"));
    
        let isTablets = window.matchMedia("(max-width: 850px)").matches;
    
        if (isTablets){
            reqItemWidth =  screenWidth - titleWidth;
        }
        else{
            reqItemWidth = 500;
        }
    
        return {
            conteiner: reqItemWidth,
            textConteiner: reqItemWidth - marginLeft - marginRight,
        }
        
    }
    
    let openHiddenConteiner = conteiner => {
        conteiner.addClass("active");
        let hiddenConteiner = conteiner.find(".colors__hidden-conteiner");
        let reqWidth = blockWidth(conteiner);
        let textBlock = conteiner.find(".color__item-desc");
    
        hiddenConteiner.width(reqWidth.conteiner);
        textBlock.width(reqWidth.textConteiner);
        hiddenConteiner.css("opacity", "0.8");
    
        
    }
    let closeHiddenConteiner = conteiner => {
        let colorsList = conteiner.closest(".colors__list");
        let colorItem = colorsList.find(".color__item");
        colorItem.removeClass("active");
        let hiddenConteiner = colorsList.find(".colors__hidden-conteiner");
        hiddenConteiner.width(0);
        hiddenConteiner.css("opacity", "0");
    }
    
    $(".colors__list").on("click", (e) => {
        e.preventDefault();
        let $target = $(e.target);
        let conteiner = $target.closest(".color__item");
        
        if (conteiner.hasClass("active")){      
            closeHiddenConteiner(conteiner);
        }
        else{
            
            closeHiddenConteiner(conteiner);
            openHiddenConteiner(conteiner);
        }
        
    })
})()
