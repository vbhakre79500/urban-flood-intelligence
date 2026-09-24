import { create } from "zustand";

interface MapLayers {
  riskHeatmap: boolean;
  drainageNetwork: boolean;
  radarReflectivity: boolean;
  sensorStations: boolean;
}

interface MapState {
  center: [number, number];
  zoom: number;
  selectedZoneId: string | null;
  hoveredZoneId: string | null;
  activeLayers: MapLayers;
  setViewport: (center: [number, number], zoom: number) => void;
  selectZone: (zoneId: string | null) => void;
  setHoveredZone: (zoneId: string | null) => void;
  toggleLayer: (layer: keyof MapLayers) => void;
  resetLayers: () => void;
}

const DEFAULT_LAYERS: MapLayers = {
  riskHeatmap: true,
  drainageNetwork: true,
  radarReflectivity: false,
  sensorStations: true,
};

export const useMapStore = create<MapState>((set) => ({
  center: [13.0827, 80.2707], // Operational center
  zoom: 12,
  selectedZoneId: null,
  hoveredZoneId: null,
  activeLayers: DEFAULT_LAYERS,
  setViewport: (center, zoom) => set({ center, zoom }),
  selectZone: (zoneId) => set({ selectedZoneId: zoneId }),
  setHoveredZone: (zoneId) => set({ hoveredZoneId: zoneId }),
  toggleLayer: (layer) =>
    set((state) => ({
      activeLayers: {
        ...state.activeLayers,
        [layer]: !state.activeLayers[layer],
      },
    })),
  resetLayers: () => set({ activeLayers: DEFAULT_LAYERS }),
}));
