import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'berbere',
    name: {
      en: 'Berbere Blend',
      am: 'የተመረጠ በርበሬ',
    },
    subtitle: {
      en: 'The Soul of Ethiopian Cooking',
      am: 'የሀበሻ ምግብ ዋና ማዕከል',
    },
    tagline: {
      en: 'Sun-dried red chilies, sacred korarima, fenugreek & aromatic wild mountain spices.',
      am: 'በፀሐይ የደረቀ ቀይ በርበሬ፣ ኮረሪማ፣ አብሽ እና የተመረጡ የሀገር ቅመሞች።',
    },
    description: {
      en: 'The soul of Ethiopian cooking. A rich, complex blend of chilies, fenugreek, and warming spices — the foundation of Doro Wat, Tibs, and a thousand beloved dishes.',
      am: 'የኢትዮጵያ ምግብ ነፍስ። ከቀይ ቃሪያ፣ አብሽ እና የሚያሞቁ ቅመማ ቅመሞች የተዋቀረ ጥልቅ ድብልቅ — ለዶሮ ወጥ፣ ለጥብስ እና ለብዙ ተወዳጅ ምግቦች መሰረት።',
    },
    heritageStory: {
      en: "Hand-blended according to our mother's traditional secret ratio, thoroughly sifted and cured for vibrant crimson color and balanced warmth that never scorches.",
      am: 'በእናት ቅመም ጥበብ በጥንቃቄ የተዘጋጀ፣ ለየት ያለ ደማቅ ቀይ ቀለም እና ተመጣጣኝ የቃጠሎና የጣዕም ሚዛን ያለው።',
    },
    ingredients: {
      en: ['Sun-dried Red Chilies', 'Ethiopian Cardamom (Korarima)', 'Fenugreek', 'Garlic', 'Ginger', 'Ruta Graveolens (Tena Adam)', 'Coriander', 'Cloves'],
      am: ['ቀይ ቃሪያ', 'ኮረሪማ', 'አብሽ', 'ነጭ ሽንኩርት', 'ዝንጅብል', 'ጤና አዳም', 'ድንብላል', 'ቅርንፉድ'],
    },
    bestFor: {
      en: ['Doro Wat (Chicken Stew)', 'Sega Wat (Beef Stew)', 'Key Wot', 'Tibs & Awaze Sauce'],
      am: ['የዶሮ ወጥ', 'የስጋ ወጥ', 'ቀይ ወጥ', 'ጥብስ እና አዋዜ'],
    },
    flavorNotes: {
      en: ['Smoky Earth', 'Sweet Fenugreek', 'Cardamom Bloom', 'Warm Lingering Heat'],
      am: ['የተጠበሰ መዓዛ', 'ጣፋጭ አብሽ', 'የኮረሪማ ጠረን', 'የረጋ ሙቀት'],
    },
    heatLevel: 4,
    prepTip: {
      en: 'Slow-cook gently in caramelized red onions and spiced niter kibbeh for deep culinary depth.',
      am: 'ጥልቅ ጣዕም እንዲያመጣ በቀይ ሽንኩርት እና በቅቤ ውስጥ በዝግታ ያቁላሉት።',
    },
    prices: {
      '500g': { etb: 2000, usd: 16 },
      '1kg': { etb: 3800, usd: 30 },
    },
    accentColor: '#942F12',
    badgeText: {
      en: 'Bestseller',
      am: 'ተመራጭ',
    },
  },
  {
    id: 'shiro',
    name: {
      en: 'Pure Shiro Powder',
      am: 'ንፁህ የሽሮ ዱቄት',
    },
    subtitle: {
      en: 'Silky, Savory Chickpea Stew Blend',
      am: 'ለስላሳ እና ጣፋጭ የሽሮ ዱቄት',
    },
    tagline: {
      en: 'Slow-roasted split chickpeas stone-ground with garlic, ginger, sacred herbs and gentle spices.',
      am: 'በጥንቃቄ የተቆላ ሽምብራ፣ በነጭ ሽንኩርት፣ ዝንጅብል እና ቅመሞች የተሸነገረው።',
    },
    description: {
      en: 'Silky, satisfying, and deeply flavorful. Our roasted chickpea powder is seasoned to perfection — just add water for an instant taste of home.',
      am: 'ለስላሳ፣ የሚያረካ እና ልዩ ጣዕም ያለው። የተቆላ የሽምብራ ዱቄታችን በቅመሞች የተዋበ ነው — ውሃ በማከል ብቻ ፈጣን የቤትዎን ጣዕም ይጎብኙ።',
    },
    heritageStory: {
      en: 'Roasted slowly over low heat to lock in golden sweetness, then stone-milled with sun-dried shallots and mountain basil.',
      am: 'በዝግታ ተቆልቶ ጣፋጭነቱ የተጠበቀ፣ በባህላዊ ወፍጮ በነጭ ሽንኩርትና በበሶብላ የተፈጨ።',
    },
    ingredients: {
      en: ['Roasted Split Chickpeas', 'Sun-dried Garlic', 'Ginger', 'Sacred Basil (Besobila)', 'Tena Adam', 'Cardamom', 'Cumin'],
      am: ['የተቆላ ሽምብራ', 'ነጭ ሽንኩርት', 'ዝንጅብል', 'በሶብላ', 'ጤና አዳም', 'ኮረሪማ', 'ከሙን'],
    },
    bestFor: {
      en: ['Shiro Tegabino (Clay Pot Stew)', 'Bozena Shiro (Shiro with Meat)', 'Siljo', 'Everyday Comfort Meals'],
      am: ['ተጋቢኖ ሽሮ', 'ቦዘና ሽሮ', 'ዕለታዊ የፆም እና የፍስክ ምግብ'],
    },
    flavorNotes: {
      en: ['Nutty Roasted Chickpea', 'Garlic Warmth', 'Herbal Basil Finish', 'Silky Velvety Body'],
      am: ['የተቆላ ሽምብራ ጣዕም', 'የነጭ ሽንኩርት መዓዛ', 'የበሶብላ ጠረን', 'ለስላሳ ውህደት'],
    },
    heatLevel: 1,
    prepTip: {
      en: 'Whisk smoothly into simmering water and onions in a clay pot; let simmer till fragrant bubbles appear.',
      am: 'በድስት ውስጥ ከሽንኩርትና ከፈላ ውሃ ጋር በመበጥበጥ እስኪንተከተክ ድረስ አብስሉት።',
    },
    prices: {
      '500g': { etb: 500, usd: 4 },
      '1kg': { etb: 1000, usd: 8 },
    },
    accentColor: '#C47A1F',
    badgeText: {
      en: 'Daily Essential',
      am: 'ዕለታዊ ምግብ',
    },
  },
  {
    id: 'mitmita',
    name: {
      en: 'Artisan Mitmita',
      am: 'ልዩ ሚጥሚጣ',
    },
    subtitle: {
      en: 'Fiery Fragrance & Mountain Cardamom',
      am: 'እሳታማ ቃጠሎና የኮረሪማ መዓዛ',
    },
    tagline: {
      en: 'Sun-blessed bird’s eye chilies roasted with whole cardamom seeds, cloves, and sea salt crystals.',
      am: 'የተመረጡ ቃሪያዎች ከኮረሪማ ፍሬዎች፣ ቅርንፉድ እና ጨው ጋር የተዘጋጁ።',
    },
    description: {
      en: 'Bold heat with floral notes of cardamom and cloves. Sprinkled on kitfo, eggs, or grilled meats, Mitmita is where fire meets fragrance.',
      am: 'ከፍተኛ ቃጠሎ ከኮረሪማ እና ቅርንፉድ ጥዑም መዓዛ ጋር። ለክትፎ፣ ለእንቁላል ወይም ለጥብስ ስጋ የሚሆን ፍጹም ምርጫ።',
    },
    heritageStory: {
      en: 'Ground from rare miniature fiery chili peppers dried naturally in the Ethiopian highlands, perfectly accented by hand-peeled cardamom pods.',
      am: 'ከኢትዮጵያ ደጋማ ቦታዎች በተሰበሰበ ሚጥሚጣ ቃሪያ እና ጥራት ባለው ኮረሪማ በእጅ የተዘጋጀ።',
    },
    ingredients: {
      en: ['African Bird’s Eye Chilies', 'Green & Black Cardamom', 'Whole Cloves', 'Cumin Seeds', 'Sea Salt'],
      am: ['የሚጥሚጣ ቃሪያ', 'ጥቁርና አረንጓዴ ኮረሪማ', 'ቅርንፉድ', 'ከሙን', 'ጨው'],
    },
    bestFor: {
      en: ['Kitfo (Traditional Minced Beef)', 'Gored Gored', 'Boiled Eggs & Ful Medames', 'Grilled Vegetables'],
      am: ['ክትፎ', 'ጎረድ ጎረድ', 'የቀቀል እንቁላል', 'ጥብስ ስጋ'],
    },
    flavorNotes: {
      en: ['Explosive Clean Heat', 'Camphorous Cardamom', 'Clove Sweetness', 'Savory Salinity'],
      am: ['ፈጣን እሳታማ ሙቀት', 'የኮረሪማ ሽታ', 'የቅርንፉድ ጣዕም', 'የጨው ሚዛን'],
    },
    heatLevel: 5,
    prepTip: {
      en: 'Use as a finishing seasoning or fold into warm spiced niter kibbeh for authentic Kitfo dip.',
      am: 'በክትፎ ቅቤ ውስጥ በመበጥበጥ ወይም በምግብ ላይ እንደ ማጣፈጫ ይጠቀሙበት።',
    },
    prices: {
      '500g': { etb: 1800, usd: 14 },
      '1kg': { etb: 3600, usd: 28 },
    },
    accentColor: '#C84B20',
    badgeText: {
      en: 'Spicy Masterpiece',
      am: 'እሳታማ ምርጫ',
    },
  },
  {
    id: 'genfo',
    name: {
      en: 'Atmit / Genfo Grains',
      am: 'የገንፎ እና አትሚት እህል',
    },
    subtitle: {
      en: 'Nourishing Wholesome Heritage Grains',
      am: 'አልሚ እና ገንቢ የባህል እህል',
    },
    tagline: {
      en: 'Heritage whole barley, roasted wheat, and nutrient-dense grains honoring generational wellness.',
      am: 'የተቆላ ገብስ፣ ስንዴ እና የተመረጡ የተፈጥሮ እህሎች ድብልቅ።',
    },
    description: {
      en: 'Nourishing, wholesome grain blends rooted in Habesha wellness traditions. A warm bowl of comfort that connects you to mornings back home.',
      am: 'በሀበሻ የጤና እና የጥንካሬ ባህል ላይ የተመሰረተ ገንቢ የእህል ድብልቅ። ወደ ሀገር ቤት የጧት ትውስታዎች የሚወስድዎት ሞቅ ያለ የፈውስ ምግብ።',
    },
    heritageStory: {
      en: 'Prepared specifically according to postpartum and morning wellness rituals, roasted carefully to ensure easy digestion and deep comforting aroma.',
      am: 'ለአራስ እና ለቤተሰብ ጧት ቁርስ በልዩ ጥንቃቄ የተቆላ እና የተፈጨ፣ ለሆድ የማይከብድ ፈዋሽ እህል።',
    },
    ingredients: {
      en: ['Whole Roasted Barley', 'Golden Wheat', 'Finger Millet (Dagussa)', 'Flaxseed (Telba)', 'Cardamom Hint'],
      am: ['የተቆላ ገብስ', 'ስንዴ', 'ዳጉሳ', 'ተልባ', 'ትንሽ ኮረሪማ'],
    },
    bestFor: {
      en: ['Traditional Morning Genfo', 'Warm Atmit Porridge', 'Postpartum Recovery', 'Wholesome Breakfast'],
      am: ['ባህላዊ የጧት ገንፎ', 'ሙቅ አትሚት', 'ለአራስ እናቶች', 'ገንቢ ቁርስ'],
    },
    flavorNotes: {
      en: ['Toasted Barley', 'Golden Nutty Grain', 'Earthy Wholesome Comfort', 'Satisfying Warmth'],
      am: ['የተቆላ ገብስ ጣዕም', 'የተፈጥሮ እህል መዓዛ', 'የጠገበ የቤት ሙቀት'],
    },
    heatLevel: 0,
    prepTip: {
      en: 'Stir vigorously into boiling water until thick; create a center well with spiced niter kibbeh and Berbere.',
      am: 'በፈላ ውሃ ውስጥ እስኪወፍር እያማሰሉ አብስለው መሀሉን ቆርቁረው በቅቤና በርበሬ ይቅረቡ።',
    },
    prices: {
      '500g': { etb: 600, usd: 5 },
      '1kg': { etb: 1200, usd: 10 },
    },
    accentColor: '#9E662E',
    badgeText: {
      en: 'Wellness & Comfort',
      am: 'ለጤና እና ጥንካሬ',
    },
  },
];
