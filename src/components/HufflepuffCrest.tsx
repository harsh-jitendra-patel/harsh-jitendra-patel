"use client";

import React from "react";

interface CrestProps {
  className?: string;
  size?: number;
}

export default function HufflepuffCrest({ className = "", size = 120 }: CrestProps) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-[0_4px_16px_rgba(234,179,8,0.5)] ${className}`}
    >
      {/* Helmet crest at top */}
      <g id="helmet">
        {/* Red & Gold crest roll */}
        <path d="M 82 22 Q 100 15 118 22 C 122 28 115 32 100 32 C 85 32 78 28 82 22 Z" fill="#991b1b" stroke="#eab308" strokeWidth="2" />
        <path d="M 86 24 C 95 20 105 20 114 24" stroke="#facc15" strokeWidth="3" />
        {/* Knight Helmet */}
        <path d="M 88 32 C 88 20 112 20 112 32 L 114 55 C 114 62 86 62 86 55 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
        <path d="M 94 36 H 106 M 94 42 H 106 M 94 48 H 106" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="54" r="2" fill="#eab308" />
      </g>

      {/* Ornate Baroque Mantling / Gold Scrollwork (Left side) */}
      <g id="mantling-left" fill="#eab308" stroke="#854d0e" strokeWidth="1.5">
        <path d="M 86 35 C 60 20 40 40 30 65 C 20 90 35 110 25 135 C 18 150 30 170 45 160 C 35 145 42 130 50 120 C 40 105 52 85 68 75 C 60 85 65 100 75 90 C 70 70 80 50 86 35 Z" />
        <path d="M 45 60 C 30 75 35 95 48 90 C 40 80 48 70 45 60 Z" fill="#facc15" />
        <path d="M 30 110 C 15 125 25 145 40 135 C 30 130 35 120 30 110 Z" fill="#facc15" />
      </g>

      {/* Ornate Baroque Mantling / Gold Scrollwork (Right side) */}
      <g id="mantling-right" fill="#eab308" stroke="#854d0e" strokeWidth="1.5">
        <path d="M 114 35 C 140 20 160 40 170 65 C 180 90 165 110 175 135 C 182 150 170 170 155 160 C 165 145 158 130 150 120 C 160 105 148 85 132 75 C 140 85 135 100 125 90 C 130 70 120 50 114 35 Z" />
        <path d="M 155 60 C 170 75 165 95 152 90 C 160 80 152 70 155 60 Z" fill="#facc15" />
        <path d="M 170 110 C 185 125 175 145 160 135 C 170 130 165 120 170 110 Z" fill="#facc15" />
      </g>

      {/* Shield Main Shape */}
      <g id="shield">
        {/* Shield background fill */}
        <path
          d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z"
          fill="#facc15"
          stroke="#713f12"
          strokeWidth="4"
        />

        {/* Shield right side black stripes */}
        <clipPath id="shield-clip">
          <path d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z" />
        </clipPath>

        <g clipPath="url(#shield-clip)">
          {/* Vertical Black Stripes on right half */}
          <rect x="100" y="60" width="10" height="120" fill="#18181b" />
          <rect x="115" y="60" width="10" height="120" fill="#18181b" />
          <rect x="130" y="60" width="10" height="120" fill="#18181b" />
          
          {/* Horizontal dividing stripe accents */}
          <rect x="60" y="115" width="80" height="8" fill="#18181b" />
          <rect x="60" y="140" width="80" height="8" fill="#18181b" />
        </g>

        {/* Inner Shield Border */}
        <path
          d="M 64 64 H 136 V 118 C 136 150 100 174 100 174 C 100 174 64 150 64 118 Z"
          fill="none"
          stroke="#ca8a04"
          strokeWidth="2"
        />

        {/* Rampant Badger Silhouette in Center */}
        <g id="badger" fill="#18181b" stroke="#fef08a" strokeWidth="0.8">
          {/* Badger body facing upper right in rampant heraldic posture */}
          {/* Head & snout */}
          <path d="M 112 88 C 118 85 125 90 122 96 C 118 100 110 98 106 95 L 112 88 Z" fill="#e2e8f0" stroke="#18181b" strokeWidth="1.5" />
          {/* Head black stripe */}
          <path d="M 108 90 L 120 93 L 116 97 L 106 93 Z" fill="#18181b" />
          {/* Main torso */}
          <path d="M 85 128 C 75 120 80 102 92 98 C 100 95 108 102 114 110 C 110 120 95 132 85 128 Z" fill="#64748b" stroke="#18181b" strokeWidth="1.5" />
          {/* Raised front paws */}
          <path d="M 98 98 L 92 88 L 86 92 L 94 102 Z" fill="#18181b" />
          <path d="M 106 102 L 102 90 L 96 94 L 102 106 Z" fill="#18181b" />
          {/* Rear hind legs */}
          <path d="M 88 124 L 80 136 L 76 132 L 84 120 Z" fill="#18181b" />
          <path d="M 95 128 L 92 142 L 86 140 L 90 125 Z" fill="#18181b" />
          {/* Tail */}
          <path d="M 80 122 C 72 125 68 135 72 140 C 76 138 78 130 82 126 Z" fill="#475569" />
        </g>
      </g>

      {/* Ribbon Scroll Banner at Bottom */}
      <g id="banner">
        {/* Banner shadow / back folds */}
        <path d="M 35 185 L 50 175 V 192 L 35 185 Z" fill="#713f12" />
        <path d="M 165 185 L 150 175 V 192 L 165 185 Z" fill="#713f12" />
        
        {/* Main Ribbon Body */}
        <path
          d="M 40 180 Q 100 195 160 180 L 152 200 Q 100 215 48 200 Z"
          fill="#eab308"
          stroke="#713f12"
          strokeWidth="2.5"
        />

        {/* Banner Text */}
        <text
          x="100"
          y="196"
          textAnchor="middle"
          fill="#18181b"
          fontSize="13"
          fontWeight="900"
          fontFamily="serif"
          letterSpacing="2"
        >
          HUFFLEPUFF
        </text>
      </g>
    </svg>
  );
}
