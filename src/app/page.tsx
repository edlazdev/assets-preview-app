"use client";

import Image from "next/image";
import { Asset } from "./lib/data";
import { useEffect, useState } from "react";
import ShareButton from "@/components/SharedButton";

export default function Home() {
  const [data, setData] = useState<Asset[]>([]);

  const supportedExtensions = [".svg"];

  const filterRoutes = (routes: Asset[]) => {
    return routes.filter((route: Asset) => {
      // Extraer la extensión del archivo
      const extension = route?.Key?.split(".").pop()?.toLowerCase();
      // Verificar si está en la lista de extensiones admitidas
      return supportedExtensions.includes(`.${extension}`);
    });
  };

  useEffect(() => {
    fetch("/api/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Asset[]) => setData(filterRoutes(data)))
      .catch((e) => console.error(e));
  }, []);

  const total = data.length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Assets preview
      </h1>
      {total > 1 && (
        <p className="text-center text-gray-700 mb-6">
          Total de assets: {total}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {data.map((asset) => (
          <div
            className="group relative block bg-white rounded-md overflow-hidden shadow-md"
            key={asset.Key}
          >
            <Image
              alt={asset.Key}
              src={`https://assets.mattilda.io/${asset.Key}`}
              fill
              priority={false}
              className="absolute inset-0 h-full w-full object-contain opacity-75 transition-opacity group-hover:opacity-50 p-2"
            />

            <div className="flex flex-col relative p-2">
              <div className="mt-72 translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 h-10">
                <p className="text-sm text-black">{asset.Key}</p>
              </div>

              <div className="flex flex-row justify-end gap-2">
                <ShareButton
                  imageUrl={`https://assets.mattilda.io/${asset.Key}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
