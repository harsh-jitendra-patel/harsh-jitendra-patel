"use client";

import React from "react";
import { House } from "@/components/ThemeContext";

interface CrestProps {
  house?: House;
  className?: string;
  size?: number;
}

export default function HouseCrest({ house = "hufflepuff", className = "", size = 120 }: CrestProps) {
  if (house === "gryffindor") {
    return (
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-[0_4px_16px_rgba(239,68,68,0.6)] ${className}`}
      >
        {/* Helmet crest at top */}
        <g id="helmet">
          <path d="M 82 22 Q 100 15 118 22 C 122 28 115 32 100 32 C 85 32 78 28 82 22 Z" fill="#991b1b" stroke="#f59e0b" strokeWidth="2" />
          <path d="M 86 24 C 95 20 105 20 114 24" stroke="#fef08a" strokeWidth="3" />
          <path d="M 88 32 C 88 20 112 20 112 32 L 114 55 C 114 62 86 62 86 55 Z" fill="#b91c1c" stroke="#f59e0b" strokeWidth="2" />
          <path d="M 94 36 H 106 M 94 42 H 106 M 94 48 H 106" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          <circle cx="100" cy="54" r="2.5" fill="#fef08a" />
        </g>

        {/* Baroque Mantling Left */}
        <g id="mantling-left" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5">
          <path d="M 86 35 C 60 20 40 40 30 65 C 20 90 35 110 25 135 C 18 150 30 170 45 160 C 35 145 42 130 50 120 C 40 105 52 85 68 75 C 60 85 65 100 75 90 C 70 70 80 50 86 35 Z" />
          <path d="M 45 60 C 30 75 35 95 48 90 C 40 80 48 70 45 60 Z" fill="#ef4444" />
        </g>

        {/* Baroque Mantling Right */}
        <g id="mantling-right" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5">
          <path d="M 114 35 C 140 20 160 40 170 65 C 180 90 165 110 175 135 C 182 150 170 170 155 160 C 165 145 158 130 150 120 C 160 105 148 85 132 75 C 140 85 135 100 125 90 C 130 70 120 50 114 35 Z" />
          <path d="M 155 60 C 170 75 165 95 152 90 C 160 80 152 70 155 60 Z" fill="#ef4444" />
        </g>

        {/* Shield Main */}
        <g id="shield">
          <path
            d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z"
            fill="#991b1b"
            stroke="#f59e0b"
            strokeWidth="4"
          />

          <clipPath id="gryf-shield-clip">
            <path d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z" />
          </clipPath>

          <g clipPath="url(#gryf-shield-clip)">
            {/* Diagonal Gold Bend */}
            <path d="M 50 60 L 150 160 L 165 145 L 65 45 Z" fill="#f59e0b" />
            <path d="M 50 80 L 130 160 H 150 L 50 60 Z" fill="#fef08a" opacity="0.4" />
          </g>

          <path
            d="M 64 64 H 136 V 118 C 136 150 100 174 100 174 C 100 174 64 150 64 118 Z"
            fill="none"
            stroke="#fcd34d"
            strokeWidth="2"
          />

          {/* Rampant Golden Lion Heraldry */}
          <g id="lion" fill="#fef08a" stroke="#78350f" strokeWidth="0.8">
            {/* Lion head & mane */}
            <path d="M 116 82 C 124 76 130 84 126 92 C 120 96 112 94 108 90 Z" fill="#f59e0b" stroke="#78350f" />
            <path d="M 122 78 C 128 72 134 82 128 88 C 122 88 118 84 122 78 Z" fill="#ef4444" />
            {/* Lion body */}
            <path d="M 88 126 C 78 116 82 98 94 94 C 104 90 114 98 120 108 C 114 120 98 132 88 126 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="1.2" />
            {/* Raised paws */}
            <path d="M 104 94 L 118 84 L 122 88 L 108 98 Z" fill="#fef08a" />
            <path d="M 110 100 L 126 92 L 128 96 L 112 104 Z" fill="#fef08a" />
            {/* Legs */}
            <path d="M 92 122 L 82 136 L 78 132 L 88 118 Z" fill="#fef08a" />
            <path d="M 98 126 L 94 142 L 88 140 L 93 124 Z" fill="#fef08a" />
            {/* Tufted Tail */}
            <path d="M 82 120 C 70 122 66 138 72 144 C 76 142 80 132 84 124 Z" fill="#ef4444" />
          </g>
        </g>

        {/* Banner Ribbon */}
        <g id="banner">
          <path d="M 35 185 L 50 175 V 192 L 35 185 Z" fill="#78350f" />
          <path d="M 165 185 L 150 175 V 192 L 165 185 Z" fill="#78350f" />
          <path
            d="M 38 180 Q 100 195 162 180 L 154 200 Q 100 215 46 200 Z"
            fill="#f59e0b"
            stroke="#78350f"
            strokeWidth="2.5"
          />
          <text
            x="100"
            y="196"
            textAnchor="middle"
            fill="#740001"
            fontSize="12"
            fontWeight="900"
            fontFamily="serif"
            letterSpacing="1.5"
          >
            GRYFFINDOR
          </text>
        </g>
      </svg>
    );
  }

  if (house === "ravenclaw") {
    return (
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-[0_4px_16px_rgba(56,189,248,0.6)] ${className}`}
      >
        {/* Helmet crest at top */}
        <g id="helmet">
          <path d="M 82 22 Q 100 15 118 22 C 122 28 115 32 100 32 C 85 32 78 28 82 22 Z" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
          <path d="M 86 24 C 95 20 105 20 114 24" stroke="#e0f2fe" strokeWidth="3" />
          <path d="M 88 32 C 88 20 112 20 112 32 L 114 55 C 114 62 86 62 86 55 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <path d="M 94 36 H 106 M 94 42 H 106 M 94 48 H 106" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="100" cy="54" r="2.5" fill="#38bdf8" />
        </g>

        {/* Baroque Mantling Left */}
        <g id="mantling-left" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5">
          <path d="M 86 35 C 60 20 40 40 30 65 C 20 90 35 110 25 135 C 18 150 30 170 45 160 C 35 145 42 130 50 120 C 40 105 52 85 68 75 C 60 85 65 100 75 90 C 70 70 80 50 86 35 Z" />
          <path d="M 45 60 C 30 75 35 95 48 90 C 40 80 48 70 45 60 Z" fill="#cd7f32" />
        </g>

        {/* Baroque Mantling Right */}
        <g id="mantling-right" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5">
          <path d="M 114 35 C 140 20 160 40 170 65 C 180 90 165 110 175 135 C 182 150 170 170 155 160 C 165 145 158 130 150 120 C 160 105 148 85 132 75 C 140 85 135 100 125 90 C 130 70 120 50 114 35 Z" />
          <path d="M 155 60 C 170 75 165 95 152 90 C 160 80 152 70 155 60 Z" fill="#cd7f32" />
        </g>

        {/* Shield Main */}
        <g id="shield">
          <path
            d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="4"
          />

          <clipPath id="rav-shield-clip">
            <path d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z" />
          </clipPath>

          <g clipPath="url(#rav-shield-clip)">
            {/* Bronze/Bronze chevron */}
            <path d="M 60 110 L 100 70 L 140 110 L 140 130 L 100 90 L 60 130 Z" fill="#b45309" opacity="0.8" />
            <path d="M 60 125 L 100 85 L 140 125" stroke="#f59e0b" strokeWidth="3" fill="none" />
          </g>

          <path
            d="M 64 64 H 136 V 118 C 136 150 100 174 100 174 C 100 174 64 150 64 118 Z"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="2"
          />

          {/* Eagle Heraldry */}
          <g id="eagle" fill="#38bdf8" stroke="#0c4a6e" strokeWidth="0.8">
            {/* Eagle wings */}
            <path d="M 100 96 C 85 75 66 82 72 108 C 82 110 94 102 100 96 Z" fill="#0284c7" stroke="#e0f2fe" strokeWidth="1" />
            <path d="M 100 96 C 115 75 134 82 128 108 C 118 110 106 102 100 96 Z" fill="#0284c7" stroke="#e0f2fe" strokeWidth="1" />
            {/* Eagle head & beak */}
            <path d="M 100 80 C 104 74 112 78 110 85 C 106 88 98 88 96 84 Z" fill="#e0f2fe" />
            <path d="M 110 80 L 118 84 L 110 86 Z" fill="#f59e0b" />
            {/* Body */}
            <path d="M 94 94 C 92 110 96 128 100 142 C 104 128 108 110 106 94 Z" fill="#e0f2fe" />
            {/* Tail feathers */}
            <path d="M 94 136 L 100 148 L 106 136 Z" fill="#b45309" />
          </g>
        </g>

        {/* Banner Ribbon */}
        <g id="banner">
          <path d="M 35 185 L 50 175 V 192 L 35 185 Z" fill="#0c4a6e" />
          <path d="M 165 185 L 150 175 V 192 L 165 185 Z" fill="#0c4a6e" />
          <path
            d="M 38 180 Q 100 195 162 180 L 154 200 Q 100 215 46 200 Z"
            fill="#0284c7"
            stroke="#38bdf8"
            strokeWidth="2.5"
          />
          <text
            x="100"
            y="196"
            textAnchor="middle"
            fill="#e0f2fe"
            fontSize="12"
            fontWeight="900"
            fontFamily="serif"
            letterSpacing="1.5"
          >
            RAVENCLAW
          </text>
        </g>
      </svg>
    );
  }

  if (house === "slytherin") {
    return (
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-[0_4px_16px_rgba(16,185,129,0.6)] ${className}`}
      >
        {/* Helmet crest at top */}
        <g id="helmet">
          <path d="M 82 22 Q 100 15 118 22 C 122 28 115 32 100 32 C 85 32 78 28 82 22 Z" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <path d="M 86 24 C 95 20 105 20 114 24" stroke="#a7f3d0" strokeWidth="3" />
          <path d="M 88 32 C 88 20 112 20 112 32 L 114 55 C 114 62 86 62 86 55 Z" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <path d="M 94 36 H 106 M 94 42 H 106 M 94 48 H 106" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
          <circle cx="100" cy="54" r="2.5" fill="#34d399" />
        </g>

        {/* Baroque Mantling Left */}
        <g id="mantling-left" fill="#10b981" stroke="#064e3b" strokeWidth="1.5">
          <path d="M 86 35 C 60 20 40 40 30 65 C 20 90 35 110 25 135 C 18 150 30 170 45 160 C 35 145 42 130 50 120 C 40 105 52 85 68 75 C 60 85 65 100 75 90 C 70 70 80 50 86 35 Z" />
          <path d="M 45 60 C 30 75 35 95 48 90 C 40 80 48 70 45 60 Z" fill="#cbd5e1" />
        </g>

        {/* Baroque Mantling Right */}
        <g id="mantling-right" fill="#10b981" stroke="#064e3b" strokeWidth="1.5">
          <path d="M 114 35 C 140 20 160 40 170 65 C 180 90 165 110 175 135 C 182 150 170 170 155 160 C 165 145 158 130 150 120 C 160 105 148 85 132 75 C 140 85 135 100 125 90 C 130 70 120 50 114 35 Z" />
          <path d="M 155 60 C 170 75 165 95 152 90 C 160 80 152 70 155 60 Z" fill="#cbd5e1" />
        </g>

        {/* Shield Main */}
        <g id="shield">
          <path
            d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z"
            fill="#064e3b"
            stroke="#10b981"
            strokeWidth="4"
          />

          <clipPath id="sly-shield-clip">
            <path d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z" />
          </clipPath>

          <g clipPath="url(#sly-shield-clip)">
            {/* Silver Pale Stripe */}
            <rect x="85" y="60" width="30" height="120" fill="#e2e8f0" opacity="0.85" />
            <line x1="100" y1="60" x2="100" y2="180" stroke="#10b981" strokeWidth="2" />
          </g>

          <path
            d="M 64 64 H 136 V 118 C 136 150 100 174 100 174 C 100 174 64 150 64 118 Z"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="2"
          />

          {/* Coiled Serpent Heraldry */}
          <g id="snake" fill="none" stroke="#047857" strokeWidth="5" strokeLinecap="round">
            {/* Serpent body S curve */}
            <path d="M 112 85 C 80 75 80 105 110 115 C 130 122 110 148 92 140 C 80 134 86 122 96 126" stroke="#065f46" strokeWidth="8" />
            <path d="M 112 85 C 80 75 80 105 110 115 C 130 122 110 148 92 140 C 80 134 86 122 96 126" stroke="#34d399" strokeWidth="4" />
            {/* Snake head */}
            <path d="M 112 85 C 122 80 126 90 118 95 C 114 96 110 90 112 85 Z" fill="#a7f3d0" stroke="#064e3b" strokeWidth="1" />
            <circle cx="118" cy="87" r="1.5" fill="#047857" />
            {/* Forked tongue */}
            <path d="M 122 88 L 128 86 M 122 88 L 128 90" stroke="#ef4444" strokeWidth="1.2" />
          </g>
        </g>

        {/* Banner Ribbon */}
        <g id="banner">
          <path d="M 35 185 L 50 175 V 192 L 35 185 Z" fill="#064e3b" />
          <path d="M 165 185 L 150 175 V 192 L 165 185 Z" fill="#064e3b" />
          <path
            d="M 38 180 Q 100 195 162 180 L 154 200 Q 100 215 46 200 Z"
            fill="#059669"
            stroke="#34d399"
            strokeWidth="2.5"
          />
          <text
            x="100"
            y="196"
            textAnchor="middle"
            fill="#a7f3d0"
            fontSize="12"
            fontWeight="900"
            fontFamily="serif"
            letterSpacing="1.5"
          >
            SLYTHERIN
          </text>
        </g>
      </svg>
    );
  }

  // Default Hufflepuff
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`drop-shadow-[0_4px_16px_rgba(234,179,8,0.5)] ${className}`}
    >
      <g id="helmet">
        <path d="M 82 22 Q 100 15 118 22 C 122 28 115 32 100 32 C 85 32 78 28 82 22 Z" fill="#991b1b" stroke="#eab308" strokeWidth="2" />
        <path d="M 86 24 C 95 20 105 20 114 24" stroke="#facc15" strokeWidth="3" />
        <path d="M 88 32 C 88 20 112 20 112 32 L 114 55 C 114 62 86 62 86 55 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
        <path d="M 94 36 H 106 M 94 42 H 106 M 94 48 H 106" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="54" r="2" fill="#eab308" />
      </g>

      <g id="mantling-left" fill="#eab308" stroke="#854d0e" strokeWidth="1.5">
        <path d="M 86 35 C 60 20 40 40 30 65 C 20 90 35 110 25 135 C 18 150 30 170 45 160 C 35 145 42 130 50 120 C 40 105 52 85 68 75 C 60 85 65 100 75 90 C 70 70 80 50 86 35 Z" />
        <path d="M 45 60 C 30 75 35 95 48 90 C 40 80 48 70 45 60 Z" fill="#facc15" />
      </g>

      <g id="mantling-right" fill="#eab308" stroke="#854d0e" strokeWidth="1.5">
        <path d="M 114 35 C 140 20 160 40 170 65 C 180 90 165 110 175 135 C 182 150 170 170 155 160 C 165 145 158 130 150 120 C 160 105 148 85 132 75 C 140 85 135 100 125 90 C 130 70 120 50 114 35 Z" />
        <path d="M 155 60 C 170 75 165 95 152 90 C 160 80 152 70 155 60 Z" fill="#facc15" />
      </g>

      <g id="shield">
        <path
          d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z"
          fill="#facc15"
          stroke="#713f12"
          strokeWidth="4"
        />

        <clipPath id="huff-shield-clip">
          <path d="M 60 60 H 140 V 120 C 140 155 100 180 100 180 C 100 180 60 155 60 120 Z" />
        </clipPath>

        <g clipPath="url(#huff-shield-clip)">
          <rect x="100" y="60" width="10" height="120" fill="#18181b" />
          <rect x="115" y="60" width="10" height="120" fill="#18181b" />
          <rect x="130" y="60" width="10" height="120" fill="#18181b" />
          <rect x="60" y="115" width="80" height="8" fill="#18181b" />
          <rect x="60" y="140" width="80" height="8" fill="#18181b" />
        </g>

        <path
          d="M 64 64 H 136 V 118 C 136 150 100 174 100 174 C 100 174 64 150 64 118 Z"
          fill="none"
          stroke="#ca8a04"
          strokeWidth="2"
        />

        <g id="badger" fill="#18181b" stroke="#fef08a" strokeWidth="0.8">
          <path d="M 112 88 C 118 85 125 90 122 96 C 118 100 110 98 106 95 L 112 88 Z" fill="#e2e8f0" stroke="#18181b" strokeWidth="1.5" />
          <path d="M 108 90 L 120 93 L 116 97 L 106 93 Z" fill="#18181b" />
          <path d="M 85 128 C 75 120 80 102 92 98 C 100 95 108 102 114 110 C 110 120 95 132 85 128 Z" fill="#64748b" stroke="#18181b" strokeWidth="1.5" />
          <path d="M 98 98 L 92 88 L 86 92 L 94 102 Z" fill="#18181b" />
          <path d="M 106 102 L 102 90 L 96 94 L 102 106 Z" fill="#18181b" />
          <path d="M 88 124 L 80 136 L 76 132 L 84 120 Z" fill="#18181b" />
          <path d="M 95 128 L 92 142 L 86 140 L 90 125 Z" fill="#18181b" />
          <path d="M 80 122 C 72 125 68 135 72 140 C 76 138 78 130 82 126 Z" fill="#475569" />
        </g>
      </g>

      <g id="banner">
        <path d="M 35 185 L 50 175 V 192 L 35 185 Z" fill="#713f12" />
        <path d="M 165 185 L 150 175 V 192 L 165 185 Z" fill="#713f12" />
        <path
          d="M 40 180 Q 100 195 160 180 L 152 200 Q 100 215 48 200 Z"
          fill="#eab308"
          stroke="#713f12"
          strokeWidth="2.5"
        />
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
