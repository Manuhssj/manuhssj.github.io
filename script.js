function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  let x = windowWidth/2;
  let y = 300;
  let r = 150;
  let n = parseInt(document.getElementById("input").value);
  let angle = TWO_PI / n;

  let x2 = 600;
  let y2 = 300;
  let r2 = 150;
  let n2 = parseInt(document.getElementById("input").value);
  let angle2 = TWO_PI / n2;

  let x3 = 1320;
  let y3 = 300;
  let r3 = 150;
  let n3 = parseInt(document.getElementById("input").value);
  let angle3 = TWO_PI / n2;
  strokeWeight(2);
  noFill();

  let algoritmo1 = "Punto pendiente";
  let algoritmo2 = "DDA";
  let algoritmo3 = "Bresenham";

  drawCircle(x3, y3, r3);
  text(algoritmo1, x3 - 40, y3 - r3 - 10);
  drawCircle(x2, y2, r2);
  text(algoritmo2, x2 - 25, y2 - r2 - 10);
  drawCircle(x, y, r);
  text(algoritmo3, x - 30, y - r - 10);
  // DDA
  for (let i = 0; i < n; i++) {
    let a = i * angle - PI;

    let px = x2 + r2 * cos(a);
    let py = y2 + r2 * sin(a);

    let x0 = round(x2);
    let y0 = round(y2);
    let x1 = round(px);
    let y1 = round(py);

    let dx = x1 - x0;
    let dy = y1 - y0;

    if (dx == 0) {
      let y = min(y0, y1);
      for (let yi = y; yi <= max(y0, y1); yi++) {
        point(x0, yi);
      }
    } else {
      let m = dy / dx;
      let b = y0 - m * x0;

      if (abs(dx) >= abs(dy)) {
        let x = min(x0, x1);
        let y = m * x + b;

        for (let xi = x; xi <= max(x0, x1); xi++) {
          let yi = round(m * xi + b);
          point(xi, yi);
        }
      } else {
        let y = min(y0, y1);
        let x = (y - b) / m;

        for (let yi = y; yi <= max(y0, y1); yi++) {
          let xi = round((yi - b) / m);
          point(xi, yi);
        }
      }
    }
  }
  // Punto pendiente
    if (n > 1) {
      for (let i = 0; i < n; i++) {
        let a = i * angle - PI;

        let px = x + r * cos(a);
        let py = y + r * sin(a);

        if (px == x) {
          let y0 = min(y, py);
          let y1 = max(y, py);

          for (let yi = y0; yi <= y1; yi++) {
            point(x, yi);
          }
        } else {
          let m = (py - y) / (px - x);
          let b = y - m * x;

          if (abs(px - x) >= abs(py - y)) {
            let x0 = min(x, px);
            let x1 = max(x, px);

            for (let xi = x0; xi <= x1; xi++) {
              let yi = round(m * xi + b);
              point(xi, yi);
            }
          } else {
            let y0 = min(y, py);
            let y1 = max(y, py);

            for (let yi = y0; yi <= y1; yi++) {
              let xi = round((yi - b) / m);
              point(xi, yi);
            }
          }
        }
      }
    // DDA
    for (let i = 0; i < n; i++) {
      let a = i * angle - PI;

      let px = x2 + r2 * cos(a);
      let py = y2 + r2 * sin(a);

      let x0 = round(x2);
      let y0 = round(y2);
      let x1 = round(px);
      let y1 = round(py);

      let dx = x1 - x0;
      let dy = y1 - y0;

      if (dx == 0) {
        // para lineas verticales
        let y = min(y0, y1);
        for (let yi = y; yi <= max(y0, y1); yi++) {
          point(x0, yi);
        }
      } else {
        let m = dy / dx;
        let b = y0 - m * x0;

        if (abs(dx) >= abs(dy)) {
          let x = min(x0, x1);
          let y = m * x + b;

          for (let xi = x; xi <= max(x0, x1); xi++) {
            let yi = round(m * xi + b);
            point(xi, yi);
          }
        } else {
          let y = min(y0, y1);
          let x = (y - b) / m;

          for (let yi = y; yi <= max(y0, y1); yi++) {
            let xi = round((yi - b) / m);
            point(xi, yi);
          }
        }
      }
    }
    //Bresenham
    for (let i = 0; i < n3; i++) {
      let a = i * angle3 - PI;
      let x0 = x3;
      let y0 = y3;
      let x1 = round(x3 + r3 * cos(a));
      let y1 = round(y3 + r3 * sin(a));

      let dx = abs(x1 - x0);
      let dy = abs(y1 - y0);
      let sx = x0 < x1 ? 1 : -1;
      let sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while (x0 != x1 || y0 != y1) {
        point(x0, y0);

        let e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          x0 += sx;
        }
        if (e2 < dx) {
          err += dx;
          y0 += sy;
        }
      }
    }
    
    
  }
}

function drawCircle(x, y, r) {
  let p = 5 / 4 - r;
  let x1 = 0;
  let y1 = r;

  while (x1 <= y1) {
    point(x + x1, y + y1);
    point(x + y1, y + x1);
    point(x + y1, y - x1);
    point(x + x1, y - y1);
    point(x - x1, y - y1);
    point(x - y1, y - x1);
    point(x - y1, y + x1);
    point(x - x1, y + y1);

    if (p < 0) {
      x1 += 1;
      p += 2 * x1 + 1;
    } else {
      x1 += 1;
      y1 -= 1;
      p += 2 * (x1 - y1) + 1;
    }
  }
}