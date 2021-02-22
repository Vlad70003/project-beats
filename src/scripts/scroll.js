;(function() {

    //Переменные
    let section = $(".section");
    let wrapper = $(".wrapper__conteiner");
    let sideMenu = $(".fixed-menu");
    let fixedMenu = sideMenu.find(".fixed-menu__element");
    
    let mobileDetect = new MobileDetect(window.navigator.userAgent);
    let isMobile = mobileDetect.mobile();
    
    let inScroll = false;
    
        // Функция "Смена Позиции"
    let countSectionPosition = sectionEq => {
        let position = sectionEq * -100;
    
        if(isNaN(position)){
            console.error("Передано не верное значение countSectionPosition")
            return 0;
        }
        return position;
    }
    
        //Функция "Смена цвета Фиксировонного меню"
    let changeMenuColorSection = sectionEq => {
        let currentSection = section.eq(sectionEq);
        let sectionColor = currentSection.attr("data-color-theme");
        let activeClass = "fixed-menu--color";
    
        if (sectionColor == "white"){
            sideMenu.addClass("activeClass");
        }else{
            sideMenu.removeClass("activeClass");
        }
    }
    
        //Функция "Сброс Класса"
    let resetActiveClassForItem = (items, itemEq, activeClass) => {
        items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
    }
    
    section.first().addClass("active");
    
    let performTransition = (sectionEq) => {
        if(inScroll) return;
        let transitionOver = 1000;
        let mouseInertiaOver = 300;
        inScroll = true;
    
        let position = countSectionPosition(sectionEq);
    
        changeMenuColorSection(sectionEq);
    
        wrapper.css({
            transform: `translateY(${position}%)`
        });
    
        resetActiveClassForItem(section, sectionEq, "active");
    
        
    
        setTimeout(() => {
            inScroll = false;
            resetActiveClassForItem(fixedMenu, sectionEq, "fixed-menu__element--active"); 
        }, transitionOver + mouseInertiaOver)  
        
    }
    
    let viewportScroller = () => {
        let activeSection = section.filter(".active");
        let nextSection = activeSection.next();
        let prevSection = activeSection.prev();
    
        return {
            next(){
                if(nextSection.length){
                    performTransition(nextSection.index());
                }
            },
            prev(){
                if(prevSection.length){
                    performTransition(prevSection.index());
                }
            }
        }   
    }
    
    $(window).on("wheel", e => {
        let deltaY = e.originalEvent.deltaY;
        let scroller = viewportScroller()
    
        if(deltaY > 0 ){
            scroller.next();
        }
        if(deltaY < 0){
            scroller.prev();
        }
    })
    
    $(window).on("keydown", e => {
        let tagName = e.target.tagName.toLowerCase();
        let userTypingInInputs = tagName === "input" || tagName === "textarea";
        let scroller = viewportScroller()
    
        if(userTypingInInputs) return;
    
            switch(e.keyCode){
                case 38:
                scroller.prev();
                break;
        
            case 40:
                scroller.next();
                break;
            } 
    
    })
    
    // Плавность перехода секций
    $(".wrapper").on("touchmove", e => {
        e.preventDefault();
    })
    
    $("[data-scroll-to]").click(e => {
        e.preventDefault();
    
        let $this = $(e.currentTarget);
        let target = $this.attr("data-scroll-to");
        let reqSection = $(`[data-section-id=${target}]`);
    
        performTransition(reqSection.index());
    })

//Свайп
    if(isMobile){
        $("body").swipe( {
            swipe:function(event, direction) {
              let scroller = viewportScroller();
              let scrollDirection = "";
                
            
              if (direction == "up") scrollDirection ="next";
              if (direction == "down") scrollDirection ="prev";
              if (direction == "left") scrollDirection ="prev";
              if (direction == "right") scrollDirection ="next";
        
              scroller[scrollDirection]();
            }
          });  
    }
})()
