<template>
  <div class="hello">
<v-toolbar flat dense color="blue lighten-3">
    <span class="tpt">Formatvorlage bearbeiten</span>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat dense @click="save(ds)">Speichern</v-btn>

    </v-toolbar-items>
</v-toolbar>
<v-container grid-list-lg >
    <div v-for="(da, key) of ds.datatyps" :key="key">
        <v-layout row warp>
        <v-flex xs12>
            <v-card >
                <v-toolbar flat dense color="blue-grey lighten-4">
                    <v-toolbar-title v-if="key == 'book'" style="font-size:1.1rem;">Aufnahme von Büchern/Monografien ({{key}})</v-toolbar-title>
                    <v-toolbar-title v-if="key == 'media'" style="font-size:1.1rem;">Aufnahme von Büchern/Monografien ({{key}})</v-toolbar-title>

                </v-toolbar>
                <v-card-text>
                    <div>
                        <codemirror v-model="ds.datatyps[key]"  :options="editorOption"></codemirror>
                    </div>
                </v-card-text>

            </v-card>
        </v-flex>
        </v-layout> 
    </div>

</v-container>
<div class="infobox">
Verfügbare Tags:  


</div> 
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
computed: {

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
<style scoped>
header{
    background:red;
    height:45px;
}
.tbt{
    text-transform: uppercase;
    font-size:2rem!important;
    color:red;
}
.infobox{
    padding:1rem;
    background:rgba(21,21,21,.2);
    height:auto;
}
</style>
