import { Product, Order, MandiRate, CartItem } from '../types';

export const BRAND_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1UnyTFpj8eX0Xx2Bw9r7MHxcKAg1QbC6K2V7Bh0GFZY5GCEySJ3pKx6z8c4tRXC984MUfCsrxQ8pdddCrYYqxTwZhYjn6y8I_VqTmw9hupVPepGBE6Q71J2yIopTITYDq-k_TqSiT0AKQtC_U5JPbSAIu_4729ovi1CRU4gH8xPMgCyAI_mbLg9754-fr1IGEMKEbqMyEi2DnASxjexlKlXrFaCFGijpgh0dtbwjiFEoHYDZv7Xee5KKTAM';

export const PROFILE_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD20fKZnUFMO2GDVNQZ6D3knvddNZwvdtZJhkjXrTM9sffJtwLwQj3wXm4RvVdJp-hsSi2-3iS4TNE6OgemAEDlveeoAtZr6WTp7QOnnfmIX2m6wjSvwiNnWOSoZaPvg8AtITP0QNiTA5pR_xCSuD93113ZXupWXDwg3D0_FVUq6P1bBhcyQg3HQr4rl6T1mua_8bKDmRV8z4lmoapU_9WksHd1ldO-aqdEdFvReRGyUoyrONtd2LTVMQ';

