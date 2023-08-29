import React, { useEffect, useRef, useState } from "react";
import "./CSS/Compo.css";
import music1 from "./Music/1.mp3";
import music2 from "./Music/2.mp3";
import music3 from "./Music/3.mp3";
import music4 from "./Music/4.mp3";
import music5 from "./Music/5.mp3";


const Compo = () => 
{
  const [control, setControl] = useState(true);
  const audioplayer = useRef();
  const [second, setSecond] = useState(0);
  const [currentsong,setCurrentSong]=useState(0);
  const [Min, setMinute] = useState(0);
  const [startSec, setStartSec] = useState(0);
  const [startMin, setStartMin] = useState(0);
  const [startDuration,setDuration]=useState(0);
  const [TotalDuration,setTotalDuration]=useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [currentTime, setCurrentTime] = useState(0);


  const music = [
    {
      Song: "Baarish Hai Jaanam",
      length: 238,
      URL: "https://shorturl.at/iqCFW",
      music_num: music1,
    },
    {
      Song: "Mujhse Mil Raghav Chaitanya",
      length: 212,
      URL: "https://shorturl.at/hnJLP",
      music_num: music2,
    },
    {
      Song: "Chaleya Jawan",
      length: 200,
      URL: "https://shorturl.at/mDVY3",
      music_num: music3,
    },
    {
        Song: "Tere Hawale",
        length: 350,
        URL: "https://shorturl.at/cpzL2",
        music_num: music4,
    },
    {
        Song: "Heeriye",
        length: 199,
        URL: "https://shorturl.at/fnsZ8",
        music_num: music5,
    }
  ];


  const PreHandler = () => {
    
    SongControl()
    console.log("previous song");
    if(currentsong===0)
    {
    setCurrentSong(music.length-1);
    
    }
    else
    {
    setCurrentSong(currentsong-1);
    }
    setStartMin(0);
    setStartSec(0); 
    setDuration(0); 
    setControl(false)
    audioplayer.current.play();
  };

  const NextHandler = () => {
    SongControl();
    console.log("next song");
    if(currentsong===(music.length-1))
    {
    setCurrentSong(0);

    }
    else
    {
    setCurrentSong(currentsong+1);
    }
    setStartMin(0);
    setStartSec(0); 
    setDuration(0);
    setControl(false)
    audioplayer.current.play();      
  };

  const SongControl = () => {
    setControl(!control);
    if (control === false) 
    {
      audioplayer.current.play();
    } 
    else 
    {
      audioplayer.current.pause();
    }
  };
  
 

  const handleResize = () => {
      setScreenWidth(window.innerWidth);
    
  };


useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize);
    };
},[]);




const Progresshandler=(e)=>
{
console.log("Event for Click in %",(Math.ceil((((e.nativeEvent.clientX+12)-Math.floor((screenWidth-376)/2))/376)*100)))
console.log("total second on click",Math.floor((Math.floor(audioplayer.current.duration)*(Math.ceil((((e.nativeEvent.clientX+12)-Math.floor((screenWidth-376)/2))/376)*100)))/100))
const TotalSecondSet=Math.floor((Math.floor(audioplayer.current.duration)*(Math.ceil((((e.nativeEvent.clientX+12)-Math.floor((screenWidth-376)/2))/376)*100)))/100)
setDuration(TotalSecondSet);
setStartMin(Math.floor(TotalSecondSet / 60));
setStartSec(Math.floor(TotalSecondSet % 60)); 
const audioElement = audioplayer.current;
audioElement.currentTime = TotalSecondSet;
}

  useEffect(() => {
    let intervalId
    
    setMinute(Math.floor(audioplayer.current.duration / 60));
    setTotalDuration(Math.floor(audioplayer.current.duration))
    const Sec = Math.floor(audioplayer.current.duration % 60);
    setSecond(Sec < 10 ? `0${Sec}` : `${Sec}`);
    
    if(TotalDuration!==0 && TotalDuration===(startMin*60 + startSec))
    {
    NextHandler();
    }

    if (control === false) {
        audioplayer.current.play();
      } 
    else {
        audioplayer.current.pause();
      }

    if (control !== true) 
    {
       intervalId = setInterval(() => {
        if (startSec === 59) {
          setStartSec(0);
          setStartMin((oldMin) => oldMin + 1);
          setDuration((oldduration)=>oldduration+1);
          
        } else {
          setStartSec((oldSec) => oldSec + 1);
          setDuration((oldduration)=>oldduration+1);
        }
      }, 995);
    }
    else
    {
    clearInterval(intervalId)
    }
    return () => clearInterval(intervalId);
   
  }, [currentsong,startDuration,audioplayer,control]);


useEffect(() => {
  const audioElement = audioplayer.current;
  audioElement.addEventListener('timeupdate', () => {
    setCurrentTime(audioElement.currentTime);
  });
  return () => {
    audioElement.removeEventListener('timeupdate', () => {
      setCurrentTime(audioElement.currentTime);
    });
   
  };
}, []);




  return (
    <div className={`Player${currentsong}`} >
      <h4 className="player-title">
        <img width={400} height={400} src={music[currentsong].URL} alt="no found" />
      </h4>
      <div className="song-info">
        <audio id="audiodata"  ref={audioplayer} src={music[currentsong].music_num} preload="metadata"  />
        <h1 className="song-name">{music[currentsong].Song}</h1>
        <h1 className="artist-name">Arjit Singh</h1>
      </div>
      <div className="progress-bar-container">
        <span className="progress-time">
          {startMin}:{startSec < 10 ? `0${startSec}` : startSec}
        </span>
        <div className="progress" 
          onClick={Progresshandler}>
          <div
            className="progress-bar"
            onClick={(e)=>console.log(e.target.style.width)}
            role="progressbar"
            style={{width:`${Math.floor((startDuration / TotalDuration) * 100)}%`}}
            aria-valuenow={Math.floor((startDuration/TotalDuration)*100)}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
         
        </div>
        <span className="progress-time">
          {isNaN(Min) ? "0" : Min} : {isNaN(second) ? "00" : second < 10 ? `0${second}` : second}
        </span>
      </div>
      <div className="player-controls">
        <span onClick={PreHandler} className="control-icon">
          <i className="fa-solid fa-backward fa-xl"></i>
        </span>
        <span onClick={SongControl} className="control-icon">
          {control ? (
            <i className="fa-solid fa-circle-play fa-2xl"></i>
          ) : (
            <i class="fa-solid fa-circle-pause fa-2xl"></i>
          )}
        </span>

        <span onClick={NextHandler} className="control-icon">
          <i className="fa-solid fa-forward fa-xl"></i>
        </span>

      
      </div>
    </div>
  );
};

export default Compo;
