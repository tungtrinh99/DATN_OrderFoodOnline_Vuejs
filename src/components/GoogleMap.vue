<template>
  <div>
    <div>
      <h2>Chọn điểm nhận hàng</h2>
      <GmapAutocomplete @place_changed="setPlace" :style="{width:'100%',height:'32px',borderRadius:'4px',border:'1px solid #d9d9d9'}"/>
      <!-- <a-button @click="addMarker"> Thêm </a-button> -->
    </div>
    <br />
    <GmapMap :center="center" :zoom="12" style="width: 100%; height: 450px">
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import EventBus from "../event-bus";
export default {
  name: "GoogleMap",
  data() {
    return {
      center: { lat: 21.0278, lng: 105.8342 },
      currentPlace: null,
      markers: [],
      places: [],
    };
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace(place) {
      this.currentPlace = place;
      console.log(place);
    }, 
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.$emit('addToListAddress',{address:this.currentPlace.formatted_address,marker:marker})
        this.currentPlace = null;
        
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
  },
  created(){
    EventBus.$on('addMarker',this.addMarker)
  },
  destroyed(){
    EventBus.$off('addMarker',this.addMarker)
  }
};
</script>