import type React from "react";
import { Composition, Still } from "remotion";
import { CASE_FILM, CaseFilm } from "./CaseFilm";
import { GENESIS, Genesis } from "./Genesis";
import { OG_STILL, OgStill } from "./OgStill";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Genesis"
        component={Genesis}
        durationInFrames={GENESIS.durationInFrames}
        fps={GENESIS.fps}
        width={GENESIS.width}
        height={GENESIS.height}
        defaultProps={{}}
      />
      <Still
        id="OgStill"
        component={OgStill}
        width={OG_STILL.width}
        height={OG_STILL.height}
        defaultProps={{ page: "home", locale: "pt" as const }}
      />
      <Composition
        id="CaseFilm"
        component={CaseFilm}
        durationInFrames={CASE_FILM.durationInFrames}
        fps={CASE_FILM.fps}
        width={CASE_FILM.width}
        height={CASE_FILM.height}
        defaultProps={{ slug: "fuoco" as const, locale: "pt" as const }}
      />
    </>
  );
};
