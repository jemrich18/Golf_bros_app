function Logo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Golf Ball */}
      <circle cx="50" cy="50" r="45" fill="white" stroke="#2e7d32" strokeWidth="4" />
      
      {/* Dimples */}
      <circle cx="25" cy="30" r="4" fill="#e0e0e0" />
      <circle cx="75" cy="30" r="4" fill="#e0e0e0" />
      <circle cx="20" cy="55" r="4" fill="#e0e0e0" />
      <circle cx="80" cy="55" r="4" fill="#e0e0e0" />
      <circle cx="30" cy="78" r="4" fill="#e0e0e0" />
      <circle cx="70" cy="78" r="4" fill="#e0e0e0" />
      
      {/* GB Text */}
      <text
        x="50"
        y="62"
        fontFamily="Arial Black, sans-serif"
        fontSize="36"
        fill="#2e7d32"
        textAnchor="middle"
        fontWeight="bold"
      >
        GB
      </text>
    </svg>
  );
}

export default Logo;