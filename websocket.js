

var handle = function(ws, req){
      console.log('Client connected')
      ws.binaryType = 'arraybuffer'
      ws.on('message', msg => {
        if (typeof msg !== 'string') {
            const array = new Uint8ClampedArray(msg)

            console.log(array)
        }
        else{
            console.log('Meassage got: ' + msg)
            try{
                let jsonMsg = JSON.parse(msg)
                let method = jsonMsg.method
                if(method){
                    switch(method){
                        case 'hi':
                            let res = {method: 'HI from server' }
                            let jsonRes = JSON.stringify(res)
                            ws.send(jsonRes)
                            break
                        default:
                            let error = new Error("Method unknown", 501) //Тут метод и правда неизвестен
                            let jsonError = JSON.stringify(error)
                            ws.send(jsonError)
                    }
                }
                else if (!jsonMsg.method) {
                    let error = new Error("Method unknown", 501) //Тут отсутствует метод
                    let jsonError = JSON.stringify(error)
                    ws.send(jsonError)
                }
                else{
                    let error = new Error("Internal Server Error", 500)
                    let jsonError = JSON.stringify(error)
                    ws.send(jsonError)
                }
            }
            catch (errorParse){
                let error = new Error("Method unknown", 501) //Надо поменять на неферный вормат данных или что-то вроде
                let jsonError = JSON.stringify(error)
                ws.send(jsonError)
                console.log('Unknow user testing our service. Thats bad.')
                console.log(msg)
                console.log(errorParse.name)
                console.log(errorParse.message)
            }
      }
    })
}
class Error{
    constructor(type, code){
      	this.method = "error"
        this.type = type
        this.code = code
    }
}

module.exports.handle = handle
