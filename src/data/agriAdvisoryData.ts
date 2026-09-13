import { CropProblemDef, CropCarePlan, SmartBundle, FarmerProfileData } from '../types';

export const INITIAL_FARM_DATA: FarmerProfileData = {
  farmerName: 'Ramesh Patil',
  phone: '+91 98234 56789',
  totalAcres: 14.5,
  village: 'Dindori',
  district: 'Nashik',
  state: 'Maharashtra',
  soilType: 'Medium Black (काली मिट्टी)',
  soilPh: 7.2,
  activeCrops: [
    {
      id: 'crop-1',
      cropName: 'Cotton',
      variety: 'Bollgard II Hybrid',
      acres: 5.0,
      sowingDate: '15 June 2026',
      currentStage: 'Flowering & Budding',
      irrigationType: 'Drip',
      notes: 'Monsoon regular; monitoring for pink bollworm & thrips.'
    },
    {
      id: 'crop-2',
      cropName: 'Tomato',
      variety: 'Mahyco Abhinav',
      acres: 3.5,
      sowingDate: '10 July 2026',
      currentStage: 'Vegetative Growth',
      irrigationType: 'Drip',
      notes: 'Staking completed; preventative spray for early blight.'
    },
    {
      id: 'crop-3',
      cropName: 'Paddy / Rice',
      variety: 'Indrayani Basmati Selection',
      acres: 4.0,
      sowingDate: '01 July 2026',
      currentStage: 'Vegetative Growth',
      irrigationType: 'Flood',
      notes: 'Water standing 2-3 inches; tillering active.'
    },
    {
      id: 'crop-4',
      cropName: 'Soybean',
      variety: 'JS 335',
      acres: 2.0,
      sowingDate: '20 June 2026',
      currentStage: 'Flowering & Budding',
      irrigationType: 'Rainfed',
      notes: 'Pod formation starting soon; NPK foliar planned.'
    }
  ]
};

