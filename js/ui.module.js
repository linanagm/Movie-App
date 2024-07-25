export class Ui{
    constructor(){};

    //display function
    displayMovies(data){
        
        let moviesContainer=``
        
        for(let i = 0; i<data.length ; i++){
            const stars = this.StarsRatingContainer(data[i].vote_average);

            moviesContainer += `
                <div class="col-lg-4 col-sm-12 animate__animated animate__fadeIn">
        
                        <div class="card border-0 item overflow-hidden position-relative animate__fadeIn">
                            <div class="cardImage card-img animate__fadeIn animate__delay-2s">
                                <img class="img-fluid" src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" alt="${data[i].original_title}">
                            </div>
    
                            <div class="overlay card-img-overlay overflow-hidden animate__fadeIn">
                                <h1 class="animate__animated title animate__slideOutLeft text-center">${data[i].original_title}</h1>
                                <p class="animate__animated desc animate__slideOutLeft">${data[i].overview}</p>
                                <p class="animate__animated date animate__slideOutLeft">
                                    <span>
                                        Release Date
                                        <span> : ${data[i].release_date}</span>
                                    </span>
                                </p>

                                <h3 id="rateContainer" class="rate pt-3 animate__animated animate__slideOutLeft d-flex text-warning">
                                    
                                ${stars}
                                </h3>

                                <h6 id="rateNum" class="rate  animate__animated vote animate__slideOutLeft">${(Math.round(data[i].vote_average * 10)/10).toFixed(1)}</h6>
                            </div>
                        </div>
                        
                    </div>
            `
        }

        $('#moviesData').html(moviesContainer);
        $('#moviesData .row .card-img').addClass("animate__fadeIn");
        $('#main .card').on('mouseenter' , this.cardHoverIn);
        $('#main .card ').on('mouseleave' , this.cardHoverOut);

    }

    // movie card animation
    cardHoverIn()
    {
      $(this).find($('.overlay')).css({"opacity":"1","visibility":"visible"});
      $(this).find($('.overlay .title')).removeClass('animate__slideOutLeft');
      $(this).find($('.overlay .title')).addClass('animate__fadeInDown animate__delay-0s');
      $(this).find($('.overlay .desc')).removeClass('animate__slideOutLeft');
      $(this).find($('.overlay .desc')).addClass('animate__flipInX animate__delay-0s');
      $(this).find($('.overlay .date')).removeClass('animate__slideOutLeft');
      $(this).find($('.overlay .date')).addClass('animate__fadeInUp animate__delay-0s');
      $(this).find($('.overlay .rate')).removeClass('animate__slideOutLeft');
      $(this).find($('.overlay .rate')).addClass('animate__fadeInUp animate__delay-0s');
      $(this).find($('.card .cardImage img')).addClass("animate");
    }

    cardHoverOut()
        {
        $(this).find($('.overlay')).css({"opacity":"0","visibility":"hidden"});
        $(this).find($('.overlay .title')).removeClass('animate__fadeInDown animate__delay-0s');
        $(this).find($('.overlay .title')).addClass('animate__slideOutLeft');
        $(this).find($('.overlay .desc')).removeClass('animate__flipInX animate__delay-0s');
        $(this).find($('.overlay .desc')).addClass('animate__slideOutLeft');
        $(this).find($('.overlay .date')).removeClass('animate__fadeInUp animate__delay-0s');
        $(this).find($('.overlay .date')).addClass('animate__slideOutLeft');
        $(this).find($('.overlay .rate')).removeClass('animate__fadeInUp animate__delay-0s');
        $(this).find($('.overlay .rate')).addClass('animate__slideOutLeft');
        $('.cardImage img').removeClass("animate");
    }

    //rate stars function
    StarsRatingContainer(rating) {
        // Convert rating to a 5-star scale 
        const convertedRating = rating / 2; 

        //Get numbers of full stars
        const fullStars = Math.floor(convertedRating);
        
        //Check if there is ahalf star
        const halfStar = convertedRating % 1 !== 0; 
        
        let starContainer =``;
        //add full stars
        for (let i = 0; i < fullStars; i++) {
            starContainer += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
      
        // Add half star if true
        if (halfStar) {
            starContainer += `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`
        }
        
        return starContainer;
        
    }
      

}