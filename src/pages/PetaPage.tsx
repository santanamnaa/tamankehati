import { useState, useEffect } from 'react';
import { MapPin, Layers, Info, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { MOCK_PARKS } from '../mocks/parks';
import { MOCK_PLANTS } from '../mocks/plants';

interface MapLayer {
  id: string;
  name: string;
  enabled: boolean;
  color: string;
}

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface PetaPageProps {
  onNavigate: NavigateFunction;
}

export function PetaPage({ onNavigate }: PetaPageProps) {
  const [selectedPark, setSelectedPark] = useState<string | null>(null);
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'parks', name: 'Persebaran Taman', enabled: true, color: '#263d2f' },
    { id: 'plants', name: 'Koleksi Tanaman', enabled: false, color: '#4a7c59' },
    { id: 'conservation', name: 'Zona Konservasi', enabled: false, color: '#c5af8f' }
  ]);

  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId ? { ...layer, enabled: !layer.enabled } : layer
    ));
  };

  const park = selectedPark ? MOCK_PARKS.find(p => p.id === selectedPark) : null;
  const parkPlants = park ? MOCK_PLANTS.filter(p => p.taman_kehati_id === park.id) : [];

  // Calculate center of Indonesia for initial view
  const centerLat = -2.5;
  const centerLng = 118.0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-2">Peta Interaktif Taman Kehati</h1>
          <p className="text-primary-foreground/90">
            Jelajahi persebaran taman konservasi dan koleksi tanaman di seluruh Indonesia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Layer Controls */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-primary" />
                <h3>Layer Peta</h3>
              </div>
              <div className="space-y-3">
                {layers.map(layer => (
                  <label
                    key={layer.id}
                    className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={layer.enabled}
                      onChange={() => toggleLayer(layer.id)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: layer.color }}
                      />
                      <span className="text-sm">{layer.name}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="mb-3">Legenda</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span>Taman Aktif</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <span>Zona Konservasi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-chart-1" />
                    <span>Area Koleksi</span>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="mb-3">Statistik</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Taman:</span>
                    <span>{MOCK_PARKS.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Koleksi:</span>
                    <span>{MOCK_PLANTS.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Provinsi:</span>
                    <span>{new Set(MOCK_PARKS.map(p => p.provinsi_id)).size}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Map Container */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              {/* Simulated Map View */}
              <div className="relative bg-muted/20 h-[600px]">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-chart-2/10 to-chart-1/10">
                  {/* Grid lines for map effect */}
                  <svg className="w-full h-full opacity-10">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Park Markers */}
                {layers.find(l => l.id === 'parks')?.enabled && MOCK_PARKS.map((park, index) => {
                  // Simulate positions based on latitude/longitude or index
                  const positions: Record<number, { top: string; left: string }> = {
                    31: { top: '60%', left: '35%' }, // DKI Jakarta
                    32: { top: '60%', left: '35%' }, // Jawa Barat
                    33: { top: '62%', left: '45%' }, // Jawa Tengah
                    35: { top: '65%', left: '55%' }, // Jawa Timur
                    36: { top: '68%', left: '65%' }, // Banten
                  };

                  const position = positions[park.provinsi_id || 0] || { 
                    top: `${30 + (index * 5)}%`, 
                    left: `${30 + (index * 5)}%` 
                  };

                  return (
                    <button
                      key={park.id}
                      onClick={() => setSelectedPark(park.id)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{ top: position.top, left: position.left }}
                    >
                      <div className="relative">
                        <MapPin 
                          className="w-8 h-8 text-primary drop-shadow-lg group-hover:scale-110 transition-transform fill-primary" 
                        />
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                          {park.nama_resmi}
                        </div>
                      </div>
                    </button>
                  );
                })}

                {/* Conservation Zones (if enabled) */}
                {layers.find(l => l.id === 'conservation')?.enabled && (
                  <>
                    <div className="absolute top-[30%] left-[20%] w-32 h-32 rounded-full bg-secondary/20 border-2 border-secondary" />
                    <div className="absolute top-[50%] left-[45%] w-40 h-40 rounded-full bg-secondary/20 border-2 border-secondary" />
                    <div className="absolute top-[40%] left-[65%] w-36 h-36 rounded-full bg-secondary/20 border-2 border-secondary" />
                  </>
                )}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button variant="outline" size="icon" className="bg-card">
                    +
                  </Button>
                  <Button variant="outline" size="icon" className="bg-card">
                    -
                  </Button>
                </div>

                {/* Info Box */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm p-3 rounded-lg shadow-lg max-w-xs">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Klik pada marker untuk melihat detail taman. 
                      Gunakan layer controls untuk menampilkan informasi tambahan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Park Info */}
              {park && (
                <div className="absolute top-4 left-4 bg-card shadow-xl rounded-lg p-4 max-w-sm">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="mb-1">{park.name}</h3>
                      <Badge variant="secondary">{park.type}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedPark(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div>
                      <span className="text-muted-foreground">Lokasi: </span>
                      <span>{park.province}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Luas: </span>
                      <span>{park.area} ha</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Koleksi: </span>
                      <span>{parkPlants.length} spesies</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => onNavigate('taman-detail', park.id)}
                    className="w-full"
                  >
                    Lihat Detail Taman
                  </Button>
                </div>
              )}
            </Card>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Total Taman</div>
                    <div className="text-2xl">{MOCK_PARKS.length}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-chart-1" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Area Konservasi</div>
                    <div className="text-2xl">
                      {MOCK_PARKS.reduce((sum, p) => sum + (p.luas || 0), 0).toLocaleString()} ha
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Info className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Total Koleksi</div>
                    <div className="text-2xl">{MOCK_PLANTS.length}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
