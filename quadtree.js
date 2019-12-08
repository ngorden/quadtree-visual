const Boundary = (x, y, w, h) => {
    h = h || w

    const contains = (pt) => {
        return pt.x >= x - w && pt.x < x + w &&
            pt.y >= y - h && pt.y < y + h
    }

    const intersects = boundary => {
        return boundary.x - boundary.w > x - w &&
            boundary.x + boundary.w < x + w &&
            boundary.y - boundary.h > y - h &&
            boundary.y + boundary.h < y + h
    }

    return { x, y, w, h, contains, intersects }
}

const QuadTree = (boundary, capacity) => {
    let points = []
    let divided = false,
        northeast, northwest, southeast, southwest

    const insert = pt => {
        if (!boundary.contains(pt)) return false
        if (points.length < capacity) return Boolean(points.push(pt))

        if (!divided) subdivide()
        if (northeast.insert(pt)) { return true }
        if (northwest.insert(pt)) { return true }
        if (southeast.insert(pt)) { return true }
        if (southwest.insert(pt)) { return true }
    }

    const query = (range, found) => {
        found = found || []
        if (!boundary.intersects(range)) return

        found = points.filter(p => range.contains(p))
        if (divided) {
            northeast.query(range, found)
            northwest.query(range, found)
            southeast.query(range, found)
            southwest.query(range, found)
        }

        return found
    }

    const show = () => {
        noFill()
        stroke(255, 255, 0)
        strokeWeight(1)
        rectMode(CENTER)

        rect(boundary.x, boundary.y, 2 * boundary.w, 2 * boundary.h)

        if (divided) {
            northeast.show()
            northwest.show()
            southeast.show()
            southwest.show()
        }
    }

    const subdivide = () => {
        const { x, y, w, h } = boundary

        const ne = Boundary(x + w / 2, y - h / 2, w / 2, h / 2)
        northeast = QuadTree(ne, capacity)

        const nw = Boundary(x - w / 2, y - h / 2, w / 2, h / 2)
        northwest = QuadTree(nw, capacity)

        const se = Boundary(x + w / 2, y + h / 2, w / 2, h / 2)
        southeast = QuadTree(se, capacity)

        const sw = Boundary(x - w / 2, y + h / 2, w / 2, h / 2)
        southwest = QuadTree(sw, capacity)

        divided = true
    }

    return { insert, query, show }
}
