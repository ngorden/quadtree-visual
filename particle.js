const Particle = (x, y) => {
    const acc = createVector(0, 0)
    const pos = createVector(x, y)
    const vel = createVector(0, 0)

    const applyForce = force => acc.add(force)

    const borders = () => {
        if (pos.x < 0) pos.x = width - 1
        else if (pos.x >= width) pos.x = 0

        if (pos.y < 0) pos.y = height - 1
        if (pos.y >= height) pos.y = 0
    }

    const run = () => {
        if (random(1) < 0.01)
            applyForce(p5.Vector.random2D())

        update()
        borders()
        show()
    }

    const show = () => {
        stroke(0, 0, 255)
        fill(0, 0, 255, 100)
        strokeWeight(1)
        ellipse(pos.x, pos.y, 25)
    }

    const update = () => {
        vel.add(acc)
        vel.limit(0.2)
        pos.add(vel)
        acc.mult(0)
    }

    return { pos, run }
}
