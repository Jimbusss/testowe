<template>
  <button 
    @click="togglePolygon"
    style="height: 50px; width: 100%; position: fixed; top: 0; left: 0; text-align: center; z-index: 9999;"
  >
    {{ widocznosc ? 'Ukryj poligon' : 'Pokaż poligon' }}
  </button>
  <div id="map" style="width: 100%; height: 500px; background-color: #ccc;"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'
import { Style, Fill, Stroke } from 'ol/style'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'

const props = defineProps<{
  city: string
}>()

const widocznosc = ref(true)
let vectorLayer: VectorLayer | null = null 
let map: Map | null = null
let view: View | null = null

const togglePolygon = () => {
  widocznosc.value = !widocznosc.value 
  if (vectorLayer) {
    vectorLayer.setVisible(widocznosc.value)
  }
}

const centerMapOnCity = async (cityName: string) => {
  if (!cityName || !view) return
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`)
    const data = await response.json()

    if (data && data.length > 0) {
      const lon = parseFloat(data[0].lon)
      const lat = parseFloat(data[0].lat)
      view.animate({
        center: fromLonLat([lon, lat]),
        zoom: 13,
        duration: 1500
      })
    }
  } catch (e) {
    console.error("Błąd podczas pobierania współrzędnych:", e)
  }
}

watch(() => props.city, (newCity) => {
  void centerMapOnCity(newCity)
}, {deep: true})

onMounted(() => {
  const polygonCoordsGeo = [
    [22.5500, 51.2600],
    [22.5800, 51.2600],
    [22.5800, 51.2400],
    [22.5500, 51.2400],
    [22.5500, 51.2600] 
  ]

  try {
    const transformedCoords = polygonCoordsGeo.map(coord => fromLonLat(coord))

    const polygonFeature = new Feature({
      geometry: new Polygon([transformedCoords])
    })

    const style = new Style({
      fill: new Fill({ color: 'rgba(0, 0, 255, 0.2)' }),
      stroke: new Stroke({ color: 'blue', width: 3 })
    })

    const vectorSource = new VectorSource({ features: [polygonFeature] })

    vectorLayer = new VectorLayer({
      source: vectorSource,
      style: style,
      visible: widocznosc.value
    })
    
    view = new View({
      center: fromLonLat([19.1451, 51.9194]), 
      zoom: 6,
    })

    map = new Map({
      target: 'map',
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer
      ],
      view: view
    })

    setTimeout(() => {
      map?.updateSize()
    }, 200)
    
  if (props.city) {
    void centerMapOnCity(props.city)
  }

  } catch (error) {
    console.error("Błąd podczas inicjalizacji mapy:", error)
  }
})
</script>