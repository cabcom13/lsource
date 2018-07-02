<template>
  <div class="hello">
<v-toolbar flat dense color="blue accent-1">
    <span class="tpt">Alle Quellen</span>
    <v-spacer></v-spacer>

</v-toolbar>
<v-container>
    <div v-for="location in locations" :key="location.id" class="mb-3">
      <div v-if="convertHashTags(location)">
       
          <pre v-html="convertHashTags(location)"></pre>
    
      </div>
    </div>
</v-container>
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
        //

        //<(\w+)\s?([\s\S]*?)[\s\/]?>(?:([\s\S]*?)<\/\1>)?
        return _str.replace(/<([\w]+)(.*?)>/gi, function(match, p1,p2,p3){
            let tmp = '';
           

            if(match){
              
              if(str[p1]){
                let x ='';
                  tmp = str[p1]
                  if(p2){

                    x = p2.replace(/(\w+)(?:=["']?([^"']*)["']?)?/gi, function(match, a1,a2,a3){
                      if(a1 == 'ap'){
                        tmp = a2+str[p1]
                      } 
                      if(a1 == 'pre'){
                        tmp += a2
                      } 
                    });
                    

                  }
                  if(!x)
                  tmp = str[p1]
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
