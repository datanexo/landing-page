/*
ISC License

Copyright (c) [year] [fullname]

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
*/
// import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//const width = 800;
const width = 0.45*window.innerWidth;
// const height = 600;
const height = window.innerHeight;
const m = 100;    // number of samples per layer
const n = 50;    // number of layers
const k = 2;    // bumps per layer
console.log(height)
const x = d3.scaleLinear().domain([0, m - 1]).range([0, width]);
const y = d3.scaleLinear().range([height, 0]);
const palette = [
  "hsl(316, 30%, 9%)",    // dark magenta (your base)
  "hsl(200, 60%, 40%)",   // strong teal-blue
  "hsl(45, 100%, 50%)",   // bright gold
  "hsl(140, 50%, 35%)",   // deep green
  "hsl(0, 80%, 50%)"      // vibrant red
]
const z = d3.interpolateCool;
// console.log(x)
const area = d3.area()
.x((d, i) => x(i))
.y0(d => y(d[0]))
.y1(d => y(d[1]));

const offset = d3.stackOffsetWiggle; // or try .stackOffsetExpand or .stackOffsetSilhouette
const stack = d3.stack()
.keys(d3.range(n))
.offset(offset)
.order(d3.stackOrderNone);

function bumps(n, m) {
const a = [];
for (let i = 0; i < n; ++i) a[i] = 0;
for (let j = 0; j < m; ++j) bump(a, n);
return a;
}

function bump(a, n) {
const x = 1 / (0.1 + Math.random());
const y = 2 * Math.random() - 0.5;
const z = 10 / (0.1 + Math.random());
for (let i = 0; i < n; ++i) {
const w = (i / n - y) * z;
a[i] += x * Math.exp(-w * w);
}
}


function randomize() {
  const raw = d3.transpose(
    Array.from({ length: n }, () => {
      const series = bumps(m, k);

      // Boost the first element so that the total at x = 0 is large
       for (let i = 0; i < series.length;++i) {
       series[i] =(1-(i**1/series.length**1))*series[i]; // Force the leftmost x (index 0) to be 0
       };
      return series;
    })
  );

  const layers = stack(raw);

  // Fix y domain: min = 0, max = total height of stack at x = 0
  const lastLayer = layers[layers.length-1]
  const maxAtZero = d3.max(layers, l => l[0][1]);
  const checkmax = d3.max(lastLayer, l => l[1]);
  const checkmax2 = d3.max(layers, l => (d3.max(l,l1=>l1[1])));
  const checkmin = d3.min(layers, l => (d3.min(l,l1=>l1[1])));
  console.log(checkmax)
  y.domain([checkmin, checkmax]);

  console.log(window.innerWidth);
  console.log(layers);
  return layers;
}
const svg = d3.create("svg")
  .attr("viewBox", [0, 0, width, height])
  .attr("width", "100%")
  .attr("height", "100%")
  .style("display", "block");
document.getElementById("chart").appendChild(svg.node());
const path = svg.selectAll("path")
.data(randomize())
.join("path")
.attr("d", area)
//.attr("fill", () => z(Math.random()));
.attr("fill", (d, i) => palette[i % palette.length]);



function animateOnce() {

  path
    .data(randomize())
    .transition()
      .duration(1000)
      .attr("d", area);
}
// document.getElementById("hover-target").addEventListener("mouseenter", animateOnce);
document.getElementById("fname").addEventListener("mousedown", animateOnce);
document.getElementById("lname").addEventListener("mousedown", animateOnce);

