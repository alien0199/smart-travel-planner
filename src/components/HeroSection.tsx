import taipeiHero from '@/assets/taipei-hero.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${taipeiHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 pt-16">
        <div className="animate-fade-in">
          <span className="inline-block bg-taiwan-gold/90 text-white font-bold px-4 py-1.5 rounded-full text-sm mb-4 shadow-lg">
            🗓️ 30 JAN - 2 FEB 2026
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-2xl tracking-tight">
            <span className="text-taiwan-cyan">TAIPEI</span> TRIP 2026
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-6 font-medium drop-shadow-lg">
            4 วัน 3 คืน ตะลุยไทเป กิน เที่ยว ช้อป ครบจบในทริปเดียว
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🏯 Taipei 101
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🏮 Jiufen
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🍜 Night Markets
            </span>
            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold">
              🚃 Shifen
            </span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