export const CROP_PROBLEMS: CropProblemDef[] = [
  {
    id: 'cotton-bollworm',
    crop: 'Cotton',
    category: 'Insect Pest',
    nameEnglish: 'Pink & American Bollworm Attack',
    nameHindi: 'गुलाबी और अमेरिकन सुंडी (Bollworm)',
    scientificName: 'Helicoverpa armigera & Pectinophora gossypiella',
    symptoms: 'Larval feeding inside squares, rosette flowers, bored holes on bolls with excreta, premature boll shed.',
    symptomsHindi: 'फूलों और टिंडों में छेद, फूल बंद रहना (गुलाब जैसा फूल), टिंडे गिरना और अंदर से रुई खराब होना।',
    urgency: 'Immediate Action (within 24-48 hrs)',
    recommendedProductIds: ['bayer-belt-expert', 'fmc-coragen-insecticide'],
    recommendedBundleId: 'bundle-cotton-pest',
    standardDosage: '0.4 ml / Litre of water (60-80 ml / Acre)',
    photoUrl: 'https://images.unsplash.com/photo-1594488554904-8975a5e9547d?auto=format&fit=crop&w=600&q=80',
    whyThisTreatment: 'Flubendiamide and Chlorantraniliprole paralyze pest ryanodine receptors within hours, completely preventing boll destruction.'
  },
  {
    id: 'cotton-thrips-whitefly',
    crop: 'Cotton',
    category: 'Insect Pest',
    nameEnglish: 'Thrips, Whitefly & Jassids (Sucking Pests)',
    nameHindi: 'रस चूसक कीट: थ्रिप्स, सफेद मक्खी और हरा तेला',
    scientificName: 'Thrips tabaci & Bemisia tabaci',
    symptoms: 'Upward curling of leaves, silvery streaks underneath, honeydew excretion causing black sooty mold, stunted crop vigor.',
    symptomsHindi: 'पत्तियों का ऊपर की ओर मुड़ना (कप जैसा आकार), पत्तियों के नीचे चांदी जैसी चमक, पत्तों का पीला पड़ना।',
    urgency: 'Immediate Action (within 24-48 hrs)',
    recommendedProductIds: ['tata-rallis-anant', 'bayer-belt-expert'],
    recommendedBundleId: 'bundle-cotton-sucking',
    standardDosage: '0.4 g / Litre (80-100 g / Acre)',
    photoUrl: 'https://images.unsplash.com/photo-1599818816949-a1b7e4a1599d?auto=format&fit=crop&w=600&q=80',
    whyThisTreatment: 'Thiamethoxam 25% WG gives rapid translaminar knock-down to hidden nymph colonies underneath the leaves.'
  },
  {
    id: 'tomato-early-late-blight',
    crop: 'Tomato',
    category: 'Fungal Disease',
    nameEnglish: 'Early Blight & Fruit Collar Rot',
    nameHindi: 'टमाटर की अगेती झुलसा और फल सड़न (Blight)',
    scientificName: 'Alternaria solani',
    symptoms: 'Target-like brown concentric rings on lower leaves, yellow halo surrounding spots, black sunken spots near fruit stem.',
    symptomsHindi: 'निचली पत्तियों पर गहरे भूरे गोल छल्ले (Target spots), पत्तियां पीली होकर सूखना, फल के डंठल के पास कालापन।',
    urgency: 'Immediate Action (within 24-48 hrs)',
    recommendedProductIds: ['syngenta-amistar-top', 'upl-saaf-fungicide'],
    recommendedBundleId: 'bundle-tomato-defense',
    standardDosage: '1.0 ml / Litre of water (200 ml / Acre)',
    photoUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80',
    whyThisTreatment: 'Azoxystrobin + Difenoconazole halts spore germination and heals existing lesions rapidly across the leaf canopy.'
  },
  {
    id: 'tomato-leaf-curl',
    crop: 'Tomato',
    category: 'Insect Pest',
    nameEnglish: 'Leaf Curl Virus transmitted by Whitefly',
    nameHindi: 'पत्ती मरोड़ रोग (Leaf Curl) और सफेद मक्खी',
    scientificName: 'Tomato Yellow Leaf Curl Begomovirus (TYLCV)',
    symptoms: 'Severe downward/upward leaf curling, thick leathery puckered leaves, pale yellow veins, bushy stunted plants.',
    symptomsHindi: 'पत्तियों का सिकुड़ना, पौधे का कद छोटा रह जाना, फूल गिरना और नया फल न लगना।',
    urgency: 'Immediate Action (within 24-48 hrs)',
    recommendedProductIds: ['tata-rallis-anant', 'mahyco-hybrid-tomato'],
    standardDosage: '0.5 g / Litre (100 g / Acre)',
    photoUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985b?auto=format&fit=crop&w=600&q=80',
    whyThisTreatment: 'Controlling vector whitefly stops secondary virus spread to healthy adjacent plants.'
  },
  {
    id: 'paddy-sheath-blight',
    crop: 'Paddy / Rice',
    category: 'Fungal Disease',
    nameEnglish: 'Sheath Blight & Brown Spot',
    nameHindi: 'धान का शीथ ब्लाइट (तने की सड़न) और भूरा धब्बा',
    scientificName: 'Rhizoctonia solani',
    symptoms: 'Elliptical greyish-green lesions with dark brown borders on leaf sheaths near water line; plants lodge under high humidity.',
    symptomsHindi: 'पानी की सतह के पास तनों पर सांप की केंचुली जैसे सफेद-भूरे धब्बे, पौधे का कमजोर होकर गिरना।',
    urgency: 'Immediate Action (within 24-48 hrs)',
    recommendedProductIds: ['syngenta-amistar-top', 'upl-saaf-fungicide'],
    recommendedBundleId: 'bundle-paddy-protector',
    standardDosage: '200 ml / Acre in 200 Litres water',
    photoUrl: 'https://images.unsplash.com/photo-1536617621972-602555543cbe?auto=format&fit=crop&w=600&q=80',
    whyThisTreatment: 'Amistar Top moves systemically inside the sheath tissue, creating long-lasting protection against fungal hyphae.'
  },
  {
    id: 'paddy-stem-borer',
    crop: 'Paddy / Rice',
    category: 'Insect Pest',
    nameEnglish: 'Yellow Stem Borer & Leaf Folder',
    nameHindi: 'धान का तना छेदक (Stem Borer) और पत्ता लपेटक',
    scientificName: 'Scirpophaga incertulas & Cnaphalocrocis medinalis',
    symptoms: 'Dead hearts at tillering stage, white heads (empty white panicles) at flowering, leaves folded longitudinally.',
    symptomsHindi: 'कल्ले निकलने के समय बीच की पत्ती सूखना (Dead heart), बालियों में दाना न बनना (White head), पत्तों का मुड़ना।',
    urgency: 'Immediate Action (within 24-48 hrs)',
    recommendedProductIds: ['fmc-coragen-insecticide', 'bayer-belt-expert'],
    recommendedBundleId: 'bundle-paddy-protector',
    standardDosage: '60 ml / Acre in 150-200 Litres water',
    photoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    whyThisTreatment: 'Coragen Rynaxypyr provides up to 21 days residual systemic defense against internal larvae burrowing.'
  },
  {
    id: 'soybean-yellow-mosaic',
    crop: 'Soybean',
    category: 'Insect Pest',
    nameEnglish: 'Yellow Mosaic Virus (Whitefly Vector) & Girdle Beetle',
    nameHindi: 'सोयाबीन का पीला मोज़ेक और गर्डल बीटल (चक्र भृंग)',
    scientificName: 'Soybean Yellow Mosaic Virus & Obereopsis brevis',
    symptoms: 'Bright yellow patches alternating with green on trifoliate leaves; parallel ring cuts around stems leading to wilting.',
    symptomsHindi: 'पत्तियों पर पीले-हरे धब्बे (पीला मोज़ेक), तने पर छल्ले जैसे कट लगना, ऊपर की शाखाओं का सूखना।',
    urgency: 'Immediate Action (within 24-48 hrs)',
    recommendedProductIds: ['tata-rallis-anant', 'bayer-belt-expert'],
    standardDosage: '0.4 g / Litre (80-100 g / Acre)',
    photoUrl: 'https://images.unsplash.com/photo-1599818816949-a1b7e4a1599d?auto=format&fit=crop&w=600&q=80',
    whyThisTreatment: 'Knocks down the whitefly vector before viral replication spreads across the whole field.'
  },
  {
    id: 'sugarcane-borer-deficiency',
    crop: 'Sugarcane',
    category: 'Insect Pest',
    nameEnglish: 'Early Shoot Borer & Internode Borer',
    nameHindi: 'गन्ने का कंसुआ (Early Shoot Borer) और पोरिया छेदक',
    scientificName: 'Chilo infuscatellus',
    symptoms: 'Central shoot wilts and dries into dead heart that pulls out easily with offensive odor; dead tillers reduce stool count.',
    symptomsHindi: 'जमाव के बाद बीच की गोभ सूखना (Dead heart), बदबू आना और आसानी से बाहर खिंच आना, गन्ने के कल्ले कम होना।',
    urgency: 'Immediate Action (within 24-48 hrs)',
    recommendedProductIds: ['fmc-coragen-insecticide', 'coromandel-gromor'],
    standardDosage: '150 ml / Acre drenched along cane furrow',
    photoUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    whyThisTreatment: 'Furrow drenching ensures uptake through nodal roots, delivering protection throughout cane tillering.'
  },
  {
    id: 'general-nutrient-yellowing',
    crop: 'All Crops',
    category: 'Nutritional Deficiency',
    nameEnglish: 'Nitrogen-Phosphorus Deficiency & Weak Root Growth',
    nameHindi: 'पौधों का पीलापन, कमजोर जड़ें और बढ़वार रुकना',
    scientificName: 'N-P-K Macro & Micronutrient Starvation',
    symptoms: 'Older leaves turning uniform pale yellow, purplish tinge on stem, poor tiller/branch count, delayed flowering.',
    symptomsHindi: 'नीचे की पत्तियां पीली पड़ना, तना बैंगनी दिखना, फसल की बढ़वार थम जाना, जड़ों का विकास न होना।',
    urgency: 'Moderate',
    recommendedProductIds: ['iffco-npk-soluble', 'coromandel-gromor'],
    standardDosage: '4-5 g / Litre foliar spray OR 2-3 kg / Acre via drip',
    photoUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
    whyThisTreatment: '100% water soluble 19:19:19 provides instant cellular absorption within 4 hours, restoring chlorophyll.'
  }
];

