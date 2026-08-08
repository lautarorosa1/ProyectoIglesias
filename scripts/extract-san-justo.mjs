import * as topojson from "topojson-client";
import topo from "./departamentos-cordoba.topojson.json" with { type: "json" };
const geo = topojson.feature(topo, topo.objects.departamentos ?? topo.objects[Object.keys(topo.objects)[0]]);

const sanJusto = geo.features.find(
  f => f.properties.departamento === "SAN JUSTO"
);

console.log(JSON.stringify(sanJusto, null, 2));

//UTILIZO TODO ESTO PARA PONER EL CONTORNO EN EL DEPARTAMENTO SAN JUSTO