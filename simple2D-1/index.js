require(["esri/Map", "esri/layers/CSVLayer", "esri/views/MapView", "esri/widgets/Legend"],
function(Map, CSVLayer, MapView, Legend) {
  // Template pre popup okno (maptip), ktoré sa zobrazí po kliknutí na objekt
  var template = {
    title: "{city}",
    content: "GPS poloha: <b>{latitude}, {longitude}</b><br>" + 
      "Rozloha: <b>{area} km<sup>2</sup></b><br>" + 
      "Hustota osídlenia: <b>{citizensDensity} obyvateľov / km<sup>2</sup></b><br>" +
      "Počet obyvateľov: <b>{citizensCount}</b><br>" +
      "Prvá písomná zmienka: <b>rok {firstMention}</b><br>" +
      "Priemerné / maximálne svetelné znečistenie: <b>{lightPollutionAvg} / {lightPollutionMax}</b>"
  };

  // Renderer, ktorý určuje, ako sa majú vykresľovať body do mapy
  var renderer = {
    type: "simple",
    symbol: {
      type: "simple-marker",
      size: 10,
      // ---^---- definovaná pevná veľkosť
      color: [255, 0, 0, 0.5]
      // ----^--- definovaná nemenná farba
    }
  };

  // Vrstva so zdrojom údajov typu csv
  var csvLayer = new CSVLayer({
    url: "http://www.mocky.io/v2/5c7e5f98310000970e3762cb",
    popupTemplate: template,
    renderer: renderer,
    title: "Mestá nad 20 000 obyvateľov"
  });

  // Mapový objekt
  var map = new Map({
    basemap: "gray",
    layers: [csvLayer]
  });

  // 2D zobrazenie mapy
  var view = new MapView({
    container: "map",
    center: [19.5, 48.7],
    zoom: 8,
    map: map
  });

  // Pridanie legendy do 2D zobrazenia mapy
  view.ui.add(new Legend({
    view: view
  }), "bottom-right");
});