"use client";

import React, { useState } from "react";
import { GitFork, Trophy, TableProperties } from "lucide-react";
import { BracketMatch } from "@/lib/tournaments-data";

interface TournamentBracketVisualizerProps {
  brackets: BracketMatch[];
}

export function TournamentBracketVisualizer({ brackets }: TournamentBracketVisualizerProps) {
  const [activeDivision, setActiveDivision] = useState<string>("all");

  const qfMatches = brackets.filter((b) => b.round === "quarter_finals");
  const sfMatches = brackets.filter((b) => b.round === "semi_finals");
  const finalMatches = brackets.filter((b) => b.round === "finals");
  const finalMatch = finalMatches[0];

  const championName =
    finalMatch?.player1.isWinner
      ? finalMatch.player1.name
      : finalMatch?.player2.isWinner
      ? finalMatch.player2.name
      : null;

  const championClub =
    finalMatch?.player1.isWinner
      ? finalMatch.player1.club
      : finalMatch?.player2.isWinner
      ? finalMatch.player2.club
      : null;

  const renderCleanMatchCard = (match: BracketMatch) => {
    return (
      <div
        key={match.id}
        className="w-[230px] h-[60px] bg-card border border-border/80 rounded-2xl p-1.5 flex flex-col justify-between shadow-2xs hover:border-primary/50 transition-all select-none"
      >
        {/* Player 1 Row */}
        <div
          className={`flex items-center justify-between px-2 py-0.5 rounded-lg text-xs transition-colors ${
            match.player1.isWinner
              ? "bg-muted/70 text-foreground font-bold"
              : "text-muted-foreground font-normal"
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0 pr-2">
            {match.player1.seed && (
              <span className="text-[10px] font-bold text-muted-foreground shrink-0 w-3 text-center">
                [{match.player1.seed}]
              </span>
            )}
            <span className="truncate block" title={match.player1.name}>
              {match.player1.name}
            </span>
          </div>

          <span
            className={`text-xs shrink-0 font-bold ${
              match.player1.isWinner ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {match.player1.setsWon !== undefined
              ? match.player1.setsWon
              : match.player1.score !== undefined
              ? match.player1.score.join(" ")
              : "-"}
          </span>
        </div>

        {/* Player 2 Row */}
        <div
          className={`flex items-center justify-between px-2 py-0.5 rounded-lg text-xs transition-colors ${
            match.player2.isWinner
              ? "bg-muted/70 text-foreground font-bold"
              : "text-muted-foreground font-normal"
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0 pr-2">
            {match.player2.seed && (
              <span className="text-[10px] font-bold text-muted-foreground shrink-0 w-3 text-center">
                [{match.player2.seed}]
              </span>
            )}
            <span className="truncate block" title={match.player2.name}>
              {match.player2.name}
            </span>
          </div>

          <span
            className={`text-xs shrink-0 font-bold ${
              match.player2.isWinner ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {match.player2.setsWon !== undefined
              ? match.player2.setsWon
              : match.player2.score !== undefined
              ? match.player2.score.join(" ")
              : "-"}
          </span>
        </div>
      </div>
    );
  };

  const renderResultsTableRow = (match: BracketMatch) => {
    const p1 = match.player1;
    const p2 = match.player2;
    const maxSets = Math.max(p1.gameScores?.length || 0, p2.gameScores?.length || 0, 2);
    const setIndices = Array.from({ length: maxSets }, (_, i) => i);

    return (
      <div
        key={match.id}
        className="flex items-center justify-between py-2 px-3 border-b border-border/30 hover:bg-muted/30 transition-colors text-xs"
      >
        {/* Date & Court Time */}
        <div className="w-20 sm:w-28 shrink-0 text-muted-foreground font-normal text-[11px] sm:text-xs">
          {match.matchDate || match.scheduledTime?.split(" - ")[0] || "21.10.2026"}
        </div>

        {/* Competitor Names */}
        <div className="flex-1 min-w-0 pr-4 space-y-1">
          <div
            className={`truncate ${
              p1.isWinner ? "font-bold text-foreground" : "text-muted-foreground font-normal"
            }`}
            title={p1.name}
          >
            {p1.seed ? `[${p1.seed}] ` : ""}
            {p1.name}
          </div>
          <div
            className={`truncate ${
              p2.isWinner ? "font-bold text-foreground" : "text-muted-foreground font-normal"
            }`}
            title={p2.name}
          >
            {p2.seed ? `[${p2.seed}] ` : ""}
            {p2.name}
          </div>
        </div>

        {/* Sets Won Total */}
        <div className="w-8 sm:w-10 text-center shrink-0 space-y-1 border-l border-border/40 pl-2">
          <div
            className={`text-xs ${
              p1.isWinner ? "font-bold text-foreground" : "text-muted-foreground font-normal"
            }`}
          >
            {p1.setsWon !== undefined ? p1.setsWon : p1.score?.[0] ?? "-"}
          </div>
          <div
            className={`text-xs ${
              p2.isWinner ? "font-bold text-foreground" : "text-muted-foreground font-normal"
            }`}
          >
            {p2.setsWon !== undefined ? p2.setsWon : p2.score?.[0] ?? "-"}
          </div>
        </div>

        {/* Individual Game Scores (Set 1, Set 2, Set 3) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pl-3">
          {setIndices.map((idx) => (
            <div key={idx} className="w-6 sm:w-7 text-center space-y-1 text-[11px]">
              <div
                className={`${
                  p1.gameScores && p2.gameScores && (p1.gameScores[idx] || 0) > (p2.gameScores[idx] || 0)
                    ? "font-medium text-foreground"
                    : "text-muted-foreground font-normal"
                }`}
              >
                {p1.gameScores?.[idx] !== undefined ? p1.gameScores[idx] : "-"}
              </div>
              <div
                className={`${
                  p1.gameScores && p2.gameScores && (p2.gameScores[idx] || 0) > (p1.gameScores[idx] || 0)
                    ? "font-medium text-foreground"
                    : "text-muted-foreground font-normal"
                }`}
              >
                {p2.gameScores?.[idx] !== undefined ? p2.gameScores[idx] : "-"}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <GitFork className="w-4 h-4 text-primary" />
            <span>Kết quả & sơ đồ nhánh đấu</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
            Bảng tỷ số chi tiết và sơ đồ nhánh đấu loại trực tiếp.
          </p>
        </div>

        {/* Division Selector Pills */}
        <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-2xl border border-border/60 self-start sm:self-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveDivision("all")}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeDivision === "all"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Đôi Nam Nữ Open
          </button>
          <button
            type="button"
            onClick={() => setActiveDivision("men-singles")}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeDivision === "men-singles"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Đơn Nam
          </button>
          <button
            type="button"
            onClick={() => setActiveDivision("women-doubles")}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeDivision === "women-doubles"
                ? "bg-background text-foreground shadow-2xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Đôi Nữ
          </button>
        </div>
      </div>

      {/* 1. MATCH RESULTS TABLE */}
      <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <TableProperties className="w-4 h-4 text-primary" />
            <span>Bảng kết quả các trận đấu</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-normal">
            <span className="w-8 sm:w-10 text-center font-medium">Set</span>
            <span className="w-6 sm:w-7 text-center">S1</span>
            <span className="w-6 sm:w-7 text-center">S2</span>
            <span className="w-6 sm:w-7 text-center">S3</span>
          </div>
        </div>

        <div className="space-y-3">
          {/* FINAL ROUND */}
          {finalMatches.length > 0 && (
            <div className="space-y-1.5">
              <div className="px-3 py-1 rounded-lg bg-muted/60 text-xs font-semibold text-muted-foreground">
                Trận Chung Kết (Final)
              </div>
              <div className="rounded-xl overflow-hidden border border-border/50">
                {finalMatches.map(renderResultsTableRow)}
              </div>
            </div>
          )}

          {/* SEMI-FINALS ROUND */}
          {sfMatches.length > 0 && (
            <div className="space-y-1.5">
              <div className="px-3 py-1 rounded-lg bg-muted/60 text-xs font-semibold text-muted-foreground">
                Vòng Bán Kết (Semi-Finals)
              </div>
              <div className="rounded-xl overflow-hidden border border-border/50">
                {sfMatches.map(renderResultsTableRow)}
              </div>
            </div>
          )}

          {/* QUARTER-FINALS ROUND */}
          {qfMatches.length > 0 && (
            <div className="space-y-1.5">
              <div className="px-3 py-1 rounded-lg bg-muted/60 text-xs font-semibold text-muted-foreground">
                Vòng Tứ Kết (Quarter-Finals)
              </div>
              <div className="rounded-xl overflow-hidden border border-border/50">
                {qfMatches.map(renderResultsTableRow)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. BRACKET TREE VISUALIZER */}
      <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xs overflow-x-auto">
        <div className="w-[1040px] pb-4 pt-1">
          {/* Round Stage Headers */}
          <div className="flex items-center text-xs font-semibold text-muted-foreground pb-4 mb-4 border-b border-border/50">
            <div className="w-[230px] pl-1">Vòng Tứ Kết</div>
            <div className="w-[40px]" />
            <div className="w-[230px] pl-1">Vòng Bán Kết</div>
            <div className="w-[40px]" />
            <div className="w-[230px] pl-1">Trận Chung Kết</div>
            <div className="w-[40px]" />
            <div className="w-[230px] pl-1">Nhà Vô Địch</div>
          </div>

          {/* Bracket Tree Layout with Pixel-Perfect SVG Connectors */}
          <div className="relative flex items-start h-[340px]">
            {/* COLUMN 1: QUARTER FINALS */}
            <div className="w-[230px] shrink-0 flex flex-col justify-between h-full">
              <div className="space-y-6">
                {qfMatches[0] && renderCleanMatchCard(qfMatches[0])}
                {qfMatches[1] && renderCleanMatchCard(qfMatches[1])}
              </div>
              <div className="space-y-6">
                {qfMatches[2] && renderCleanMatchCard(qfMatches[2])}
                {qfMatches[3] && renderCleanMatchCard(qfMatches[3])}
              </div>
            </div>

            {/* CONNECTOR 1: QF -> SF */}
            <div className="w-[40px] h-full shrink-0 relative">
              <svg className="w-full h-full text-border stroke-current fill-none stroke-[1.5]">
                <path d="M 0 30 H 20 V 72 H 40" strokeLinejoin="round" />
                <path d="M 0 114 H 20 V 72" strokeLinejoin="round" />
                <path d="M 0 226 H 20 V 268 H 40" strokeLinejoin="round" />
                <path d="M 0 310 H 20 V 268" strokeLinejoin="round" />
              </svg>
            </div>

            {/* COLUMN 2: SEMI FINALS */}
            <div className="w-[230px] shrink-0 h-full relative">
              <div className="absolute top-[42px] left-0">
                {sfMatches[0] && renderCleanMatchCard(sfMatches[0])}
              </div>
              <div className="absolute top-[238px] left-0">
                {sfMatches[1] && renderCleanMatchCard(sfMatches[1])}
              </div>
            </div>

            {/* CONNECTOR 2: SF -> FINALS */}
            <div className="w-[40px] h-full shrink-0 relative">
              <svg className="w-full h-full text-border stroke-current fill-none stroke-[1.5]">
                <path d="M 0 72 H 20 V 170 H 40" strokeLinejoin="round" />
                <path d="M 0 268 H 20 V 170" strokeLinejoin="round" />
              </svg>
            </div>

            {/* COLUMN 3: FINALS */}
            <div className="w-[230px] shrink-0 h-full relative">
              <div className="absolute top-[140px] left-0">
                {finalMatch && renderCleanMatchCard(finalMatch)}
              </div>
            </div>

            {/* CONNECTOR 3: FINALS -> CHAMPION */}
            <div className="w-[40px] h-full shrink-0 relative">
              <svg className="w-full h-full text-border stroke-current fill-none stroke-[1.5]">
                <path d="M 0 170 H 40" strokeLinejoin="round" />
              </svg>
            </div>

            {/* COLUMN 4: CHAMPION SHOWCASE */}
            <div className="w-[230px] shrink-0 h-full relative">
              <div className="absolute top-[125px] left-0">
                {championName ? (
                  <div className="w-[210px] bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-2xl p-3.5 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                      <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Cúp Vô Địch</span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-foreground truncate">
                      {championName}
                    </div>
                    {championClub && (
                      <p className="text-xs text-muted-foreground font-normal truncate">
                        {championClub}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="w-[210px] border border-dashed border-border/80 rounded-2xl p-4 text-center text-xs text-muted-foreground font-normal">
                    Chưa xác định nhà vô địch
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
