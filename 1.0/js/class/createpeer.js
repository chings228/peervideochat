
import turnserver from   "./turnserver.js"
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"


export default class CreatePeer{




    callback


    param


    constructor(param,callback){


        this.callback = callback

        this.param = param

        console.log(this.param)

        const turn = new turnserver()


        turn.getTurn(e=>{


            if (e.isSuccess){

                this.turnserver = e.config

                console.log(this.turnserver)


                this.connectPeer(this.turnserver)

            }



        })




    }


    connectPeer(turnserver){





        const option = {}


        option.config = turnserver
        option.path = '/'



        const peer = new Peer(this.param.hostid,option)




        peer.on("open",e=>{

            console.log("peer open")

            console.log(e)

            this.callback(true,peer)

        })


        peer.on("error",e=>{


            console.log("peer error",e)

            this.callback(false,{})
        })


        peer.on("close",e=>{
            console.log("peer close")
        })


        peer.on("disconnected",e=>{
            console.log("peer disconnected")
        })




    }





    
}