export const SMART_BUNDLES: SmartBundle[] = [
  {
    id: 'bundle-cotton-pest',
    title: 'Cotton Bollworm & Thrips Total Shield Kit',
    titleHindi: 'कपास सुंडी और थ्रिप्स संपूर्ण सुरक्षा किट',
    crop: 'Cotton',
    targetIssue: 'Bollworm, Sucking Pests & Foliar Nutrition',
    discountPercent: 18,
    description: 'Comprehensive 3-stage defense kit protecting 2.5 Acres of cotton during peak flowering & boll formation.',
    benefitHindi: 'सुंडी का तुरंत खात्मा + पत्तों पर नई चमक + 18% तक की छूट',
    productPacks: [
      { productId: 'bayer-belt-expert', packSize: '250 ml', quantity: 1 },
      { productId: 'tata-rallis-anant', packSize: '250g Granules', quantity: 1 },
      { productId: 'iffco-npk-soluble', packSize: '1kg pack', quantity: 2 }
    ]
  },
  {
    id: 'bundle-tomato-defense',
    title: 'Tomato Blight & Growth Booster Combo',
    titleHindi: 'टमाटर झुलसा मुक्ति व पैदावार बूस्टर कॉम्बो',
    crop: 'Tomato',
    targetIssue: 'Early Blight, Fruit Spot & Vigorous Flowering',
    discountPercent: 15,
    description: 'Scientifically matched fungicide and water-soluble fertigation pack for 2 Acres of vegetable harvest.',
    benefitHindi: 'फलों पर दाग-धब्बे बंद + चमकदार टमाटर और मजबूत जड़ें',
    productPacks: [
      { productId: 'syngenta-amistar-top', packSize: '200 ml', quantity: 1 },
      { productId: 'upl-saaf-fungicide', packSize: '500g Pouch', quantity: 1 },
      { productId: 'iffco-npk-soluble', packSize: '1kg pack', quantity: 1 }
    ]
  },
  {
    id: 'bundle-paddy-protector',
    title: 'Paddy Borer & Sheath Blight Protection Kit',
    titleHindi: 'धान तना छेदक व शीथ ब्लाइट सम्पूर्ण रक्षक किट',
    crop: 'Paddy / Rice',
    targetIssue: 'Stem Borer, Sheath Blight & Tillering Vigor',
    discountPercent: 16,
    description: 'Dual chemical combination preventing dead-hearts and fungal rot across 2 Acres of paddy tillering.',
    benefitHindi: '21 दिनों की लंबी सुरक्षा + ज्यादा कल्ले और भरी हुई बालियां',
    productPacks: [
      { productId: 'fmc-coragen-insecticide', packSize: '60 ml', quantity: 2 },
      { productId: 'syngenta-amistar-top', packSize: '200 ml', quantity: 1 }
    ]
  },
  {
    id: 'bundle-foliar-nutrition',
    title: 'Kharif Soil Basal & Foliar Nutrition Pack',
    titleHindi: 'खरीफ संपूर्ण पोषण व बेसल खाद पैक',
    crop: 'All Crops',
    targetIssue: 'Basal root setup, leaf greenness & fast growth',
    discountPercent: 12,
    description: 'High-grade phosphatic complex fertilizer backed with 100% soluble foliar feed for all crops.',
    benefitHindi: 'जड़ों की गहरी पकड़ + संतुलित पोषण और तेज बढ़वार',
    productPacks: [
      { productId: 'coromandel-gromor', packSize: '50 kg Bag', quantity: 1 },
      { productId: 'iffco-npk-soluble', packSize: '5kg pack', quantity: 1 }
    ]
  }
];

