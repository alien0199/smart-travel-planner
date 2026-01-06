import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import StickyNav from '@/components/StickyNav';
import MissionHUD from '@/components/MissionHUD';
import MapLink from '@/components/MapLink';
import HeroSection from '@/components/HeroSection';
import { locations } from '@/types/locations';

const Index = () => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Count all checkable items
    let count = 0;
    document.querySelectorAll('[data-mission]').forEach(() => count++);
    setTotalItems(count);

    // Load saved state
    const saved = localStorage.getItem('tripChecked');
    if (saved) {
      setCheckedItems(new Set(JSON.parse(saved)));
    }

    // Restore scroll position if coming back from map
    const lastDay = sessionStorage.getItem('lastViewedDay');
    const lastClickedTitle = sessionStorage.getItem('lastClickedTitle');
    
    if (lastDay && lastClickedTitle) {
      setTimeout(() => {
        // หา element ที่มี title ตรงกับที่กดไป
        const allMapLinks = document.querySelectorAll('.map-link');
        let targetElement: Element | null = null;
        
        allMapLinks.forEach((link) => {
          const parent = link.closest('[data-mission]') || link.parentElement;
          if (parent && parent.textContent?.includes(lastClickedTitle)) {
            targetElement = parent;
          }
        });
        
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight effect
          (targetElement as HTMLElement).style.transition = 'all 0.3s ease';
          (targetElement as HTMLElement).style.backgroundColor = 'hsl(48 100% 90%)';
          (targetElement as HTMLElement).style.borderRadius = '8px';
          (targetElement as HTMLElement).style.padding = '4px';
          setTimeout(() => {
            (targetElement as HTMLElement).style.backgroundColor = '';
            (targetElement as HTMLElement).style.padding = '';
          }, 2000);
        } else {
          // Fallback to day section
          const dayElement = document.getElementById(`day${lastDay}`);
          if (dayElement) {
            dayElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        
        // Clear after scrolling
        sessionStorage.removeItem('lastViewedDay');
        sessionStorage.removeItem('lastViewedStop');
        sessionStorage.removeItem('lastClickedDay');
        sessionStorage.removeItem('lastClickedStop');
        sessionStorage.removeItem('lastClickedTitle');
      }, 200);
    }
  }, []);

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
    localStorage.setItem('tripChecked', JSON.stringify([...newChecked]));
  };

  const MissionCheckbox = ({ id }: { id: string }) => (
    <span
      onClick={(e) => {
        e.stopPropagation();
        toggleCheck(id);
      }}
      className={`inline-block w-5 h-5 rounded-md border-2 mr-2 cursor-pointer flex-shrink-0 relative top-1 transition-all ${
        checkedItems.has(id)
          ? 'bg-taiwan-green border-taiwan-green'
          : 'bg-white border-muted-foreground/30'
      }`}
    >
      {checkedItems.has(id) && (
        <Check className="w-4 h-4 text-white absolute top-0 left-0.5" strokeWidth={3} />
      )}
    </span>
  );

  return (
    <div className="min-h-screen bg-background" style={{ paddingBottom: '100px' }}>
      <StickyNav />
      
      {/* Hero Section */}
      <HeroSection />

      {/* TRIP TIPS */}
      <div id="tips" className="day-wrapper mt-8 mx-4 sm:mx-auto">
        <div className="text-center py-6 px-5 text-white" style={{ background: 'linear-gradient(90deg, #4f46e5, #818cf8)' }}>
          <h2 className="m-0 font-extrabold text-xl">🚀 TRIP ESSENTIALS & PRO TIPS</h2>
          <p className="mt-1 opacity-90">เตรียมตัวให้พร้อมก่อนลุยไทเป</p>
        </div>
        <div className="p-6">
          <div className="tip-box" style={{ background: 'hsl(152 81% 96%)', borderColor: 'hsl(151 81% 71%)' }}>
            <div className="font-extrabold text-lg mb-2 text-taiwan-green flex items-center gap-2">
              📝 Taiwan Arrival Card - TWAC (Update ต.ค. 2025)
            </div>
            <p className="text-sm mb-2 text-emerald-900">
              ตั้งแต่ <b>1 ตุลาคม 2025</b> ชาวต่างชาติต้องกรอก "Taiwan Arrival Card (TWAC)" ออนไลน์ <b>ภายใน 3 วันก่อนเดินทางถึง</b> เพื่อความรวดเร็วในการผ่าน ตม. ครับ
            </p>
            <a href="https://twac.immigration.gov.tw/" target="_blank" rel="noopener noreferrer" className="underline text-taiwan-green font-bold text-sm">
              👉 กรอก Taiwan Arrival Card (TWAC) ที่นี่
            </a>
          </div>
          <ul className="list-none p-0 m-0 mt-4 space-y-2">
            <li className="pl-2 relative text-sm">
              💡 <strong>EasyCard (Yoyo Card):</strong> บัตรเดียวเที่ยวทั่วไทย(เป) ใช้ขึ้นรถไฟ, รถเมล์, ซื้อของ 7-11. ซื้อได้ที่สนามบินหรือสถานีรถไฟ
            </li>
            <li className="pl-2 relative text-sm">
              💡 <strong>Receipt Lottery:</strong> ใบเสร็จทุกใบในไต้หวันมีค่า! มันคือลอตเตอรี่ อย่าเพิ่งทิ้ง เผื่อตรวจรางวัลได้
            </li>
            <li className="pl-2 relative text-sm">
              💡 <strong>Rain Gear:</strong> ไทเปฝนตกบ่อยมาก พกร่มพับที่แข็งแรงหรือเสื้อกันฝนติดกระเป๋าไว้เสมอ
            </li>
            <li className="pl-2 relative text-sm">
              💡 <strong>Uber:</strong> ถ้ามากัน 3-4 คน บางครั้งนั่ง Uber คุ้มกว่าและสะดวกกว่ารถไฟฟ้าครับ
            </li>
          </ul>
        </div>
      </div>

      {/* DAY 1 */}
      <div id="day1" className="day-wrapper">
        <div className="text-center py-10 px-5 text-white relative" style={{ background: 'linear-gradient(135deg, #2563eb 30%, #db2777 100%)' }}>
          <h1 className="m-0 font-extrabold text-2xl tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            🇹🇼 TAIPEI TRIP 2026: DAY 1
          </h1>
          <h2 className="mt-2 font-semibold text-xl">🛬 Arrival & West Side (เดินทางถึง & ฝั่งตะวันตก)</h2>
          <div className="flex justify-center gap-5 mt-6">
            <span className="info-badge">🗓️ Date: 30 Jan 2026 (Fri)</span>
          </div>
        </div>

        <div className="p-8" style={{ background: 'hsl(210 40% 98%)' }}>
          {/* Journey Section */}
          <div className="rounded-2xl border-4 border-day1 overflow-hidden mb-4" style={{ background: 'hsl(217 91% 97%)' }}>
            <div className="py-4 px-6 flex items-center text-white" style={{ background: 'linear-gradient(90deg, #2563eb, #1d4ed8)' }}>
              <h3 className="m-0 font-extrabold text-lg flex items-center gap-3">
                ✈️ THE JOURNEY (เส้นทางการเดินทาง)
              </h3>
            </div>
            <div className="p-6">
              {/* Timeline */}
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-day1 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                    🛫
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-xl border-l-4 border-day1 shadow-sm">
                    <span className="font-extrabold text-day1">10:55 น.</span>
                    <div className="font-bold mt-1">
                      Suvarnabhumi Airport 
                      <MapLink 
                        title="Suvarnabhumi Airport" 
                        description="จุดเริ่มต้นการเดินทาง"
                        googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Suvarnabhumi+Airport"
                        day={1}
                        stopIndex={0}
                        color="#2563eb"
                      />
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">Flight Departure (ออกเดินทาง)</p>
                  </div>
                </div>
                <div className="text-center text-day1 text-2xl ml-6">⬇️</div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-day1 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                    🛬
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-xl border-l-4 border-day1 shadow-sm">
                    <span className="font-extrabold text-day1">15:25 น.</span>
                    <div className="font-bold mt-1">
                      Taoyuan International Airport 
                      <MapLink 
                        title="Taoyuan International Airport" 
                        description="ผ่าน ตม. & รับกระเป๋า"
                        review={locations.day1.points[0].review}
                        googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Taoyuan+International+Airport"
                        day={1}
                        stopIndex={0}
                        color="#2563eb"
                      />
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">ผ่าน ตม. & รับกระเป๋า (กรอก Arrival Card ออนไลน์มาจะไวมาก)</p>
                  </div>
                </div>
                <div className="text-center text-day1 text-2xl ml-6">⬇️</div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-day1 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                    🚆
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-xl border-l-4 border-day1 shadow-sm">
                    <span className="font-extrabold text-day1">Airport Express Train</span>
                    <div className="font-bold mt-1">เข้าสู่ตัวเมือง</div>
                    <p className="text-muted-foreground text-sm mt-1">นั่งรถไฟสายสีม่วงจาก Airport มุ่งหน้าสู่ Main Station</p>
                  </div>
                </div>
                <div className="text-center text-day1 text-2xl ml-6">⬇️</div>

                {/* Step 4 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-day1 text-white flex items-center justify-center text-xl flex-shrink-0 shadow-md">
                    🏨
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-xl border-l-4 border-day1 shadow-sm">
                    <span className="font-extrabold text-day1">Check-in</span>
                    <div className="font-bold mt-1">
                      Mayer Inn Hotel 
                      <MapLink 
                        title="Mayer Inn Hotel" 
                        description="Check-in เก็บกระเป๋า"
                        review={locations.day1.points[3].review}
                        googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Mayer+Inn+Taipei"
                        day={1}
                        stopIndex={3}
                        color="#2563eb"
                      />
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">เก็บกระเป๋า พักผ่อนชั่วคราว เตรียมตัวลุย!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="path-connector">
            <div className="path-arrow-box">⬇️ เตรียมตัวลุยย่านฮิตยามค่ำคืน... ⬇️</div>
          </div>

          {/* Ximending Section */}
          <div className="rounded-2xl border-4 border-taiwan-pink overflow-hidden" style={{ background: 'hsl(327 73% 97%)' }}>
            <div className="py-4 px-6 text-white" style={{ background: 'linear-gradient(90deg, #db2777, #be185d)' }}>
              <h3 className="m-0 font-extrabold text-lg">
                🌆 DESTINATION: XIMENDING (ซีเหมินติง) <span className="text-sm opacity-90 ml-2">📍 Wanhua District</span>
              </h3>
            </div>

            <div className="embed-map-container mx-6 mt-4">
              <iframe 
                src="https://maps.google.com/maps?q=Ximending+Taipei&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                title="Ximending Map"
              />
            </div>

            <div className="p-6">
              {/* Vintage Cafe */}
              <div className="vintage-box mt-0">
                <div className="font-extrabold text-amber-800 flex items-center gap-2 mb-2">
                  <span className="bg-taiwan-orange text-white text-xs py-0.5 px-2 rounded">VINTAGE CAFE</span>
                  จิบกาแฟร้านคลาสสิก (Coffee Stop)
                </div>
                <ul className="list-none p-0 m-0 space-y-2">
                  <li data-mission className="pl-6 relative text-sm text-amber-900">
                    <MissionCheckbox id="d1-cafe-1" />
                    <span className={checkedItems.has('d1-cafe-1') ? 'line-through opacity-60' : ''}>
                      ☕ <strong>Bee Dao Café (Fong Da Coffee):</strong> ร้านกาแฟเก่าแก่ 60+ ปี บรรยากาศวินเทจแท้ๆ แวะจิบกาแฟหรือซื้อคุกกี้
                      <MapLink 
                        title="Fong Da Coffee" 
                        description="ร้านกาแฟวินเทจ 60+ ปี"
                        review={locations.day1.points[4].review}
                        googleMapsUrl="https://www.google.com/maps/search/Fong+Da+Coffee+Taipei"
                        day={1}
                        stopIndex={4}
                        color="#f97316"
                      />
                    </span>
                  </li>
                  <li data-mission className="pl-6 relative text-sm text-amber-900">
                    <MissionCheckbox id="d1-cafe-2" />
                    <span className={checkedItems.has('d1-cafe-2') ? 'line-through opacity-60' : ''}>
                      ☕ <strong>Shang Shang Coffee (上上咖啡):</strong> ร้านกาแฟคลาสสิกใกล้อนุสรณ์สถานเจียงไคเช็ค เป็นที่นิยมของคนทำงานท้องถิ่น
                      <MapLink 
                        title="Shang Shang Coffee" 
                        description="ร้านกาแฟคลาสสิกคนพื้นที่"
                        googleMapsUrl="https://www.google.com/maps/search/Shang+Shang+Coffee+Taipei"
                        day={1}
                        stopIndex={4}
                        color="#f97316"
                      />
                    </span>
                  </li>
                </ul>
              </div>

              {/* Food Section */}
              <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
                <div className="font-extrabold text-taiwan-pink text-lg flex items-center gap-2 border-b-2 border-pink-200 pb-2 mb-4">
                  🍜 FOOD ADVENTURE CHECKLIST (ตะลุยกิน)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'd1-food-1', name: 'Ay-Chung Flour-Rice Noodle', desc: 'บะหมี่อาจง', hours: '08:30 - 23:00', review: locations.day1.points[5].review, stopIndex: 5 },
                    { id: 'd1-food-2', name: 'Tian Tian Li (天天利)', desc: 'ข้าวหน้าหมูพะโล้', hours: '10:00 - 22:30', review: locations.day1.points[6].review, stopIndex: 6 },
                    { id: 'd1-food-3', name: 'Xing Fu Tang', desc: 'ชานมไข่มุก', hours: '10:00 - 22:00', review: locations.day1.points[7].review, stopIndex: 7 },
                    { id: 'd1-food-4', name: 'Three Brothers Tofu Pudding', desc: 'โทฟุพุดดิ้ง', hours: '11:00 - 23:00', review: locations.day1.points[9].review, stopIndex: 9 },
                    { id: 'd1-food-5', name: 'Prince Cheese Potato', desc: 'มันบดชีสราดเยิ้ม', hours: '13:00 - 00:00' },
                    { id: 'd1-food-6', name: 'Chengdu Starfruit Ice', desc: 'น้ำมะเฟืองโบราณ', hours: '12:00 - 22:00' },
                    { id: 'd1-food-7', name: 'Bafang Dumpling', desc: 'เกี๊ยวซ่า', hours: '10:30 - 21:30' },
                    { id: 'd1-food-8', name: 'Thank You Squid Stew', desc: 'ร้านซุปปลาหมึก', hours: '10:00 - 22:00' },
                    { id: 'd1-food-9', name: 'Lao Tien Lu (老天祿滷味)', desc: 'พะโล้เย็น', hours: '09:30 - 22:00' },
                    { id: 'd1-food-10', name: 'Snow King Ice Cream', desc: 'ไอติม 73 รส', hours: '12:00 - 20:00' },
                    { id: 'd1-food-11', name: 'Taiwan Salted Chicken', desc: 'ร้านไก่ทอดเก่าแก่', hours: '12:00 - 00:30', review: locations.day1.points[8].review, stopIndex: 8 },
                    { id: 'd1-food-12', name: 'Cheng Wei Zhen', desc: 'หมี่อี๊และของลวก', hours: '09:30 - 03:30' },
                  ].map((item) => (
                    <div key={item.id} data-mission className={`text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                      <MissionCheckbox id={item.id} />
                      🍜 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                      <MapLink 
                        title={item.name} 
                        description={item.desc}
                        hours={item.hours}
                        review={item.review}
                        googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Ximending')}`}
                        day={1}
                        stopIndex={item.stopIndex || 5}
                        color="#db2777"
                      />
                    </div>
                  ))}
                </div>

                {/* Local Gem Box */}
                <div className="local-gem-box mt-6">
                  <div className="font-extrabold text-taiwan-green flex items-center gap-2 mb-2">
                    <span className="bg-taiwan-green text-white text-xs py-0.5 px-2 rounded">LOCAL SECRET</span>
                    ร้านลับฉบับคนพื้นที่ (Alternative Option)
                  </div>
                  <ul className="list-none p-0 m-0 space-y-2">
                    <li data-mission className="pl-6 relative text-sm text-emerald-900">
                      <MissionCheckbox id="d1-local-1" />
                      <span className={checkedItems.has('d1-local-1') ? 'line-through opacity-60' : ''}>
                        ★ <strong>Lao Wang Ji Beef Noodles (老王記牛肉麵):</strong> ร้านก๋วยเตี๋ยวเนื้อในตำนาน "ไม่มีป้ายหน้าร้าน" น้ำซุปเข้มข้น คนพื้นที่ต่อคิวเยอะมาก
                        <MapLink 
                          title="Lao Wang Ji Beef Noodles" 
                          description="ก๋วยเตี๋ยวเนื้อในตำนาน"
                          googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Lao+Wang+Ji+Beef+Noodles"
                          day={1}
                          stopIndex={5}
                          color="#059669"
                        />
                      </span>
                    </li>
                    <li data-mission className="pl-6 relative text-sm text-emerald-900">
                      <MissionCheckbox id="d1-local-2" />
                      <span className={checkedItems.has('d1-local-2') ? 'line-through opacity-60' : ''}>
                        ★ <strong>Wan Nian B1 Food Court (萬年商業大樓):</strong> ลงไปชั้นใต้ดินตึก Wan Nian มีร้าน "Lao Shandong" (มิชลิน) และร้านเทมปุระที่คนไทยไม่ค่อยรู้
                        <MapLink 
                          title="Wan Nian B1 Food Court" 
                          description="ฟู้ดคอร์ทใต้ดินลับๆ"
                          googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Wan+Nian+Building+Taipei"
                          day={1}
                          stopIndex={5}
                          color="#059669"
                        />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Shopping Section */}
              <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
                <div className="font-extrabold text-taiwan-pink text-lg flex items-center gap-2 border-b-2 border-pink-200 pb-2 mb-4">
                  🛍️ SHOPPING SPREE (ช้อปปิ้ง & ของฝาก)
                </div>
                
                <span className="font-bold text-taiwan-pink block mb-2">💄 Cosmetics & Drugstores:</span>
                <ul className="list-none p-0 m-0 space-y-2 mb-4">
                  {[
                    { id: 'd1-shop-1', name: 'S3 Beauty (小三美日)', desc: 'คสอ. ราคาถูก', hours: '12:00 - 22:30' },
                    { id: 'd1-shop-2', name: 'Watsons (屈臣氏)', desc: 'สาขาใหญ่ (24 ชม.)', hours: '24 Hours' },
                    { id: 'd1-shop-3', name: 'POYA (寶雅)', desc: 'ร้านขายของใช้/คสอ.', hours: '10:00 - 22:30' },
                  ].map((item) => (
                    <li key={item.id} data-mission className={`pl-6 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                      <MissionCheckbox id={item.id} />
                      🛒 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                      <MapLink 
                        title={item.name} 
                        description={item.desc}
                        hours={item.hours}
                        googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Ximending')}`}
                        day={1}
                        stopIndex={10}
                        color="#db2777"
                      />
                    </li>
                  ))}
                </ul>

                <span className="font-bold text-taiwan-pink block mb-2">🛒 Supermarkets & Marts:</span>
                <ul className="list-none p-0 m-0 space-y-2 mb-4">
                  {[
                    { id: 'd1-mart-1', name: 'Simple Mart', desc: 'ซูเปอร์เล็กๆ', hours: '07:30 - 23:00' },
                    { id: 'd1-mart-2', name: 'PX Mart (全聯)', desc: 'ซูเปอร์มาร์เก็ต', hours: '08:00 - 23:00' },
                    { id: 'd1-mart-3', name: 'Don Don Donki', desc: 'ห้างญี่ปุ่น 24 ชม.', hours: '24 Hours', review: locations.day1.points[10].review, stopIndex: 10 },
                  ].map((item) => (
                    <li key={item.id} data-mission className={`pl-6 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                      <MissionCheckbox id={item.id} />
                      🛒 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                      <MapLink 
                        title={item.name} 
                        description={item.desc}
                        hours={item.hours}
                        review={item.review}
                        googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Ximending')}`}
                        day={1}
                        stopIndex={item.stopIndex || 10}
                        color="#db2777"
                      />
                    </li>
                  ))}
                </ul>

                <span className="font-bold text-taiwan-pink block mb-2">🧸 Toys & Hobbies:</span>
                <ul className="list-none p-0 m-0 space-y-2">
                  {[
                    { id: 'd1-toy-1', name: 'Wannian Commercial Building', desc: 'ห้างเก่าแก่ ซื้อรองเท้า ของเล่น', hours: '11:30 - 21:30' },
                    { id: 'd1-toy-2', name: 'POP MART', desc: 'สวรรค์ของคนรัก Art Toy', hours: '11:00 - 22:30' },
                  ].map((item) => (
                    <li key={item.id} data-mission className={`pl-6 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                      <MissionCheckbox id={item.id} />
                      🛒 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                      <MapLink 
                        title={item.name} 
                        description={item.desc}
                        hours={item.hours}
                        googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Ximending')}`}
                        day={1}
                        stopIndex={10}
                        color="#db2777"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fashion Section */}
              <div className="bg-white p-5 rounded-2xl shadow-sm">
                <div className="font-extrabold text-taiwan-pink text-lg flex items-center gap-2 border-b-2 border-pink-200 pb-2 mb-4">
                  👟 LOCAL FASHION (แฟชั่นไต้หวันราคาถูก)
                </div>
                <ul className="list-none p-0 m-0 space-y-2">
                  {[
                    { id: 'd1-fashion-1', name: 'Fu Fa Shoes (富發牌)', desc: 'รองเท้าผ้าใบแฮนด์เมด', hours: '12:00 - 22:30' },
                    { id: 'd1-fashion-2', name: 'NET (Clothing)', desc: 'แบรนด์เสื้อผ้าแห่งชาติ', hours: '11:00 - 22:30' },
                    { id: 'd1-fashion-3', name: '50% Fifty Percent', desc: 'เสื้อผ้าวัยรุ่น', hours: '12:00 - 23:00' },
                  ].map((item) => (
                    <li key={item.id} data-mission className={`pl-6 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                      <MissionCheckbox id={item.id} />
                      👟 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                      <MapLink 
                        title={item.name} 
                        description={item.desc}
                        hours={item.hours}
                        googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Ximending')}`}
                        day={1}
                        stopIndex={10}
                        color="#db2777"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DAY 2, 3, 4 content would continue similarly... */}
      {/* For brevity, adding placeholder sections */}

      {/* DAY 2 */}
      <div id="day2" className="day-wrapper">
        <div className="text-center py-10 px-5 text-white relative" style={{ background: 'linear-gradient(90deg, #22c55e, #a855f7, #f97316, #0ea5e9, #ef4444)' }}>
          <div className="relative z-10">
            <h1 className="m-0 font-extrabold text-2xl tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              🇹🇼 TAIPEI TRIP 2026: DAY 2
            </h1>
            <h2 className="mt-2 font-semibold text-xl">The Ultimate Loop: West ➔ North ➔ East</h2>
            <div className="flex justify-center gap-5 mt-6 flex-wrap">
              <span className="info-badge">🗓️ 31 Jan 2026 (Sat)</span>
              <span className="info-badge">🗺️ Route: ตะวันตก สู่เหนือ และตะวันออก</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="p-8" style={{ background: 'hsl(210 40% 98%)' }}>
          <div className="tip-box mb-5 p-4">
            <div className="font-extrabold mb-2 text-primary flex items-center gap-2">🚲 Travel Tip: U-Bike</div>
            <p className="m-0 text-sm">วันนี้ต้องเดินทางหลายจุด ถ้าระยะทางไม่ไกล (เช่นจากวัดหลงซานไป Bopiliao) แนะนำให้ลองเช่า <b>U-Bike</b> ปั่นชมเมืองดูครับ สะดวกและประหยัด</p>
          </div>

          {/* West Side Card */}
          <div className="rounded-2xl border-4 border-taiwan-green overflow-hidden mb-4" style={{ background: 'hsl(138 76% 97%)' }}>
            <div className="py-4 px-6 text-white" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
              <h3 className="m-0 font-extrabold text-lg flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white text-foreground flex items-center justify-center font-black text-lg shadow">1</span>
                START: WEST SIDE (ฝั่งตะวันตก) <span className="text-sm opacity-90 ml-2">📍 Wanhua & Longshan Temple</span>
              </h3>
            </div>
            <div className="embed-map-container mx-6 mt-0">
              <iframe 
                src="https://maps.google.com/maps?q=Longshan+Temple+Taipei&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                title="Longshan Temple Map"
              />
            </div>
            <div className="p-6">
              {/* Activities */}
              <div className="mb-4">
                <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                  🏯 กิจกรรมหลัก:
                </div>
                <ul className="list-none p-0 m-0 space-y-2">
                  <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d2-act-1') ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id="d2-act-1" />
                    📍 <strong>Longshan Temple:</strong> ไหว้พระขอพรเช้า <span className="hours-tag">🕒 06:00 - 22:00</span>
                    <MapLink 
                      title="Longshan Temple" 
                      description="ไหว้พระขอพรเช้า"
                      review={locations.day2.points[1].review}
                      googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Longshan+Temple"
                      day={2}
                      stopIndex={1}
                      color="#22c55e"
                    />
                  </li>
                  <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d2-act-2') ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id="d2-act-2" />
                    📍 <strong>Bopiliao Historic Block:</strong> เดินเล่นย่านตึกเก่าแก่อิฐแดง บรรยากาศเงียบสงบ
                    <MapLink 
                      title="Bopiliao Historic Block" 
                      description="ตึกอิฐแดงโบราณ"
                      review={locations.day2.points[2].review}
                      googleMapsUrl="https://www.google.com/maps/search/Bopiliao+Historic+Block"
                      day={2}
                      stopIndex={2}
                      color="#22c55e"
                    />
                  </li>
                </ul>
              </div>
              
              {/* Food */}
              <div>
                <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                  🥢 ตะลุยกินย่านวัดหลงซาน:
                </div>
                {/* Local Gem Box */}
                <div className="local-gem-box mb-4">
                  <div className="font-extrabold text-taiwan-green flex items-center gap-2 mb-2">
                    <span className="bg-taiwan-green text-white text-xs py-0.5 px-2 rounded">LOCAL VIBES</span>
                    ทางเลือกเสริม: บรรยากาศโลคอลแท้ๆ
                  </div>
                  <ul className="list-none p-0 m-0 space-y-2">
                    <li data-mission className="pl-6 relative text-sm text-emerald-900">
                      <MissionCheckbox id="d2-local-cisheng" />
                      <span className={checkedItems.has('d2-local-cisheng') ? 'line-through opacity-60' : ''}>
                        ★ <strong>Cisheng Temple Food Street (大稀埕慈聖宮):</strong> เปลี่ยนบรรยากาศไปนั่งกิน "ข้าวหมูทอด" หน้าวัดเก่าแก่ ย่าน Dadaocheng (เปิดเช้า-บ่าย 09:00-15:00)
                        <MapLink 
                          title="Cisheng Temple Food Street" 
                          description="ข้าวหมูทอดหน้าวัด"
                          googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Dadaocheng+Cisheng+Temple"
                          day={2}
                          stopIndex={1}
                          color="#059669"
                        />
                      </span>
                    </li>
                  </ul>
                </div>
                <ul className="list-none p-0 m-0 space-y-2">
                  {[
                    { id: 'd2-food-1', name: 'Yuanfang Gua Bao', desc: 'เบอร์เกอร์หมู', hours: '11:30 - 20:00 (ปิดจันทร์)', review: locations.day2.points[3].review, stopIndex: 3 },
                    { id: 'd2-food-2', name: 'Zhouji Meat Porridge', desc: 'ข้าวต้มหมูกรอบ', hours: '06:00 - 16:30', review: locations.day2.points[4].review, stopIndex: 4 },
                    { id: 'd2-food-3', name: 'Xiao Nan Zhengji Tofu Pudding', desc: 'โทฟุพุดดิ้ง', hours: '09:00 - 20:00' },
                    { id: 'd2-food-4', name: 'Yuan Wei Castella Cake', desc: 'เค้กไข่ไต้หวัน', hours: '09:00 - 20:00' },
                    { id: 'd2-food-5', name: 'Long Du Ice Fruit', desc: 'น้ำแข็งไสโบราณ', hours: '11:30 - 22:00' },
                    { id: 'd2-food-6', name: 'Fuzhou Yuan Zu Pepper Bun', desc: 'ซาลาเปาอบโอ่ง', hours: '10:00 - 18:30' },
                    { id: 'd2-food-7', name: "Wang's Broth", desc: 'ข้าวหมูพะโล้', hours: '09:00 - 20:00 (ปิดอังคาร)' },
                    { id: 'd2-food-8', name: 'Liang Xi Hao', desc: 'ซุปปลาหมึก', hours: '10:00 - 23:30' },
                    { id: 'd2-food-9', name: '180°C Honey Fried Chicken', desc: 'ไก่ทอดหมักน้ำผึ้ง', hours: '15:00 - 23:00' },
                  ].map((item) => (
                    <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                      <MissionCheckbox id={item.id} />
                      🥢 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                      <MapLink 
                        title={item.name} 
                        description={item.desc}
                        hours={item.hours}
                        review={item.review}
                        googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}`}
                        day={2}
                        stopIndex={item.stopIndex || 3}
                        color="#22c55e"
                      />
                    </li>
                  ))}
                </ul>
                
                {/* Shopping */}
                <div className="mt-4">
                  <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                    🛒 ช้อปปิ้งของใช้:
                  </div>
                  <ul className="list-none p-0 m-0 space-y-2">
                    <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d2-shop-carrefour') ? 'line-through opacity-60' : ''}`}>
                      <MissionCheckbox id="d2-shop-carrefour" />
                      🛒 <strong>Carrefour (Guilin Branch):</strong> ซูเปอร์มาร์เก็ต <span className="hours-tag">🕒 24 Hours</span>
                      <MapLink 
                        title="Carrefour Guilin Branch" 
                        description="ซูเปอร์มาร์เก็ต 24 ชม."
                        googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Carrefour+Guilin+Store"
                        day={2}
                        stopIndex={3}
                        color="#22c55e"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="path-connector">
            <div className="path-line" />
            <div className="path-arrow-box">⬇️ เชื่อมต่อสู่ตอนเหนือ ผ่านเส้นทางสายอาร์ต...</div>
          </div>

          {/* Hidden Gems Card */}
          <div className="rounded-2xl border-4 border-purple-500 overflow-hidden mb-4" style={{ background: 'hsl(270 100% 98%)' }}>
            <div className="py-4 px-6 text-white" style={{ background: 'linear-gradient(135deg, #a855f7, #9333ea)' }}>
              <h3 className="m-0 font-extrabold text-lg flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white text-foreground flex items-center justify-center font-black text-lg shadow">2</span>
                NEXT: HIDDEN GEMS <span className="text-sm opacity-90 ml-2">📍 Beimen & Main Station</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                📸 จุดถ่ายรูปและเดินเล่น:
              </div>
              <ul className="list-none p-0 m-0 space-y-2">
                {[
                  { id: 'd2-photo-1', name: 'Bei Men (North Gate)', desc: 'ประตูเมืองโบราณ', hours: '24 Hours', review: locations.day2.points[5].review, stopIndex: 5 },
                  { id: 'd2-photo-2', name: 'Taipei Post Office', desc: 'ตึกไปรษณีย์', hours: '08:30 - 21:00' },
                  { id: 'd2-photo-3', name: 'The Red House', desc: 'ตึกแดง', hours: '11:00 - 21:30' },
                  { id: 'd2-photo-4', name: 'Taipei Cinema Park', desc: 'ลานกราฟฟิตี้', hours: '24 Hours' },
                  { id: 'd2-photo-5', name: 'MOCA Taipei', desc: 'พิพิธภัณฑ์ศิลปะ', hours: '10:00 - 18:00 (ปิดจันทร์)' },
                  { id: 'd2-photo-6', name: 'Huayin Street', desc: 'ย่านค้าส่ง', hours: '~10:00 - 20:00' },
                  { id: 'd2-photo-7', name: 'Zhongshan Metro Mall', desc: 'ทางเดินใต้ดินอาร์ตโซน', hours: '11:00 - 21:30' },
                ].map((item) => (
                  <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id={item.id} />
                    📸 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                    <MapLink 
                      title={item.name} 
                      description={item.desc}
                      hours={item.hours}
                      review={item.review}
                      googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Taipei')}`}
                      day={2}
                      stopIndex={item.stopIndex || 5}
                      color="#a855f7"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="path-connector">
            <div className="path-line" />
            <div className="path-arrow-box">⬇️ ขยับขึ้นเหนือ... ไปย่านฮิตติดเทรนด์!</div>
          </div>

          {/* North Side Card */}
          <div className="rounded-2xl border-4 border-taiwan-orange overflow-hidden mb-4" style={{ background: 'hsl(33 100% 97%)' }}>
            <div className="py-4 px-6 text-white" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
              <h3 className="m-0 font-extrabold text-lg flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white text-foreground flex items-center justify-center font-black text-lg shadow">3</span>
                MOVE: NORTH SIDE <span className="text-sm opacity-90 ml-2">📍 Zhongshan & Xingtian Temple</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                🙏 กิจกรรมหลัก:
              </div>
              <ul className="list-none p-0 m-0 space-y-2 mb-4">
                <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d2-xingtian') ? 'line-through opacity-60' : ''}`}>
                  <MissionCheckbox id="d2-xingtian" />
                  📍 <strong>Xingtian Temple:</strong> ขอพรต่อที่วัดสิงเทียน <span className="hours-tag">🕒 04:00 - 22:30</span>
                  <MapLink 
                    title="Xingtian Temple" 
                    description="วัดสิงเทียน เทพเจ้ากวนอู"
                    review={locations.day2.points[6].review}
                    googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Xingtian+Temple"
                    day={2}
                    stopIndex={6}
                    color="#f97316"
                  />
                </li>
              </ul>
              {/* Trending Box */}
              <div className="mb-4 p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, hsl(350 100% 98%) 0%, hsl(35 100% 98%) 100%)', border: '2px solid hsl(350 60% 65%)' }}>
                <div className="font-extrabold flex items-center gap-2 mb-2" style={{ color: 'hsl(350 80% 45%)' }}>
                  <span className="text-xs py-0.5 px-2 rounded text-white" style={{ background: 'hsl(350 80% 50%)' }}>TRENDING</span>
                  LOCAL EATS (เทรนด์ของกินใหม่ที่คนไทเปฮิต)
                </div>
                <ul className="list-none p-0 m-0 space-y-2">
                  <li data-mission className="pl-6 relative text-sm" style={{ color: 'hsl(350 80% 35%)' }}>
                    <MissionCheckbox id="d2-trending-1" />
                    <span className={checkedItems.has('d2-trending-1') ? 'line-through opacity-60' : ''}>
                      🔥 <strong>ซีอิ๊วราเมน (Soy Sauce Ramen):</strong> ย่าน Zhongshan/Datong มีร้านราเมนเล็กๆ เปิดใหม่เยอะมาก รสชาติกลมกล่อมไม่เลี่ยน
                      <MapLink 
                        title="Soy Sauce Ramen Zhongshan" 
                        description="ราเมนซีอิ๊วย่าน Zhongshan/Datong"
                        googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Soy+Sauce+Ramen+Zhongshan+Taipei"
                        day={2}
                        stopIndex={0}
                        color="#e11d48"
                      />
                    </span>
                  </li>
                  <li data-mission className="pl-6 relative text-sm" style={{ color: 'hsl(350 80% 35%)' }}>
                    <MissionCheckbox id="d2-trending-2" />
                    <span className={checkedItems.has('d2-trending-2') ? 'line-through opacity-60' : ''}>
                      🔥 <strong>ข้าวหน้าหมูตุ๋นสูตรแห้ง (Dry Braised Pork Rice):</strong> ไม่ราดน้ำเยอะแบบโบราณ เน้นหมูตุ๋นเข้มข้น เทรนด์ใหม่ที่กำลังมาแรง
                      <MapLink 
                        title="Dry Braised Pork Rice" 
                        description="ข้าวหน้าหมูตุ๋นสูตรแห้ง"
                        googleMapsUrl="https://www.google.com/maps/search/?api=1&query=滷肉飯+Braised+Pork+Rice+Taipei"
                        day={2}
                        stopIndex={0}
                        color="#e11d48"
                      />
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                🥢 ของกินท้องถิ่น:
              </div>
              <ul className="list-none p-0 m-0 space-y-2">
                {[
                  { id: 'd2-nfood-1', name: 'Legendary Flour Rice Noodle', desc: 'หมี่เส้นรสเข้มข้น', hours: '08:00 - 17:00 (ปิดอาทิตย์)' },
                  { id: 'd2-nfood-2', name: 'Bu Lao Hakka Mochi', desc: 'โมจิก้อนยักษ์', hours: '11:00 - 18:00' },
                  { id: 'd2-nfood-3', name: 'Songjiang Self-service Hot Pot', desc: 'สุกี้หินโบราณ', hours: '11:00 - 23:30' },
                ].map((item) => (
                  <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id={item.id} />
                    🥢 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                    <MapLink 
                      title={item.name} 
                      description={item.desc}
                      hours={item.hours}
                      googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Taipei')}`}
                      day={2}
                      stopIndex={6}
                      color="#f97316"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="path-connector">
            <div className="path-line" />
            <div className="path-arrow-box">⬇️ เข้าสู่ใจกลางเมือง พื้นที่สร้างสรรค์...</div>
          </div>

          {/* Creative Hub Card */}
          <div className="rounded-2xl border-4 border-emerald-500 overflow-hidden mb-4" style={{ background: 'hsl(152 81% 97%)' }}>
            <div className="py-4 px-6 text-white" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <h3 className="m-0 font-extrabold text-lg flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white text-foreground flex items-center justify-center font-black text-lg shadow">4</span>
                CENTER: CREATIVE HUB <span className="text-sm opacity-90 ml-2">📍 Huashan 1914 Creative Park</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                🎨 กิจกรรมและช้อปปิ้ง:
              </div>
              <ul className="list-none p-0 m-0 space-y-2 mb-4">
                {[
                  { id: 'd2-art-1', name: 'Huashan 1914 Creative Park', desc: 'เดินเล่นถ่ายรูป', hours: '24 Hours (Shops 11-21)', review: locations.day2.points[7].review, stopIndex: 7 },
                  { id: 'd2-art-2', name: 'Wooderful Life', desc: 'ร้านกล่องดนตรีงานไม้', hours: '11:00 - 21:00' },
                  { id: 'd2-art-3', name: 'Sanhuai Café (三槐堂)', desc: 'ร้านชีสเค้กโฮมเมดในตำนาน', hours: 'ต้องจอง' },
                  { id: 'd2-art-4', name: 'Treasure Hill Artist Village (寶藏巖)', desc: 'หมู่บ้านศิลปินริมเขา', hours: '11:00 - 22:00' },
                ].map((item) => (
                  <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id={item.id} />
                    🎨 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                    <MapLink 
                      title={item.name} 
                      description={item.desc}
                      hours={item.hours}
                      review={item.review}
                      googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}`}
                      day={2}
                      stopIndex={item.stopIndex || 7}
                      color="#10b981"
                    />
                  </li>
                ))}
              </ul>
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                ☕ คาเฟ่และร้านอาหาร:
              </div>
              <ul className="list-none p-0 m-0 space-y-2">
                {[
                  { id: 'd2-cafe-1', name: 'Ba Dong Round Table Brunch', desc: 'คาเฟ่ Brunch', hours: '10:00 - 16:30 (ปิดพุธ)' },
                  { id: 'd2-cafe-2', name: 'Simple Kaffa (Flagship)', desc: 'กาแฟแชมป์โลก', hours: '10:00 - 17:00', review: locations.day2.points[8].review, stopIndex: 8 },
                  { id: 'd2-cafe-3', name: 'Shuang Yue Food', desc: 'ซุปไก่ตุ๋นยาจีน', hours: '11:00-14:00, 17:00-20:00' },
                ].map((item) => (
                  <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id={item.id} />
                    ☕ <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                    <MapLink 
                      title={item.name} 
                      description={item.desc}
                      hours={item.hours}
                      review={item.review}
                      googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}`}
                      day={2}
                      stopIndex={item.stopIndex || 8}
                      color="#10b981"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="path-connector">
            <div className="path-line" />
            <div className="path-arrow-box">➡️ มุ่งหน้าสู่ฝั่งตะวันออก ชมตึกสูง...</div>
          </div>

          {/* East Side Card */}
          <div className="rounded-2xl border-4 border-taiwan-cyan overflow-hidden mb-4" style={{ background: 'hsl(204 100% 97%)' }}>
            <div className="py-4 px-6 text-white" style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }}>
              <h3 className="m-0 font-extrabold text-lg flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white text-foreground flex items-center justify-center font-black text-lg shadow">5</span>
                EAST SIDE: MODERN VIEW <span className="text-sm opacity-90 ml-2">📍 Xinyi & Taipei 101</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                🏙️ กิจกรรมและจุดชมวิว:
              </div>
              <ul className="list-none p-0 m-0 space-y-2 mb-4">
                {[
                  { id: 'd2-east-1', name: 'Si Si Nan Cun', desc: 'หมู่บ้านทหารโบราณ (จุดถ่ายรูป 101)', hours: '24 Hours', review: locations.day2.points[9].review, stopIndex: 9 },
                  { id: 'd2-east-2', name: 'Taipei 101 Mall', desc: 'เดินเล่นห้างหรู', hours: '11:00 - 21:30', review: locations.day2.points[10].review, stopIndex: 10 },
                  { id: 'd2-east-3', name: 'Linjiang St. Night Market', desc: 'ตลาดกลางคืน (ทางเลือก)', hours: '18:00 - 00:00' },
                ].map((item) => (
                  <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id={item.id} />
                    📸 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                    <MapLink 
                      title={item.name} 
                      description={item.desc}
                      hours={item.hours}
                      review={item.review}
                      googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}`}
                      day={2}
                      stopIndex={item.stopIndex || 9}
                      color="#0ea5e9"
                    />
                  </li>
                ))}
              </ul>
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                🥯 ของกินย่านซิ่นอี้:
              </div>
              <ul className="list-none p-0 m-0 space-y-2">
                {[
                  { id: 'd2-efood-1', name: 'Chun Shui Tang (Shinkong A9)', desc: 'ต้นตำรับชานมไข่มุก', hours: '11:00 - 21:30', review: locations.day2.points[11].review, stopIndex: 11 },
                  { id: 'd2-efood-2', name: "Good Cho's", desc: 'เบเกิลแป้งหนึบ', hours: '11:00 - 18:00' },
                  { id: 'd2-efood-3', name: 'ATT 4 FUN Food Court', desc: 'ฟู้ดคอร์ทวิวสวย', hours: '11:00 - 22:00' },
                  { id: 'd2-efood-4', name: 'Breeze Nan Shan', desc: 'แหล่งรวม Deli', hours: '11:00 - 21:30' },
                  { id: 'd2-efood-5', name: 'Takemura Izakaya', desc: 'ร้านกินดื่มญี่ปุ่น', hours: '17:00 - 01:00' },
                ].map((item) => (
                  <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id={item.id} />
                    🥢 <strong>{item.name}:</strong> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                    <MapLink 
                      title={item.name} 
                      description={item.desc}
                      hours={item.hours}
                      review={item.review}
                      googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Taipei')}`}
                      day={2}
                      stopIndex={item.stopIndex || 11}
                      color="#0ea5e9"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional Dadaocheng */}
          <div className="rounded-2xl border-2 border-dashed border-taiwan-orange overflow-hidden mb-4" style={{ background: 'hsl(33 100% 97%)' }}>
            <div className="p-4">
              <h3 className="m-0 font-extrabold text-lg text-amber-700 flex items-center gap-2">
                🌅 (Optional) SUNSET VIBES: DADAOCHENG
              </h3>
              <p className="text-sm text-amber-800 mt-2">หากยังมีเวลาเหลือช่วงเย็นก่อนไปตลาดกลางคืน แนะนำให้แวะไป:</p>
              <ul className="list-none p-0 m-0 mt-2">
                <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d2-dadaocheng') ? 'line-through opacity-60' : ''}`}>
                  <MissionCheckbox id="d2-dadaocheng" />
                  📍 <strong>Dadaocheng Wharf (大稻埕碼頭):</strong> จุดชมพระอาทิตย์ตกริมแม่น้ำ บรรยากาศดีมาก มีตู้คอนเทนเนอร์ขายอาหาร
                  <MapLink 
                    title="Dadaocheng Wharf" 
                    description="จุดชมพระอาทิตย์ตกริมแม่น้ำ"
                    googleMapsUrl="https://www.google.com/maps/search/Dadaocheng+Wharf"
                    day={2}
                    stopIndex={12}
                    color="#f97316"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="path-connector">
            <div className="path-line" />
            <div className="path-arrow-box">↩️ ปิดท้ายวันด้วยมื้อดึก...</div>
          </div>

          {/* Night Market Card */}
          <div className="rounded-2xl border-4 border-taiwan-red overflow-hidden mb-4" style={{ background: 'hsl(0 86% 97%)' }}>
            <div className="py-4 px-6 text-white" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
              <h3 className="m-0 font-extrabold text-lg flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white text-foreground flex items-center justify-center font-black text-lg shadow">6</span>
                FINISH: NIGHT MARKET <span className="text-sm opacity-90 ml-2">📍 Ningxia Night Market</span>
              </h3>
            </div>
            <div className="p-6">
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-2 mb-3">
                🌟 ร้านมิชลินและร้านดัง:
              </div>
              <p className="text-sm text-muted-foreground mb-3">🕒 ตลาดเปิด: 17:00 - 01:00 (ร้านส่วนใหญ่)</p>
              <ul className="list-none p-0 m-0 space-y-2 mb-4">
                {[
                  { id: 'd2-nm-1', name: 'Liu Yu Zi', desc: 'เผือกทอดไส้ไข่เค็ม', review: locations.day2.points[12].review, stopIndex: 12 },
                  { id: 'd2-nm-2', name: 'Fang Chia', desc: 'ข้าวมันไก่ฉีกไต้หวัน' },
                  { id: 'd2-nm-3', name: "Rong's Pork Liver", desc: 'ซุปตับหมู' },
                  { id: 'd2-nm-4', name: 'Yuan Huan Pien Oyster Omelet', desc: 'หอยทอดเวอร์ชันโมเดิร์น' },
                ].map((item) => (
                  <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id={item.id} />
                    🥢 <strong>{item.name}:</strong> {item.desc}
                    <MapLink 
                      title={item.name} 
                      description={item.desc}
                      review={item.review}
                      googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}`}
                      day={2}
                      stopIndex={item.stopIndex || 12}
                      color="#ef4444"
                    />
                  </li>
                ))}
              </ul>

              {/* Plan B */}
              <div className="bg-muted/50 rounded-xl p-4 border-2 border-dashed border-muted">
                <div className="font-bold text-muted-foreground mb-2">🌙 Plan B: Local Crowd (เผื่อคนแน่น)</div>
                <p className="text-sm text-muted-foreground mb-2">ถ้า Ningxia คนเยอะจนเดินไม่ได้ แนะนำตลาดเหล่านี้:</p>
                <ul className="list-none p-0 m-0 space-y-1">
                  <li className="text-sm">
                    • <strong>Shuangcheng Street Night Market:</strong> ตลาดเล็กๆ คนท้องถิ่นล้วน
                    <MapLink 
                      title="Shuangcheng Street Night Market" 
                      description="ตลาดกลางคืนคนท้องถิ่น"
                      googleMapsUrl="https://www.google.com/maps/search/?api=1&query=雙城街夜市+Shuangcheng+Street+Night+Market+Taipei"
                      day={2}
                      stopIndex={12}
                      color="#6b7280"
                    />
                  </li>
                  <li className="text-sm">
                    • <strong>Yansan Night Market:</strong> สายกินจริงจังต้องที่นี่
                    <MapLink 
                      title="Yansan Night Market" 
                      description="ตลาดกลางคืนสำหรับสายกิน"
                      googleMapsUrl="https://www.google.com/maps/search/?api=1&query=延三夜市+Yansan+Night+Market+Taipei"
                      day={2}
                      stopIndex={12}
                      color="#6b7280"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DAY 3 */}
      <div id="day3" className="day-wrapper">
        <div className="text-center py-10 px-5 text-white" style={{ background: 'linear-gradient(135deg, #0ea5e9 30%, #059669 100%)' }}>
          <h1 className="m-0 font-extrabold text-2xl tracking-wide">🇹🇼 TAIPEI TRIP 2026: DAY 3</h1>
          <h2 className="mt-2 font-semibold text-xl">🌊 Mountain & Sea Adventure (ผจญภัยภูเขาและทะเล)</h2>
          <div className="inline-flex justify-center gap-5 mt-5 bg-white/20 py-2 px-5 rounded-full">
            <span>🗓️ 1 Feb 2026 (Sun)</span>
            <span>📍 Route: Northeast Coast</span>
          </div>
        </div>

        <div className="p-8">
          <div className="tip-box mb-5 p-4" style={{ background: 'hsl(152 81% 96%)', borderColor: 'hsl(151 81% 71%)' }}>
            <div className="font-extrabold mb-2 text-taiwan-green flex items-center gap-2">☔ Weather Warning</div>
            <p className="m-0 text-sm text-emerald-900">เมือง Keelung และ Jiufen ได้ชื่อว่าเป็น "เมืองแห่งฝน" (Rainy City) อย่าลืมพกร่มและเสื้อกันฝนติดตัวไปด้วยเสมอนะครับ</p>
          </div>

          {/* Early Bird Section */}
          <div className="vintage-box mb-5 mt-0" style={{ borderColor: '#059669', background: 'hsl(152 81% 96%)' }}>
            <div className="font-extrabold text-emerald-700 flex items-center gap-2 mb-2">
              <span className="bg-taiwan-green text-white text-xs py-0.5 px-2 rounded">EARLY BIRD</span>
              ตลาดเช้าท้องถิ่น (ก่อนออกนอกเมือง)
            </div>
            <p className="text-sm text-emerald-800 mb-2">🕒 แนะนำให้มาช่วง 07:00 - 09:00 น. ก่อนขึ้นรถไฟไปจีหลง</p>
            <ul className="list-none p-0 m-0 space-y-2">
              <li data-mission className="pl-6 relative text-sm text-emerald-900">
                <MissionCheckbox id="d3-morning-1" />
                <span className={checkedItems.has('d3-morning-1') ? 'line-through opacity-60' : ''}>
                  ☕ <strong>Shuanglian Morning Market (雙連市場):</strong> ตลาดสดบรรยากาศโลคอลแท้ๆ เดินดูวิถีชีวิตคนไต้หวัน
                  <MapLink 
                    title="Shuanglian Morning Market" 
                    description="ตลาดเช้าท้องถิ่น"
                    googleMapsUrl="https://www.google.com/maps/search/Shuanglian+Market"
                    day={3}
                    stopIndex={0}
                    color="#059669"
                  />
                </span>
              </li>
              <li data-mission className="pl-6 relative text-sm text-emerald-900">
                <MissionCheckbox id="d3-morning-2" />
                <span className={checkedItems.has('d3-morning-2') ? 'line-through opacity-60' : ''}>
                  ☕ <strong>Must Try:</strong> ข้าวมันไต้หวัน (油飯), ข้าวต้ม, หมั่นโถว และของหวานโบราณ
                  <MapLink 
                    title="Shuanglian Morning Market Food" 
                    description="ข้าวมันไต้หวัน ข้าวต้ม หมั่นโถว"
                    googleMapsUrl="https://www.google.com/maps/search/?api=1&query=雙連市場+Shuanglian+Market+Taipei"
                    day={3}
                    stopIndex={0}
                    color="#059669"
                  />
                </span>
              </li>
            </ul>
          </div>

          {/* Keelung Card */}
          <div className="p-6 rounded-2xl border-4 border-taiwan-cyan mb-4" style={{ background: 'hsl(204 100% 97%)' }}>
            <h3 className="mt-0 font-extrabold text-xl text-cyan-700 flex items-center gap-3">
              🚆 STOP 1: มุ่งหน้าสู่เมืองท่าจีหลง (Keelung) <span className="bg-white/70 text-muted-foreground text-sm py-1 px-3 rounded ml-2">ช่วงเช้า - บ่าย</span>
            </h3>
            
            <div className="embed-map-container">
              <iframe 
                src="https://maps.google.com/maps?q=Keelung+City&t=&z=12&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                title="Keelung Map"
              />
            </div>

            <div className="mb-4">
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-1 mb-3">
                🌊 การเดินทาง & จุดชมวิว:
              </div>
              <ul className="list-none p-0 m-0 space-y-2">
                <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d3-trans-1') ? 'line-through opacity-60' : ''}`}>
                  <MissionCheckbox id="d3-trans-1" />
                  🚆 เริ่มต้นที่ <b>Taipei Main Station</b> นั่งรถไฟ TRA มุ่งหน้าสู่เมือง Keelung
                </li>
                <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d3-trans-2') ? 'line-through opacity-60' : ''}`}>
                  <MissionCheckbox id="d3-trans-2" />
                  🚆 ต่อรถ Taxi/Uber ไปชมวิวที่ <b>Heping Island Park (เกาะเหอผิง)</b> <span className="hours-tag">🕒 08:00 - 18:00</span>
                  <MapLink 
                    title="Heping Island Park" 
                    description="เกาะเหอผิง ชมหินรูปร่างแปลกตา"
                    review={locations.day3.points[4].review}
                    googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Heping+Island+Park"
                    day={3}
                    stopIndex={4}
                    color="#0ea5e9"
                  />
                </li>
              </ul>
            </div>

            {/* Local Gem Box */}
            <div className="local-gem-box mb-4">
              <div className="font-extrabold text-taiwan-green flex items-center gap-2 mb-2">
                <span className="bg-taiwan-green text-white text-xs py-0.5 px-2 rounded">LOCAL LUNCH</span>
                มื้อเที่ยงที่คนพื้นที่แนะนำ (ก่อนเดินตลาดเย็น)
              </div>
              <ul className="list-none p-0 m-0 space-y-2">
                <li data-mission className="pl-6 relative text-sm text-emerald-900">
                  <MissionCheckbox id="d3-local-renai" />
                  <span className={checkedItems.has('d3-local-renai') ? 'line-through opacity-60' : ''}>
                    ★ <strong>Ren'ai Market (ชั้น 2):</strong> ตลาดปลาติดแอร์ชั้น 2 สวรรค์ของซาชิมิสดราคาถูกและซูชิ (เปิดถึงเย็น)
                    <MapLink 
                      title="Ren'ai Market" 
                      description="ตลาดปลา ซาชิมิสด"
                      googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Keelung+Ren+Ai+Market"
                      day={3}
                      stopIndex={5}
                      color="#059669"
                    />
                  </span>
                </li>
              </ul>
            </div>

            {/* Keelung Food */}
            <div>
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-1 mb-3">
                🥣 ตะลุยกินตลาดจีหลง (Keelung Night Market):
              </div>
              <p className="text-sm text-muted-foreground mb-3">🕒 ตลาดเปิด: 12:00 - 00:00 (บางร้านเปิดเย็น)</p>
              <ul className="list-none p-0 m-0 space-y-2">
                {[
                  { id: 'd3-kfood-1', name: 'Zheng Ji Spare Ribs', desc: 'ซุปซี่โครงหมูตุ๋นยาจีน' },
                  { id: 'd3-kfood-2', name: 'Wang Ji Tempura', desc: 'เทมปุระ/ลูกชิ้นปลาทอด' },
                  { id: 'd3-kfood-3', name: 'Ah Hua Fried Noodle', desc: 'ผัดหมี่แกงกะหรี่ในตำนาน', hours: '10:00 - 06:00' },
                  { id: 'd3-kfood-4', name: 'Nutritious Sandwich', desc: 'แซนวิชทอดไส้แน่น', hours: '11:30 - 00:00' },
                  { id: 'd3-kfood-5', name: 'Xing Ji Ding Bian Cuo', desc: 'ซุปแผ่นแป้งขอบหม้อ' },
                  { id: 'd3-kfood-6', name: 'One Bite Sausage', desc: 'ไส้กรอกคำเดียว', hours: '11:00 - 23:30' },
                  { id: 'd3-kfood-7', name: 'Lian Zhen Bakery', desc: 'ขนมเปี๊ยะและเผือกกวน', hours: '08:00 - 21:00' },
                ].map((item) => (
                  <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id={item.id} />
                    🥢 <b>{item.name}:</b> {item.desc} {item.hours && <span className="hours-tag">🕒 {item.hours}</span>}
                    <MapLink 
                      title={item.name} 
                      description={item.desc}
                      hours={item.hours}
                      googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Keelung')}`}
                      day={3}
                      stopIndex={5}
                      color="#0ea5e9"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="path-connector">
            <div className="path-line" />
            <span className="text-2xl">⬇️ เปลี่ยนบรรยากาศจากทะเล สู่เมืองภูเขา...</span>
          </div>

          {/* Jiufen Card */}
          <div className="p-6 rounded-2xl border-4 border-taiwan-red mb-4" style={{ background: 'hsl(0 86% 97%)' }}>
            <h3 className="mt-0 font-extrabold text-xl text-red-700 flex items-center gap-3">
              🏮 STOP 2: ถนนคนเดินบนภูเขา (Jiufen Old Street) <span className="bg-white/70 text-muted-foreground text-sm py-1 px-3 rounded ml-2">ช่วงเย็น - ค่ำ</span>
            </h3>
            
            <div className="embed-map-container">
              <iframe 
                src="https://maps.google.com/maps?q=Jiufen+Old+Street&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                title="Jiufen Map"
              />
            </div>

            <div className="mb-4">
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-1 mb-3">
                📸 จุดถ่ายรูปห้ามพลาด:
              </div>
              <ul className="list-none p-0 m-0 space-y-2">
                <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d3-photo-1') ? 'line-through opacity-60' : ''}`}>
                  <MissionCheckbox id="d3-photo-1" />
                  📸 <b>A-Mei Tea House:</b> โรงน้ำชาโคมแดง <span className="hours-tag">🕒 08:30 - 23:00</span>
                  <MapLink 
                    title="A-Mei Tea House" 
                    description="โรงน้ำชาโคมแดง"
                    review={locations.day3.points[8].review}
                    googleMapsUrl="https://www.google.com/maps/search/?api=1&query=A-Mei+Tea+House"
                    day={3}
                    stopIndex={8}
                    color="#dc2626"
                  />
                </li>
                <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d3-photo-2') ? 'line-through opacity-60' : ''}`}>
                  <MissionCheckbox id="d3-photo-2" />
                  📸 <b>Hidden Spots:</b> ทางเดินหลังร้านน้ำชา
                  <MapLink 
                    title="Jiufen Hidden Path" 
                    description="ทางเดินหลังร้านน้ำชา"
                    googleMapsUrl="https://www.google.com/maps/search/?api=1&query=九份老街+Jiufen+Old+Street"
                    day={3}
                    stopIndex={8}
                    color="#dc2626"
                  />
                </li>
                <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d3-photo-3') ? 'line-through opacity-60' : ''}`}>
                  <MissionCheckbox id="d3-photo-3" />
                  📸 <b>Jinguashi View:</b> วิวภูเขาตัดกับท้องทะเล
                  <MapLink 
                    title="Jinguashi View" 
                    description="วิวภูเขาตัดกับท้องทะเล"
                    googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Jinguashi"
                    day={3}
                    stopIndex={8}
                    color="#dc2626"
                  />
                </li>
              </ul>
            </div>

            {/* Optional Shifen */}
            <div className="mt-4 pt-4 border-t border-dashed border-muted">
              <div className="text-red-600 font-bold mb-1">🎏 Optional: Shifen Old Street (ปล่อยโคม)</div>
              <p className="text-sm m-0">หากต้องการไปปล่อยโคมที่ Shifen แนะนำให้แทรกไประหว่าง Keelung และ Jiufen หรือเลือกไปแทน Keelung หากเวลาไม่พอ (นั่งรถไฟสาย Pingxi Line)</p>
            </div>

            <div>
              <div className="font-bold text-muted-foreground flex items-center gap-2 border-b-2 border-muted pb-1 mb-3">
                🥢 ของกินขึ้นชื่อจิ่วเฟิ่น:
              </div>
              <p className="text-sm text-muted-foreground mb-3">🕒 ร้านส่วนใหญ่ปิดเร็ว: ~19:00 - 20:00</p>
              <ul className="list-none p-0 m-0 space-y-2">
                {[
                  { id: 'd3-jfood-1', name: 'A Gan Yi Taro Balls', desc: 'บัวลอยเผือกหนึบ', hours: '09:00 - 20:00', review: locations.day3.points[9].review, stopIndex: 9 },
                  { id: 'd3-jfood-2', name: 'A-Zhu Peanut Ice Cream', desc: 'โรตีไอติมผักชี', hours: '09:30 - 20:30' },
                  { id: 'd3-jfood-3', name: 'Ah-Lan Glutinous Rice Cake', desc: 'ขนมกุยช่าย', hours: '08:00 - 20:00' },
                  { id: 'd3-jfood-4', name: 'Zhang Ji Traditional Fish Ball', desc: 'ซุปลูกชิ้นปลา', hours: '10:00 - 19:00' },
                ].map((item) => (
                  <li key={item.id} data-mission className={`pl-8 relative text-sm ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                    <MissionCheckbox id={item.id} />
                    🥢 <b>{item.name}:</b> {item.desc} <span className="hours-tag">🕒 {item.hours}</span>
                    <MapLink 
                      title={item.name} 
                      description={item.desc}
                      hours={item.hours}
                      review={item.review}
                      googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}`}
                      day={3}
                      stopIndex={item.stopIndex || 9}
                      color="#dc2626"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* DAY 4 */}
      <div id="day4" className="day-wrapper">
        <div className="text-center py-10 px-5 text-white" style={{ background: 'linear-gradient(135deg, #64748b 30%, #3b82f6 100%)' }}>
          <h1 className="m-0 font-extrabold text-2xl tracking-wide">🇹🇼 TAIPEI TRIP 2026: DAY 4</h1>
          <h2 className="mt-2 font-semibold text-xl">🚉 Central Hub & Departure (เก็บตก & เดินทางกลับ)</h2>
          <div className="inline-flex justify-center gap-5 mt-5 bg-white/20 py-2 px-5 rounded-full">
            <span>🗓️ 2 Feb 2026 (Monday)</span>
          </div>
        </div>

        <div className="p-8">
          {/* Food Card */}
          <div className="p-6 rounded-2xl border-l-8 border-day4 bg-muted/30 mb-4">
            <h3 className="mt-0 font-extrabold text-xl text-foreground flex items-center gap-3">
              🌅 STOP 1: มื้อเช้าส่งท้าย (Last Bites)
            </h3>
            <span className="block text-muted-foreground font-semibold text-sm mb-4 ml-10">📍 Location: Zhongzheng District</span>
            
            <div className="bg-red-100 p-3 rounded-lg border border-red-200 mb-4">
              <strong className="text-red-700">⚠️ Warning: Day 4 is Monday!</strong><br />
              <span className="text-sm">ร้านดังหลายร้าน (โดยเฉพาะ Fu Hang Soy Milk) มัก <b>หยุดวันจันทร์</b> จึงขอแนะนำร้านสำรองที่เปิดชัวร์ไว้ให้ครับ</span>
            </div>

            <p className="italic text-muted-foreground mb-4">เติมพลังมื้อสุดท้ายก่อนกลับ:</p>
            <ul className="list-none p-0 m-0 space-y-3">
              <li data-mission className={`pl-8 relative text-sm bg-amber-50 p-2 rounded ${checkedItems.has('d4-food-1') ? 'line-through opacity-60' : ''}`}>
                <MissionCheckbox id="d4-food-1" />
                🥣 <strong>⭐ Liu Shan Dong Beef Noodles:</strong> ก๋วยเตี๋ยวเนื้อตุ๋น (ร้านลับมิชลิน) <span className="hours-tag">🕒 08:00 - 20:00 (Mon-Sat)</span><br />
                <span className="text-xs text-amber-700">👉 แนะนำร้านนี้แทน Fu Hang เพราะเปิดวันจันทร์และอร่อยมาก!</span>
                <MapLink 
                  title="Liu Shan Dong Beef Noodles" 
                  description="ก๋วยเตี๋ยวเนื้อมิชลิน"
                  review={locations.day4.points[1].review}
                  googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Liu+Shan+Dong+Beef+Noodles"
                  day={4}
                  stopIndex={1}
                  color="#64748b"
                />
              </li>
              <li data-mission className={`pl-8 relative text-sm opacity-60 line-through ${checkedItems.has('d4-food-fuhang') ? 'line-through opacity-60' : ''}`}>
                <MissionCheckbox id="d4-food-fuhang" />
                🥣 <strong>Fu Hang Soy Milk:</strong> น้ำเต้าหู้เค็ม (ปิดวันจันทร์)
              </li>
              <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d4-food-2') ? 'line-through opacity-60' : ''}`}>
                <MissionCheckbox id="d4-food-2" />
                🥣 <strong>Yong He Soy Milk King (Taipei Main):</strong> ร้านน้ำเต้าหู้ 24 ชม. (ทางเลือกแทน Fu Hang) <span className="hours-tag">🕒 24 Hours</span>
                <MapLink 
                  title="Yong He Soy Milk King" 
                  description="ร้านน้ำเต้าหู้ 24 ชม."
                  googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Yong+He+Soy+Milk+King+Taipei"
                  day={4}
                  stopIndex={1}
                  color="#64748b"
                />
              </li>
              <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d4-food-3') ? 'line-through opacity-60' : ''}`}>
                <MissionCheckbox id="d4-food-3" />
                🥣 <strong>Jinfeng Braised Pork Rice:</strong> ข้าวหน้าหมูพะโล้ <span className="hours-tag">🕒 08:30 - 01:00</span>
                <MapLink 
                  title="Jinfeng Braised Pork Rice" 
                  description="ข้าวหน้าหมูพะโล้"
                  googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Jinfeng+Braised+Pork+Rice"
                  day={4}
                  stopIndex={1}
                  color="#64748b"
                />
              </li>
              <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d4-food-4') ? 'line-through opacity-60' : ''}`}>
                <MissionCheckbox id="d4-food-4" />
                🥣 <strong>Carrispy Donuts:</strong> โดนัทนมสดทอดกรอบ <span className="hours-tag">🕒 11:00 - 19:15</span>
                <MapLink 
                  title="Carrispy Donuts" 
                  description="โดนัทนมสดทอด"
                  review={locations.day4.points[3].review}
                  googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Carrispy+Donuts"
                  day={4}
                  stopIndex={3}
                  color="#64748b"
                />
              </li>
            </ul>
          </div>

          <div className="path-connector">
            <div className="path-line" />
            <span className="text-2xl">⬇️ ใช้เวลาที่เหลือช้อปปิ้งของฝาก...</span>
          </div>

          {/* Shopping Card */}
          <div className="p-6 rounded-2xl border-l-8 border-taiwan-pink bg-pink-50/50 mb-4">
            <h3 className="mt-0 font-extrabold text-xl text-taiwan-pink flex items-center gap-3">
              🛍️ STOP 2: ช้อปปิ้งนาทีสุดท้าย
            </h3>
            <span className="block text-muted-foreground font-semibold text-sm mb-4 ml-10">📍 Location: Taipei Main Station Area</span>
            
            <div className="bg-cyan-100 p-3 rounded-lg border border-cyan-200 mb-4 text-sm text-cyan-800">
              🕒 <b>Time Management:</b> เนื่องจากต้องออกจากสถานี 10:30 น. และร้านส่วนใหญ่เปิด 10:00-11:00 น. <u>จะมีเวลาช้อปน้อยมาก</u> แนะนำให้เล็งร้านที่เปิดเช้าหรือซื้อ 7-11/PX Mart แทนครับ
            </div>

            <ul className="list-none p-0 m-0 space-y-3">
              <li data-mission className={`bg-amber-50 border-2 border-dashed border-amber-400 p-3 rounded-lg ${checkedItems.has('d4-shop-1') ? 'opacity-60' : ''}`}>
                <MissionCheckbox id="d4-shop-1" />
                <div className="font-extrabold text-amber-800">🎁 ของฝากที่คนไต้หวันซื้อให้กันเอง (Local Souvenirs)</div>
                <ul className="mt-2 pl-5 text-sm text-amber-700 list-disc">
                  <li><strong>PX Mart House Brand:</strong> ขนมขบเคี้ยวตรา PX Mart อร่อยและถูก</li>
                  <li><strong>ชาใบ Oolong (ซองกระดาษ):</strong> รสชาติดีและราคาจริงใจ</li>
                  <li><strong>ขนมงาดำ / ถั่วลิสงโบราณ:</strong> ขนมดั้งเดิมที่คนท้องถิ่นกินจริงๆ</li>
                </ul>
              </li>
              <li data-mission className={`bg-amber-50 border-2 border-dashed border-amber-400 p-3 rounded-lg mb-3 ${checkedItems.has('d4-shop-luchinshu') ? 'opacity-60' : ''}`}>
                <MissionCheckbox id="d4-shop-luchinshu" />
                <div className="font-extrabold text-amber-800">
                  🌟 Luchinshu (盧琴樹) - ขนมปังตังเม & บิสกิตชีส
                  <MapLink 
                    title="Luchinshu 盧琴樹" 
                    description="ขนมปังตังเม & บิสกิตชีส"
                    hours="10:00-22:00"
                    googleMapsUrl="https://www.google.com/maps/search/?api=1&query=盧琴樹+Luchinshu+Taipei+Station"
                    day={4}
                    stopIndex={3}
                    color="#d97706"
                  />
                </div>
                <div className="text-sm mt-1">
                  👉 <b>Breeze Taipei Station ชั้น 2:</b> 10:00-22:00<br />
                  👉 <b>Eslite Underground (B1):</b> 10:30-22:00
                </div>
              </li>
              <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d4-shop-2') ? 'line-through opacity-60' : ''}`}>
                <MissionCheckbox id="d4-shop-2" />
                🛒 <strong>PX Mart (Quan Lian):</strong> ซูเปอร์มาร์เก็ตท้องถิ่น (เปิด 8 โมงเช้า แวะได้เลย!) <span className="hours-tag">🕒 08:00 - 23:00</span>
                <MapLink 
                  title="PX Mart" 
                  description="ซูเปอร์มาร์เก็ตท้องถิ่น"
                  review={locations.day4.points[4].review}
                  googleMapsUrl="https://www.google.com/maps/search/?api=1&query=PX+Mart+Zhongzheng"
                  day={4}
                  stopIndex={4}
                  color="#db2777"
                />
              </li>
              <li data-mission className={`pl-8 relative text-sm ${checkedItems.has('d4-shop-3') ? 'line-through opacity-60' : ''}`}>
                <MissionCheckbox id="d4-shop-3" />
                🛒 <strong>Cosmed Drugstore:</strong> เครื่องสำอาง (สาขาสถานีอาจเปิดเช้า) <span className="hours-tag">🕒 10:00 - 23:00</span>
                <MapLink 
                  title="Cosmed Drugstore" 
                  description="เครื่องสำอาง"
                  googleMapsUrl="https://www.google.com/maps/search/?api=1&query=Cosmed+Taipei+Main+Station"
                  day={4}
                  stopIndex={4}
                  color="#db2777"
                />
              </li>
            </ul>
          </div>

          <div className="path-connector">
            <div className="path-line" />
            <span className="text-2xl">⬇️ ได้เวลาบอกลาไทเป... มุ่งหน้าสนามบิน</span>
          </div>

          {/* Departure Card */}
          <div className="p-6 rounded-2xl border-l-8 border-day1 bg-blue-50/50">
            <h3 className="mt-0 font-extrabold text-xl text-day1 flex items-center gap-3">
              ✈️ FINAL STOP: เดินทางกลับ (Back to BKK)
            </h3>
            <span className="block text-muted-foreground font-semibold text-sm mb-4 ml-10">📍 Destination: Taoyuan International Airport (TPE)</span>
            
            <div className="space-y-4 mt-5">
              <div className="flex items-start gap-4 pb-4 border-b border-dashed border-muted">
                <div className="font-extrabold text-taiwan-cyan w-24 flex-shrink-0">Heading to Airport</div>
                <div>
                  <div className="font-bold">ออกเดินทางจาก Main Station</div>
                  <span className="text-sm text-muted-foreground">มุ่งหน้าสู่สนามบินเถาหยวน (เผื่อเวลาเดินทางประมาณ 1 ชม.)</span>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-dashed border-muted">
                <div className="font-extrabold text-taiwan-cyan w-24 flex-shrink-0">11:30 น.</div>
                <div>
                  <div className="font-bold">Arrive Airport</div>
                  <span className="text-sm text-muted-foreground">Check-in, โหลดกระเป๋า, ผ่าน ตม.</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="font-extrabold text-taiwan-red w-24 flex-shrink-0">13:50 น.</div>
                <div>
                  <div className="font-bold text-taiwan-red">Flight Departure 🛫</div>
                  <span className="text-sm text-muted-foreground">เหินฟ้ากลับสู่กรุงเทพฯ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center py-6 bg-muted text-muted-foreground font-bold">
          👋 Have a safe flight! เดินทางปลอดภัยครับ 🇹🇼
        </div>
      </div>

      {/* Credits Footer */}
      <footer className="text-center py-8 bg-gradient-to-r from-day1 to-taiwan-pink">
        <div className="text-white/90 text-sm mb-2">
          👽 ตัวต้นเรื่อง
        </div>
        <a 
          href="https://www.facebook.com/alieninburi.bunpook" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-white font-bold transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          alieninburi.bunpook
        </a>
        <div className="text-white/60 text-xs mt-3">
          Made with ❤️ for Taiwan Trip 2026
        </div>
      </footer>

      <MissionHUD total={totalItems || 50} checked={checkedItems.size} />
    </div>
  );
};

export default Index;
