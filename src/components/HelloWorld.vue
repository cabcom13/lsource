<template>
  <div class="hello">
    <v-toolbar flat dense color="blue lighten-3">
        <span class="tpt">Alle Quellen</span>
        <v-spacer></v-spacer>
    <v-btn flat  @click="toggleSortBtn">Sortieren</v-btn>
    </v-toolbar>
    <v-list avatar>
      <draggable v-model="locations" :options="{handle:'.handle', ghostClass:'ghost'}" @update="onUpdate">
        <v-list-tile v-for="location in locations" :key="location.id" avatar>
          <v-list-tile-action >
              <v-icon  color="grey lighten-1" class="handle">reorder</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title  v-html="convertHashTags(location)"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon ripple :to="'/editsource/'+location.id">
              <v-icon color="grey lighten-1">edit</v-icon>
            </v-btn>
          </v-list-tile-action>    
        </v-list-tile>
      </draggable>
    </v-list>
  </div>
</template>

<script>

import {db} from '../firebase';  
import draggable from 'vuedraggable'


export default {
  name: 'App',
  components: {
    draggable,
  },
  data: () => {
    return {
      sortable: false,
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
    toggleSortBtn(){
      if(this.sortable){
          this.sortable = false
      } else {
          this.sortable = true
      }
        
    },
    onUpdate(event){
      let count = 0;
      let self  = this;
      //self.locations.splice(event.newIndex, 0, self.locations.splice(event.oldIndex, 1)[0])


      self.locations.map(function(value, key) {
          
         db.collection('sources').doc(self.locations[key].id).update({
              sort: count
          })
          .then(function() {
            
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });

          count = count+1;
  
       });
    },
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
.v-list__tile__action, .v-list__tile__content{
  border-bottom:1px solid rgba(21,21,21,.2);
}
.ghost {
  opacity: .5;
  background: #C8EBFB;
}
.handle{
  cursor: move;
	cursor: -webkit-grabbing;
}
</style>