export const CROP_CARE_PLANS: CropCarePlan[] = [
  {
    id: 'plan-cotton',
    cropName: 'Cotton',
    season: 'Kharif',
    totalDurationDays: 160,
    overview: 'Complete scientific schedule for high-yielding Bt Cotton from sowing to final picking.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Basal Soil & Sowing Stage',
        stageNameHindi: 'बुवाई व बेसल खाद अवस्था',
        dayRange: 'Day 0 - 20',
        status: 'completed',
        vitalTasks: [
          'Apply DAP or Gromor 14-35-14 basal fertilizer in furrow',
          'Maintain 90cm x 60cm row-to-row spacing',
          'Inspect seedling emergence and gap filling within 10 days'
        ],
        recommendedProductIds: ['coromandel-gromor'],
        sprayInstructions: 'Basal application at 50 kg / Acre along sowing line.'
      },
      {
        stageNumber: 2,
        stageName: 'Vegetative & Sucking Pest Window',
        stageNameHindi: 'वानस्पतिक बढ़वार व रस चूसक कीट रोकथाम',
        dayRange: 'Day 20 - 55',
        status: 'completed',
        vitalTasks: [
          'Scout leaf undersides for thrips, jassids and aphids',
          'Foliar spray with balanced NPK 19:19:19 to stimulate side branches',
          'First inter-cultivation weeding'
        ],
        recommendedProductIds: ['tata-rallis-anant', 'iffco-npk-soluble'],
        sprayInstructions: 'Spray Anant (Thiamethoxam) at 80-100g / Acre + NPK 19:19:19 at 1kg / Acre.'
      },
      {
        stageNumber: 3,
        stageName: 'Square & Flowering Stage (Active Now)',
        stageNameHindi: 'फूल-कलियां (Squares) व सुंडी सुरक्षा अवस्था (वर्तमान)',
        dayRange: 'Day 55 - 90',
        status: 'current',
        vitalTasks: [
          'Crucial stage: Install pheromone traps for pink bollworm monitoring (8/acre)',
          'Prevent rosette flower formation and square shedding',
          'Foliar spray of Belt Expert or Coragen before larvae enter bolls'
        ],
        recommendedProductIds: ['bayer-belt-expert', 'fmc-coragen-insecticide'],
        sprayInstructions: 'Spray Bayer Belt Expert @ 0.4ml/L (70ml/Acre) in 180 Litres water.'
      },
      {
        stageNumber: 4,
        stageName: 'Boll Development & Weight Boosting',
        stageNameHindi: 'टिंडे भरना व वजन बढ़ाने की अवस्था',
        dayRange: 'Day 90 - 130',
        status: 'upcoming',
        vitalTasks: [
          'Prevent fungal leaf spot and boll rot during late monsoon showers',
          'Spray Potash (0:0:50) or Amistar Top if weather remains cloudy',
          'Keep irrigation light and uniform'
        ],
        recommendedProductIds: ['syngenta-amistar-top', 'iffco-npk-soluble'],
        sprayInstructions: 'Amistar Top @ 200 ml / Acre for clean, spot-free bolls.'
      },
      {
        stageNumber: 5,
        stageName: 'Boll Bursting & Clean Harvest',
        stageNameHindi: 'टिंडे खिलना व कपास चुनाई',
        dayRange: 'Day 130 - 160',
        status: 'upcoming',
        vitalTasks: [
          'Stop chemical sprays 14 days before first picking',
          'Pick clean dry lint avoiding leaf trash',
          'Store in clean moisture-free farm storage'
        ],
        recommendedProductIds: [],
        sprayInstructions: 'No chemical spray required. Only moisture management.'
      }
    ]
  },
  {
    id: 'plan-tomato',
    cropName: 'Tomato',
    season: 'Kharif / Rabi',
    totalDurationDays: 130,
    overview: 'Intensive vegetable management guide from nursery transplanting to bumper fruit picking.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Transplanting & Root Establishment',
        stageNameHindi: 'पौध रोपाई व जड़ स्थापना',
        dayRange: 'Day 0 - 20',
        status: 'completed',
        vitalTasks: [
          'Transplant 25-day healthy nursery seedlings in raised beds',
          'Drench root zone with Saaf fungicide to prevent seedling damping-off',
          'Start light drip irrigation'
        ],
        recommendedProductIds: ['upl-saaf-fungicide', 'mahyco-hybrid-tomato'],
        sprayInstructions: 'Saaf drenching @ 2g / Litre water around root zone.'
      },
      {
        stageNumber: 2,
        stageName: 'Vegetative & Staking Stage (Active Now)',
        stageNameHindi: 'शाखाओं का विकास व स्टेकिंग (वर्तमान)',
        dayRange: 'Day 20 - 45',
        status: 'current',
        vitalTasks: [
          'Complete bamboo / string staking to support heavy canopy',
          'Prevent whitefly (Leaf Curl vector) and early blight spots',
          'Fertigate with NPK 19:19:19 via drip system'
        ],
        recommendedProductIds: ['syngenta-amistar-top', 'tata-rallis-anant', 'iffco-npk-soluble'],
        sprayInstructions: 'Amistar Top @ 1ml/L + Anant @ 0.4g/L in 150L water per acre.'
      },
      {
        stageNumber: 3,
        stageName: 'Flowering & Fruit Setting Stage',
        stageNameHindi: 'फूल आना व फल सेटिंग अवस्था',
        dayRange: 'Day 45 - 75',
        status: 'upcoming',
        vitalTasks: [
          'Protect flowers from fruit borer (Helicoverpa)',
          'Ensure adequate Boron and Calcium to prevent blossom end rot',
          'Spray Belt Expert to safeguard tender fruit buttons'
        ],
        recommendedProductIds: ['bayer-belt-expert', 'fmc-coragen-insecticide'],
        sprayInstructions: 'Bayer Belt Expert @ 0.4ml/L (60-80ml/acre).'
      },
      {
        stageNumber: 4,
        stageName: 'Fruit Ripening & Continuous Harvest',
        stageNameHindi: 'फल पकना व नियमित तुड़ाई',
        dayRange: 'Day 75 - 130',
        status: 'upcoming',
        vitalTasks: [
          'Maintain 5-7 days pre-harvest safe spray interval',
          'Grade tomatoes at farm gate into Grade A & B for mandi dispatch'
        ],
        recommendedProductIds: ['neptune-battery-sprayer'],
        sprayInstructions: 'Spray only as emergency curative; respect 5-day harvest safety window.'
      }
    ]
  },
  {
    id: 'plan-paddy',
    cropName: 'Paddy / Rice',
    season: 'Kharif',
    totalDurationDays: 125,
    overview: 'High-tillering paddy roadmap focused on blast resistance, sheath blight prevention and bold grain panicles.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Puddling, Basal Fertilizer & Transplanting',
        stageNameHindi: 'लेव लगाना, बेसल खाद व रोपाई',
        dayRange: 'Day 0 - 15',
        status: 'completed',
        vitalTasks: [
          'Puddle field thoroughly; incorporate Gromor 14-35-14 basal fertilizer',
          'Transplant 2-3 seedlings per hill at 20cm x 15cm spacing',
          'Keep 2 inches standing water'
        ],
        recommendedProductIds: ['coromandel-gromor'],
        sprayInstructions: 'Basal application @ 50kg bag per acre.'
      },
      {
        stageNumber: 2,
        stageName: 'Active Tillering & Stem Borer Watch (Active Now)',
        stageNameHindi: 'कल्ले फूटना व तना छेदक निगरानी (वर्तमान)',
        dayRange: 'Day 15 - 45',
        status: 'current',
        vitalTasks: [
          'Watch for dead hearts caused by yellow stem borer',
          'Foliar spray of Coragen or Belt Expert at first symptom',
          'Maintain weed-free standing water layer'
        ],
        recommendedProductIds: ['fmc-coragen-insecticide', 'bayer-belt-expert'],
        sprayInstructions: 'Coragen @ 60ml / Acre in 150 Litres clean water.'
      },
      {
        stageNumber: 3,
        stageName: 'Panicle Initiation & Sheath Blight Defense',
        stageNameHindi: 'गभोट अवस्था व शीथ ब्लाइट सुरक्षा',
        dayRange: 'Day 45 - 75',
        status: 'upcoming',
        vitalTasks: [
          'Humid rainy weather favors sheath blight; inspect lower leaf sheaths',
          'Spray Amistar Top or Saaf fungicide before panicle emergence'
        ],
        recommendedProductIds: ['syngenta-amistar-top', 'upl-saaf-fungicide'],
        sprayInstructions: 'Amistar Top @ 200 ml / Acre.'
      },
      {
        stageNumber: 4,
        stageName: 'Milking, Grain Filling & Harvest',
        stageNameHindi: 'दूधिया अवस्था, दाना भराव व कटाई',
        dayRange: 'Day 75 - 125',
        status: 'upcoming',
        vitalTasks: [
          'Drain standing water 10 days before scheduled combine harvest',
          'Check grain moisture level (14-16% ideal for mandi sale)'
        ],
        recommendedProductIds: [],
        sprayInstructions: 'No chemicals needed during grain hardening.'
      }
    ]
  }
];

