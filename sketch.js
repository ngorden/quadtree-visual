var particles, qt

function setup() {
    createCanvas(800, 600)

    particles = Array(1000).fill().map(p => Particle(width / 2, height / 2))
}

function draw() {
    background(0)
    qt = QuadTree(Boundary(width / 2, height / 2, width / 2, height / 2), 4)
    particles.map(p => {
        p.run()
        qt.insert(p.pos)
    })
    qt.show()
}
