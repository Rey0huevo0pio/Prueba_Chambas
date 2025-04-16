const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          <div className="grid grid-cols-4 gap-4 mb-8 animate-tetrisExplode">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-2xl ${i < 4
                    ? "bg-indigo-500 animate-tetrisFall"
                    : i < 8
                      ? "bg-slate-500 animate-tetrisFall"
                      : "bg-pink-500 animate-tetrisFall"
                  }`}
                style={{
                  animationDelay: `${i * 0.3}s`, // Retraso escalonado
                }}
              >
  
              </div>
            ))}
          </div>
  
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;