process.on('message', (msg) => {
  // Do work  (in this case just up-case the string
  console.log('child out')
  console.log(msg)
  const array = new Uint8ClampedArray(msg.data)

  console.log(array)
  // Pass results back to parent process
  process.send(msg)
})
