
const pontos = []
const hull = []
let extremoEsq
let verticeAtual
let index
let proxIndex = -1
let proxVertice
let numPontos = 200
function setup() {
  createCanvas(500, 500)
  let buffer = 20
  for (let i = 0; i<numPontos;i++){
  pontos.push(createVector(random(buffer,width-buffer), random(buffer,height-buffer)))
  }
  
  pontos.sort((a,b) => a.x - b.x)
  extremoEsq = pontos[0]
  verticeAtual = extremoEsq
  hull.push(verticeAtual)
  proxVertice = pontos[1]
  index = 2
}

function draw() {
  background(0)
  
  stroke(255)
  strokeWeight(5)
  for (let p of pontos){
    point(p.x,p.y)
  }
  
  stroke(0,0,255)
  fill(0,0,255,50)
  beginShape()
  for (let p of hull){
    vertex(p.x,p.y)
  }
  endShape(CLOSE)
  
  stroke(0,255,0)
  strokeWeight(10)
  point(extremoEsq.x,extremoEsq.y)
  
  stroke(200,0,255)
  strokeWeight(10)
  point(verticeAtual.x,verticeAtual.y)
  
  stroke(0,255,0)
  strokeWeight(2)
  line(verticeAtual.x, verticeAtual.y, proxVertice.x, proxVertice.y)
  
  let checando = pontos[index]
  stroke(255)
  line(verticeAtual.x, verticeAtual.y, checando.x, checando.y)
  
  const a = p5.Vector.sub(proxVertice, verticeAtual)
  const b = p5.Vector.sub(checando, verticeAtual)
  const vetorial = a.cross(b)
  if (vetorial.z < 0){
    proxVertice = checando
    proxIndex = index
  }
  index = index + 1
  if (index == pontos.length){
    if (proxVertice == extremoEsq){
      console.log('Pronto')
      noLoop()
    }else{
      hull.push(proxVertice)
      verticeAtual = proxVertice
      index = 0
      //pontos.splice(proxIndex,1)
      proxVertice = extremoEsq

    }
  }
}
