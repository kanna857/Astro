import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DemoField, DEMO_FIELDS, getNDVICategory } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { MapPin, Locate, Layers, Satellite, Leaf, SquareSquare } from 'lucide-react';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || '';

// Satellite imagery layers (public tile services)
const SATELLITE_LAYERS: Record<Exclude<MapLayerType, 'base'>, {
  name: string;
  url: string;
  attribution: string;
  maxZoom: number;
}> = {
  satellite: {
    name: 'Satellite (Mapbox)',
    url: MAPBOX_TOKEN 
      ? `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`
      : 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', // Crisp fallback
    attribution: MAPBOX_TOKEN ? '&copy; Mapbox' : '&copy; Google',
    maxZoom: 22, // High resolution support
  },
  terrain: {
    name: 'Terrain View',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap',
    maxZoom: 17,
  },
  // Labels overlay for satellite
  hybrid: {
    name: 'Hybrid (Labels)',
    url: MAPBOX_TOKEN
      ? `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN}`
      : 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', // Google Hybrid
    attribution: MAPBOX_TOKEN ? '&copy; Mapbox' : '&copy; Google',
    maxZoom: 22,
  },
};

type MapLayerType = 'base' | 'satellite' | 'terrain' | 'hybrid';

interface FieldMapProps {
  onFieldSelect: (field: DemoField) => void;
  selectedField: DemoField | null;
  showDemoFields?: boolean;
  ndviTileUrl?: string;
  trueColorUrl?: string;
  affectedArea?: number;
  onPolygonDrawn?: (geoJson: any) => void;
}