export const PRODUCTS: Product[] = [
  {
    id: 'bayer-belt-expert',
    name: 'Bayer Belt Expert Insecticide',
    brand: 'Bayer CropScience',
    category: 'Crop Protection',
    subcategory: 'Insecticide',
    price: 899,
    mrp: 1050,
    discountPercent: 14,
    unitRate: '₹3.60/ml',
    rating: 4.8,
    reviewsCount: 1420,
    inStock: true,
    stockText: 'In Stock · Dispatches from Pune Central Agri-Hub in 24h',
    dispatchHub: 'Pune Central Agri-Hub',
    isOemDirect: true,
    isGovtApproved: true,
    cibCirNumber: 'CIB CIR-10842',
    batchCode: 'BAY-2026-X841',
    mfgDate: 'January 2026',
    expDate: 'December 2028',
    mfgPlant: 'Bayer CropScience Ltd., Vapi Chemical Zone, Gujarat',
    hologramSecurityId: 'HOL-BAY-884920',
    qrPayload: 'terraagri://verify?product=bayer-belt-expert&batch=BAY-2026-X841&holo=HOL-BAY-884920',
    formulationType: 'SC FORMULATION',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC400hLMCAtBU1A32m5DxJDCeyPOhomH--JeoFW5s8TXJ2OMe9djgryBKH1lyyXNxLvyZ1ET2wE8dz9-8Oir745Sb-0KbpawRzijUOnZ428wHrbqwY8mdFcmlPnjfkknXXJyNBIcLqPiAzjU0kkwbU2P_gz4bT-lXIWNRZstFtvl0l9Q8sxX0d_EBr4oRzeERO1p1Sstcpg2Bhwt-clCQxBqtd31_cipcn3Tizs25WDBhtEzpCe2WqarA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD3RF4Mi6dJ1_YvaHgm7I-xVqupTc3DHkxqaw73980w_BG8aU1GzdsBvgqc1rzKwIAr6m8BHIjsle_uAetpi40Z12SIVYIYUhiAhpjhF9hC1gRzgbjocYYVXP9IBE03JbU-BMwqeF2tZVvCQxGdS5AAf8hy0EYNK3a4thZ_FSG_erve9I5k4DZ-Zw8VJVBuGpH-l4sTJwyq58Ekd--XfIIIcqMTAcr8SCihZkZhU-vsYcx8JZ-M1qA1Qw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBo7V-BO2eAR6iHqo8zFG-RsMWCQ4kR8MRANPAvD89Ug8-YIRi47f2p9cRaHdGxuOIMJ_rpIkjawCwko7bicACohHakzcmbmRRa-jQiyLnkjtWc4hockf1Ig_lpYVujQWfnBx5Ee0I6ZA7ElEqC3-12kz49AfF1VMt6QRmuJiVldIYPIGyt4snqHQxjcC8f98cBn0hZPi6OMUaI3m5m0CU6w7mYTttQ0kpXPht0-cXF69JL0d4JDyo-Iw'
    ],
    description: 'Systemic & contact insecticide with dual active action (Flubendiamide + Thiacloprid)',
    technicalComposition: 'Flubendiamide 19.92% + Thiacloprid 19.92% w/w SC',
    technicalDetails: 'Belt Expert is an innovative compound formulation providing broad-spectrum systemic and contact control over chewing and sucking insect pests simultaneously.',
    targetPests: [
      'Tea mosquito bug',
      'Stem borer',
      'Leaf folder',
      'Fruit borer',
      'Diamond back moth (DBM)'
    ],
    suitableCrops: ['Cotton', 'Chilli', 'Paddy (Rice)', 'Pigeon Pea', 'Tea Plantations'],
    applicationDosage: {
      sprayRate: '0.3 ml to 0.5 ml per Litre of water',
      waterVolume: '150-200 Litres per Acre (60 ml to 80 ml per Acre)',
      waitingPeriod: '7 to 10 days before harvest'
    },
    metrics: {
      activeRatio: '1:1 Dual SC',
      dosage: '0.4 ml / L',
      preHarvest: '7-10 Days'
    },
    packs: [
      {
        size: '100 ml',
        volumeMlOrG: 100,
        price: 490,
        mrp: 580,
        discountText: '15% OFF',
        unitRate: '₹4.90/ml',
        acreage: 'Covers ~1.5 Acres'
      },
      {
        size: '250 ml',
        volumeMlOrG: 250,
        price: 899,
        mrp: 1050,
        discountText: '14% OFF',
        unitRate: '₹3.60/ml',
        acreage: 'Covers ~4.1 Acres',
        isPopular: true
      },
      {
        size: '500 ml',
        volumeMlOrG: 500,
        price: 1690,
        mrp: 1980,
        discountText: '15% OFF',
        unitRate: '₹3.38/ml',
        acreage: 'Covers ~8.3 Acres'
      },
      {
        size: '1 Litre',
        volumeMlOrG: 1000,
        price: 3150,
        mrp: 3800,
        discountText: '17% OFF',
        unitRate: '₹3.15/ml',
        acreage: 'Covers ~16.5 Acres',
        isBestValue: true
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Rameshwar Patil',
        isVerified: true,
        location: 'Vidarbha, Maharashtra',
        cropInfo: '4 Acres Cotton',
        rating: 5,
        date: '2d ago',
        comment:
          'Used on 4 acres of Cotton in Vidarbha during heavy bollworm infestation. Excellent pest control observed within 48 hours itself. Leaves became healthier and boll damage was prevented.',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDY4Ie9C3n5qKe6bydV8bj-5BYZZ9l9HmqwHc6lfdVhppht-3Cgf_bNvKBsNf4lGervPTMWaSas9Q65j-kQsCRLLbyRimyFPNPm0zjznO-_K2CUuXK4D8eKNtzJPOM-neP0TpL_JyGZs-1GEjNN_xVMW0lgcyuGQtQshnUH2W5Ke__rRIvGhUcq0TTtJd9_vXCW9MP3Uc1R8gsC5b78R_q0CwkO33pVA-7NruT6S5H9qV3_8c0V23Jnnw',
        helpfulCount: 84,
        badge: 'Verified Crop Harvest'
      },
      {
        id: 'rev-2',
        author: 'K. Srinivas Rao',
        isVerified: true,
        location: 'Guntur, Andhra Pradesh',
        cropInfo: '2.5 Acres Chilli',
        rating: 5,
        date: '1w ago',
        comment:
          'Thrips and fruit borer were controlled completely in one application. Fast delivery from TerraAgri hub and original Bayer sealed container.',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuA9MFtAksZSxm2LQzSNuwvwdGDpRZkCJzf4hGJmuDAquORGmFxPpsgAOBK7-o8Unw95D9P2H63QL8vuK1JcGf0p57zLWyMZ0uu6QtmS4r663ZZfIKJCkSUnvHX-WxOZqlAW4tM6QuLjAEcNUgS9XAgUrO_e3_ZQh5bRPHpzYcCc3_VR9vQ8n9SNpwa7kNZ59FmjZv3q8GeTXfk0Glvqx5HhoRpvVqgJqrs1QYcaPxEKXzORogfmU5heUg',
        helpfulCount: 62
      }
    ],
    tags: ['Cotton', 'Chilli', 'In Stock', 'Bayer Direct']
  },
  {
    id: 'syngenta-amistar-top',
    name: 'Amistar Top Fungicide',
    brand: 'Syngenta',
    category: 'Crop Protection',
    subcategory: 'Fungicide',
    price: 940,
    mrp: 1120,
    discountPercent: 16,
    unitRate: '₹4.70/ml',
    rating: 4.8,
    reviewsCount: 624,
    inStock: true,
    stockText: 'In Stock · Fast Dispatch in 24 hrs',
    isOemDirect: true,
    isGovtApproved: true,
    cibCirNumber: 'CIR-44120/2015-Azoxystrobin+Difenoconazole-981',
    batchCode: 'SYN-2026-T402',
    mfgDate: 'February 2026',
    expDate: 'January 2029',
    mfgPlant: 'Syngenta India Ltd., Santa Monica Works, Corlim, Goa',
    hologramSecurityId: 'HOL-SYN-559102',
    qrPayload: 'terraagri://verify?product=syngenta-amistar-top&batch=SYN-2026-T402&holo=HOL-SYN-559102',
    formulationType: 'SC FORMULATION',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKdBI56j0ZnNEVYpeovOy5lmufkFlJ7Ph-_SkKpVYkt4t7tnUBYB-VRFbMcdRxTprtqDZFSHxYMng2ed--99C1vyYZhvXXDa48t-V72EVIf0rOyn9zr14nuFZRI5YiQGBQL4I8jMQTL6AyGiN2-CxPQ8ayQY0usM6NxzSvnMi5PoBqXZoNvSrpmjEYFJkHIFWkUCy2N2891Qj7ljD5Q12W_u5JImCCq1_rUmAUcsk1i2WPGu_pB0pI6Q',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYpFTVh9kW0VX77sQJUJwIh_-rPpVGSGhSzpscRNmggKwpQ-_WhzFio8cKVN3aIVkNpd_qBHnPQBPjmrP7zx2fdB5HRIz2VpkkRT-Mz3FNC3DIJl90BrSRiseTHpPHQTuerQXa2aTc9wcsODH7kw0CM9mBF8VFGbSODM3OjY3zF6xm6nTVEC31g22YEplzh-dldGvd54u3_b57BgyxxTUDiJ_9MnSKoURMNc2Tfk3wgrJ85m4wIwxi4g'
    ],
    description: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC broad spectrum systemic fungicide',
    technicalComposition: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC',
    technicalDetails: 'Broad spectrum dual active systemic fungicide with translaminar movement providing unmatched cure and prevention.',
    targetPests: ['Sheath blight', 'Blast', 'Anthracnose', 'Powdery mildew', 'Early blight'],
    suitableCrops: ['Paddy (Rice)', 'Tomato', 'Chilli', 'Wheat', 'Maize'],
    applicationDosage: {
      sprayRate: '0.5 ml to 1 ml per Litre',
      waterVolume: '200 Litres per Acre',
      waitingPeriod: '5 to 7 days before harvest'
    },
    metrics: {
      activeRatio: 'Dual Active SC',
      dosage: '0.7 ml / L',
      preHarvest: '5-7 Days'
    },
    packs: [
      {
        size: '100 ml',
        volumeMlOrG: 100,
        price: 520,
        mrp: 610,
        discountText: '15% OFF',
        unitRate: '₹5.20/ml',
        acreage: 'Covers ~1 Acre'
      },
      {
        size: '200 ml',
        volumeMlOrG: 200,
        price: 940,
        mrp: 1120,
        discountText: '16% OFF',
        unitRate: '₹4.70/ml',
        acreage: 'Covers ~2 Acres',
        isPopular: true
      },
      {
        size: '500 ml',
        volumeMlOrG: 500,
        price: 2150,
        mrp: 2450,
        discountText: '12% OFF',
        unitRate: '₹4.30/ml',
        acreage: 'Covers ~5 Acres'
      },
      {
        size: '1 L',
        volumeMlOrG: 1000,
        price: 3990,
        mrp: 4600,
        discountText: '13% OFF',
        unitRate: '₹3.99/ml',
        acreage: 'Covers ~10 Acres',
        isBestValue: true
      }
    ],
    reviews: [],
    tags: ['Wheat', 'Paddy', 'Cotton Suitable', 'In Stock']
  },
  {
    id: 'coromandel-gromor',
    name: 'Gromor 14-35-14',
    brand: 'Coromandel',
    category: 'Crop Nutrition',
    subcategory: 'Fertilizer',
    price: 1470,
    mrp: 1750,
    discountPercent: 16,
    unitRate: '₹29.40/kg',
    rating: 4.9,
    reviewsCount: 1800,
    inStock: true,
    stockText: 'Only 4 bags left in Nashik Hub',
    dispatchHub: 'Nashik Hub',
    formulationType: 'NPK Granular',
    npkRatio: { n: 14, p: 35, k: 14 },
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC3uaJRpWYHvk5B4QW2KzWHOOTDuJOiMvyGl7JdRAhybineVd0DSGi1tAiV-cXCRPsWLN2X8CT1SMbf_pGWnzDzYcndmTE9OkN_rVvv6jFfFsTQB2KHlXtTWRI1H6M1dyVbdNG5b32U91-xtXOi8z9en7EyoQaCDah0hkkdWCqSK9R74YloLMabywYF1ZNtCluTju-37uuKHVG5npF1LHY__aBxFPrR7k9qhK7Lygh4iH3FYOdKX1a2Aw'
    ],
    description: 'Complex Phosphatic Soil Fertilizer with 14% N, 35% P, 14% K for vigorous root establishment',
    technicalComposition: 'NPK 14-35-14 Complex with water-soluble phosphorus',
    targetPests: [],
    suitableCrops: ['All Kharif Crops', 'Cotton', 'Soybean', 'Sugarcane', 'Paddy'],
    applicationDosage: {
      sprayRate: 'Basal Soil Application',
      waterVolume: '1-2 Bags per Acre based on soil report',
      waitingPeriod: 'At sowing / planting stage'
    },
    metrics: {
      activeRatio: '14:35:14 NPK',
      dosage: '50 kg / Acre',
      preHarvest: 'Basal'
    },
    packs: [
      {
        size: '50 kg Bag',
        volumeMlOrG: 50000,
        price: 1470,
        mrp: 1750,
        discountText: 'DBT Subsidized',
        unitRate: '₹29.40/kg',
        acreage: 'Covers ~1 Acre Basal',
        isBestValue: true
      }
    ],
    reviews: [],
    tags: ['NPK', 'All Kharif Crops', 'In Stock', 'Bulk Packs (5L+)']
  },
  {
    id: 'mahyco-hybrid-tomato',
    name: 'Mahyco Hybrid Tomato (Abhinav)',
    brand: 'Mahyco',
    category: 'Seeds & Saplings',
    subcategory: 'Vegetable Seeds',
    price: 320,
    mrp: 400,
    discountPercent: 20,
    unitRate: '₹32.00/g',
    rating: 4.9,
    reviewsCount: 840,
    inStock: true,
    stockText: 'Cold-Chain Preserved in Climate Hub',
    formulationType: 'F1 HYBRID SEED',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4QXvOKIyxtev1B2fudcjxnnmjbDQ0_rEfUcPbixhYtnV8YTuCPHbmzUo7nHRI9eVJkfmJVbjYr3jVDqyUROXUd7yBp5gVJ0WT0yV6zf1H0YQ_6Z08UYIojiuU2l4WLAaR-M1w7VltjY3EkG-fwbfvpjrlr9vBqO6h-5CyTPGYCZWUgJQfsvTbU6sD7bPX47vVzAhaIgLe7RPTJBGKCdblhY8fWzLwrj5YxUHTnS6qhppgUxYXyRWh0w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvE-KtvtMxou2iDMlZARhS7GLgOAHTt3xBRTbXFccwkQTgXEHwWFbFK3ODm6wR58_f9vkvZgbfzmBncrB3f5VxYR7bqU19mLi6-8bzAdGrMXJoe3G95E7Mk9ZQqqjItaINMwTv0F8yZbG4PTNwH2_RjRrzEw10Sk-EW82a-Cpr2h1S1xi9EgK7w3JTa1OvRnTuJt5U7008aFrY9z43wgQhlm_zB6Br-eoYEwhljKytKi-_HwfaM3p8eA'
    ],
    description: 'High-yield commercial hybrid tomato seeds, tolerant to TYLCV with 92% certified germination rate',
    technicalComposition: 'F1 Hybrid Solanum lycopersicum (Abhinav vigor line)',
    targetPests: ['Tolerant to Leaf Curl Virus (TYLCV) and Bacterial Wilt'],
    suitableCrops: ['Vegetables', 'Tomato'],
    applicationDosage: {
      sprayRate: 'Nursery sowing: 40-50g seeds per Acre',
      waterVolume: 'Transplanting in 25-30 days',
      waitingPeriod: '60-65 days to first harvest'
    },
    metrics: {
      activeRatio: '92% Germination',
      dosage: '40g / Acre',
      preHarvest: '65 Days'
    },
    packs: [
      {
        size: '10g packet',
        volumeMlOrG: 10,
        price: 320,
        mrp: 400,
        discountText: '20% OFF',
        unitRate: '₹32.00/g',
        acreage: 'Covers ~0.25 Acre',
        isPopular: true
      },
      {
        size: '50g box',
        volumeMlOrG: 50,
        price: 1450,
        mrp: 1800,
        discountText: '19% OFF',
        unitRate: '₹29.00/g',
        acreage: 'Covers ~1.25 Acres',
        isBestValue: true
      }
    ],
    reviews: [],
    tags: ['High Yield', 'In Stock', 'Vegetables']
  },
  {
    id: 'iffco-npk-soluble',
    name: 'IFFCO Soluble NPK 19:19:19',
    brand: 'IFFCO',
    category: 'Crop Nutrition',
    subcategory: 'Water Soluble',
    price: 165,
    mrp: 210,
    discountPercent: 21,
    unitRate: '₹165.00/kg',
    rating: 4.7,
    reviewsCount: 2400,
    inStock: true,
    stockText: 'FCO Grade Certified · Direct Supply',
    formulationType: '100% Water Soluble',
    npkRatio: { n: 19, p: 19, k: 19 },
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCn5C_IfmgZOU5raXNko5eaiwxUfjgY4gTkugGRay2TXapJGM2m-hXYqw-LcuVXMhOlvHAmiUX8d-ft9hyLRO2uO6UqHxq9fPz5eq8xiyxH-naSAU_KJw7dPvFQjLZAFPfmjFT2AcQwqC2U9es1kgVppUfpoKCsLnBM8ebLc7FcakJDRvHQSb0Drom1ceRmlEboPCDnYdC8CcgJJbkHyU65hPTAWPzXAwZfMpduZeVN2Tv36WnWBeK-Ew',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBo94f0nid9egyrlR-Q5wqbj0eeUdB_bxz-Te32R4n_Nw_rmrJ1k8dNN-HVGUhFkbBA6zZ7723vTI6XCGy_2NH1aEDXktGADbVRrl4OVTYcQrPpNZQxadSnGagRma1q_zk65o2uXHXUpCP5lgBo4cE4oBBbKufisRdiVP58efB5hh0GpWFrgfuB8rkrdM8izFYQqwS-m55ehV-0BIHFoHDnI30-ScWjPQRWJcWQ6OA9Z1qI63luGC4kkA'
    ],
    description: '100% water-soluble foliar & drip fertigation fertilizer with balanced N-P-K 1:1:1 ratio',
    technicalComposition: 'Total Nitrogen 19%, Neutral Ammonium Citrate Soluble Phosphate 19%, Water Soluble Potash 19%',
    targetPests: [],
    suitableCrops: ['All Crops', 'Vegetables', 'Cotton', 'Sugarcane', 'Citrus Fruits'],
    applicationDosage: {
      sprayRate: '4-5g per Litre for foliar spray',
      waterVolume: '2-3 kg per Acre via drip irrigation',
      waitingPeriod: 'Vegetative to flowering stage'
    },
    metrics: {
      activeRatio: '19:19:19 FCO',
      dosage: '4 g / L',
      preHarvest: 'All season'
    },
    packs: [
      {
        size: '1kg pack',
        volumeMlOrG: 1000,
        price: 165,
        mrp: 210,
        discountText: '21% OFF',
        unitRate: '₹165.00/kg',
        acreage: 'Covers ~0.5 Acre Foliar',
        isPopular: true
      },
      {
        size: '5kg pack',
        volumeMlOrG: 5000,
        price: 780,
        mrp: 950,
        discountText: '18% OFF',
        unitRate: '₹156.00/kg',
        acreage: 'Covers ~2.5 Acres Drip',
        isBestValue: true
      }
    ],
    reviews: [],
    tags: ['Organic Grade', 'In Stock', 'All Crops']
  },
  {
    id: 'upl-saaf-fungicide',
    name: 'Saaf Fungicide',
    brand: 'UPL Agro',
    category: 'Crop Protection',
    subcategory: 'Fungicide',
    price: 390,
    mrp: 480,
    discountPercent: 19,
    unitRate: '₹0.78/g',
    rating: 4.7,
    reviewsCount: 2400,
    inStock: true,
    stockText: 'Top Seller in Western Maharashtra',
    isGovtApproved: true,
    formulationType: 'WP FORMULATION',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3L9qxRNBrbMUUfJXVYaHNnI67I9OhsihtCdr_oA_58EgfZAgXtufZfgPXb_i3viwntNQ3HZ-LWuJSRyYVDGC8KGxB7XicDqHdmgHtu77WRC3ca7_eDnmyf13-_MBgwNEeNEXN3TV54qDL38iLAPIkf1hj-uj_9QERMx82U8lUge30CO022UAb2WGwDxxt4Dv143u3a4rHvfcUBfbrL286KtL-L7db8EIsBh5DTYR1d1IVlp-Oid42Vw'
    ],
    description: 'Proven dual action contact & systemic fungicide (Carbendazim 12% + Mancozeb 63% WP)',
    technicalComposition: 'Carbendazim 12% + Mancozeb 63% WP',
    targetPests: ['Fruit rot', 'Tikka disease', 'Blast', 'Leaf spot', 'Rust'],
    suitableCrops: ['Groundnut', 'Paddy', 'Chilli', 'Cotton', 'Vegetables'],
    applicationDosage: {
      sprayRate: '2g per Litre of water',
      waterVolume: '300-400g per Acre',
      waitingPeriod: '7-14 days before harvest'
    },
    metrics: {
      activeRatio: 'Dual WP',
      dosage: '2.0 g / L',
      preHarvest: '7-14 Days'
    },
    packs: [
      {
        size: '250g Pouch',
        volumeMlOrG: 250,
        price: 210,
        mrp: 260,
        discountText: '19% OFF',
        unitRate: '₹0.84/g',
        acreage: 'Covers ~0.75 Acre'
      },
      {
        size: '500g Pouch',
        volumeMlOrG: 500,
        price: 390,
        mrp: 480,
        discountText: '19% OFF',
        unitRate: '₹0.78/g',
        acreage: 'Covers ~1.5 Acres',
        isPopular: true
      },
      {
        size: '1kg Pouch',
        volumeMlOrG: 1000,
        price: 740,
        mrp: 910,
        discountText: '19% OFF',
        unitRate: '₹0.74/g',
        acreage: 'Covers ~3 Acres',
        isBestValue: true
      }
    ],
    reviews: [],
    tags: ['Top Seller', 'In Stock', 'Cotton Suitable']
  },
  {
    id: 'tata-rallis-anant',
    name: 'Anant Insecticide',
    brand: 'Tata Rallis',
    category: 'Crop Protection',
    subcategory: 'Insecticide',
    price: 580,
    mrp: 640,
    discountPercent: 9,
    unitRate: '₹2.32/g',
    rating: 4.6,
    reviewsCount: 890,
    inStock: true,
    stockText: 'Fast Action Sucking Pest Guard',
    formulationType: 'WG GRANULES',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAheVkIo1tUYQBlMv6EIj8akgyqe-SeSeR-RPCZpEqja0gVjK_-i0tSTT9lxdQaxJbQASXjoSbs3sTFWbwfXnhRd3wSflGrNL41AfVYv0IfI4wWmtNdJdkgNUCIUJik7CoRFZp3398D64TC2OBYpfOUSEgKbWCCDaTqk0GaXZ0xXsxgWeiMcx_3AY2h8ju-7BBhd2m-dnMOkyaCwyW-aInggcCDfi9zWwRMGzW4LzrzSTP8KaoQaKHwGA'
    ],
    description: 'Thiamethoxam 25% WG broad spectrum systemic insecticide for rapid knock-down',
    technicalComposition: 'Thiamethoxam 25% WG',
    targetPests: ['Jassids', 'Aphids', 'Whitefly', 'Green leafhopper', 'Brown plant hopper'],
    suitableCrops: ['Cotton', 'Paddy', 'Chilli', 'Okra', 'Citrus'],
    applicationDosage: {
      sprayRate: '0.3g to 0.5g per Litre',
      waterVolume: '80g to 100g per Acre',
      waitingPeriod: '14 days before harvest'
    },
    metrics: {
      activeRatio: '25% WG',
      dosage: '0.4 g / L',
      preHarvest: '14 Days'
    },
    packs: [
      {
        size: '100g Granules',
        volumeMlOrG: 100,
        price: 250,
        mrp: 280,
        discountText: '11% OFF',
        unitRate: '₹2.50/g',
        acreage: 'Covers ~1 Acre'
      },
      {
        size: '250g Granules',
        volumeMlOrG: 250,
        price: 580,
        mrp: 640,
        discountText: '9% OFF',
        unitRate: '₹2.32/g',
        acreage: 'Covers ~2.5 Acres',
        isPopular: true
      },
      {
        size: '500g Granules',
        volumeMlOrG: 500,
        price: 1090,
        mrp: 1220,
        discountText: '11% OFF',
        unitRate: '₹2.18/g',
        acreage: 'Covers ~5 Acres',
        isBestValue: true
      }
    ],
    reviews: [],
    tags: ['Fast Action', 'In Stock', 'Cotton Suitable']
  },
  {
    id: 'neptune-battery-sprayer',
    name: '16L Battery Farm Sprayer',
    brand: 'Neptune',
    category: 'Drip & Sprayers',
    subcategory: 'Sprayers',
    price: 2190,
    mrp: 2800,
    discountPercent: 22,
    unitRate: '₹2,190/unit',
    rating: 4.8,
    reviewsCount: 1100,
    inStock: true,
    stockText: '12V/12Ah Heavy Duty · 6-Hour Battery Life',
    formulationType: 'EQUIPMENT',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkoGmiI6eTPIbPudhTJJ8fg8Mn65eKeJ2nBgFP9z5kTE01ZfK_BWYi2FeOKpHYVyRpMopxJ54768syQqmb2roWVkvLZkqebjzZ1SAeL8cBsM7d7gFRVmic4u5ICNvOpl0VDVITs7AJyxjcXiX7MAaJM09o_S9OJ9AM5bx0GdQc0JJSquumcQgtsx1z0tu5BzZvFRuJuFMrY7afDmQlwG6eMOG9UoAYkB2uTiX5sNQdOWoCU0VjCYuGcg'
    ],
    description: 'Heavy-duty 16L knapsack sprayer with brass lance, dual atomizing nozzles, and 12V rechargeable battery',
    technicalComposition: 'High-density Polyethylene Tank with Brass Lance & Diaphragm Pump',
    targetPests: [],
    suitableCrops: ['All Crops', 'Cotton', 'Sugarcane', 'Horticulture', 'Vegetables'],
    applicationDosage: {
      sprayRate: 'Continuous pressure 0.2 - 0.45 MPa',
      waterVolume: '16L Tank capacity',
      waitingPeriod: '6 Hours continuous spray on single charge'
    },
    metrics: {
      activeRatio: '12V / 12Ah',
      dosage: '16 L Tank',
      preHarvest: '6h Battery'
    },
    packs: [
      {
        size: '16L Standard',
        volumeMlOrG: 16000,
        price: 2190,
        mrp: 2800,
        discountText: '22% OFF',
        unitRate: '₹2,190/unit',
        acreage: 'Sprays 3-4 Acres per charge',
        isPopular: true
      }
    ],
    reviews: [],
    tags: ['Sprayer', '12V/12Ah', 'In Stock']
  },
  {
    id: 'fmc-coragen-insecticide',
    name: 'Coragen Rynaxypyr (60ml)',
    brand: 'FMC India',
    category: 'Crop Protection',
    subcategory: 'Insecticide',
    price: 790,
    mrp: 890,
    discountPercent: 11,
    unitRate: '₹13.16/ml',
    rating: 4.9,
    reviewsCount: 3100,
    inStock: true,
    stockText: '100% Original Hologram Authenticated',
    isOemDirect: true,
    cibCirNumber: 'CIR-65100/2018-Chlorantraniliprole(SC)-894',
    batchCode: 'FMC-2026-C60',
    mfgDate: 'February 2026',
    expDate: 'January 2029',
    mfgPlant: 'FMC India Pvt Ltd., Panoli Agrochem Zone, Gujarat',
    hologramSecurityId: 'HOL-FMC-009941',
    qrPayload: 'terraagri://verify?product=fmc-coragen-insecticide&batch=FMC-2026-C60&holo=HOL-FMC-009941',
    formulationType: 'SC FORMULATION',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRreBKvsbvSpph8x4c6IO0xdR09QBuxw2Qkwe72SAQmMVxc80n5UTgwh06stG5qzM1Yf9q3m8A18oJilj-RVVemm7_wdkwm-B4IioLsguLg_Hwt96pVI39F2Snbclk5mAKpwgLgNkzFW54-CIkCE5wEEh8ZGDjjQNs_rHHWgn_Fg9LEcJAS4KMQmNgZdaV3sXbMb4uAUwXRw7TeQhK8MmwSIRFhiDCzBUx_yVnicN9zAiJ2JMajV1KFQ'
    ],
    description: 'Chlorantraniliprole 18.5% SC long-duration borer defense for Sugarcane, Corn & Paddy',
    technicalComposition: 'Chlorantraniliprole 18.5% w/w SC (Rynaxypyr active)',
    targetPests: ['Early shoot borer', 'Top borer', 'Stem borer', 'Fall armyworm'],
    suitableCrops: ['Sugarcane', 'Corn', 'Paddy', 'Soybean', 'Cotton'],
    applicationDosage: {
      sprayRate: '0.4 ml per Litre or 60ml per Acre',
      waterVolume: '150 Litres per Acre',
      waitingPeriod: 'Long duration 21-day protection'
    },
    metrics: {
      activeRatio: '18.5% SC',
      dosage: '0.4 ml / L',
      preHarvest: '21 Days'
    },
    packs: [
      {
        size: '60ml',
        volumeMlOrG: 60,
        price: 790,
        mrp: 890,
        discountText: '11% OFF',
        unitRate: '₹13.16/ml',
        acreage: 'Covers ~1 Acre Sugarcane',
        isPopular: true
      },
      {
        size: '150ml',
        volumeMlOrG: 150,
        price: 1890,
        mrp: 2150,
        discountText: '12% OFF',
        unitRate: '₹12.60/ml',
        acreage: 'Covers ~2.5 Acres',
        isBestValue: true
      }
    ],
    reviews: [],
    tags: ['Sugarcane', 'Corn', 'In Stock']
  },
  {
    id: 'dhanuka-dhanzyme-gold',
    name: 'Dhanzyme Gold Bio-Stimulant',
    brand: 'Dhanuka',
    category: 'Crop Nutrition',
    subcategory: 'Bio-Stimulant',
    price: 440,
    mrp: 520,
    discountPercent: 15,
    unitRate: '₹110.00/kg',
    rating: 4.8,
    reviewsCount: 1500,
    inStock: true,
    stockText: 'Organic Seaweed Extract Certified',
    formulationType: 'BIO GRANULES',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAFFhrqypnN8X8CQhK-POtlfYYK22OlXFSxKp90q6L4jHKFL2Rw0iNZD2BVKM_mlHngUMilCuWDmQgPq5gD5SvyTkr-rGBM_KDIhZ3FY5dzp8V25jplf5hLOK1QxQwkEIMHqlMAoxXcxaFdNENhR4PSKnA983gfUenel8qvcqeKzJoHbNbZOP3fwQi9xt39lcoemVrLna-Y5TjwQ5iNFoWGcdccU9mWpyPdYEoJpF6Cwp_lD9SusFQ-Qg'
    ],
    description: 'Ascophyllum nodosum biological seaweed formulation boosting root branching & nutrient uptake',
    technicalComposition: 'Bio-active Seaweed Extract Granules with Organic Carbon & Micro-nutrients',
    targetPests: [],
    suitableCrops: ['All Crops', 'Cotton', 'Chilli', 'Vegetables', 'Paddy'],
    applicationDosage: {
      sprayRate: 'Soil Application: 4kg per Acre',
      waterVolume: 'Mix with basal fertilizer or soil broadcast',
      waitingPeriod: 'At planting and vegetative stage'
    },
    metrics: {
      activeRatio: '100% Bio Extract',
      dosage: '4 kg / Acre',
      preHarvest: 'Organic'
    },
    packs: [
      {
        size: '1kg',
        volumeMlOrG: 1000,
        price: 135,
        mrp: 160,
        discountText: '16% OFF',
        unitRate: '₹135.00/kg',
        acreage: 'Covers ~0.25 Acre'
      },
      {
        size: '4kg',
        volumeMlOrG: 4000,
        price: 440,
        mrp: 520,
        discountText: '15% OFF',
        unitRate: '₹110.00/kg',
        acreage: 'Covers ~1 Acre Soil',
        isPopular: true
      },
      {
        size: '10kg',
        volumeMlOrG: 10000,
        price: 1050,
        mrp: 1250,
        discountText: '16% OFF',
        unitRate: '₹105.00/kg',
        acreage: 'Covers ~2.5 Acres',
        isBestValue: true
      }
    ],
    reviews: [],
    tags: ['All Crops', 'Bio', 'Organic Certified', 'In Stock']
  }
];

