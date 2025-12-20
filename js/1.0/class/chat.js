
import Notification from "./notification";



export default class Chat extends Notification{



    param
    conn
    isConnected
    peer
    lastMsg


    constructor(peer,param){

        super()

        console.log("create chat")


        this.param = param

        console.log(this.param)

        //this.isConnected = false;

        this.peer = peer

        this.init()


        this.lastMsg = ''

        this.isConnected = false


    }

    init(){

        console.log("connect to ",this.param.guestid)

        console.log(this.param.guestid)

        this.conn = this.peer.connect(this.param.guestid)


        this.conn.on('open',e=>{

            console.log("chat open")

            this.fire("chatconnected","")

            //this.isConnected = false



        })




        this.conn.on('error',e=>{

            console.log("error",e)

            // this.conn =  this.peer.connect(this.param.guestid)
         })



         this.peer.on('close',e=>{
            console.log("peer close",e)
         })


         this.peer.on('error',e=>{

            console.log("peer err",e)
         })



        this.peer.on('connection',conn=>{


            console.log("conn",conn)

            console.log("connection")

            // this.fire("connectionconnected","")

            //console.log('lastMsg',this.lastMsg)


            this.isConnected = true

            console.log("peer connection isconnected",this.isConnected)

            
            if (this.param.isHost){

                this.conn =  this.peer.connect(this.param.guestid)

            }



   

            conn.on('data',data=>{

                //console.log(data)

                this.fire('msgreceive',data)
   
                

            })



        })



    }



    send(data){


    


        console.log("peerconnection",this.conn.peerConnection)


        if (this.conn.peerConnection === null){

            console.log("null connection")
           

            this.conn =  this.peer.connect(this.param.guestid)


        }
        else{

            this.conn.send(data)

            
        }





    }

 


}