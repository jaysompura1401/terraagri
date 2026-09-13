export interface ProductPack {
  size: string;
  volumeMlOrG?: number;
  price: number;
  mrp: number;
  discountText?: string;
  unitRate?: string;
  acreage?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
}

export interface Review {
  id: string;
  author: string;
  isVerified: boolean;
  location: string;
  cropInfo: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  helpfulCount: number;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  subTitle?: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  mrp: number;
  discountPercent: number;
  unitRate: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockText?: string;
  dispatchHub?: string;
  isOemDirect?: boolean;
  isGovtApproved?: boolean;
  cibCirNumber?: string;
  formulationType: string;
  images: string[];
  description: string;
  technicalComposition: string;
  technicalDetails?: string;
  targetPests: string[];
  suitableCrops: string[];
  applicationDosage: {
    sprayRate: string;
    waterVolume: string;
    waitingPeriod: string;
  };
  metrics: {
    activeRatio: string;
    dosage: string;
    preHarvest: string;
    targetPests?: string;
  };
  packs: ProductPack[];
  packSizes?: { size: string; price: number; mrp: number }[];
  selectedPackSize?: string;
  reviews: Review[];
  tags: string[];
  badges?: string[];
  npkRatio?: { n: number; p: number; k: number };
  batchCode?: string;
  mfgDate?: string;
  expDate?: string;
  mfgPlant?: string;
  hologramSecurityId?: string;
  qrPayload?: string;
}

export interface QrScanResult {
  rawContent: string;
  productId?: string;
  product?: Product;
  batchCode: string;
  isAuthentic: boolean;
  mfgDate: string;
  expDate: string;
  mfgPlant: string;
  cibCirNumber?: string;
  hologramId: string;
  tamperSealIntact: boolean;
  scanTimestamp: string;
  securityMessage: string;
}

export interface CartItem {
  productId?: string;
  product: Product;
  selectedPack?: ProductPack;
  selectedPackSize?: string;
  quantity: number;
  price?: number;
}

export interface TrackingStep {
  id: number;
  title: string;
  time: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  extraNote?: string;
  completed?: boolean;
}

export interface CourierPartner {
  name: string;
  photo: string;
  rating: number;
  dropCount?: string;
  tags?: string;
  phone: string;
  vehicle: string;
  distanceKm?: number;
  mapImage?: string;
}

export interface Order {
  id: string;
  orderNumber?: string;
  placedDate?: string;
  orderDate?: string;
  paymentMode?: string;
  upiReference?: string;
  deliveryWindow?: string;
  estimatedDeliveryTime?: string;
  deliveryAddress: string | {
    name: string;
    type: string;
    address: string;
    pincode: string;
    phone: string;
  };
  sprayWindowNote?: string;
  temperature?: string;
  status: 'on_the_way' | 'delivered' | 'processing' | 'out_for_delivery' | 'confirmed';
  batchCode?: string;
  steps?: TrackingStep[];
  timeline?: {
    title: string;
    time: string;
    description: string;
    completed: boolean;
  }[];
  courier?: CourierPartner;
  driver?: CourierPartner;
  items: CartItem[];
  totalAmount?: number;
  pricing?: {
    subtotal: number;
    discount: number;
    couponDiscount: number;
    deliveryFee: number;
    gstNote: string;
    total: number;
    savings: number;
  };
}

export interface MandiRate {
  crop: string;
  ratePerQtl: number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  market: string;
}

export interface FarmCropRecord {
  id: string;
  cropName: string;
  variety?: string;
  acres: number;
  sowingDate?: string;
  currentStage: 'Sowing / Seedling' | 'Vegetative Growth' | 'Flowering & Budding' | 'Fruit / Grain Filling' | 'Harvesting Ready';
  irrigationType: 'Drip' | 'Flood' | 'Sprinkler' | 'Rainfed';
  notes?: string;
}

export interface FarmerProfileData {
  farmerName: string;
  phone: string;
  totalAcres: number;
  village: string;
  district: string;
  state: string;
  soilType: string;
  soilPh: number;
  activeCrops: FarmCropRecord[];
}

export interface CropProblemDef {
  id: string;
  crop: string;
  category: 'Fungal Disease' | 'Insect Pest' | 'Nutritional Deficiency' | 'Weed Infestation';
  nameHindi: string;
  nameEnglish: string;
  scientificName: string;
  symptoms: string;
  symptomsHindi: string;
  urgency: 'Immediate Action (within 24-48 hrs)' | 'Moderate' | 'Preventive';
  recommendedProductIds: string[];
  recommendedBundleId?: string;
  standardDosage: string;
  photoUrl: string;
  whyThisTreatment: string;
}

export interface CarePlanStage {
  stageNumber: number;
  stageName: string;
  stageNameHindi: string;
  dayRange: string;
  status: 'upcoming' | 'current' | 'completed';
  vitalTasks: string[];
  recommendedProductIds: string[];
  sprayInstructions: string;
}

export interface CropCarePlan {
  id: string;
  cropName: string;
  season: string;
  totalDurationDays: number;
  overview: string;
  stages: CarePlanStage[];
}

export interface SmartBundle {
  id: string;
  title: string;
  titleHindi: string;
  crop: string;
  targetIssue: string;
  discountPercent: number;
  description: string;
  benefitHindi: string;
  productPacks: {
    productId: string;
    packSize: string;
    quantity: number;
  }[];
}
