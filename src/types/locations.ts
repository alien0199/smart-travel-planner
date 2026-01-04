export interface LocationPoint {
  coords: [number, number];
  type: string;
  title: string;
  desc: string;
  review: string;
  googleMapsQuery?: string;
}

export interface DayData {
  color: string;
  points: LocationPoint[];
}

export interface LocationsData {
  [key: string]: DayData;
}

export const locations: LocationsData = {
  day1: {
    color: '#60a5fa',
    points: [
      {
        coords: [25.0797, 121.2342], type: "airport", title: "สนามบินเถาหยวน",
        desc: "15:25 น. ถึงไต้หวัน ผ่าน ตม. รับกระเป๋า",
        review: "ตม. ช่วงบ่ายคิวค่อนข้างยาว (30-45 นาที) อย่าลืมกรอก Arrival Card ออนไลน์มาก่อน จะช่วยให้ผ่านได้เร็วขึ้นมาก! จุดแลกเงินมีทั้งก่อนและหลังผ่าน ตม.",
        googleMapsQuery: "Taoyuan International Airport Taiwan"
      },
      {
        coords: [25.0615, 121.3500], type: "transit", title: "Airport MRT",
        desc: "นั่งรถไฟ Express เข้าเมือง (35 นาที)",
        review: "แนะนำให้นั่งรถไฟแบบ Express (สีม่วง) เท่านั้น จะเร็วกว่าแบบ Commuter (สีน้ำเงิน) มาก ที่นั่งมีที่วางชาร์จมือถือด้วย สะดวกสุดๆ",
        googleMapsQuery: "Taoyuan Airport MRT Station Taiwan"
      },
      {
        coords: [25.0478, 121.5170], type: "transit", title: "Taipei Main Station",
        desc: "ถึงสถานีหลัก เดินไปโรงแรม (Exit Z)",
        review: "สถานีใหญ่เหมือนเขาวงกต! ให้มองหาป้ายทางออก Z (Z Underground Mall) เพื่อเดินไปโรงแรม Mayer Inn จะเดินง่ายที่สุด ไม่ต้องขึ้นลงบันไดเยอะ",
        googleMapsQuery: "台北車站 Taipei Main Station Taiwan"
      },
      {
        coords: [25.0464, 121.5169], type: "hotel", title: "Mayer Inn",
        desc: "Check-in เก็บกระเป๋า (Base)",
        review: "ทำเลเทพมาก! อยู่ตึกเดียวกับ H&M ตรงข้าม Main Station เลย ลิฟต์ขึ้นโรงแรมอยู่ด้านข้างตึก (ทางเข้าเล็กหน่อย) ห้องพักสะอาดแต่กะทัดรัดสไตล์ไทเป",
        googleMapsQuery: "美爵旅店 Mayer Inn Taipei Station"
      },
      {
        coords: [25.0422, 121.5067], type: "cafe", title: "Fong Da Coffee",
        desc: "ร้านกาแฟวินเทจ 60 ปี",
        review: "ร้านกาแฟรุ่นคุณปู่ กลิ่นกาแฟหอมฟุ้งตั้งแต่เดินผ่านหน้าร้าน! ต้องสั่ง 'คุกกี้วอลนัท' (Walnut Cookie) กินคู่กับกาแฟเย็นแบบไต้หวันคือเข้ากันสุดๆ",
        googleMapsQuery: "蜂大咖啡 Fong Da Coffee Taipei"
      },
      {
        coords: [25.0424, 121.5068], type: "food", title: "บะหมี่อาจง",
        desc: "บะหมี่แป้งข้าวเจ้าในตำนาน (Must Try!)",
        review: "คิวดูยาวแต่วิ่งไวมาก! รสชาติเหมือนกระเพาะปลาเข้มข้น แนะนำให้เติมซอสพริกส้มๆ + น้ำส้มสายชูหน้าร้าน จะอร่อยขึ้น 200% ทานร้อนๆ ฟินมาก",
        googleMapsQuery: "阿宗麵線 Ay-Chung Flour Rice Noodle Ximending"
      },
      {
        coords: [25.0426, 121.5059], type: "food", title: "Tian Tian Li",
        desc: "ข้าวหน้าหมูพะโล้ไข่ดาว",
        review: "เมนูเด็ดคือ 'ข้าวหน้าหมูพะโล้ไข่ดาวลาวา' เจาะไข่แดงให้เยิ้มกินกับหมูเค็มๆ หวานๆ คือนิพพาน! ร้านแคบหน่อยแต่คุ้มค่าการรอคอย",
        googleMapsQuery: "天天利美食坊 Tian Tian Li Ximending Taipei"
      },
      {
        coords: [25.0421, 121.5063], type: "drink", title: "Xing Fu Tang",
        desc: "ชานมไข่มุกพ่นไฟ",
        review: "ต้นตำรับความหนึบ! ไข่มุกทำสดใหม่ในกระทะทองเหลืองหน้าร้าน ได้กินตอนอุ่นๆ นุ่มมาก หอมน้ำตาลทรายแดงไหม้นิดๆ จากการพ่นไฟ",
        googleMapsQuery: "幸福堂 Xing Fu Tang Ximending Taipei"
      },
      {
        coords: [25.0428, 121.5055], type: "food", title: "Hot-Star ไก่ทอด",
        desc: "ไก่ทอดชิ้นยักษ์",
        review: "ไก่ชิ้นใหญ่เท่าหน้าจริงๆ! ทอดมาร้อนจี๋ระวังลวกปาก แนะนำให้สั่งแบบ 'Spicy' จะได้ผงพริกหมาล่ามาตัดเลี่ยน อร่อยกว่าแบบธรรมดา",
        googleMapsQuery: "豪大大雞排 Hot Star Large Fried Chicken Ximending"
      },
      {
        coords: [25.0420, 121.5071], type: "food", title: "Three Brothers Tofu Pudding",
        desc: "โทฟุพุดดิ้งเจ้าดัง",
        review: "เต้าฮวยเย็นเนื้อเนียนนุ่ม! เหมาะมากไว้ล้างปากหลังกินของคาว แนะนำท็อปปิ้งถั่วลิสงต้มเปื่อยและเผือกกวน หวานน้อยชื่นใจ",
        googleMapsQuery: "三兄弟豆花 Three Brothers Tofu Pudding Ximending"
      },
      {
        coords: [25.0432, 121.5082], type: "shopping", title: "Don Don Donki",
        desc: "ห้างดองกี้ 24 ชม.",
        review: "สาขานี้ใหญ่มาก! ชั้น 2 มีโซนอาหารปรุงสุกพร้อมทาน ถ้าหิวรอบดึกแวะมาได้เลย ของฝากพวกขนมญี่ปุ่นราคาบางอย่างถูกกว่าไทยเยอะ",
        googleMapsQuery: "唐吉訶德 Don Don Donki Ximending Taipei"
      },
      {
        coords: [25.0420, 121.5078], type: "photo", title: "ทางม้าลายสายรุ้ง",
        desc: "จุดถ่ายรูปหน้า MRT Ximen ทางออก 6",
        review: "แลนด์มาร์คยอดฮิต! ถ้าอยากได้รูปสวยคนน้อยให้มาเช้าๆ หรือถ่ายตอนกลางคืนไปเลย ระวังรถด้วยเพราะเป็นถนนใช้งานจริง",
        googleMapsQuery: "西門町彩虹斑馬線 Ximending Rainbow Crosswalk Taipei"
      },
      {
        coords: [25.0464, 121.5169], type: "hotel", title: "กลับที่พัก",
        desc: "พักผ่อน",
        review: "เดินกลับจากซีเหมินติงมาโรงแรมใช้เวลาประมาณ 15 นาที ถือว่าเดินย่อยอาหาร หรือถ้านั่ง Uber ก็ประมาณ 80-100 TWD สะดวกดี",
        googleMapsQuery: "美爵旅店 Mayer Inn Taipei Station"
      }
    ]
  },
  day2: {
    color: '#fbbf24',
    points: [
      {
        coords: [25.0464, 121.5169], type: "hotel", title: "เริ่ม: Mayer Inn", desc: "08:00 ออกเดินทาง",
        review: "เตรียมขวดน้ำเปล่าไปด้วย วันนี้เดินเยอะ! (น้ำประปาที่ไต้หวันดื่มไม่ได้ แต่ตามสถานี MRT มีตู้กดน้ำฟรี)",
        googleMapsQuery: "美爵旅店 Mayer Inn Taipei Station"
      },
      {
        coords: [25.0372, 121.4994], type: "temple", title: "วัดหลงซาน", desc: "ไหว้พระขอพรเช้า",
        review: "ศักดิ์สิทธิ์เรื่องความรักและการงาน! อย่าลืมขอด้ายแดงที่จุดบริการ (ถ้าวางแผนจะขอ) และลองเสี่ยงเซียมซีที่นี่แม่นมาก มีคำแปลภาษาอังกฤษให้ด้วย",
        googleMapsQuery: "艋舺龍山寺 Longshan Temple Taipei"
      },
      {
        coords: [25.0368, 121.5020], type: "photo", title: "ย่าน Bopiliao", desc: "ชมตึกอิฐแดงโบราณ",
        review: "อยู่ติดวัดหลงซานเลย เป็นตึกอิฐแดงถ่ายรูปสวยมาก ได้ฟีลหนังย้อนยุค **ปิดทุกวันจันทร์** นะเช็ควันดีๆ ข้างในมีนิทรรศการประวัติศาสตร์ให้ดูฟรี",
        googleMapsQuery: "剝皮寮歷史街區 Bopiliao Historic Block Taipei"
      },
      {
        coords: [25.0358, 121.4992], type: "food", title: "Yuanfang Gua Bao", desc: "เบอร์เกอร์หมู Michelin",
        review: "แป้งนุ่มฟู หมูสามชั้นตุ๋นจนละลาย! ผักดองกับถั่วลิสงป่นช่วยตัดเลี่ยนได้ดีมาก สมราคามิชลิน แถวอาจจะยาวหน่อยแต่คุ้ม",
        googleMapsQuery: "源芳刈包 Yuanfang Gua Bao Longshan Temple Taipei"
      },
      {
        coords: [25.0370, 121.5025], type: "food", title: "โจ๊กหมูกรอบ Zhouji", desc: "ข้าวต้มหมูกรอบมื้อสาย",
        review: "ไม่ใช่โจ๊กเละๆ แต่เป็นข้าวต้มน้ำใส ทีเด็ดคือ 'หมูกรอบ' ที่สั่งแยกมาจิ้มน้ำจิ้ม สั่งหมูกรอบ 1 จานต่อคนไปเลยรับรองไม่พอ!",
        googleMapsQuery: "周記肉粥 Zhouji Congee Longshan Temple Taipei"
      },
      {
        coords: [25.0490, 121.5115], type: "photo", title: "ประตูเมืองเหนือ (Beimen)", desc: "Beimen North Gate",
        review: "ประตูเมืองเก่าแก่อายุกว่า 100 ปี ถ่ายรูปสวยโดยเฉพาะช่วงเย็นที่มีแสงไฟส่อง ตัดกับฉากหลังที่เป็นตึกไปรษณีย์เก่าคลาสสิกมาก",
        googleMapsQuery: "北門 Beimen North Gate Taipei"
      },
      {
        coords: [25.0631, 121.5338], type: "temple", title: "วัดสิงเทียน", desc: "เทพเจ้ากวนอู",
        review: "วัดนี้เน้นความเรียบง่าย ไม่มีกระถางธูป (ไหว้มือเปล่า) ขึ้นชื่อเรื่องการปัดเป่าสิ่งชั่วร้าย คุณป้าชุดน้ำเงินทำพิธีเรียกขวัญให้ฟรี แถวอาจจะยาวหน่อย",
        googleMapsQuery: "行天宮 Xingtian Temple Taipei"
      },
      {
        coords: [25.0444, 121.5294], type: "art", title: "Huashan 1914", desc: "Creative Park",
        review: "แหล่งรวมวัยรุ่นสายอาร์ต! มีร้าน Wooderful Life (กล่องดนตรีไม้) ที่น่ารักจนใจเจ็บ และ Pop-up Store การ์ตูนต่างๆ หมุนเวียนมาจัดตลอด",
        googleMapsQuery: "華山1914文化創意產業園區 Huashan 1914 Creative Park Taipei"
      },
      {
        coords: [25.0442, 121.5305], type: "cafe", title: "Simple Kaffa", desc: "กาแฟแชมป์โลก",
        review: "กาแฟดีที่สุดในไทเป! บรรยากาศร้านสวยเท่ คิวหน้าร้านยาวตลอด ถ้าไม่อยากรอโต๊ะ สั่ง Take away จะได้เร็วกว่ามาก",
        googleMapsQuery: "興波咖啡 Simple Kaffa Huashan Taipei"
      },
      {
        coords: [25.0315, 121.5620], type: "photo", title: "Si Si Nan Cun", desc: "หมู่บ้านทหาร (จุดถ่ายรูป 101)",
        review: "จุดลับถ่ายรูปตึก 101 ที่สวยที่สุด! ได้องค์ประกอบตึกเก่าตัดกับตึกใหม่ที่ลงตัว วันอาทิตย์มีตลาดนัด Simple Market ขายของแฮนด์เมดน่ารักๆ",
        googleMapsQuery: "四四南村 Forty-four South Village Taipei 101"
      },
      {
        coords: [25.0340, 121.5645], type: "shopping", title: "Taipei 101", desc: "เดินห้างหรู ย่านตึกสูง",
        review: "ถ้าไม่ได้จะขึ้นจุดชมวิว แนะนำให้เดินเล่นห้างข้างล่างและถ่ายรูปจากภายนอกก็พอ ประหยัดงบได้เยอะ Food Court ชั้นล่างของกินเยอะมาก",
        googleMapsQuery: "台北101 Taipei 101"
      },
      {
        coords: [25.0335, 121.5650], type: "drink", title: "Chun Shui Tang", desc: "ชานมไข่มุกต้นตำรับ",
        review: "ร้านนี้คือผู้คิดค้นชานมไข่มุก! รสชาติจะละมุนๆ ผู้ดีๆ ไม่หวานแสบคอ เมนูอาหารคาวอย่างก๋วยเตี๋ยวเนื้อก็อร่อยไม่แพ้กัน สาขานี้คนน้อยกว่าสาขาหลัก",
        googleMapsQuery: "春水堂 Chun Shui Tang Taipei 101"
      },
      {
        coords: [25.0557, 121.5155], type: "food", title: "ตลาดหนิงเซี่ย", desc: "Night Market",
        review: "ตลาดขนาดเล็กแต่คุณภาพคับแก้ว! ห้ามพลาด 'Liu Yu Zi' (เผือกทอดไส้ไข่เค็ม) และ 'หอยทอด' ร้านหัวมุม ทางเดินแคบหน่อยระวังเบียด",
        googleMapsQuery: "寧夏夜市 Ningxia Night Market Taipei"
      },
      {
        coords: [25.0464, 121.5169], type: "hotel", title: "กลับที่พัก", desc: "จบทริปวันที่ 2",
        review: "จากตลาดหนิงเซี่ย นั่ง Uber กลับโรงแรมประมาณ 100 TWD หรือจะเดินประมาณ 15-20 นาทีก็ได้ ถือว่าเดินย่อย",
        googleMapsQuery: "美爵旅店 Mayer Inn Taipei Station"
      }
    ]
  },
  day3: {
    color: '#34d399',
    points: [
      {
        coords: [25.0464, 121.5169], type: "hotel", title: "เริ่ม: Mayer Inn", desc: "เช้า: เดินไปสถานีรถไฟ",
        review: "วันนี้ออกนอกเมือง พกร่ม/เสื้อกันฝนติดตัวไปด้วยเสมอ! เมือง Keelung และ Jiufen ฝนตกบ่อยมาก (Rainy City)",
        googleMapsQuery: "美爵旅店 Mayer Inn Taipei Station"
      },
      {
        coords: [25.0478, 121.5170], type: "transit", title: "Taipei Main Station", desc: "ขึ้นรถไฟ TRA ไป Keelung",
        review: "ใช้บัตร EasyCard แตะเข้ารถไฟ TRA ได้เลย (เหมือนขึ้น BTS) ไม่ต้องจองตั๋ว ให้ดูป้ายรถไฟที่เขียนว่าไป 'Keelung' (Local Train) นั่งยาวๆ 45 นาที",
        googleMapsQuery: "台北車站 Taipei Main Station Taiwan"
      },
      {
        coords: [25.1310, 121.7393], type: "city", title: "สถานี Keelung", desc: "ถึงเมืองท่าจีหลง",
        review: "เดินออกจากสถานีทางทิศใต้ (South Exit) จะเจอกับท่าเรือเลย กลิ่นทะเลเตะจมูก บรรยากาศชิลมาก",
        googleMapsQuery: "基隆車站 Keelung Train Station Taiwan"
      },
      {
        coords: [25.1310, 121.7405], type: "photo", title: "Maritime Plaza", desc: "วิวท่าเรือ",
        review: "จุดถ่ายรูปเช็คอินกับป้าย KEELUNG ตัวใหญ่ๆ และดูเรือสำราญลำยักษ์จอดเทียบท่า นกเหยี่ยวบินเยอะมาก ระวังขี้ตกใส่หัว!",
        googleMapsQuery: "基隆海洋廣場 Keelung Maritime Plaza Taiwan"
      },
      {
        coords: [25.1610, 121.7639], type: "sea", title: "เกาะเหอผิง", desc: "ชมหินรูปร่างแปลกตา",
        review: "สวยกว่าเย่หลิวและคนน้อยกว่ามาก! หินรูปทรงแปลกตา (เช่น หัวหมู, เท้าเสือดาว) ริมทะเลสีคราม มีสระว่ายน้ำธรรมชาติที่ลงเล่นได้จริงด้วย",
        googleMapsQuery: "和平島公園 Heping Island Park Keelung Taiwan"
      },
      {
        coords: [25.1285, 121.7420], type: "food", title: "ตลาด Ren'ai", desc: "มื้อเที่ยง ซูชิ/เทมปุระ",
        review: "ขึ้นไปชั้น 2 คือสวรรค์ของคนรักปลาดิบ! ร้านซูชิเยอะมาก สดและถูกกว่าในไทเป แนะนำร้าน A12 หรือร้านที่มีคนต่อคิวเยอะๆ",
        googleMapsQuery: "仁愛市場 Ren'ai Market Keelung Taiwan"
      },
      {
        coords: [25.1088, 121.8435], type: "transit", title: "ไปจิ่วเฟิ่น", desc: "นั่งรถเมล์ 788/965",
        review: "รถเมล์ขึ้นเขาทางค่อนข้างคดเคี้ยว ใครเมารถง่ายให้กินยาแก้เมาดักไว้ก่อนเลย เตรียมบัตร EasyCard ไว้แตะตอนขึ้นและลง",
        googleMapsQuery: "九份老街 Jiufen Old Street Taiwan"
      },
      {
        coords: [25.1088, 121.8435], type: "tea", title: "จิ่วเฟิ่น", desc: "Jiufen Old Street",
        review: "คนเยอะมากโดยเฉพาะช่วงเย็น! ให้ใจเย็นๆ แล้วค่อยๆ ไหลตามคนไป ลองเลี้ยวเข้าซอยย่อยๆ จะเจอร้านน่ารักๆ ที่คนน้อยกว่าถนนหลัก",
        googleMapsQuery: "九份老街 Jiufen Old Street Taiwan"
      },
      {
        coords: [25.1092, 121.8442], type: "photo", title: "A-Mei Tea House", desc: "โรงน้ำชาโคมแดง",
        review: "มุมมหาชน! ถ้าอยากถ่ายรูปสวยๆ ให้ไปยืนที่ร้านอาหารฝั่งตรงข้าม แต่ถ้าอยากนั่งจิบชาชมวิวพระอาทิตย์ตก แนะนำให้จองโต๊ะล่วงหน้า",
        googleMapsQuery: "阿妹茶樓 A-Mei Tea House Jiufen Taiwan"
      },
      {
        coords: [25.1095, 121.8448], type: "food", title: "บัวลอย A-Gan Yi", desc: "กินบัวลอยเผือกวิวทะเล",
        review: "ร้านอยู่เกือบบนสุด ต้องเดินขึ้นบันไดหน่อย แต่คุ้มค่า! บัวลอยหนึบๆ ร้อนๆ กินคู่กับน้ำแข็งไส วิวหน้าต่างมองเห็นทะเลและภูเขาสวยหลักล้าน",
        googleMapsQuery: "阿柑姨芋圓 A-Gan Yi Taro Balls Jiufen Taiwan"
      },
      {
        coords: [25.0478, 121.5170], type: "transit", title: "กลับไทเป", desc: "รถบัส 965",
        review: "ขากลับคิวรถบัสยาวมาก! แนะนำให้มารอก่อน 19:00 หรือถ้ารอนานเกินไป ให้นั่งรถเมล์ลงไปสถานีรถไฟ Ruifang แล้วนั่งรถไฟกลับไทเปจะเร็วกว่า",
        googleMapsQuery: "台北車站 Taipei Main Station Taiwan"
      },
      {
        coords: [25.0464, 121.5169], type: "hotel", title: "ที่พัก", desc: "พักผ่อน",
        review: "กลับถึงห้อง แนะนำให้แช่เท้าด้วยน้ำอุ่น วันนี้เดินขึ้นลงเขาเยอะ พรุ่งนี้จะได้ไม่ปวดขา",
        googleMapsQuery: "美爵旅店 Mayer Inn Taipei Station"
      }
    ]
  },
  day4: {
    color: '#a8a29e',
    points: [
      {
        coords: [25.0464, 121.5169], type: "hotel", title: "Check-out", desc: "ฝากกระเป๋า",
        review: "Check-out และฝากกระเป๋าไว้ที่โรงแรมได้เลย (ฟรี) จะได้เดินตัวปลิวช้อปปิ้งของฝากรอบสุดท้าย",
        googleMapsQuery: "美爵旅店 Mayer Inn Taipei Station"
      },
      {
        coords: [25.0457, 121.5138], type: "food", title: "ก๋วยเตี๋ยวเนื้อ Liu Shan Dong", desc: "มื้อเช้า (มิชลิน)",
        review: "ก๋วยเตี๋ยวเนื้อในตำนาน ซ่อนอยู่ในซอยเล็กๆ เส้นอูด้งทำเองเหนียวนุ่มมาก น้ำซุปหอมยาจีนแต่ไม่ฉุน เนื้อตุ๋นเปื่อยนุ่ม แนะนำมาเช้าๆ คิวจะได้ไม่ยาว",
        googleMapsQuery: "劉山東牛肉麵 Liu Shandong Beef Noodles Taipei"
      },
      {
        coords: [25.0452, 121.5142], type: "cafe", title: "Heritage Bakery", desc: "ร้านกาแฟเก๋ๆ",
        review: "ร้านเบเกอรี่สไตล์อเมริกันผสมไต้หวัน ขนมเค้กอร่อยมาก โดยเฉพาะ Cinnamon Roll และ Carrot Cake บรรยากาศร้านถ่ายรูปสวย",
        googleMapsQuery: "Heritage Bakery & Cafe 台北市中正區"
      },
      {
        coords: [25.0480, 121.5168], type: "food", title: "Carrispy Donuts", desc: "โดนัทนมสดทอด",
        review: "โดนัทนมสดทอดกรอบนอกนุ่มใน คลุกน้ำตาลไอซิ่ง หอมนมมาก! ซื้อตุนไว้กินระหว่างนั่งรถไฟไปสนามบินคือดีงาม",
        googleMapsQuery: "脆皮鮮奶甜甜圈 Crispy Fresh Milk Donut Taipei Main Station"
      },
      {
        coords: [25.0478, 121.5170], type: "shopping", title: "ซื้อของฝาก", desc: "Luchinshu, PX Mart",
        review: "แวะตึก Breeze ซื้อขนมเปี๊ยะหรือพายสับปะรดร้านดังๆ หรือลงชั้นใต้ดินเดิน PX Mart ซื้อขนมถุงๆ ราคาถูกกลับไปแจกเพื่อนที่ทำงาน",
        googleMapsQuery: "微風台北車站 Breeze Taipei Station"
      },
      {
        coords: [25.0464, 121.5169], type: "hotel", title: "รับกระเป๋า", desc: "ที่โรงแรม",
        review: "กลับมารับกระเป๋า จัดของให้เรียบร้อย เตรียม Passport ไว้ให้หยิบง่ายๆ สำหรับเดินทางไปสนามบิน",
        googleMapsQuery: "美爵旅店 Mayer Inn Taipei Station"
      },
      {
        coords: [25.0600, 121.3500], type: "transit", title: "ไปสนามบิน", desc: "Airport MRT",
        review: "นั่งรถไฟสายสีม่วง (Express) เหมือนขามา ใช้เวลา 35 นาที เผื่อเวลาให้ถึงสนามบินก่อนเครื่องออกสัก 2.5 - 3 ชม. นะ",
        googleMapsQuery: "桃園機場捷運 Taoyuan Airport MRT A1 Taipei Main Station"
      },
      {
        coords: [25.0797, 121.2342], type: "airport", title: "กลับบ้าน", desc: "13:50 Flight Departure",
        review: "Tax Refund ทำที่ Kiosk ก่อนเช็คอินได้เลย ใน Gate มีร้านของฝากอีกเพียบ ถ้าลืมซื้ออะไรมาเก็บตกที่นี่ได้ (แต่ราคาอาจสูงกว่าข้างนอกนิดหน่อย)",
        googleMapsQuery: "桃園國際機場 Taoyuan International Airport Taiwan"
      }
    ]
  }
};
