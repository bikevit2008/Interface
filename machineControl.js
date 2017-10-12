process.on('message', (msg) => {
    // Do work  (in this case just up-case the string
    console.log('child out')
    console.log(msg)

    const dimsSize = 4
    const offsetDimBytes = dimsSize >> 1
    const pixelsCompressed = msg.data.slice(dimsSize)
    console.log(pixelsCompressed)

    const dimensionsArr = msg.data.slice(0, dimsSize)
    console.log(dimensionsArr)
    const buff = Buffer.from(dimensionsArr)
    console.log(buff)
    const width = buff.readInt16BE()
    const height = buff.readInt16BE(offsetDimBytes)
    console.log('width: ' + width)
    console.log('height: ' + height)
    const unCompressedMonoPixels = getUnCompressedMonoPixels(pixelsCompressed, width, height)
    console.log(unCompressedMonoPixels)
    const arrayToEngrave = twoDimArr(unCompressedMonoPixels, width, height)
    console.log(arrayToEngrave)
    //process.send(msg)
})
function getUnCompressedMonoPixels(compressedMonoPixels, width, height){
    let lengthMono = width * height
    let monoPixels = new Uint8ClampedArray(lengthMono)
    let lastPiece = monoPixels.length % 8
    let beforeLastPiece = monoPixels.length - lastPiece
    console.log('lengthMono: ' + lengthMono + ' lastpiece: ' + lastPiece + ' beforelastpiece: ' + beforeLastPiece)
    for(let i = 0; i < beforeLastPiece; i+=8){
        for(let j = 0; j < 8; j++){
            let num = compressedMonoPixels[i >> 3]
            let bit = (num >> j) & 1
            let pixel = bit === 0 ? 0 : 255
            monoPixels[i+j] = pixel
            let z = i+j
            console.log('Number: ' + num + ' bit: ' + bit + ' bitindex: ' + j + ' pixel: '+ pixel + ' arrindex: ' + z + ' arrvalue: ' + monoPixels[i+j])
        }
    }
    for(let j = 0; j < lastPiece; j++){
        let num = compressedMonoPixels[(beforeLastPiece + j) >> 3]
        let bit = (num >> j) & 1
        let pixel = bit === 0 ? 0 : 255
        monoPixels[beforeLastPiece + j] = pixel
        let z = beforeLastPiece + j
        console.log('Number: ' + num + ' bit: ' + bit + ' bitindex: ' + j + ' pixel: '+ pixel + ' arrindex: ' + z + ' arrvalue: ' + monoPixels[beforeLastPiece + j])
    }
    return monoPixels
}
function twoDimArr(unCompressedMonoPixels, width, height){
    let twoDimArr = []

    for(let i = 0; i < height; i++) {
        let line = []
        for(let j = 0; j < width; j++) {
            line[j] = unCompressedMonoPixels[i*height + j]
        }
        twoDimArr[i] = line
    }
    return twoDimArr
}

