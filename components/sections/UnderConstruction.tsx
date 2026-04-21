'use client'

export function UnderConstruction() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-bg">
      <style>{`
        @keyframes morphing {
          0%, 100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 40% 60% 30% 70%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            box-shadow: 0 0 30px color-mix(in srgb, var(--terracotta) 30%, transparent), inset 0 0 30px color-mix(in srgb, var(--eau) 20%, transparent);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 60px color-mix(in srgb, var(--terracotta) 50%, transparent), inset 0 0 40px color-mix(in srgb, var(--eau) 30%, transparent);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 0%;
          }
          75% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float-orbit {
          0% {
            transform: rotate(0deg) translateX(140px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: rotate(360deg) translateX(140px) rotate(-360deg);
            opacity: 0.3;
          }
        }

        .blob {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, var(--terracotta-light), var(--terracotta), var(--eau), var(--eau-dark), var(--terracotta-light));
          background-size: 300% 300%;
          animation: morphing 8s ease-in-out infinite, float 3.5s ease-in-out infinite, gradient-shift 12s ease-in-out infinite;
        }

        .blob::before {
          content: '';
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          background: inherit;
          animation: morphing 8s ease-in-out infinite reverse, pulse-glow 4s ease-in-out infinite;
          filter: blur(1px);
        }

        .orbit-particle {
          animation: float-orbit 20s linear infinite;
        }

        .text-fade {
          animation: slide-in 1s ease-out forwards;
        }

        .text-fade-delay-1 {
          animation: slide-in 1s ease-out 0.2s forwards;
          opacity: 0;
        }

        .text-fade-delay-2 {
          animation: slide-in 1s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>

      <div className="relative flex flex-col items-center justify-center">
        {/* Animated blob background - fixed position behind */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-64 w-64">
            {/* Main blob */}
            <div
              className="blob absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                filter: 'blur(0.5px)',
                width: '280px',
                height: '280px',
              }}
            />

            {/* Orbit particles */}
            <div className="orbit-particle absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-40" />
            <div className="orbit-particle absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary opacity-30" style={{ animationDelay: '10s' }} />
            <div className="orbit-particle absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-25" style={{ animationDelay: '5s' }} />
          </div>
        </div>

        {/* Content - on top, wider */}
        <div className="relative z-10 w-full px-8 text-center">
          <h1 className="text-fade mb-6 text-5xl font-bold leading-tight tracking-tight text-text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            Quelque chose de beau se prépare
          </h1>

          <p className="text-fade-delay-1 mx-auto mb-8 text-base leading-relaxed text-text-secondary">
            Ce portfolio prend forme. Laisse-moi finir de sculpter les détails.
          </p>

          <div className="text-fade-delay-2 flex items-center justify-center gap-2">
            <span className="text-caption font-medium uppercase tracking-label text-text-tertiary">En construction</span>
            <div className="flex gap-1">
              <div
                className="h-1.5 w-1.5 rounded-full bg-accent"
                style={{
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
              <div
                className="h-1.5 w-1.5 rounded-full bg-accent"
                style={{
                  animation: 'pulse 1.5s ease-in-out 0.3s infinite',
                }}
              />
              <div
                className="h-1.5 w-1.5 rounded-full bg-accent"
                style={{
                  animation: 'pulse 1.5s ease-in-out 0.6s infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
