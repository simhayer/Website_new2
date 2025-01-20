// Loading Indicator Component
const LoadingDots = () => (
  <div className="mt-4 flex items-center justify-center">
    <span className="dot bg-gray-500"></span>
    <span className="dot bg-gray-500"></span>
    <span className="dot bg-gray-500"></span>
    <style jsx>{`
      .dot {
        height: 7px;
        width: 7px;
        margin: 0 5px;
        border-radius: 50%;
        animation: blink 1.5s infinite;
      }
      .dot:nth-child(2) {
        animation-delay: 0.3s;
      }
      .dot:nth-child(3) {
        animation-delay: 0.6s;
      }
      @keyframes blink {
        0%,
        80%,
        100% {
          opacity: 0;
        }
        40% {
          opacity: 1;
        }
      }
    `}</style>
  </div>
);

export default LoadingDots;
