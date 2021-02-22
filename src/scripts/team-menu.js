;(function() {
    let openItem = item => {
        let conteiner = item.closest(".team__item");
        let contentBlock = conteiner.find(".team__hidden-conteiner");
        let textBlock = contentBlock.find(".team__hidden-conteiner__block");
        let reqHeight = textBlock.height();
    
    
        conteiner.addClass("active");
        contentBlock.height(reqHeight);
    }
    
    let closeItem = conteiner => {
        let item = conteiner.find(".team__hidden-conteiner");
        let itemConteiner = conteiner.find(".team__item");
    
        itemConteiner.removeClass("active");
        item.height(0);
    }
    
    $(".team__link").click(e => {
        let $this = $(e.currentTarget);
        let conteiner = $this.closest(".team__list");
        let elemConteiner = $this.closest(".team__item");
    
        if(elemConteiner.hasClass("active")){
            closeItem(conteiner);
        }else {
            closeItem(conteiner);
            openItem($this);
        }
    
    
    })
    
    
})()