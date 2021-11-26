import { updateBird, setupBird, getBirdRect } from "./bird.js"
import { updatePipes, setupPipes, getPassedPipesCount, getPipeRects, } from "./pipe.js"

const title = document.querySelector( "[data-title]" )
const subtitle = document.querySelector( "[data-subtitle]" )

let lastTime
const updateLoop = ( time ) => {
    if ( lastTime == null ) {
        lastTime = time
        window.requestAnimationFrame( updateLoop )
        return
    }
    const delta = time - lastTime
    updateBird( delta )
    updatePipes( delta )
    if ( checkLose() ) return handleLose()
    lastTime = time
    window.requestAnimationFrame( updateLoop )
}

const checkLose = () => {
    const birdRect = getBirdRect()
    const insidePipe = getPipeRects().some( rect => isCollision( birdRect, rect ) )
    const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
    return outsideWorld || insidePipe
}

const isCollision = ( rect1, rect2 ) => rect1.left < rect2.right && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.bottom > rect2.top

const handleStart = () => {
    title.classList.add( "hide" )
    setupBird()
    setupPipes()
    lastTime = null
    window.requestAnimationFrame( updateLoop )
}

const handleLose = () => setTimeout( () => {
    title.classList.remove( "hide" )
    subtitle.classList.remove( "hide" )
    console.log( !( !document.cookie ) )
    const highscore = 0
    subtitle.innerHTML = `Score: ${getPassedPipesCount()}<br />Highscore: ${highscore}`
    document.addEventListener( "keypress", handleStart, { once: true } )
}, 100 )

document.addEventListener( "keypress", handleStart, { once: true } )