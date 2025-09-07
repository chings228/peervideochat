
import turnserver from   "./turnserver"
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"


export default class CreatePeer{




    callback

    peers = {}

    turnsrever 

    name

    param



    constructor(name,param,callback){


        this.callback = callback
        this.name = name
        this.param = param

        console.log(this.param)

        const turn = new turnserver()


        turn.getTurn(e=>{


            if (e.isSuccess){

                this.turnserver = e.config

                console.log(this.turnserver)


                this.connectPeer()

            }



        })




    }


    connectPeer(){



        
    }





    
}