export const INITIAL_CART_ITEMS: CartItem[] = [
  {
    productId: 'bayer-belt-expert',
    product: PRODUCTS[0],
    selectedPack: PRODUCTS[0].packs[1], // 250ml
    quantity: 2
  },
  {
    productId: 'mahyco-hybrid-tomato',
    product: PRODUCTS[3],
    selectedPack: PRODUCTS[3].packs[0], // 10g
    quantity: 3
  },
  {
    productId: 'iffco-npk-soluble',
    product: PRODUCTS[4],
    selectedPack: PRODUCTS[4].packs[0], // 1kg
    quantity: 1
  }
];

export const ACTIVE_ORDER: Order = {
  id: 'order-89241',
  orderNumber: 'TAG-89241',
  placedDate: '14 Oct 2024, 10:30 AM',
  paymentMode: 'UPI Autopay',
  upiReference: 'UPI/84920481028',
  deliveryWindow: 'Tomorrow, 4:00 PM – 7:00 PM',
  deliveryAddress: {
    name: 'Ramesh Patil',
    type: 'Farm House',
    address: 'Field Gate 2, Survey 142, Dindori Road, Pimpalgaon Baswant',
    pincode: 'Nashik, Maharashtra 422003',
    phone: '+91 98234 XXXXX'
  },
  sprayWindowNote: 'Wind < 8 km/h expected Friday morning (Ready)',
  temperature: '22.4°C (Safe for chemical potency)',
  status: 'on_the_way',
  batchCode: 'Batch #44-A',
  steps: [
    {
      id: 1,
      title: 'Order Confirmed',
      time: '14 Oct, 10:30 AM',
      description: 'Payment verified & inventory allocated from Central Cold-Hub.',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Dispatched from Pune Hub',
      time: '14 Oct, 04:15 PM',
      description: 'Sealed in climate-controlled agri-crate #PN-982.',
      status: 'completed'
    },
    {
      id: 3,
      title: 'In Transit - Nashik Sorting Center',
      time: 'ACTIVE',
      description: 'Carried via AgroExpress Logistics Line-Haul. Parcel scanned at Ozar Toll Plaza.',
      status: 'active',
      extraNote: 'Temperature monitored at 22.4°C (Safe for chemical potency)'
    },
    {
      id: 4,
      title: 'Out for Delivery to Farm Address',
      time: 'Pending',
      description: 'Assigned to localized rural delivery partner.',
      status: 'pending'
    },
    {
      id: 5,
      title: 'Delivered & Verified via OTP',
      time: 'Pending',
      description: 'Tamper-evident seal inspection at your porch.',
      status: 'pending'
    }
  ],
  courier: {
    name: 'Santosh Shinde',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCCL5C4fbkl6a6SHcKFdsqcaMrSP5UUmSnsOlgWDY-_d7evLQlOH8WfEXPftu3NspyWA280PLUnkNkxzveKd7KR1gIaQhijw1LI9nfzbJqjOKQz6OO2BFjJaVc9vwKvZT23WYVr8Km77f4_Vml7-mGiTT4IZVtDMfjPE-Aio_ATvNFFjntJMViPcTF9J74O-ZmlGdzia9Z3nocrug5aIQxh2jRkBX8ZA8-uei2ZMbYXs78s1uPznLUnbQ',
    rating: 4.9,
    dropCount: '640+ farm drops',
    tags: 'Vaccinated • Agri-Chemical Safety Certified',
    phone: '+91 98000 12345',
    vehicle: 'Mahindra Bolero Maxi Truck (MH 15 AB 4812)',
    distanceKm: 14.8,
    mapImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ6k8NZZ8Yb3mln_5e21nQYEvZ8XunDIg7C_iKnWqRPq0pQkgBW19I25gcaEHCZxHeV9Qr2zIuLpPP90GAkp5hq05PgBjA4nwJsWjG4YRllkqVKT01N1yU-O52kUb0NNIew1XX2fxFcRXVPjuvs3cT5KbRFSMQVBEgAA-XWfNgmYZOfjN0vIXO-5cnuqTB8EWxp9dS72jOIjIeKa8KkkzRxWwntXrUxMUvO7j1B29wLgLYe2PAL7kRMg'
  },
  items: [
    {
      productId: 'bayer-belt-expert',
      product: PRODUCTS[0],
      selectedPack: PRODUCTS[0].packs[1],
      quantity: 2
    },
    {
      productId: 'mahyco-hybrid-tomato',
      product: PRODUCTS[3],
      selectedPack: PRODUCTS[3].packs[0],
      quantity: 3
    }
  ],
  pricing: {
    subtotal: 2573,
    discount: 427,
    couponDiscount: 350,
    deliveryFee: 0,
    gstNote: 'Included (5% Agri Cess)',
    total: 2573,
    savings: 777
  }
};

