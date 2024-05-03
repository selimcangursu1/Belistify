const songList = [
    {
        name: 'Bir Sonraki Hayatımda Gel',
        artist: "Murda & Ezhel",
        src: 'Murda & Ezhel - Bi Sonraki Hayatimda Gel (prod. Spanker) [Lyric video].mp3',
        image:'bir-sonraki-hayatimda-gel.jpg',
    },
    {
        name: 'Submariner',
        artist: "AKDO - Lvbel-C5",
        src: 'akdo-lvbel5-submariner.mp3',
        image:'submariner.jpg',
    },
    {
        name: 'İş Güç Laf',
        artist: "BLOK3 x Lvbel-C5",
        src: 'BLOK3 x LVBEL C5 - İŞ GÜÇ LAF.mp3',
        image:'iş-güç-laf.jpg',
    },
    {
        name: 'AYA',
        artist: "Murda & Ezhel",
        src: 'AYA - Murda & Ezhel (prod. Spanker).mp3',
        image:'aya.jpg',
    },
    {
        name: 'Gaz Pedal',
        artist: "Lvbel-C5",
        src: 'LVBEL C5 - ,GAZ PEDAL ft. AREM OZGUC & ARMAN AYDİN.mp3',
        image:'gaz-pedal.jpg',
    },
    {
        name: 'IMPARATOR',
        artist: "Sefo",
        src: 'Sefo - IMPARATOR (prod. by DIVXRSE).mp3',
        image:'imparator.jpg',
    },
    {
        name: 'Bonita',
        artist: "Sefo & Reynmen",
        src: 'Sefo, Reynmen - Bonita (prod. by Aerro).mp3',
        image:'bonita.jpg',
    },
];

let currentIndex = 0;

$(document).ready(function(){
    loadSound(currentIndex);
  
    $('.play-pause').click(function(){
        if($('.container').hasClass('pause')){
            pauseSong();
        } else {
            playSong();
        }
    });
    $('.next-btn').click(function(){
        currentIndex++
        if(currentIndex>songList.length-1){
            currentIndex = 0
        }
        loadSound(currentIndex);
        playSong();
    })
    $('.prev-btn').click(function(){
        currentIndex--
        if(currentIndex<songList.length-1){
            currentIndex = 0
        }
        loadSound(currentIndex);
        playSong();
    })

    $('.audio').on('timeupdate',function(){
        let audio = $('.audio').get(0);
        let currentTime = audio.currentTime;
        let duration = audio.duration;
        let process = (currentTime / duration) * 100;
        $('.song-process').css('width',process + '%');
    });

    $('.audio').on('timeupdate',function(){
        let audio = $('.audio').get(0);
        let currenttime = audio.currentTime;
        $('.start-time').text(formatTime(currenttime));
    })

    $('.audio').on('loadedmetadata',function(){
        let audio = $('.audio').get(0);
        let duration = audio.duration;
        $('.total-time').text(formatTime(duration))
    });
    
    $('.song-duraction').click(function(e) {
        let songDuration = $('.audio').get(0).duration;
        let clickPosition = e.pageX - $(this).offset().left;
        let newPosition = (clickPosition / $(this).width()) * songDuration;
        $('.audio').get(0).currentTime = newPosition;
        $('.start-time').text(formatTime(newPosition));
    });
});


function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    remainingSeconds = (remainingSeconds < 10) ? "0" + remainingSeconds : remainingSeconds;
    return minutes + ":" + remainingSeconds;
}

function loadSound(index){
    // $('.music-info-artist').text(songList[index].artist);
    // $('.music-info-name').text(songList[index].name);
    $('.song-name').text(songList[index].name);
    $('.song-artist').text(songList[index].artist);
    $('.audio').attr('src', 'music/' + songList[index].src);
    $('.music-info').css('background-image','url(image/' + songList[index].image + ')');

}

function playSong(){
    $('.container').addClass('pause');
    $('#play').css('display', 'none');
    $('#pause').css('display', 'block');
    $('.audio').get(0).play();      
    $('.music-info').addClass('rotate');
}

function pauseSong(){
    $('.container').removeClass('pause');
    $('#play').css('display', 'block');
    $('#pause').css('display', 'none');
    $('.audio').get(0).pause();
    $('.music-info').removeClass('rotate');
}


