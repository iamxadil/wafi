function injectAnimatedHeadText() {
  const container = document.querySelector('.be-creative-container');
  if (!container) {
    return;
  }

  const svgHTML = `
    <svg
      class="stroke-svg"
      viewBox="0 0 850 380"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ff6a00">
            <animate
              attributeName="stop-color"
              values="#ff6a00;#ee0979;#00c9ff;#ff6a00"
              dur="10s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stop-color="#ee0979">
            <animate
              attributeName="stop-color"
              values="#ee0979;#00c9ff;#ff6a00;#ee0979"
              dur="10s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      <text
        class="stroke-text"
        x="50%"
        y="40%"
        text-anchor="middle"
        dominant-baseline="middle"
        stroke="url(#gradient-stroke)"
        fill="none"
      >
        <tspan x="50%">Be Special</tspan>
        <tspan x="50%" dy="1.4em">& Creative</tspan>
      </text>
    </svg>
  `;

  container.innerHTML = svgHTML;
}

export { injectAnimatedHeadText };
