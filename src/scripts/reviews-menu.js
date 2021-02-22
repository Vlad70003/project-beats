;(function(){
    let findBlock = (block) => {
        return $(".rewiews__person").filter( (index, item) => {
            return $(item).attr("data-view") == block;
        })
    }
    
    
    $('.pagginator__element').on("click", function(e){
        e.preventDefault();
    
        let click = $(e.currentTarget);
        let dataOpen = click.children(".pagginator__link").attr("data-open");
        let currentBlock = findBlock(dataOpen);
        let currentTarget =  click.closest(".pagginator__element");
        currentBlock.addClass("isActive").siblings().removeClass("isActive");
        currentTarget.addClass("active").siblings().removeClass("active");
    })
    
})()