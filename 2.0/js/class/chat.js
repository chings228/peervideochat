
import Notification from "./notification.js";



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


        this.lastMsg = null

        this.isConnected = false


    }

    init(){

        //console.log("connect to ",this.param.guestid)

       // console.log(this.param.guestid)

        this.conn = this.peer.connect(this.param.guestid)


        this.conn.on('open',e=>{

            console.log("chat open")

            this.fire("chatconnected","")

            //this.isConnected = false






        })




        this.conn.on('error',e=>{

            console.log("error",e)

            this.conn =  this.peer.connect(this.param.guestid)

         })




    }


    connected(conn){

        console.log("conn",conn)

        console.log("connection")

        if (this.param.isHost){

            this.conn =  this.peer.connect(this.param.guestid)

        }


        if (this.lastMsg !== null){

            setTimeout(()=>{
                console.log("not null resend",this.lastMsg)

                this.conn.send(this.lastMsg)

            },100)

        }




        conn.on('data',data=>{

            //console.log(data)

            this.fire('msgreceive',data)


        })



    }



    send(data){



        //console.log("peerconnection",this.conn.peerConnection)


        if (this.conn.peerConnection === null){

            console.log("null connection")
           


            this.lastMsg = data
            this.conn =  this.peer.connect(this.param.guestid)

            this.fire("disconnected",{})




        }
        else{

            this.lastMsg = null

            this.conn.send(data)

            
        }





    }

 


}