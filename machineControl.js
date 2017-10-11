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
    //process.send(msg)
})


