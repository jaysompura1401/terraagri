import React, { useState } from 'react';
import { FarmerProfileData, FarmCropRecord, Product } from '../types';

interface MyFarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmData: FarmerProfileData;
  onUpdateFarmData: (updated: FarmerProfileData) => void;
  onOpenCropCarePlan: (cropName: string) => void;
  onOpenProblemFinder: (cropName: string) => void;
  onOpenDosageCalculator?: () => void;
}

export const MyFarmModal: React.FC<MyFarmModalProps> = ({
  isOpen,
  onClose,
  farmData,
  onUpdateFarmData,
  onOpenCropCarePlan,
  onOpenProblemFinder,
  onOpenDosageCalculator
}) => {
  const [activeTab, setActiveTab] = useState<'crops' | 'soil' | 'add'>('crops');
  const [showAddForm, setShowAddForm] = useState(false);

  // New crop form state
  const [newCropName, setNewCropName] = useState('Cotton');
  const [newVariety, setNewVariety] = useState('');
  const [newAcres, setNewAcres] = useState<number>(2.0);
  const [newStage, setNewStage] = useState<FarmCropRecord['currentStage']>('Vegetative Growth');
  const [newIrrigation, setNewIrrigation] = useState<FarmCropRecord['irrigationType']>('Drip');
  const [newNotes, setNewNotes] = useState('');

  if (!isOpen) return null;

  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault();
    const newCrop: FarmCropRecord = {
      id: `crop-${Date.now()}`,
      cropName: newCropName,
      variety: newVariety || `${newCropName} Selection`,
      acres: newAcres,
      sowingDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      currentStage: newStage,
      irrigationType: newIrrigation,
      notes: newNotes
    };

    const updated: FarmerProfileData = {
      ...farmData,
      activeCrops: [newCrop, ...farmData.activeCrops]
    };
    onUpdateFarmData(updated);
    setShowAddForm(false);
    setNewVariety('');
    setNewNotes('');
  };

  const handleRemoveCrop = (cropId: string) => {
    const updated: FarmerProfileData = {
      ...farmData,
      activeCrops: farmData.activeCrops.filter((c) => c.id !== cropId)
    };
    onUpdateFarmData(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl max-h-[94vh] flex flex-col shadow-2xl border border-surface-container-high overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">agriculture</span>
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                My Farm &amp; Crops (मेरा खेत / मेरी फसलें)
              </h3>
              <p className="text-xs text-on-primary-container">
                {farmData.farmerName} · {farmData.totalAcres} Acres ({farmData.village}, {farmData.district})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-3 bg-surface-container-low border-b border-surface-container-high/60 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('crops')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'crops'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-lowest text-on-surface border border-surface-container-high'
              }`}
            >
              Active Crops ({farmData.activeCrops.length})
            </button>
            <button
              onClick={() => setActiveTab('soil')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'soil'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-container-lowest text-on-surface border border-surface-container-high'
              }`}
            >
              Soil &amp; Land Profile
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="px-3 py-1.5 rounded-xl bg-secondary text-on-secondary hover:bg-primary font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add New Crop</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Add Crop Form Overlay / Inline */}
          {showAddForm && (
            <form
              onSubmit={handleAddCrop}
              className="p-4 rounded-2xl bg-surface-container-low border-2 border-secondary/40 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-surface-container-high/60 pb-2">
                <span className="font-bold text-xs text-on-surface uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-[18px]">add_circle</span>
                  Register Crop In Your Farm
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-outline hover:text-error text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Crop Name:</label>
                  <select
                    value={newCropName}
                    onChange={(e) => setNewCropName(e.target.value)}
                    className="w-full p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface focus:ring-1 focus:ring-primary"
                  >
                    {['Cotton', 'Tomato', 'Paddy / Rice', 'Soybean', 'Sugarcane', 'Chilli', 'Onion', 'Wheat', 'Maize'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Variety / Hybrid Line:</label>
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    placeholder="e.g. Bollgard II / Mahyco Abhinav"
                    className="w-full p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Area (Acres):</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.25"
                    value={newAcres}
                    onChange={(e) => setNewAcres(parseFloat(e.target.value) || 1)}
                    className="w-full p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Current Growth Stage:</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface focus:ring-1 focus:ring-primary"
                  >
                    <option value="Sowing / Seedling">Sowing / Seedling</option>
                    <option value="Vegetative Growth">Vegetative Growth</option>
                    <option value="Flowering & Budding">Flowering & Budding</option>
                    <option value="Fruit / Grain Filling">Fruit / Grain Filling</option>
                    <option value="Harvesting Ready">Harvesting Ready</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Irrigation Method:</label>
                  <select
                    value={newIrrigation}
                    onChange={(e) => setNewIrrigation(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface focus:ring-1 focus:ring-primary"
                  >
                    <option value="Drip">Drip Irrigation</option>
                    <option value="Flood">Flood / Furrow</option>
                    <option value="Sprinkler">Sprinkler</option>
                    <option value="Rainfed">Rainfed (Barani)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Field Notes / Observations:</label>
                  <input
                    type="text"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    placeholder="e.g. slight thrips seen, foliar planned"
                    className="w-full p-2 rounded-xl bg-surface-container-lowest border border-surface-container-high text-on-surface focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container shadow-2xs"
                >
                  Save Crop Record
                </button>
              </div>
            </form>
          )}

          {activeTab === 'crops' && (
            <div className="space-y-3">
              {farmData.activeCrops.map((crop) => (
                <div
                  key={crop.id}
                  className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm sm:text-base text-on-surface">
                          {crop.cropName}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/10 text-primary">
                          {crop.acres} Acres
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-secondary-fixed/50 text-secondary">
                          {crop.irrigationType}
                        </span>
                      </div>
                      <p className="text-xs text-outline font-medium mt-0.5">
                        Variety: <span className="font-bold text-on-surface">{crop.variety}</span> · Sown: {crop.sowingDate}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveCrop(crop.id)}
                      className="text-outline hover:text-error p-1"
                      title="Remove crop"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                  {/* Stage pill */}
                  <div className="p-2 rounded-xl bg-surface-container-low flex items-center justify-between text-xs">
                    <span className="text-outline text-[11px]">Current Field Stage:</span>
                    <span className="font-bold text-primary flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      {crop.currentStage}
                    </span>
                  </div>

                  {crop.notes && (
                    <p className="text-[11px] text-on-surface-variant italic">
                      Note: "{crop.notes}"
                    </p>
                  )}

                  {/* Quick Crop Action Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 border-t border-surface-container-high/60">
                    <button
                      onClick={() => {
                        onOpenProblemFinder(crop.cropName);
                        onClose();
                      }}
                      className="py-1.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">troubleshoot</span>
                      <span>Find Disease Solution</span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenCropCarePlan(crop.cropName);
                        onClose();
                      }}
                      className="py-1.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-secondary font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      <span>View Care Plan</span>
                    </button>

                    {onOpenDosageCalculator && (
                      <button
                        onClick={() => {
                          onOpenDosageCalculator();
                          onClose();
                        }}
                        className="py-1.5 px-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-bold text-[11px] flex items-center justify-center gap-1 col-span-2 sm:col-span-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">calculate</span>
                        <span>Dosage ({crop.acres} Ac)</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'soil' && (
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high shadow-xs space-y-3 text-xs">
              <h4 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">terrain</span>
                Soil Health &amp; Farm Geo-Attributes
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-[10px] font-bold text-outline uppercase">Dominant Soil Type</span>
                  <p className="font-bold text-sm text-on-surface mt-0.5">{farmData.soilType}</p>
                  <span className="text-[10px] text-primary">High clay retention, fertile</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-[10px] font-bold text-outline uppercase">Soil pH Index</span>
                  <p className="font-bold text-sm text-on-surface mt-0.5">{farmData.soilPh} (Neutral-Ideal)</p>
                  <span className="text-[10px] text-secondary">Ideal for Cotton &amp; Tomato</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-[10px] font-bold text-outline uppercase">Registered Farm Area</span>
                  <p className="font-bold text-sm text-on-surface mt-0.5">{farmData.totalAcres} Total Acres</p>
                  <span className="text-[10px] text-outline">Under Drip &amp; Barani</span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-low">
                  <span className="text-[10px] font-bold text-outline uppercase">Agro-Climatic Zone</span>
                  <p className="font-bold text-sm text-on-surface mt-0.5">Western Ghats Rainshadow</p>
                  <span className="text-[10px] text-outline">{farmData.district}, {farmData.state}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-on-surface">
                <span className="font-bold text-primary">Agronomist Recommendation for this soil:</span>
                <p className="mt-1 leading-relaxed text-[11px]">
                  Medium black soil with pH 7.2 responds excellently to complex phosphatic fertilizers (such as Gromor 14-35-14) during basal sowing. Maintain drip intervals to avoid waterlogging during continuous monsoon periods.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-xs">
          <span className="text-outline text-[11px]">
            Saved farm profiles are securely preserved for your seasonal shopping.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-primary text-on-primary font-bold hover:bg-primary-container transition-colors shadow-2xs"
          >
            Close My Farm
          </button>
        </div>
      </div>
    </div>
  );
};
