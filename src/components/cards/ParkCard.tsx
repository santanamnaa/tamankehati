import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import type { TamanKehatiResponse } from "../../lib/api.types";
import { MapPin, Leaf } from "lucide-react";

interface ParkCardProps {
  park: TamanKehatiResponse;
  onClick?: () => void;
}

export function ParkCard({ park, onClick }: ParkCardProps) {
  const tipeTamanLabel = {
    government: "Pemerintah",
    private: "Swasta",
    community: "Komunitas",
  };

  return (
    <Card
      className="p-5 hover:shadow-lg transition-shadow cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg">{park.nama_resmi}</h3>
          <Badge
            variant={park.status === "published" ? "default" : "secondary"}
            className="shrink-0"
          >
            {park.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>

        {park.nama_alternatif && (
          <p className="text-sm text-muted-foreground italic">
            {park.nama_alternatif}
          </p>
        )}

        {park.alamat && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0 mt-0.5" />
            <span>{park.alamat}</span>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm">
          {park.luas && (
            <div className="flex items-center gap-1.5">
              <Leaf className="size-4 text-primary" />
              <span>{park.luas} ha</span>
            </div>
          )}
          {park.tipe_taman && (
            <Badge variant="outline" className="text-xs">
              {tipeTamanLabel[park.tipe_taman]}
            </Badge>
          )}
        </div>

        {park.deskripsi && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {park.deskripsi}
          </p>
        )}
      </div>
    </Card>
  );
}
