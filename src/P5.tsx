import p5Types from 'p5'
import Sketch from 'react-p5'

import Map from './assets/map/Map.jpg'
import { Player } from './Game/player'

interface P5Props {}

export const P5: React.FC<P5Props> = (props: P5Props) => {
  const player = new Player({ mainPlayer: true })
  const mainPlayer = player
  let map: p5Types.Image

  const preload = (p5: p5Types) => {
    map = p5.loadImage(Map)
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9).parent(
      canvasParentRef
    )
    player.setup(p5)
  }

  const draw = (p5: p5Types) => {
    p5.background(220)
    if (player.loading) {
      p5.text("Loading...", p5.width / 2, p5.height / 2)
    } else {
      // Update state
      player.update()

      // Update camera
      p5.translate(
        p5.width / 2 - mainPlayer.pos.x,
        p5.height / 2 - mainPlayer.pos.y
      )

      // Render
      p5.imageMode(p5.CENTER)
      p5.image(map, 0, 0)
      p5.rect(p5.width / 2, p5.height / 2, 100, 100)
      player.render()
    }
  }

  return <Sketch preload={preload} setup={setup} draw={draw} />
}
