;(function (){
    const slider = $('.offers__list').bxSlider({
        pager: false,
        controls: false,
        slideMargin: 100,
        shrinkItems: true,
    });
    $(".arrow-left").on("click", e => {
        e.preventDefault();
        slider.goToPrevSlide();
    })
    
    $(".arrow-right").on("click", e => {
        e.preventDefault();
        slider.goToNextSlide();
    })
})()
