export function AuthSidePanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between 
                    bg-gradient-to-br from-indigo-600 
                    to-violet-700 p-12 text-white">

      {/* Logo */}
      <div className="text-2xl font-bold">
        Hirely AI ✦
      </div>

      {/* Middle content */}
      <div className="space-y-6">
        <h2 className="text-4xl font-bold leading-tight">
          Land your dream job with AI-powered insights
        </h2>

        <div className="space-y-3">
          {[
            "AI-powered resume analysis",
            "Real-time ATS scoring",
            "Smart job application tracking",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center 
                              justify-center rounded-full 
                              bg-white/20">
                <span className="text-xs">✓</span>
              </div>
              <span className="text-sm text-white/90">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom ATS score card mockup */}
      <div className="rounded-2xl bg-white/10 
                      backdrop-blur-sm p-5 
                      border border-white/20">
        <p className="text-xs text-white/60 mb-1">
          ATS Score
        </p>
        <p className="text-5xl font-bold">92</p>
        <p className="text-sm text-emerald-300 mt-1">
          ↑ Excellent Match
        </p>
      </div>

    </div>
  );
}