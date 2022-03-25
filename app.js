console.log('connected')

const canvas =  document.querySelector('canvas')
const context = canvas.getContext('2d')
let cWidth =  window.innerWidth-50
let cHeight = window.innerHeight-50

canvas.width =  cWidth
canvas.height = cHeight

const clearCanvas = ()=>{
    context.fillStyle = 'white' //color of drawing
    context.fillRect(0, 0, cWidth, cHeight)
}

const randomInt = (min,max)=>{
    return Math.floor(Math.random()*max)+min
}

const randomVec = ()=>{
    if (Math.random()>=0.5){
        return 1
    }
    return -1
}

class Vector{
    constructor(x, y){
        this.x = x
        this.y = y
    }

    getDistance(v){
        const dx = this.x - v.x
        const dy = this.y - v.y
        return Math.sqrt(dx*dx + dy*dy)
    }
}

class Agent{
    constructor(x, y){
        this.pos = new Vector(x, y)
        this.vel = new Vector(randomVec(), randomVec())
        this.r = randomInt(4,12)
    }

    update(){
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }

    bounce(cWidth, cHeight){
        if(this.pos.x <=(this.r/2)+4 || this.pos.x >= cWidth-(this.r/2)-4){this.vel.x *= -1}
    
        if(this.pos.y <=(this.r/2)+4 || this.pos.y >= cHeight-(this.r/2)-4){this.vel.y *= -1}
    }


    draw(context){
        context.fillStyle = 'white'

        context.save()
        context.translate(this.pos.x, this.pos.y)
        context.lineWidth = 4
        context.beginPath()
        context.arc(0, 0, this.r, 0, Math.PI * 2)
        context.fill()
        context.stroke()
        context.restore()
    }
}


const agents = []
let maxAgents = 10
const threshold = 60
if(cWidth>cHeight){
    maxAgents = cHeight/threshold
}
else{
    maxAgents = cWidth/threshold
}


    for(let i=0; i<maxAgents; i++){
        x = randomInt(15, cWidth-25)
        y = randomInt(15, cHeight-25)
        agents.push(new Agent(x, y))
    }

const aLines = ()=>{
    for(let i=0; i < agents.length; i++){
        const agent = agents[i]

        for(let j=i+1; j < agents.length; j++){
            const other = agents[j]

            const dist = agent.pos.getDistance(other.pos)

            if (dist > 200) continue
                if(dist < 50){
                    context.lineWidth = 4
                }
                else if(dist <100 && dist >50){
                    context.lineWidth = 3
                }
                else if (dist <150 && dist >100){
                    context.lineWidth = 2
                }
                else{
                    context.lineWidth = 1
                }
            
            context.beginPath()
            context.moveTo(agent.pos.x, agent.pos.y)
            context.lineTo(other.pos.x, other.pos.y)
            context.stroke()
        }
    }
}

const bubbles = ()=>{
    clearCanvas()
    aLines()
    agents.forEach(agent=>{
        agent.update()
        agent.draw(context)
        agent.bounce(cWidth, cHeight)
    })
    window.requestAnimationFrame(bubbles)
}

bubbles()

window.addEventListener('resize', ()=>{
    location.reload()
})