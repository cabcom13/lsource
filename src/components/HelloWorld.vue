<template>
  <div class="hello">

    <div v-for="location in locations" :key="location.id" class="mb-3">
      <div v-if="convertHashTags(location)">
       
          <pre v-html="convertHashTags(location)"></pre>
    
      </div>
    </div>

  </div>
</template>

<script>

import {db} from '../firebase';  


export default {
  name: 'App',
  data: () => {
    return {
     locations:[],
     ds:{
       datatyps:[]
     }
    }

  },
  created: () => {
    //console.clear();
    
  },
  computed: {
    fullName: function () {

      return this.content
    }
  },
  methods: {

    convertHashTags(str) {
    
      let _str = (this.ds.datatyps[str.type]);
      if(!_str) return
      _str.toLowerCase();
      if (_str){ 
        //   {([\w]+)}
        //  /#([\w]+)/g
        //{(.*?)([\w]+)(.*?)}
        //{([\w]+)}
        return _str.replace(/{(.*?)([\w]+)(.*?)}/g, function(match, p1,p2,p3){
            let tmp = '';
            if(match){
              
              if(str[p2]){
                  tmp = p1+str[p2]+p3
              }

                return tmp;
            } else {
              
              return false
            }
            
        });
        }
 

    }
  
  },
  firestore () {
    return {
      locations: db.collection('sources').orderBy('sort','asc'),
      ds: db.collection('datatyps').doc('uTqjh8FkQEFz03x434aV')
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
