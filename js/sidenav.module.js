
export class sideNavAnimation{
    constructor(){

    }

    //open & close side nav on click
    runSideNav(){
        this.closeNav();
        $('.close-open-icon').on('click' , ()=>{
             this.openNav();
         })

    }

    openNav()
    {
        if ($("nav").css("margin-left") == "0px") {
            this.closeNav();
        } else {
            $("nav").css("margin-left","0px");
            $('#navMenu ul li').animate({"paddingTop":"25px","opacity":"1"},1000);
            $('.close-open-icon').html('<i class="fa-solid fa-xmark"></i>');
        }
    }

    closeNav() 
    {
        $('#navMenu ul li').animate({"paddingTop":"250px","opacity":"0"},1000);
        $("nav").css("margin-left","-250px");
        $('.close-open-icon').html('<i class="fa-solid fa-align-justify"></i>');
    }

}