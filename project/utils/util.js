const formatHash = hash => {

  return `//fuss10.elemecdn.com/${hash.slice(0, 1)}/${hash.slice(1, 3)}/${hash.slice(3)}${hash.slice(-3) === 'png'?'.png':'.jpeg'}`
}


module.exports = {
  formatHash: formatHash
}