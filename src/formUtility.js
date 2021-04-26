export default {
  methods: {
    generateFormData(config) {
      let data = {}
      if (config == 'location') {
        data['title'] = "";
        data['full_address'] = "";
        data['province_id'] = null
        data['district_id'] = null
        data['ward_id'] = null
        data['province_title'] = null
        data['district_title'] = null
        data['ward_title'] = null

      }
      return data;
    }
  }
}
