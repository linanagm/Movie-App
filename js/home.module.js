/// <reference types="../@types/jquery" />
"use strict";

import { Ui } from "./ui.module.js";

export class Home{
    constructor(){
        //get instace of Ui class
        this.ui = new Ui();
        this.loadingPage = $('#loading');
        
    };

    //runApp
    runHome(){
        this.homeMovies();

        $('.nav-link').each((index,link) => {
            $(link).on( 'click' , () => {
                this.navLinkClick(link);
            })
        })

        $('#search').on('input' , (e)=>{
            this.searchInput = $('#search').val();
            this.searchMovie(this.searchInput);
            if(this.searchInput == "" ){
                this.homeMovies();
            }
        })
        
        $('#goUpArrow').on('click' , ()=>{
            this.topZero();
        } )
        $(window).on('scroll', ()=> {
            this.showHideArrow();
        });
    }

    // Get movies data from api => return array of movies
    async getMovies(term){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTc5M2RlNzY1ZGEyOGU4YzI5NzY0ODNlZDJmMWIwMSIsIm5iZiI6MTcyMTc0MTU2Ni44MjQ1OTMsInN1YiI6IjYxZDZiOTYzYTIyZDNlMDAxZGE5YzY2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CWVBq6mz2-gDswIe9yvtpzUyGaN5iQXOiVUFpDBdAAI`
            }
          };
          
        const api = await fetch(`https://api.themoviedb.org/3/movie/${term}?api_key=b5793de765da28e8c2976483ed2f1b01&language=en-US&include_adult=false` , options);
        const response = await api.json();
        return response.results;
    }

    //Get trending movies from api => return array 
    async getTrendingMovies(){
        const options =  {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTc5M2RlNzY1ZGEyOGU4YzI5NzY0ODNlZDJmMWIwMSIsIm5iZiI6MTcyMTc0MTU2Ni44MjQ1OTMsInN1YiI6IjYxZDZiOTYzYTIyZDNlMDAxZGE5YzY2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CWVBq6mz2-gDswIe9yvtpzUyGaN5iQXOiVUFpDBdAAI`
            }
          };
        const api = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
        const response = await api.json();
        console.log(response.results);
        return response.results;
    }

    //Get new playing movies from api => return array
    async getNewPlayMovies(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTc5M2RlNzY1ZGEyOGU4YzI5NzY0ODNlZDJmMWIwMSIsIm5iZiI6MTcyMTc0MTU2Ni44MjQ1OTMsInN1YiI6IjYxZDZiOTYzYTIyZDNlMDAxZGE5YzY2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CWVBq6mz2-gDswIe9yvtpzUyGaN5iQXOiVUFpDBdAAI`
            }
          };
          
        const api = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=b5793de765da28e8c2976483ed2f1b01&language=en-US&include_adult=false` , options);
        const response = await api.json();
        return response.results;  
    }

    //diplay movies + loading page
    async homeMovies(){
        const newPlayMoviesArray = await this.getNewPlayMovies();
         this.loadingPage.fadeOut(2000 , ()=>{
            this.loadingPage.remove()
         });
          
        this.ui.displayMovies(newPlayMoviesArray);
    }

    //side nav get data => when click on nav link get movies category 
    async navLinkClick(link){
        const category =  $(link).attr('data-category');

        if (category === 'trending'){
            const moviesData = await this.getTrendingMovies();
            this.ui.displayMovies(moviesData);
        }
        else{
        const moviesData = await this.getMovies(category);
        this.ui.displayMovies(moviesData);
        }
        
    }
    
    //search movies
    async searchMovie(term) {
        let movies = `https://api.themoviedb.org/3/search/movie?query=${term}&api_key=b5793de765da28e8c2976483ed2f1b01&language=en-US&include_adult=false`;
        let response = await fetch(`${movies}`);
        if (response.ok && 400 != response.status) {
            let Data = await response.json();
            let movies = Data.results;
            this.ui.displayMovies(movies);
            
        }
    }

    //show & hise go the top btn || arrow
    showHideArrow(){

        if ($(window).scrollTop()> 100) {
            
            $('#goUpArrow').css({'visibility':'visible', 'opacity':'1'})
        } else {
            
            $('#goUpArrow').css({'visibility':'hidden', 'opacity':'0'})
        }
    }

    //go to the top animation
    topZero(){
            $('html, body').animate({scrollTop:0},{
                duration: 500,
                easing: "linear"});
    }

}