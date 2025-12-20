

import Notification from "./notification"


export default class Video extends Notification{


    param
    peer
    stream




    constructor(peer,param){

        super()

      

        this.param = param

        console.log(this.param)


        this.peer = peer
    

        this.checkMediaSources()
    
        this.init()
    
    
    }


    
    checkMediaSources(){


        this.init()



    }




    startVideo(){

        this.getStream().then(stream=>{

            console.log("get local strem success")

            this.stream = stream

            this.addVideoStream(this.hostvideo,stream)


            this.changeMute()

            this.call = this.peer.call(`${this.param.guestid}`,stream);

            this.call.on('stream',remotestream=>{

                this.remoteCameraStream = remotestream

                    console.log("call stream")
                    this.addVideoStream(this.guestvideo,remotestream)
                


            })

            this.peer.on('call',call=>{


                    console.log("peer call")
                    call.answer(stream)

                    call.on('stream',remotestream=>{

                        this.remoteCameraStream = remotestream
                        this.addVideoStream(this.guestvideo,remotestream)
                    })
                


            })



        }).catch(e=>{

            console.log(e)
            console.log("get local stream fail")

            this.peer.on('call',call=>{


                console.log("peer call")
                call.answer(this.stream)

                call.on('stream',remotestream=>{

                    console.log()
                    this.addVideoStream(this.guestvideo,remotestream)
                })
            


            })

        })



    }



    init(){

        this.hostvideo = document.getElementById(this.param.hostdivid)
        this.guestvideo = document.getElementById(this.param.guestdivid)


        console.log(this.hostvideo)






    
    
    
    
    
    
    }

    changeMute(){

  

        console.log(this.stream.getAudioTracks())

        // this.camerastream.getAudioTracks()[0].enabled = !mute

        this.stream.getAudioTracks()[0].enabled = false
    }



    addVideoStream(video,stream){

        video.srcObject = stream

        video.addEventListener('loadedmetadata',()=>{

            console.log("start play")
            video.play()



        })




    }



    getStream(){


        const multiplier = 1;

        const width = 600 * multiplier;
        const height = 400 * multiplier

        console.log(multiplier)


        return new Promise((resolve, reject) => {

            if (navigator.mediaDevices.getSupportedConstraints().zoom){
                console.log("suppot zoom")
            }
            else{
                console.log("not support zoom")
            }
            navigator.mediaDevices
                .getUserMedia({
                    video : { width: width, height: height },
                    audio : true
                })
                .then((stream) => {

                    console.log("success")
                    resolve(stream);
                }).catch(e=>{
                    console.log(e)
                    reject(e);
                })
        });



    }


}