import taipeiHero from '@/assets/taipei-hero.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-[35vh] min-h-[200px] max-h-[300px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${taipeiHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
      </div>
      
      {/* Content - Optimized for mobile */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 pt-14">
        <div className="animate-fade-in">
          <span className="inline-block bg-taiwan-gold/90 text-white font-bold px-3 py-1 rounded-full text-xs mb-2 shadow-lg">
            🗓️ 30 JAN - 2 FEB 2026
          </span>
          
          <h1 className="text-3xl font-extrabold text-white mb-2 drop-shadow-2xl tracking-tight leading-tight">
            <span className="text-taiwan-cyan">TAIPEI</span> TRIP
          </h1>
          
          <p className="text-white/90 text-sm max-w-xs mx-auto mb-3 font-medium drop-shadow-lg">
            4 วัน 3 คืน ตะลุยไทเป กิน เที่ยว ช้อป
          </p>
          
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 rounded-full text-xs font-semibold">
              🏯 Taipei 101
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 rounded-full text-xs font-semibold">
              🏮 Jiufen
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 rounded-full text-xs font-semibold">
              🍜 Night Markets
            </span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - smaller for mobile */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-1.5 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
