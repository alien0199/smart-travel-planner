import taipeiHero from '@/assets/taipei-hero.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-[50vh] min-h-[320px] max-h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${taipeiHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-16">
        <div className="animate-fade-in">
          <span className="inline-block bg-taiwan-gold/90 text-white font-bold px-3 py-1 rounded-full text-xs mb-3 shadow-lg">
            🗓️ 30 JAN - 2 FEB 2026
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-2xl tracking-tight leading-tight">
            <span className="text-taiwan-cyan">TAIPEI</span> TRIP
          </h1>
          
          <p className="text-white/90 text-sm sm:text-base max-w-md mx-auto mb-4 font-medium drop-shadow-lg px-2">
            4 วัน 3 คืน ตะลุยไทเป กิน เที่ยว ช้อป
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
              🏯 Taipei 101
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
              🏮 Jiufen
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
              🍜 Night Markets
            </span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
