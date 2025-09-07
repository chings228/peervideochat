import PeerVideo from "https://peervideodev.1328.hk/js/1.0/class/peervideo.js"


import Common  from "./class/common"





init()



function init(){




    let isHost = true
    let peerid = ''

    if (Common.getUrlParameter("guestid")){

        peerid = Common.getUrlParameter("guestid")
        isHost = false
    }



    if (Common.getUrlParameter("hostid")){

        peerid = Common.getUrlParameter("hostid");


    }
    else{
        peerid = 
    }









    const param = {}

    param.hostid  = 'host'
    param.guestid = 'guest'
    param.isHost = isHost
    param.peerid = peerid







    
    
    const peerconnect = new PeerVideo(param,e=>{
    
    
    
        console.log(e)
    
    
        
    
    
    
    
    
    
    
    
    
    
    })


}

