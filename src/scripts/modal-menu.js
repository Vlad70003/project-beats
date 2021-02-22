;(function() {
    const validateFilds = (form, fieldsArray) => {

        fieldsArray.forEach(field => {
            field.removeClass("input-error");
            if (field.val().trim() ===  ""){
                field.addClass("input-error");
        }
        
        })
        
        let errorNumber = form.find(".input-error");
        
        return errorNumber.length === 0;
        }
        
        $(".form").submit(e => {
        e.preventDefault();
            
        let form = $(e.currentTarget);
        let name = form.find("[name='name']");
        let phone = form.find("[name='phone']");
        let comment = form.find("[name='comment']");
        let to = form.find("[name='to']");
        let street = form.find("[name='street']");
        let building = form.find("[name='building']");
        let housing = form.find("[name='housing']");
        let flat = form.find("[name='flat']");
        let floor = form.find("[name='floor']");
        
        let modal = $("#modal");
        let modalContent = modal.find(".send-complate__title");
        
        
        const isValid = validateFilds(form, [name, phone, comment, to]);
        
        if(isValid){
        
            $.ajax({
                url: "https://webdev-api.loftschool.com/sendmail",
                method: "post",
                data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
                street: street.val(),
                building: building.val(),
                housing: housing.val(),
                flat: flat.val(),
                floor: floor.val(),
                },
                success: data => {
                    modalContent.text(data.message);
                    $.fancybox.open({
                        src: "#modal",
                        type: "inline"
                    })
                    jQuery('.form')[0].reset();
                },
                error: data => {
                    let message = data.responseJSON.message;
                    modalContent.text(message);
                    $.fancybox.open({
                        src: "#modal",
                        type: "inline"
                    })
                }
                
        
            });
        }
        })
        
        $(".js-button").on("click", e => {
            e.preventDefault();
            $.fancybox.close();
        })
})()

