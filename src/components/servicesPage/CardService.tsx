"use client";

import { Link } from "@/src/i18n/navigation";
import { useEffect, useState } from "react";
import "./CardService.css";

export interface CardServiceProps {
  slug: string;
  title: string;
  description: string;
}

const icons = ["💻", "📱", "☁️", "🔒", "🛠️", "🎨", "🚀"];

export default function CardService({ slug, title, description }: CardServiceProps) {
  const [icon, setIcon] = useState("");

  useEffect(() => {
    // Solo en cliente, asignar un icono random
    setIcon(icons[Math.floor(Math.random() * icons.length)]);
  }, []);
  
  return (
    <Link href={`/services/${slug}`} className="block h-full">
      <div className="card-service-wrapper">
        <svg className="svg-container-service" width="0" height="0">
          <defs>
            <filter id="turbulent-displace" colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
              <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
                <animate attributeName="dy" values="0; 700; 0" dur="12s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>

              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
              <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
                <animate attributeName="dy" values="700; 0; 700" dur="12s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>

              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
              <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
                <animate attributeName="dx" values="0; 490; 0" dur="12s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>

              <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
              <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
                <animate attributeName="dx" values="490; 0; 490" dur="12s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>

              <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
              <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
              <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

              <feDisplacementMap in="SourceGraphic" in2="combinedNoise" scale="30" xChannelSelector="R" yChannelSelector="B" />
            </filter>
            
            {/* Filtro simplificado para móviles */}
            <filter id="turbulent-displace-mobile" colorInterpolationFilters="sRGB" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" result="noise" seed="1" />
              <feOffset in="noise" dx="0" dy="0" result="offsetNoise">
                <animate attributeName="dy" values="0; 400; 0" dur="12s" repeatCount="indefinite" calcMode="linear" />
              </feOffset>
              <feDisplacementMap in="SourceGraphic" in2="offsetNoise" scale="15" xChannelSelector="R" yChannelSelector="B" />
            </filter>
          </defs>
        </svg>

        <div className="card-container-service">
          <div className="inner-container-service">
            <div className="border-outer-service">
              <div className="main-card-service"></div>
            </div>
            <div className="glow-layer-1-service"></div>
            <div className="glow-layer-2-service"></div>
          </div>

          <div className="overlay-1-service"></div>
          <div className="overlay-2-service"></div>
          <div className="background-glow-service"></div>

          <div className="content-container-service">
            <div className="content-top-service">
              <div className="service-icon">
                {icon || "⚡"}
              </div>
              <p className="title-service">{title}</p>
            </div>

            <hr className="divider-service" />

            <div className="content-bottom-service">
              <p className="description-service">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
