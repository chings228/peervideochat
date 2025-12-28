//import PeerVideo from "https://peervideodev.1328.hk/js/1.0/class/peervideo.js"

import PeerVideo from "https://cdn.jsdelivr.net/gh/chings228/peervideochat@master/js/1.0/class/peervideo.js"


import Common  from "./class/common"


let peerconnect 



window.isConnected = false

let guestdiv = $("#guest")


    const stopVideoBtn = $("#stopVideoBtn")
    const requestVideoBtn = $("#requestVideoBtn")



init()






function init(){


    console.log(window.location)

    let isHost = true
    let peerid = ''



    console.log(Common.getUrlParameter("guestid"))

    if (Common.getUrlParameter("guestid")){

        peerid = Common.getUrlParameter("guestid")
        isHost = false
    }


    else{
        if (Common.getUrlParameter("hostid")){

            peerid = Common.getUrlParameter("hostid");
    
    
        }
        else{
            peerid =  Common.makeid(12)
        }
    


    }


    const param = {}

    param.hostdivid  = 'host'
    param.guestdivid = 'guest'
    param.isHost = isHost
    param.peerid = peerid


    console.log(param)


    if (isHost){

        window.history.pushState({},null,`${window.location.origin}/?hostid=${peerid}`)
        
        const guestlink = `${window.location.origin}/?guestid=${peerid}`
        
        document.getElementById('guestlink').innerHTML = `<a href=${guestlink} target=_blank>${guestlink}</a>`








    // random text 


    let randomtext = `${Common.makeid(4)} ${Common.makeid(6)}`

    $("#inputtext").val(randomtext)



    }

    
     peerconnect = new PeerVideo(param,e=>{
    
    
        console.log(param)
        console.log(e)





       
    })





    peerconnect.on("incomingconnection",e=>{


        console.log("apps incomingconnection connected")

        console.log("isVideoStreaming",peerconnect.isVideoStreaming)

        if (peerconnect.isVideoStreaming && isHost){

            const data = {}
            data.key = 'admin'
            data.content= 'requestVideo'
        
            console.log(data)


            setTimeout(()=>{
                peerconnect.sendMsg(data)
            },1000)
        
            


        }

    })
   
   




    peerconnect.on("incomingdata",e=>{

        //console.log(e)


        handleText(e)

    })


    peerconnect.on("disconnected",e=>{

        console.log("disconnected")

        isConnected = false

    })


    peerconnect.on("connected",e=>{

        console.log("connected")

        if (isHost){

            requestVideoBtn.css("display","block")
        }



        isConnected = true
    })



    peerconnect.on("streamclose",e=>{

        console.log("stream close")

        guestdiv.css("display","none")

        stopVideoBtn.css("display","none")



    })



    peerconnect.on("streamcall",e=>{

        console.log("stream call")

        guestdiv.css("display","block")

        stopVideoBtn.css("display","block")
    })



 
    stopVideoBtn.click(()=>{

        peerconnect.stopVideo()
    })


    requestVideoBtn.click(()=>{

        startVideo()
    })




}




    $("#sendbtn").click(e=>{

      

        sendMsg()

    })





function startVideo(){

    console.log("start video")


    console.log(peerconnect)

    peerconnect.startVideo()



        const data = {}
        data.content = 'requestVideo'
        data.key = 'admin'
    
        console.log(data)
    
        peerconnect.sendMsg(data)










}



function handleText(e){



    if (e.key == 'text'){

        const html = `<div class='chat_dialogue chat_guest'>${Common.he(e.content)}</div>`

        $("#chatbox").append(html.replaceAll('\n','<br>'))



        scrollToBottom()


    }
    else if (e.key == 'admin'){


        if (e.content = 'requestVideo'){


            console.log("request video")

            peerconnect.startVideo()
        }


    }

    


    


}



function scrollToBottom(){

    const objDiv = document.getElementById("chatbox");

    objDiv.scrollTop = objDiv.scrollHeight;
}



function sendMsg(){


    let  msg  = $("#inputtext").val().trim()

    if (msg != ''){

        // $("#inputtext").val('')

        //console.log(msg)

        const data = {}
        data.key = 'text'
        data.content = msg

       // console.log(peerconnect)

        peerconnect.sendMsg(data)


        let randomtext = `${Common.makeid(4)} ${Common.makeid(6)}`

        $("#inputtext").val(randomtext)
    }




}

