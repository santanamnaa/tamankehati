import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import type { KoleksiTumbuhanResponse } from "../../lib/api.types";
import { Sprout, Calendar } from "lucide-react";

interface PlantCardProps {
  plant: KoleksiTumbuhanResponse;
  parkName?: string;
  onClick?: () => void;
}

export function PlantCard({ plant, parkName, onClick }: PlantCardProps) {
  return (
    <Card
      className="p-5 hover:shadow-lg transition-shadow cursor-pointer bg-white"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg italic">{plant.nama_ilmiah}</h3>
            {plant.nama_umum_nasional && (
              <p className="text-sm text-muted-foreground mt-1">
                {plant.nama_umum_nasional}
              </p>
            )}
          </div>
          <Badge
            variant={plant.status === "published" ? "default" : "secondary"}
            className="shrink-0"
          >
            {plant.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>

        {plant.nama_umum_lokal && (
          <p className="text-sm text-muted-foreground">
            Lokal: {plant.nama_umum_lokal}
          </p>
        )}

        <div className="flex flex-wrap gap-2 text-xs">
          {plant.familia && (
            <Badge variant="outline" className="text-xs">
              {plant.familia}
            </Badge>
          )}
          {plant.genus && plant.spesies && (
            <Badge variant="outline" className="text-xs">
              {plant.genus} {plant.spesies}
            </Badge>
          )}
        </div>

        {parkName && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Sprout className="size-4" />
            <span>{parkName}</span>
          </div>
        )}

        {plant.nomor_koleksi && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <span>No. Koleksi: {plant.nomor_koleksi}</span>
          </div>
        )}

        {plant.deskripsi && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {plant.deskripsi}
          </p>
        )}
      </div>
    </Card>
  );
}
