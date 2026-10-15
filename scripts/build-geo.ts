import fs from "fs";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { Feature, FeatureCollection, Geometry, Position } from "geojson";

// Regenerates the globe data in public/geo from world-atlas (Natural Earth 1:110m).
// Run with: npx tsx scripts/build-geo.ts

const world = JSON.parse(fs.readFileSync("node_modules/world-atlas/countries-110m.json", "utf8")) as Topology<{
  countries: GeometryCollection;
  land: GeometryCollection;
}>;

type Nested = Position | Nested[];
const round = (c: Nested): Nested => (typeof c[0] === "number" ? [+(c[0] as number).toFixed(2), +(c[1] as number).toFixed(2)] : (c as Nested[]).map(round));
const slim = (g: Geometry): Geometry => ({ ...g, coordinates: round((g as { coordinates: Nested }).coordinates) } as Geometry);

const land = feature(world, world.objects.land) as FeatureCollection;
const brazilGeometry = world.objects.countries.geometries.find((g) => g.id === "076");
if (!brazilGeometry) throw new Error("Brazil (076) not found in world-atlas");
const brazil = feature(world, brazilGeometry) as Feature;

fs.mkdirSync("public/geo", { recursive: true });
fs.writeFileSync(
  "public/geo/land.json",
  JSON.stringify({ type: "FeatureCollection", features: land.features.map((f) => ({ type: "Feature", properties: {}, geometry: slim(f.geometry) })) }),
);
fs.writeFileSync("public/geo/brazil.json", JSON.stringify({ type: "Feature", properties: { name: "Brazil" }, geometry: slim(brazil.geometry) }));
console.log("✔ public/geo/land.json and public/geo/brazil.json written");