PRODUCTS.forEach((p) => {
  if (!p.packSizes) {
    p.packSizes = p.packs?.map((pk) => ({ size: pk.size, price: pk.price, mrp: pk.mrp })) || [
      { size: 'Standard', price: p.price, mrp: p.mrp }
    ];
  }
});

export const MOCK_ORDERS: Order[] = [
  {
    id: 'AGRI-8921-44',
    orderNumber: 'AGRI-8921-44',
    orderDate: 'Today, 09:30 AM',
    placedDate: 'Today, 09:30 AM',
    estimatedDeliveryTime: '04:30 PM',
    status: 'out_for_delivery',
    deliveryAddress: 'Field Gate 2, Survey 142, Dindori Road, Nashik, Maharashtra 422003',
    items: [
      {
        product: PRODUCTS[1],
        selectedPackSize: '200 ml',
        quantity: 2,
        price: 940
      },
      {
        product: PRODUCTS[2],
        selectedPackSize: '50 kg Bag',
        quantity: 1,
        price: 1470
      }
    ],
    totalAmount: 3350,
    driver: {
      name: 'Kailash Shinde',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      vehicle: 'Mahindra Bolero Maxi Truck (MH 15 EG 4402)',
      phone: '+91 98220 14421'
    },
    timeline: [
      {
        title: 'Order Confirmed',
        time: '09:30 AM',
        description: 'Verified OEM batch dispense at Nashik Central Agro-Hub.',
        completed: true
      },
      {
        title: 'Quality & Seed/Chems Govt QR Tested',
        time: '02:15 PM',
        description: 'Barcoded tamper-evident seal verified by quality officer.',
        completed: true
      },
      {
        title: 'Out for Field Gate Delivery',
        time: '03:45 PM',
        description: 'Rural delivery van MH 15 EG 4402 en route.',
        completed: false
      },
      {
        title: 'Arriving at Tractor Shed',
        time: '04:30 PM',
        description: 'Farm gate handover and OTP verification.',
        completed: false
      }
    ]
  },
  {
    id: 'AGRI-8412-10',
    orderNumber: 'AGRI-8412-10',
    orderDate: '3 days ago',
    placedDate: '10 Oct 2024',
    estimatedDeliveryTime: 'Delivered',
    status: 'delivered',
    deliveryAddress: 'Field Gate 2, Survey 142, Dindori Road, Nashik, Maharashtra 422003',
    items: [
      {
        product: PRODUCTS[0],
        selectedPackSize: '250 ml',
        quantity: 1,
        price: 899
      },
      {
        product: PRODUCTS[3],
        selectedPackSize: '10g packet',
        quantity: 3,
        price: 320
      }
    ],
    totalAmount: 1859,
    driver: {
      name: 'Santosh Shinde',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      vehicle: 'Mahindra Bolero Maxi Truck (MH 15 AB 4812)',
      phone: '+91 98000 12345'
    },
    timeline: [
      {
        title: 'Delivered Successfully',
        time: '12 Oct, 05:10 PM',
        description: 'Received by Ramesh Patil at farm gate.',
        completed: true
      }
    ]
  }
];