export function FieldMap({ onFieldSelect, selectedField, showDemoFields = true, ndviTileUrl, trueColorUrl, affectedArea, onPolygonDrawn }: FieldMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const overlayRef = useRef<L.Circle | null>(null);
  const baseLayerRef = useRef<L.TileLayer | null>(null);
  const satelliteLayerRef = useRef<L.TileLayer | null>(null);
  const hybridLayerRef = useRef<L.TileLayer | null>(null);
  const ndviOverlayRef = useRef<L.ImageOverlay | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [activeLayer, setActiveLayer] = useState<MapLayerType>('base');
  const [showNdviOverlay, setShowNdviOverlay] = useState(false);


  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = L.map(mapContainer.current, {
      center: [16.0, 80.0],
      zoom: 8,
      zoomControl: false,
    });

    // Dark themed base tiles
    baseLayerRef.current = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map.current);

    L.control.zoom({ position: 'bottomright' }).addTo(map.current);

    // Click handler for custom location
    map.current.on('click', (e: L.LeafletMouseEvent) => {
      const customField: DemoField = {
        id: `custom-${Date.now()}`,
        name: 'Custom Location',
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        ndvi: Math.random() * 0.5 + 0.3,
        crop: 'Unknown',
        area: 10,
        lastAnalysis: new Date().toISOString().split('T')[0],
      };
      onFieldSelect(customField);
    });

    // Enable Geoman drawing controls for manual farm tracing
    (map.current as any).pm.addControls({
      position: 'topleft',
      drawPolygon: true,
      drawMarker: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawCircle: false,
      editMode: true,
      dragMode: true,
      cutPolygon: false,
      removalMode: true,
    });

    // Handle polygon creation
    map.current.on('pm:create', (e: any) => {
      if (onPolygonDrawn) {
        onPolygonDrawn(e.layer.toGeoJSON());
      }
    });

    setMapReady(true);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Handle layer switching
  const switchLayer = (layerType: MapLayerType) => {
    if (!map.current) return;

    // Remove existing overlay layers
    if (satelliteLayerRef.current) {
      satelliteLayerRef.current.remove();
      satelliteLayerRef.current = null;
    }
    if (hybridLayerRef.current) {
      hybridLayerRef.current.remove();
      hybridLayerRef.current = null;
    }

    // Always keep the base layer enabled for reliability, but keep it at the bottom
    if (baseLayerRef.current) {
      baseLayerRef.current.addTo(map.current);
      baseLayerRef.current.bringToBack();
    }

    // Add satellite/terrain overlay if selected
    if (layerType !== 'base') {
      const layerConfig = SATELLITE_LAYERS[layerType];

      const layer = L.tileLayer(layerConfig.url, {
        attribution: layerConfig.attribution,
        maxZoom: layerConfig.maxZoom,
        opacity: 0.95,
        crossOrigin: true,
      });

      layer.on('tileerror', (evt) => {
        // eslint-disable-next-line no-console
        console.error('[Map] Tile layer failed:', layerType, evt);
      });

      satelliteLayerRef.current = layer.addTo(map.current);
      satelliteLayerRef.current.bringToFront();

      // Add hybrid labels on top of satellite
      if (layerType === 'satellite') {
        hybridLayerRef.current = L.tileLayer(SATELLITE_LAYERS.hybrid.url, {
          attribution: '',
          maxZoom: SATELLITE_LAYERS.hybrid.maxZoom,
          opacity: 0.95,
          crossOrigin: true,
        })
          .on('tileerror', (evt) => {
            // eslint-disable-next-line no-console
            console.error('[Map] Hybrid labels failed:', evt);
          })
          .addTo(map.current);

        hybridLayerRef.current.bringToFront();
      }
    }

    setActiveLayer(layerType);
  };

  // Add demo field markers
  useEffect(() => {
    if (!map.current || !mapReady || !showDemoFields) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    DEMO_FIELDS.forEach((field) => {
      const category = getNDVICategory(field.ndvi);

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 rounded-full ${category.bgColor} opacity-30 animate-ping"></div>
            <div class="w-6 h-6 rounded-full ${category.bgColor} border-2 border-white/50 flex items-center justify-center shadow-lg">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9z"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      const marker = L.marker([field.lat, field.lng], { icon })
        .addTo(map.current!)
        .bindPopup(`
          <div class="p-2 min-w-[180px]">
            <h3 class="font-semibold text-sm mb-1">${field.name}</h3>
            <div class="text-xs space-y-1">
              <p>Crop: ${field.crop}</p>
              <p>Area: ${field.area} ha</p>
              <p class="font-medium">NDVI: ${field.ndvi.toFixed(2)} (${category.label})</p>
            </div>
          </div>
        `)
        .on('click', () => onFieldSelect(field));

      markersRef.current.push(marker);
    });
  }, [mapReady, showDemoFields, onFieldSelect]);

  // Handle selected field overlay
  useEffect(() => {
    if (!map.current || !mapReady) return;

    // Remove existing overlay
    if (overlayRef.current) {
      overlayRef.current.remove();
      overlayRef.current = null;
    }

    if (selectedField) {
      const category = getNDVICategory(selectedField.ndvi);

      // Get color based on NDVI
      let fillColor = '#ef4444'; // red
      if (selectedField.ndvi >= 0.7) fillColor = '#16a34a';
      else if (selectedField.ndvi >= 0.5) fillColor = '#22c55e';
      else if (selectedField.ndvi >= 0.3) fillColor = '#eab308';

      const areaToUse = affectedArea !== undefined ? affectedArea : selectedField.area;

      overlayRef.current = L.circle([selectedField.lat, selectedField.lng], {
        radius: Math.sqrt(areaToUse * 10000) * 10,
        fillColor,
        fillOpacity: 0.4,
        color: fillColor,
        weight: 2,
      }).addTo(map.current);
    }
  }, [selectedField, mapReady, affectedArea]);

  // Handle map flyTo when selected field changes
  useEffect(() => {
    if (!map.current || !mapReady || !selectedField) return;

    map.current.flyTo([selectedField.lat, selectedField.lng], 16, { // Increased to 16 for better visibility
      duration: 1.5,
    });
  }, [selectedField?.id, mapReady]);

  // Handle NDVI overlay from Agromonitoring
  useEffect(() => {
    if (!map.current || !mapReady) return;

    // Remove existing NDVI overlay
    if (ndviOverlayRef.current) {
      ndviOverlayRef.current.remove();
      ndviOverlayRef.current = null;
    }

    if (showNdviOverlay && ndviTileUrl && selectedField) {
      // Agromonitoring returns a PNG image URL for the polygon's NDVI
      // We need to create bounds around the selected field
      const sideLength = Math.sqrt((selectedField.area || 10) * 10000); // meters
      const latOffset = (sideLength / 2) / 111320;
      const lngOffset = (sideLength / 2) / (111320 * Math.cos(selectedField.lat * Math.PI / 180));

      const bounds: L.LatLngBoundsExpression = [
        [selectedField.lat - latOffset, selectedField.lng - lngOffset],
        [selectedField.lat + latOffset, selectedField.lng + lngOffset]
      ];

      ndviOverlayRef.current = L.imageOverlay(ndviTileUrl, bounds, {
        opacity: 0.85,
        crossOrigin: true
      }).addTo(map.current);

      ndviOverlayRef.current.bringToFront();
    }
  }, [showNdviOverlay, ndviTileUrl, selectedField, mapReady]);

  const handleLocateMe = () => {
    if (!map.current) return;

    // Use GPS with high accuracy
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.current?.flyTo([latitude, longitude], 17); // Increased to 17 for high precision GPS

        
        // Auto-select the GPS location as a field
        const gpsField: DemoField = {
          id: `gps-${Date.now()}`,
          name: 'My GPS Location',
          lat: latitude,
          lng: longitude,
          ndvi: Math.random() * 0.5 + 0.3,
          crop: 'Unknown',
          area: 10,
          lastAnalysis: new Date().toISOString().split('T')[0],
        };
        onFieldSelect(gpsField);
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Unable to access your GPS location. Please check your browser permissions.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleResetView = () => {
    map.current?.flyTo([16.0, 80.0], 8);
  };

  return (
    <div className="relative h-full min-h-[500px] rounded-xl overflow-hidden border border-border">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleLocateMe}
          className="glass-card"
          title="Locate me"
        >
          <Locate className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={handleResetView}
          className="glass-card"
          title="Reset view"
        >
          <Layers className="w-4 h-4" />
        </Button>

        {/* ISRO Bhuvan Layer Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={activeLayer !== 'base' ? 'default' : 'secondary'}
              size="icon"
              className="glass-card"
              title="ISRO Satellite Layers"
            >
              <Satellite className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="flex items-center gap-2">
              <Satellite className="w-4 h-4 text-primary" />
              Satellite Layers
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => switchLayer('base')}
              className={activeLayer === 'base' ? 'bg-primary/10' : ''}
            >
              <Layers className="w-4 h-4 mr-2" />
              Base Map (Default)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => switchLayer('satellite')}
              className={activeLayer === 'satellite' ? 'bg-primary/10' : ''}
            >
              <Satellite className="w-4 h-4 mr-2" />
              Satellite Imagery
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => switchLayer('terrain')}
              className={activeLayer === 'terrain' ? 'bg-primary/10' : ''}
            >
              <MapPin className="w-4 h-4 mr-2" />
              Terrain View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* NDVI Overlay Toggle */}
        {ndviTileUrl && (
          <Button
            variant={showNdviOverlay ? 'default' : 'secondary'}
            size="icon"
            onClick={() => setShowNdviOverlay(!showNdviOverlay)}
            className={`glass-card ${showNdviOverlay ? 'bg-success hover:bg-success/90' : ''}`}
            title="Toggle NDVI Overlay"
          >
            <Leaf className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Active Layer Indicator */}
      {(activeLayer !== 'base' || showNdviOverlay) && (
        <div className="absolute top-4 left-4 z-[1000]">
          <div className="glass-card px-3 py-1.5 rounded-lg flex items-center gap-2">
            {showNdviOverlay ? (
              <>
                <Leaf className="w-4 h-4 text-success" />
                <span className="text-xs font-medium text-success">NDVI Overlay Active</span>
              </>
            ) : (
              <>
                <Satellite className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary">
                  {activeLayer === 'satellite' && 'Satellite Imagery'}
                  {activeLayer === 'terrain' && 'Terrain View'}
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="glass-card px-4 py-2 rounded-lg">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Click on map or select a demo farm
          </p>
        </div>
      </div>


    </div>
  );
}