// Product "Why This Product" agronomic highlights
export const PRODUCT_WHY_MAP: Record<string, {
  suitableForHindi: string;
  keyBenefitsHindi: string[];
  bestAppliedAt: string;
  idealTankMix: string;
}> = {
  'bayer-belt-expert': {
    suitableForHindi: 'कपास, मिर्च और दलहन फसलों में सुंडी (Bollworm/Fruit Borer) और थ्रिप्स के तत्काल खात्मे के लिए।',
    keyBenefitsHindi: [
      'सुंडी और रस चूसक कीट दोनों पर एक साथ दोहरा वार (Flubendiamide + Thiacloprid)',
      'स्प्रे के 2 घंटे बाद ही कीट पत्तियां खाना बंद कर देते हैं',
      'पौधे को लंबी 14-18 दिनों की सुरक्षा मिलती है'
    ],
    bestAppliedAt: 'फूल और कलियां बनते समय पहली सुंडी या थ्रिप्स दिखते ही।',
    idealTankMix: 'NPK 19:19:19 या किसी भी सामान्य फफूंदनाशक के साथ मिला सकते हैं।'
  },
  'syngenta-amistar-top': {
    suitableForHindi: 'टमाटर, धान, मिर्च और सब्जियों में फफूंद जनित रोगों (झुलसा, शीथ ब्लाइट, डाउनी मिल्ड्यू) से संपूर्ण मुक्ति के लिए।',
    keyBenefitsHindi: [
      'दोहरी सिस्टमिक क्रिया — बीमारी को रोकता भी है और ठीक भी करता है',
      'पत्तियों पर नई हरी चमक लाता है जिससे प्रकाश संश्लेषण तेज होता है',
      'बारिश होने पर भी दवा धुलती नहीं (Translaminar action)'
    ],
    bestAppliedAt: 'पत्तियों पर भूरे या पीले धब्बे दिखते ही या बीमारी से बचाव के लिए।',
    idealTankMix: 'कीटनाशक के साथ सुरक्षित मिलाया जा सकता है। क्षारीय घोल से बचें।'
  },
  'coromandel-gromor': {
    suitableForHindi: 'कपास, धान, गन्ना और सोयाबीन की बुवाई के समय जड़ों को मजबूत बनाने और शुरुआती फुटाव के लिए।',
    keyBenefitsHindi: [
      '35% फॉस्फेट जो जड़ों को जमीन में 2 गुना गहराई तक फैलाता है',
      '14% नाइट्रोजन और 14% पोटाश संतुलित बढ़वार और तने को मजबूती देते हैं',
      'सरकारी सब्सिडी वाला FCO प्रमाणित दानेदार खाद'
    ],
    bestAppliedAt: 'बुवाई या रोपाई के समय बेसल डोज के रूप में जमीन में डालें।',
    idealTankMix: 'मिट्टी में सीधे उपयोग करें। बीज से 5 सेमी दूरी पर डालें।'
  },
  'mahyco-hybrid-tomato': {
    suitableForHindi: 'व्यावसायिक टमाटर की खेती — ज्यादा उत्पादन, कड़क फल और लंबी दूरी के परिवहन के लिए।',
    keyBenefitsHindi: [
      '92% प्रमाणित अंकुरण क्षमता (Germination Rate)',
      'पत्ती मरोड़ वायरस (TYLCV) और उकठा रोग के प्रति प्राकृतिक सहनशीलता',
      '80-90 ग्राम वजन के चमकदार लाल कड़क फल जो 5-7 दिन तक खराब नहीं होते'
    ],
    bestAppliedAt: 'खरीफ व रबी सीजन में नर्सरी तैयार करने हेतु।',
    idealTankMix: 'बीज पहले से उपचारित हैं; सीधे प्रो-ट्रे या क्यारियों में बोएं।'
  },
  'iffco-npk-soluble': {
    suitableForHindi: 'सभी फसलों में पीलापन दूर करने, कल्ले बढ़ाने और फूल-फल की सेटिंग तेज करने के लिए।',
    keyBenefitsHindi: [
      '100% पानी में घुलनशील — ड्रिप या स्प्रे नोजल कभी जाम नहीं होता',
      'नाइट्रोजन, फॉस्फोरस और पोटाश का आदर्श 1:1:1 संतुलित अनुपात',
      'स्प्रे के 4 घंटे के भीतर पत्तियां पोषक तत्व सोख लेती हैं'
    ],
    bestAppliedAt: 'वानस्पतिक बढ़वार (Vegetative) और फूल आने से ठीक पहले।',
    idealTankMix: 'अमीस्टार टॉप, बेल्ट एक्सपर्ट या साफ फफूंदनाशक के साथ उत्तम अनुकूल।'
  },
  'upl-saaf-fungicide': {
    suitableForHindi: 'मूंगफली, धान, कपास और सब्जियों में जड़ सड़न, टिक्का रोग और पत्ती धब्बा की किफायती रोकथाम।',
    keyBenefitsHindi: [
      'कॉन्टैक्ट + सिस्टमिक (Carbendazim + Mancozeb) दोहरी सुरक्षा',
      'बीज उपचार, जड़ ड्रेन्चिंग और पत्तियों पर छिड़काव तीनों के लिए उपयुक्त',
      'फसलों को जिंक और मैंगनीज का अतिरिक्त पोषण भी प्रदान करता है'
    ],
    bestAppliedAt: 'रोग के लक्षण दिखने पर या बीज बोने से पहले बीज उपचार में।',
    idealTankMix: 'कीटनाशकों के साथ आसानी से घुलनशील।'
  },
  'tata-rallis-anant': {
    suitableForHindi: 'कपास, मिर्च और धान में रस चूसने वाले कीटों (सफेद मक्खी, थ्रिप्स, माहू, तेला) का तुरंत सफाया।',
    keyBenefitsHindi: [
      'WG दानेदार रूप — हवा में धूल नहीं उड़ती, तुरंत पानी में घुल जाता है',
      'पत्तियों के आर-पार जाकर छुपे हुए कीड़ों को भी मारता है (Translaminar)',
      'फसल पर लंबे समय तक सुरक्षा कवच बनाए रखता है'
    ],
    bestAppliedAt: 'पत्तियों के मुड़ने या नीचे सफेद मक्खी दिखते ही छिड़काव करें।',
    idealTankMix: 'NPK 19:19:19 के साथ मिलाकर स्प्रे करने पर दोहरा फायदा मिलता है।'
  },
  'neptune-battery-sprayer': {
    suitableForHindi: 'बिना थके 1 दिन में 8-10 एकड़ खेत में दवा और खाद का आसान और एकसमान छिड़काव।',
    keyBenefitsHindi: [
      '12V/12Ah बड़ी बैटरी — 1 बार चार्ज करने पर लगातार 6 घंटे चलता है',
      'मजबूत ब्रास लांस और 4 तरह के स्पेशल नोजल (फव्वारा + तेज धार)',
      'कम पीठ दर्द — गद्देदार बैक-रेस्ट और हल्का वजन'
    ],
    bestAppliedAt: 'कीटनाशक, फफूंदनाशक और लिक्विड खाद छिड़कने के लिए।',
    idealTankMix: 'उपयोग के बाद पंप को साफ पानी से 2 मिनट चलाकर साफ करें।'
  },
  'fmc-coragen-insecticide': {
    suitableForHindi: 'गन्ना, मक्का, धान और कपास में तना छेदक (Stem Borer) और फॉल आर्मीवर्म के सबसे मजबूत खात्मे के लिए।',
    keyBenefitsHindi: [
      'Rynaxypyr फॉर्मूलेशन — भारत का सबसे भरोसेमंद बोरर रक्षक',
      '21 दिनों तक नई पत्तियों और तने को अंदर से सुरक्षित रखता है',
      'मित्र कीटों (मधुमक्खी, मकड़ी) के लिए सुरक्षित'
    ],
    bestAppliedAt: 'तना छेदक के पतंगे या पहले अंडे दिखते ही छिड़कें।',
    idealTankMix: 'किसी भी फफूंदनाशक या टॉनिक के साथ मिलाया जा सकता है।'
  }
};
