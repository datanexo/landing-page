/*
ISC License
Copyright (c) 2024 Datanexo
*/

const m = 100;    
const n = 50;     
const k = 2;      
const palette = ["#000", "#333", "#555", "#777", "#999"];

let x = d3.scaleLinear().domain([0, m - 1]);
let y = d3.scaleLinear();
const zRainbow = d3.interpolateRainbow; 

const area = d3.area()
  .x((d, i) => x(i))
  .y0(d => y(d[0]))
  .y1(d => y(d[1]));

const stack = d3.stack()
  .keys(d3.range(n))
  .offset(d3.stackOffsetWiggle)
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
      for (let i = 0; i < series.length; ++i) {
        series[i] = (1 - (i / series.length)) * series[i];
      }
      return series;
    })
  );
  const layers = stack(raw);
  const checkmax = d3.max(layers[layers.length - 1], l => l[1]);
  const checkmin = d3.min(layers, l => d3.min(l, l1 => l1[0]));
  y.domain([checkmin, checkmax]);
  return layers;
}

let chartPaths = null;
let chartWidth = 0;

function applyRainbow(paths, hueBase) {
  if (!paths || paths.size() === 0) return;
  paths.transition()
    .duration(80)
    .attr("fill", (d, i) => zRainbow((hueBase + (i / n)) % 1));
}

function initChart() {
  const chartEl = document.getElementById("chart");
  if (!chartEl) return;

  chartEl.innerHTML = '';
  const width = chartEl.clientWidth;
  const height = chartEl.clientHeight;
  chartWidth = width;

  x.range([0, width]);
  y.range([height, 0]);

  const svg = d3.select(chartEl)
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", "100%")
    .attr("height", "100%")
    .style("display", "block");

  const paths = svg.selectAll("path")
    .data(randomize())
    .join("path")
    .attr("fill", (d, i) => palette[i % palette.length])
    .attr("d", area);

  chartPaths = paths;

  // --- Dynamic Multi-Color Rainbow Hover (desktop) ---
  svg.on("mousemove", function(event) {
    const [mouseX] = d3.pointer(event);
    const hueBase = mouseX / width;
    applyRainbow(paths, hueBase);
  });

  svg.on("mouseleave", function() {
    paths.transition()
      .duration(500)
      .attr("fill", (d, i) => palette[i % palette.length]);
  });

  const runAnimation = () => {
    svg.selectAll("path")
      .data(randomize())
      .transition()
      .duration(1000)
      .ease(d3.easeCubicInOut)
      .attr("d", area);
  };

  window._runChartAnimation = runAnimation;

  document.getElementById("fname")?.addEventListener("focus", runAnimation);
  document.getElementById("lname")?.addEventListener("focus", runAnimation);
  document.body.addEventListener("click", runAnimation);

  // Trigger same animation on scroll (throttled: at most once per 900ms while scrolling)
  let lastScrollRun = 0;
  const scrollThrottleMs = 900;
  function onScrollTrigger() {
    const now = Date.now();
    if (now - lastScrollRun >= scrollThrottleMs && window._runChartAnimation) {
      lastScrollRun = now;
      window._runChartAnimation();
    }
  }
  window.addEventListener("scroll", onScrollTrigger, { passive: true });
  window.addEventListener("wheel", onScrollTrigger, { passive: true });
}


let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initChart, 250);
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initChart);
} else {
  initChart();
}