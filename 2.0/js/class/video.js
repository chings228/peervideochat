

import Notification from "./notification.js"


export default class Video extends Notification{


    param
    peer
    stream




    constructor(peer,param){

        super()


        this.isVideoInput = false
        this.isAudioInput = false
      

        this.param = param

        console.log(this.param)


        this.peer = peer
    

        this.checkMediaSources()
    

    
    
    }


    
    checkMediaSources(){



        navigator.mediaDevices.enumerateDevices()
        .then(devices=>{


            let videoInput = []
            let audioInput = []

            devices.forEach(device =>{



                //console.log(device.kind,device.label)

                if (device.kind == 'videoinput'){

                    videoInput.push(device)

                }
                else if (device.kind == 'audioinput'){
                    audioInput.push(device)
                }

                


            })

            if (videoInput.length > 0) {
                this.isVideoInput = true
            }

            if (audioInput.length > 0){
                this.isAudioInput = true
            }


            console.log(videoInput)
            console.log(audioInput)


            this.init()



        })


       



    }



    stopVideo(){


            this.guestvideo.style.display = 'none'

            this.call.close()


    }





    startVideo(){





        this.getStream().then(stream=>{

            console.log("get local strem success")

            this.stream = stream

            this.addVideoStream(this.ownvideo,stream)


            this.changeMute(true)

            this.call = this.peer.call(`${this.param.guestid}`,stream);

            this.call.on('stream',remotestream=>{

                this.remoteCameraStream = remotestream

                    console.log("call stream")
                    this.addVideoStream(this.guestvideo,remotestream)
                
                    this.fire("streamcall",{})

            })

            this.peer.on('call',call=>{


                    console.log("peer call")
                    call.answer(stream)

                    call.on('stream',remotestream=>{

                        console.log("call stream")

                        this.remoteCameraStream = remotestream
                        this.addVideoStream(this.guestvideo,remotestream)

                        this.fire("streamcall",{})
                    })



                    call.on('close',e=>{

                        console.log("call close",e)

                        this.fire("streamclose",{})
                    })

                    call.on('error',e=>{

                        console.log("call error",e)
                    })


                


            })



        }).catch(e=>{

            console.log(e)
            console.log("get local stream fail")





        })



    }



    init(){

        this.ownvideo = document.getElementById(this.param.owndivid)
        this.guestvideo = document.getElementById(this.param.guestdivid)

    
    }

    changeMute(status){

  

        console.log(this.stream.getAudioTracks())

        // this.camerastream.getAudioTracks()[0].enabled = !mute

        this.stream.getAudioTracks()[0].enabled = !status
    }



    addVideoStream(video,stream){

        console.log("add video stream")

        video.srcObject = stream

        video.addEventListener('loadedmetadata',()=>{

            console.log("start play")
            video.play()



        })




    }



    getStream(){


        const multiplier = 0.5;

        const width = 600 * multiplier;
        const height = 400 * multiplier

        console.log(multiplier)


        return new Promise((resolve, reject) => {


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