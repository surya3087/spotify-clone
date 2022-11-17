console.log('welcome to spotify');

// initialise the variables

let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let audioElement = new Audio('audio/rightnow.mp3');
let songProgress = document.getElementById('songProgress');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem')); //i can use songItem class or songCover class

let song = [
    {songName: 'rightnow', filePath: 'rightnow.mp3', coverPath: 'right now.jpg', duration: '4:45'},
    {songName: 'lonely', filePath: '/lonely.mp3', coverPath: '/lonely.jpg', duration: '4:45'},
    {songName: 'i wanna love you', filePath: 'audio/i wanna love you.mp3', coverPath: 'images/i wanna love you.jpg', duration: '4:45'},
    {songName: 'mama africa', filePath: 'audio/mama africa.mp3', coverPath: 'images/mama africa.jpg', duration: '4:45'},
    {songName: 'smack that', filePath: 'audio/smack that.mp3', coverPath: 'images/be with you.jpg', duration: '4:45'},
    {songName: 'dont matter', filePath: 'audio/dont matter.mp3', coverPath: 'images/dont matter.jpg', duration: '4:45'},
]

// add play/pause

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;

        // songItem songPlayPause button
        Array.from(document.getElementsByClassName('songPlayPause')).forEach((ele,i)=>{
            if(audioElement == song[i].filePath){
                if(ele.classList.contains('fa-play')){
                    // makeAllPlays();
                    ele.classList.remove('fa-play');
                    ele.classList.add('fa-pause');
                    
                }
            }   
            
        })
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;

         // songItem songPlayPause button
        Array.from(document.getElementsByClassName('songPlayPause')).forEach((ele,i)=>{
            if(ele.classList.contains('fa-pause')){
                ele.classList.remove('fa-pause');
                ele.classList.add('fa-play');
                makeAllPlays();
            }
        })

    }
})
audioElement.addEventListener( 'timeupdate', ()=>{
    // update seekbar
    let progress = (parseInt((audioElement.currentTime/audioElement.duration)*100));
    songProgress.value = progress;

})

songProgress.addEventListener('change', ()=>{
    audioElement.currentTime = ((songProgress.value*audioElement.duration)/100);
})

songItem.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = song[i].coverPath;
    element.getElementsByTagName('span')[0].innerText = song[i].songName;
    element.getElementsByClassName('timeStamp')[0].innerText = song[i].duration;
})
    
// next.addEventListener('click', () => {
//         song.forEach(ele,i)=>{
//         audioElement = new Audio(ele[i].filePath);
//         audioElement.play();
//         console.log(audioElement);
//         }
//     }
// )

function makeAllPlays() {
    Array.from(document.getElementsByClassName('songPlayPause')).forEach((ele)=>{
        ele.classList.add('fa-play');
        ele.classList.remove('fa-pause');
        audioElement.pause();
    })
    
}
Array.from(document.getElementsByClassName('songPlayPause')).forEach((ele,i)=>{
    ele.addEventListener('click', e=>{
        console.log(e.target);
        // makeAllPlays();
        if(e.target.classList.contains('fa-play')){
            makeAllPlays(); //here this function is needed
            e.target.classList.remove('fa-play');
            audioElement = new Audio(song[i].filePath);
            audioElement.currentTime =0;
            audioElement.play();
            e.target.classList.add('fa-pause');
            //masterPlay button
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;

            // bottom banner
            document.getElementById('btmImg').src = song[i].coverPath;
            document.getElementById('btmSongName').innerHTML = song[i].songName;

        }
        else if(e.target.classList.contains('fa-pause')){
            e.target.classList.remove('fa-pause');
            audioElement.pause();
            e.target.classList.add('fa-play');
            makeAllPlays(); // here this function is not needed
            //masterPlay button
            masterPlay.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
            gif.style.opacity = 0;
        }
    
        
    })

})

// next button
document.getElementById('next').addEventListener('click', ()=>{
    audioElement.pause();
    if(songIndex >= song.length){
        songIndex = 0;
    }
    else{
        audioElement.pause();
        songIndex = songIndex+1;
    }
    //bottom banner
    document.getElementById('btmImg').src = song[songIndex].coverPath;
    document.getElementById('btmSongName').innerHTML = song[songIndex].songName;

    audioElement = new Audio(song[songIndex].filePath);
    audioElement.currentTime =0;
    audioElement.play();
    //masterPlay button
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;

    //  // songItem songPlayPause button
    //  Array.from(document.getElementsByClassName('songPlayPause')).forEach((songIndex,i)=>{
    //     if(songIndex.classList.contains('fa-play')){
    //         makeAllPlays();
    //         songIndex.classList.remove('fa-play');
    //         songIndex.classList.add('fa-pause');
    //     }
    // })
})

//previous
document.getElementById('previous').addEventListener('click', ()=>{
    audioElement.pause();
    if(songIndex <= 0){
        songIndex = song.length;
        
    }
    else{
        audioElement.pause();
        songIndex -= 1;
    }
    //bottom banner
    document.getElementById('btmImg').src = song[songIndex].coverPath;
    document.getElementById('btmSongName').innerHTML = song[songIndex].songName;

    audioElement = new Audio(song[songIndex].filePath);
    audioElement.currentTime =0;
    audioElement.play();
    //masterPlay button
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    gif.style.opacity = 1;

    // // songItem songPlayPause button
    // Array.from(document.getElementsByClassName('songPlayPause')).forEach((ele,i)=>{
    //     if(ele.classList.contains('fa-pause')){
    //         ele.classList.remove('fa-pause');
    //         ele.classList.add('fa-play');
    //         makeAllPlays();
    //     }
    // })
})
