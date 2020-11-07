
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disablr/ enable button

function toggleButton(){
    button.disabled = !button.disabled
}
//passing joke to voicfeRSS API

function tellMe(joke){
    VoiceRSS.speech({
                key: '59340a67e3494f59a8d46c4f3e569f7a',
                src: joke,
                hl: 'en-us',
                v: 'Mary',
                r: 0, 
                c: 'mp3',
                f: '44khz_16bit_stereo',
                ssml: false
            });
}

// Get jokes from joke API

async function getJokes(){
    let joke =''
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Christmas?blacklistFlags=nsfw,religious,racist,sexist';

    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke= data.joke;
        }
        //test-to-speach
        tellMe(joke); 
        //disablr button
        toggleButton();
    }catch(error){
        console.log('whoops', error)

    }
}
// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);