export const MANDI_RATES: MandiRate[] = [
  { crop: 'Soybean', ratePerQtl: 4850, change: '+₹120', trend: 'up', market: 'Nashik APMC' },
  { crop: 'Onion (Red)', ratePerQtl: 1820, change: '+₹65', trend: 'up', market: 'Lasalgaon Mandi' },
  { crop: 'Cotton (Medium Staple)', ratePerQtl: 7150, change: '-₹40', trend: 'down', market: 'Nagpur APMC' },
  { crop: 'Wheat (Lokwan)', ratePerQtl: 2680, change: '+₹15', trend: 'up', market: 'Pune APMC' },
  { crop: 'Tomato (Hybrid)', ratePerQtl: 1450, change: '+₹90', trend: 'up', market: 'Pimpalgaon Mandi' },
  { crop: 'Maize (Yellow)', ratePerQtl: 2240, change: '0', trend: 'stable', market: 'Dhule APMC' },
  { crop: 'Chana (Gram)', ratePerQtl: 5900, change: '+₹80', trend: 'up', market: 'Akola APMC' }
];

export const CATEGORIES = [
  {
    id: 'seeds',
    name: 'Seeds & Saplings',
    subtext: '180+ Types',
    icon: 'psychiatry',
    filterTag: 'Seeds'
  },
  {
    id: 'nutrition',
    name: 'Crop Nutrition',
    subtext: 'NPK, Urea',
    icon: 'compost',
    filterTag: 'Nutrition'
  },
  {
    id: 'protection',
    name: 'Crop Protection',
    subtext: 'Bio & Chems',
    icon: 'shield',
    filterTag: 'Protection'
  },
  {
    id: 'irrigation',
    name: 'Drip & Sprayers',
    subtext: 'Irrigation',
    icon: 'water_drop',
    filterTag: 'Sprayers'
  },
  {
    id: 'animal-feed',
    name: 'Animal Feed',
    subtext: 'Nutrition',
    icon: 'pets',
    filterTag: 'Feed'
  }
];

