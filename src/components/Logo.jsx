export const Logo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Left side: Medical Cross */}
    <path
      d="M50,95 C20,75 5,50 5,30 C5,10 25,5 40,15 C45,19 48,24 50,30"
      fill="none"
      stroke="#06b6d4" /* cyan-500 */
      strokeWidth="8"
      strokeLinecap="round"
    />
    <path
      d="M20,35 h20 v-20 h-20 z"
      fill="#0ea5e9" /* sky-500 */
      transform="translate(-5, -5)"
    />
    <rect x="15" y="25" width="20" height="6" fill="white" />
    <rect x="22" y="18" width="6" height="20" fill="white" />

    {/* Right side: Stylized people forming heart curve */}
    <path
      d="M50,95 C80,75 95,50 95,30 C95,10 75,5 60,15 C55,19 52,24 50,30"
      fill="none"
      stroke="#06b6d4"
      strokeWidth="8"
      strokeLinecap="round"
    />
    {/* Person 1 (Large) */}
    <circle cx="75" cy="25" r="5" fill="#0ea5e9" />
    <path d="M65,45 C70,35 80,35 85,45 L75,70 Z" fill="#0ea5e9" />
    
    {/* Person 2 (Medium) */}
    <circle cx="58" cy="40" r="4" fill="#38bdf8" /* sky-400 */ />
    <path d="M50,55 C55,48 61,48 66,55 L58,75 Z" fill="#38bdf8" />
    
    {/* Person 3 (Small) */}
    <circle cx="45" cy="55" r="3" fill="#7dd3fc" /* sky-300 */ />
    <path d="M38,65 C43,60 47,60 52,65 L45,80 Z" fill="#7dd3fc" />
  </svg>
);
