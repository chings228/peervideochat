import Notification from "./notification.js"
import CreatePeer from "./createpeer.js"






export default class PeerVideo extends Notification{


    callback 
    param
    video
    peer


    constructor(param,callback){



        super()


        this.param = param
        this.callback = callback

        console.log(param)



        this.callback("done")


 

        this.initPeer()


    }




    initPeer(param){


        this.peer = new CreatePeer(param,name,e=>{


            



        })





    }







}