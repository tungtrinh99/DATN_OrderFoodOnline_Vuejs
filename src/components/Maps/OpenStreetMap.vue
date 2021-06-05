<template>
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-geosearch :options="geosearchOptions" style="width:100%"/>
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
       <l-marker v-for="(marker,index) in waypoints" :key="index" :lat-lng="marker">
        <l-popup>
          <div >
            I am a popup
          </div>
        </l-popup>
      </l-marker>
      <l-routing-machine :waypoints="waypoints"/>
    </l-map>
    
</template>
<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
import LGeosearch from "vue2-leaflet-geosearch";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
import LRoutingMachine from "./LRoutingMachine"
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "osm",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LGeosearch,
    LRoutingMachine 
  },
  props:{
    waypoints : {
      type : Array,
      default : {}
    }
  },
  data() {
   
    return {
      zoom: 14,
      center: latLng(21.0278, 105.8342),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 13,
      currentCenter: latLng(21.0278, 105.8342),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      geosearchOptions: {
        provider: new OpenStreetMapProvider(),
      },
      markers : [
        {lat : 21.004856735069424  , lng : 105.82219399999997}
        ,{lat : 21.035668435608027, lng :105.8524185}
      ]
      
    };
  },
  methods: {
   
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.center = center;
      this.$emit('coordinates',center)
    

    },
    
  },
};
</script>
<style scoped>
.leaflet-top.leaflet-right{
  display : none;
}
</style>
