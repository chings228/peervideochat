import Notification from "./notification.js"
import CreatePeer from "./createpeer.js"

import Chat from "./chat.js"
import Video from "./video.js"






export default class PeerVideo extends Notification{


    callback 
    param
    video
   
    peerchat
    peervideo

    isVideoStreaming 


    constructor(param,callback){

       

        super()

        this.isVideoStreaming = false


        this.param = param
        this.callback = callback
 

        this.initPeer()


    }





    initPeer(){




        let peer_hostid = `pvc_host_${this.param.peerid}`
        let peer_guestid = `pvc_guest_${this.param.peerid}`

        if (!this.param.isHost){

            const tempid = peer_hostid
            peer_hostid = peer_guestid
            peer_guestid = tempid
        }


        this.param.hostid = peer_hostid
        this.param.guestid = peer_guestid




        new CreatePeer(this.param,(res,peer,err)=>{

            

           
            if (!res){

                console.log("fail connect peer")

                console.log(res,peer,err)

                this.callback(false,err.type)

                this.fire("disconnected",{});

            
            }
            else{
                this.peer = peer


                console.log("procceed create chat ")
               
               
                this.peerchat = new Chat(peer,this.param)


                this.peerchat.on("msgreceive",data=>{
    
                    //console.log(data)
                    this.fire("incomingdata",data)
    
    
    
                })


                this.peerchat.on("chatconnected",()=>{

                    console.log("chat connected")
                    this.callback(true,{})
    
                    this.fire("connected",{})
                })


                this.peerchat.on("disconnected",()=>{

                    console.log("disconnected")
                    this.fire("disconnected",{});
                })
    





                peer.on('connection',conn=>{

                    console.log("peervideo incomingconnection")

                    console.log(this.peerchat)



                        this.peerchat.connected(conn)

                        this.fire("incomingconnection","")
                        this.fire("connected",{})
    
                        this.callback(true,{})
                    




                })



    

                this.peervideo = new Video(peer,this.param)


                this.peervideo.on("streamclose",e=>{

                    console.log("steam calose")

                    this.fire("streamclose",{})
                })


                this.peervideo.on("streamcall",e=>{

                    console.log("steam call")

                    this.fire("streamcall",{})
                })

    
              

            }




        })





    }



    
    
    
    startVideo(){



        console.log("start video")

        this.peervideo.startVideo()

        this.isVideoStreaming = true

    }


    stopVideo(){

        this.peervideo.stopVideo()

        this.isVideoStreaming = false


    }


    mute(){

            this.peervideo.changeMute(true)
    }

    unmute(){
        this.peervideo.changeMute(false)
    }



    sendMsg(data){



        console.log(data)

  

        this.peerchat.send(data)
    }






}