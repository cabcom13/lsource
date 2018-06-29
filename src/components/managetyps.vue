<template>
  <div class="hello">

<v-container grid-list-lg >
    <div v-for="(da, key) of ds.datatyps" :key="key">
        <v-layout row warp>
        <v-flex xs12>
            <v-card>
                <v-card-text>
                    <div>
                        <h5 v-if="key == 'book'">Aufnahme von Büchern/Monografien ({{key}})</h5>
                        <v-text-field v-model="ds.datatyps[key]" ></v-text-field>
                    </div>
                </v-card-text>

            </v-card>
        </v-flex>
        </v-layout> 
    </div>

<v-btn @click="save(ds)">Speichern</v-btn>

</v-container>
   
  </div>
</template>

<script>

import {db} from '../firebase';  


export default {
  name: 'App',
  data: () => {
    return {
     sources:[],   
     ds:{
       datatyps:[]
     }
    }

  },
  created: () => {
    console.log(this.root);
  },
  computed: {

  },
  methods: {
      save:(ds)=>{
         let self = ds.datatyps; 
         db.collection('datatyps').doc('uTqjh8FkQEFz03x434aV').update({ datatyps:self })   
           
      }
  },
  firestore () {
    return {
        ds: db.collection('datatyps').doc('uTqjh8FkQEFz03x434aV'),
        sources: db.collection('sources')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
