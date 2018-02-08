const request = require('request');
const cheerio = require('cheerio');


var movie = process.argv[2]
var seconds = Number(process.argv[3])
var convert = seconds * 1000
var apiKey = '616bda48b6fc010876e020aba60455d8'


function scraper(movie){

    request('https://www.google.ca/search?q=' + process.argv[2] + '+film',  function(err, response, body){
        if (!err){
            const $ = cheerio.load(body);
            let links = $('.r a');
            // using cheerio to scrape the google search headlines.
            // '.r a' are the div and header classes.
            console.log('Here are some top search results for ' + process.argv[2]);
            links.each(function(i, link){
                let site = $(link).text()
                
                console.log(site);
            })
        }
    })
}

function spoiled(){
    let tmdb = ('https://api.themoviedb.org/3/search/movie?api_key='+ apiKey + '&language=en-US&query=' + movie + '&page=1&include_adult=false&popularity=1');
    request(tmdb, function (error, response, body){
    if (process.argv[2] === undefined || process.argv[2] === null){
        console.log('Please enter a valid input pls thanks')
    }
    
    else if (error){
        console.log('There was an error loading the page. Error: ' + error)
    }
    
    else{
        const answer = JSON.parse(body);
        if (answer.results[0] === undefined){
            console.log('No movie found, please choose a real movie')
        }
        else{
            setTimeout(function(){console.log(movie + ` spoiler: ${answer.results[0].overview}`);}, convert);
            console.log('** spoiler warning, you are about to spoil the movie ' + movie + '\n' + ' in about '  + seconds + ' seconds **')
            scraper();
        }
    }
    })


}




spoiled();
