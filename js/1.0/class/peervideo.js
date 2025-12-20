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


    constructor(param,callback){



        super()


        this.param = param
        this.callback = callback

        console.log(param)



     
       
 

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


        console.log(this.param)

        new CreatePeer(this.param,(res,peer)=>{

            console.log(res)
            console.log(peer)

            console.log(this.param)

            console.log(res)

           
            if (!res){

                console.log("fail connect peer")
            
            }
            else{


                console.log("procceed create chat ")
                this.peerchat = new Chat(peer,this.param)


                this.peerchat.on("msgreceive",data=>{
    
                    //console.log(data)
                    this.fire("incomingdata",data)
    
    
    
                })
    
    
                this.peervideo = new Video(peer,this.param)
    
    
                this.peerchat.on("chatconnected",()=>{
    
                    this.fire("chatconnected","")
                })
    
    
                this.callback("done")

            }




        })





    }

    
    
    
    
    startVideo(){

        console.log("start video")

        this.peervideo.startVideo()

    }




    sendMsg(data){
        //console.log(data)

        console.log(this.peerchat)

        this.peerchat.send(data)
    }






}