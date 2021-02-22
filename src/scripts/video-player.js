let player;
  const playerContainer = $(".player");
  
  // Книпка Включения / Выключения громкости
  function editVolume () {
      $(".player__vol-headphones").click(e => {
          if (player.getVolume() == 0) {
              player.setVolume('100');
              $(".player__vol-button").css({
                  left: `${100}%`
              })
          } else {
              player.setVolume('0');
              $(".player__vol-button").css({
                  left: `${0}%`
              })
          }
      });			
    $(".player__vol-line").on("click", (e) => {
          let $bar = $(e.currentTarget);
          let clickPosition = e.originalEvent.layerX;
          let newButtonPositionPer = (clickPosition / $bar.width()) * 100;
          $(".player__vol-button").css({
              left: `${newButtonPositionPer}%`
          })
          player.setVolume(newButtonPositionPer);
      })
  }
  // Кнопка Пуск / Пауза
  let eventsInit = () => {
      $(".player__start").click(e => {
        e.preventDefault();
      
        if (playerContainer.hasClass("paused")) {
          playerContainer.removeClass("paused");
          player.pauseVideo();
        } else {
          playerContainer.addClass("paused");
          player.playVideo();
        }
      });
  
      $(".player__playback").on("click", (e) => {
          let $bar = $(e.currentTarget);
          let clickPosition = e.originalEvent.layerX;
          let newButtonPositionPer = (clickPosition / $bar.width()) * 100;
          let newBarPositionSec = (player.getDuration() / 100) * newButtonPositionPer;
  
          $(".player__playback-button").css({
              left: `${newButtonPositionPer}%`
          })
  
          player.seekTo(newBarPositionSec);
      })
     }
  
  //Перевод в сек
  const formatTime = timeSec => {
      const roundTime = Math.round(timeSec);
      
      const minutes = addZero(Math.floor(roundTime / 60));
      const seconds = addZero(roundTime - minutes * 60);
      
      function addZero(num) {
        return num < 10 ? `0${num}` : num;
      }
      
      return `${minutes} : ${seconds}`;
  };
  
  const onPlayerReady = () => {
      let interval;
      let durationSec = player.getDuration();
      
      $(".player__duration-estimate").text(formatTime(durationSec));
  
      if (typeof interval !== "undefined") {
          clearInterval(interval);
        }
        
        interval = setInterval(() => {
          const completedSec = player.getCurrentTime();
        
          const complatePersent = (completedSec / durationSec) * 100 ;
  
          $(".player__playback-button").css({
              left: `${complatePersent}%`
          });
  
          $(".player__duration-completed").text(formatTime(completedSec));
        }, 1000);
     };
  
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
      height: '390',
      width: '660',
      videoId: 'LXb3EKWsInQ',
      events: {
        onReady: onPlayerReady,
      //   'onStateChange': onPlayerStateChange
      },
      playerVars: {
      controls: 0,
       disablekb: 1,
       showinfo: 0,
       rel: 0,
       autoplay: 0,
       modestbranding: 0
      }
    });
  }
  eventsInit();
  editVolume ();

 