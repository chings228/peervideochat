import PeerVideo from "https://peervideodev.1328.hk/js/1.0/class/peervideo.js"


import Common  from "./class/common"


let peerconnect 


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
        
        document.getElementById('guestlink').innerText = guestlink


        $("#videobtndiv").css("display","block")



            $("#requestVideobtn").click(()=>{

                startVideo()
            })

    }





    // random text 


    let randomtext = `${Common.makeid(4)} ${Common.makeid(6)}`

    $("#inputtext").val(randomtext)




    
     peerconnect = new PeerVideo(param,e=>{
    
    
        console.log(param)
        console.log(e)



        // setTimeout(()=>{ startVideo()},1000

        // )




        // comment to stop video part 

        //startVideo()
       
    })
   
   




    peerconnect.on("incomingdata",e=>{

        //console.log(e)


        handleText(e)

    })



    $("#sendbtn").click(e=>{

      

        sendMsg()

    })

}



function startVideo(){

    console.log("start video")


    console.log(peerconnect)

    peerconnect.startVideo()

    const data = {}
    data.key = 'requestVideo'

    console.log(data)

    peerconnect.sendMsg(data)


}



function handleText(e){



    if (e.key == 'text'){

        const html = `<div class='chat_dialogue chat_guest'>${Common.he(e.content)}</div>`

        $("#chatbox").append(html.replaceAll('\n','<br>'))



        scrollToBottom()


    }
    else if (e.key == 'requestVideo'){

        peerconnect.startVideo()
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