export const CROP_FILTERS = [
  { id: 'all', name: 'All Crops', color: 'bg-primary' },
  { id: 'cotton', name: 'Cotton', color: 'bg-secondary' },
  { id: 'paddy', name: 'Paddy / Rice', color: 'bg-tertiary' },
  { id: 'sugarcane', name: 'Sugarcane', color: 'bg-secondary-fixed-dim' },
  { id: 'vegetables', name: 'Vegetables', color: 'bg-primary' },
  { id: 'citrus', name: 'Citrus Fruits', color: 'bg-tertiary-fixed-dim' }
];

export interface SampleQrLabel {
  title: string;
  badge: string;
  batchCode: string;
  productId: string;
  qrCodeString: string;
  description: string;
  isAuthentic: boolean;
}

export const SAMPLE_QR_LABELS: SampleQrLabel[] = [
  {
    title: 'FMC Coragen Hologram QR',
    badge: '100% Genuine OEM',
    batchCode: 'FMC-2026-C60',
    productId: 'fmc-coragen-insecticide',
    qrCodeString: 'terraagri://verify?product=fmc-coragen-insecticide&batch=FMC-2026-C60&holo=HOL-FMC-009941',
    description: 'Chlorantraniliprole 18.5% SC Long-duration Borer Guard',
    isAuthentic: true
  },
  {
    title: 'Bayer Belt Expert Seal QR',
    badge: 'Govt CIB Approved',
    batchCode: 'BAY-2026-X841',
    productId: 'bayer-belt-expert',
    qrCodeString: 'terraagri://verify?product=bayer-belt-expert&batch=BAY-2026-X841&holo=HOL-BAY-884920',
    description: 'Flubendiamide + Thiacloprid Dual SC formulation',
    isAuthentic: true
  },
  {
    title: 'Syngenta Amistar Top QR',
    badge: 'Dual Active Fungicide',
    batchCode: 'SYN-2026-T402',
    productId: 'syngenta-amistar-top',
    qrCodeString: 'terraagri://verify?product=syngenta-amistar-top&batch=SYN-2026-T402&holo=HOL-SYN-559102',
    description: 'Azoxystrobin + Difenoconazole SC broad spectrum',
    isAuthentic: true
  },
  {
    title: 'Mahyco Abhinav Tomato Seed QR',
    badge: 'National Seeds Certified',
    batchCode: 'MAH-2026-S910',
    productId: 'mahyco-hybrid-tomato',
    qrCodeString: 'terraagri://verify?product=mahyco-hybrid-tomato&batch=MAH-2026-S910&holo=SEED-GOV-99210',
    description: '92% Germination vigor guarantee',
    isAuthentic: true
  },
  {
    title: 'IFFCO 19:19:19 FCO Seal QR',
    badge: 'FCO Certified Grade',
    batchCode: 'IFF-2026-F191',
    productId: 'iffco-npk-soluble',
    qrCodeString: 'terraagri://verify?product=iffco-npk-soluble&batch=IFF-2026-F191&holo=FCO-IFF-191919',
    description: '100% Water soluble drip fertigation fertilizer',
    isAuthentic: true
  },
  {
    title: 'Suspected Counterfeit / Unknown QR',
    badge: 'Warning: Fake Alert',
    batchCode: 'FAKE-UNVERIFIED-99',
    productId: 'unverified-counterfeit',
    qrCodeString: 'unauthorized://spurious-batch?code=FAKE-UNVERIFIED-99&serial=UNKNOWN',
    description: 'Simulates detection of unverified or blacklisted batch code',
    isAuthentic: false
  }
];
