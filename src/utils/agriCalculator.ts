import { Product, ProductPack } from '../types';

export interface DosageCalculationResult {
  product: Product;
  cropName: string;
  acreage: number;
  perAcreRequired: number; // in ml or g
  unit: 'ml' | 'g' | 'kg';
  totalRequired: number; // in ml or g
  waterLitersRequired: number;
  recommendedPack: ProductPack;
  recommendedPacksCount: number;
  totalEstimatedCost: number;
  tankFills16L: number;
  applicationGuidance: string;
}

/**
 * Parses dosage string from product applicationDosage or metric
 * e.g., "0.4 ml per Litre of water (60-80 ml per Acre)" -> 70 ml
 * e.g., "200 ml / Acre" -> 200 ml
 * e.g., "50 kg / Acre" -> 50 kg
 */
export function calculateProductDosage(
  product: Product,
  acreage: number,
  cropName: string = 'Cotton'
): DosageCalculationResult {
  const safeAcreage = Math.max(0.25, Number(acreage) || 1);
  let perAcreRequired = 100;
  let unit: 'ml' | 'g' | 'kg' = 'ml';
  let waterPerAcre = 150;

  // Specific heuristic per product id
  if (product.id === 'bayer-belt-expert') {
    perAcreRequired = 75; // ml
    unit = 'ml';
    waterPerAcre = 180;
  } else if (product.id === 'fmc-coragen-insecticide') {
    perAcreRequired = 60; // ml
    unit = 'ml';
    waterPerAcre = 150;
  } else if (product.id === 'syngenta-amistar-top') {
    perAcreRequired = 200; // ml
    unit = 'ml';
    waterPerAcre = 200;
  } else if (product.id === 'tata-rallis-anant') {
    perAcreRequired = 100; // g
    unit = 'g';
    waterPerAcre = 150;
  } else if (product.id === 'upl-saaf-fungicide') {
    perAcreRequired = 350; // g
    unit = 'g';
    waterPerAcre = 180;
  } else if (product.id === 'iffco-npk-soluble') {
    perAcreRequired = 1000; // g (1 kg)
    unit = 'g';
    waterPerAcre = 200;
  } else if (product.id === 'coromandel-gromor') {
    perAcreRequired = 50; // 50 kg bag
    unit = 'kg';
    waterPerAcre = 0; // basal
  } else if (product.id === 'mahyco-hybrid-tomato') {
    perAcreRequired = 40; // 40 g seeds
    unit = 'g';
    waterPerAcre = 0;
  } else {
    // Default fallback parsing
    if (product.metrics.dosage.includes('kg')) {
      perAcreRequired = 5;
      unit = 'kg';
    } else if (product.metrics.dosage.includes('g')) {
      perAcreRequired = 250;
      unit = 'g';
    } else {
      perAcreRequired = 150;
      unit = 'ml';
    }
  }

  const totalRequired = perAcreRequired * safeAcreage;
  const waterLitersRequired = waterPerAcre > 0 ? waterPerAcre * safeAcreage : 0;
  const tankFills16L = waterLitersRequired > 0 ? Math.ceil(waterLitersRequired / 16) : 0;

  // Find best fitting pack size from product packs
  const availablePacks = product.packs && product.packs.length > 0
    ? product.packs
    : [{ size: 'Standard Pack', price: product.price, mrp: product.mrp, volumeMlOrG: perAcreRequired }];

  // Find single pack that covers or minimal packs count
  let chosenPack = availablePacks[0];
  let packCount = 1;

  if (unit === 'kg' && product.id === 'coromandel-gromor') {
    chosenPack = availablePacks[0];
    packCount = Math.ceil(safeAcreage);
  } else {
    // Pick pack that is greater than or equal to totalRequired, or largest pack
    const sortedPacks = [...availablePacks].sort((a, b) => (a.volumeMlOrG || 0) - (b.volumeMlOrG || 0));
    const matchingSinglePack = sortedPacks.find((p) => (p.volumeMlOrG || 0) >= totalRequired);

    if (matchingSinglePack) {
      chosenPack = matchingSinglePack;
      packCount = 1;
    } else {
      // Pick the biggest pack and calculate count
      const largestPack = sortedPacks[sortedPacks.length - 1];
      chosenPack = largestPack;
      const vol = largestPack.volumeMlOrG || perAcreRequired;
      packCount = Math.max(1, Math.ceil(totalRequired / vol));
    }
  }

  const totalEstimatedCost = chosenPack.price * packCount;

  let applicationGuidance = '';
  if (waterPerAcre > 0) {
    applicationGuidance = `Dissolve recommended dose in ${waterLitersRequired} Litres clean water (${tankFills16L} spray pumps of 16L). Spray early morning before 10 AM or after 4 PM.`;
  } else if (unit === 'kg') {
    applicationGuidance = `Apply ${totalRequired} kg as basal dressing in root zone furrows during sowing or soil tilling.`;
  } else {
    applicationGuidance = `Certified sowing dosage for nursery beds to cover ${safeAcreage} acres.`;
  }

  return {
    product,
    cropName,
    acreage: safeAcreage,
    perAcreRequired,
    unit,
    totalRequired,
    waterLitersRequired,
    recommendedPack: chosenPack,
    recommendedPacksCount: packCount,
    totalEstimatedCost,
    tankFills16L,
    applicationGuidance
  };
}
