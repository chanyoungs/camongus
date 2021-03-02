import p5Types from 'p5'

export class Player {
  // Attributes
  p5?: p5Types
  mainPlayer: boolean
  loading: boolean
  video: HTMLVideoElement
  videoWidth?: number
  videoHeight?: number

  pos: { x: number; y: number }
  vel: { x: number; y: number }

  constructor({ pos = { x: 0, y: 0 }, mainPlayer = false }) {
    this.mainPlayer = mainPlayer
    this.pos = pos
    this.vel = { x: 10, y: 10 }
    this.loading = true
    this.video = document.createElement("video")
  }

  async setup(p5: p5Types, videoWidth: number = 100) {
    this.p5 = p5
    this.videoWidth = videoWidth
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    this.video.srcObject = stream
    this.video.play()

    await new Promise((resolve) => (this.video.onloadedmetadata = resolve))
    this.videoHeight =
      (this.videoWidth * this.video.videoWidth) / this.video.videoHeight

    await new Promise((resolve) => (this.video.onplaying = resolve))
    this.loading = false
  }

  render() {
    const p5 = this.p5
    if (this.loading || !p5) return
    // @ts-ignore
    const drawingContext: CanvasRenderingContext2D = p5.drawingContext
    drawingContext.drawImage(
      this.video,
      this.pos.x,
      this.pos.y,
      this.videoHeight!,
      this.videoWidth!
    )
  }

  update() {
    this.movePlayer()
  }

  movePlayer() {
    const p5 = this.p5
    if (this.loading || !p5 || !this.mainPlayer) return

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      this.pos.x -= this.vel.x
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      this.pos.x += this.vel.x
    }

    if (p5.keyIsDown(p5.UP_ARROW)) {
      this.pos.y -= this.vel.y
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      this.pos.y += this.vel.y
    }
  }
}
