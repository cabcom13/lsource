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
                        <codemirror v-model="ds.datatyps[key]"  :options="editorOption"></codemirror>
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
// language js

import 'codemirror/mode/htmlmixed/htmlmixed.js'
// theme css
import 'codemirror/theme/mdn-like.css'

export default {
  name: 'App',
  data: () => {
    return {
     editorOption: {
        // codemirror options
        tabSize: 4,
        height:'20px',
        mode: 'text/javascript',
        theme: 'mdn-like',
        lineNumbers: false,
        line: false,
        // more codemirror options, 更多 codemirror 的高级配置...
      },
     sources:[],   
     ds:{
       datatyps:[]
     }
    }

  },
  methods: {
        onCmReady(cm) {
      console.log('the editor is readied!', cm)
        },
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
<style>

h5{
    
}
</style>
