<template>
  <div class="hello">
    {{authors_str}}
<v-container grid-list-lg >
    <v-card>
        <v-toolbar flat>
            <v-toolbar-title>Quelle hinzufügen</v-toolbar-title>
            <v-spacer></v-spacer>
           
                <v-btn
                
                @click="save"
                icon
                large
                target="_blank"
                >
                <v-icon large>save</v-icon>
                </v-btn>
          
            
        </v-toolbar>
        <v-card-text>
            <form @submit.prevent="getFormValues">
 

                    <v-container grid-list-lg>
                        <v-layout row wrap >
                        <v-flex xs12>
                            <v-select
                                v-model="sourcetyp"
                                :items="items"
                                label="Quellentyp"
                                item-text="txt"
                                item-value="id"

                                ></v-select>
                        </v-flex>
                        </v-layout>
                        <div v-if="sourcetyp=='book'">
                            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                                <v-btn slot="activator">ISBN Buchsuche</v-btn>
                                <v-card>
                                    <v-toolbar dark color="primary">
                                    <v-btn icon dark @click.native="dialog = false">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>Settings</v-toolbar-title>
                      
                                    </v-toolbar>
                                    <v-container grid-list-md text-xs-center class="mt-3">
                                            <v-layout row wrap>
                                                <v-flex xs8>
                                                    <v-text-field required v-model="ISBNsearchterm" label="Suche..."></v-text-field>
                                                </v-flex>
                                                <v-flex xs1>
                                                    <v-btn @click="doISBNSerach()" :disabled="ISBNsearchterm==''">Suche</v-btn>   
                                                </v-flex>
                                            </v-layout>
                                    </v-container>
                                     
                                    
                                   
                                    <v-list two-line>
                                    <v-subheader >{{res.totalItems}} Ergebnisse </v-subheader>
                                    <template v-for="(item, index) of res.items">
                                        
                                        <v-list-tile :key="item.title" avatar @click="takeBookData(item.volumeInfo)">
                                
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="item.volumeInfo.title"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="item.volumeInfo.description"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        </v-list-tile>
                                        <v-divider :key="index"></v-divider>
                                    </template>
                                    </v-list>
   
        
                                     
                                </v-card>
                            </v-dialog>
                        <v-layout row wrap v-for="(author,i) of authors" :key="i">
                            <v-flex xs5>
                                <v-text-field 
                                    v-model="author.name"
                                    label="Name des/der AutorIn / des/der HerausgeberIn"
                                    value=""
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs1>
                              
                            </v-flex>
                            <v-flex xs5>
                                <v-text-field                                
                                    v-model="author.prename"
                                    label="Vorname"
                                    value=""
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs1>                             
                                <v-btn v-if="i!=0" icon flat @click="removeAuthor(i)"> <v-icon>remove</v-icon></v-btn>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap >
                            <v-flex xs12>
                                <v-btn small @click="addauthor()">weitere Author</v-btn>
                            </v-flex>

                            <v-flex xs12>
                                    <v-text-field         
                                    v-model="erscheinungsjahr"
                                    label="Erscheinungsjahr"
                                    value=""
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="titel" label="Titel"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="untertitel" label="Untertitel"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="erscheinungsort" label="Erscheinungsort"></v-text-field>  
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="verlag" label="Verlag"></v-text-field>
                            </v-flex>

                        </v-layout>
                        </div>
                        </v-container>
             </form>
        </v-card-text>
    </v-card>
</v-container>
   
  </div>
</template>

<script>
import {db} from '../firebase';  
import axios from 'axios';

export default {
  name: 'App',
  data: () => {
    return {
    dialog: false,
    ISBNsearchterm:'isbn:9783784130309',
    res:'asdasd',
    sourcetyp: 'book',
    erscheinungsjahr:'',
    titel:'',
    untertitel:'',
    auflage:'',
    erscheinungsort:'',
    verlag:'',
    authors:[{ name: '', prename:'' }],
      items: [
        {txt:'Büchern/Monografien', id:'book'},
        {txt:'Beiträgen und Artikeln aus Handbüchern,Sammelbänden und Lexika ', id:'article'},
        'Item 3',
        'Item 4'
      ],
     ds:{
       datatyps:[]
     }
    }

  },
  created: () => {
   
  },
  computed: {
      authors_str(){
         let str = ''; 
         this.authors.map(function(value, key) {
             console.log(value.name)
            if(value.name && value.prename){
                str += value.name +', '+ value.prename+'; ';
            }
            
         });
         return str.slice(0, -2);
      }
  },
  methods: {
        doISBNSerach(){
            if(this.ISBNsearchterm){
                axios.get('https://www.googleapis.com/books/v1/volumes?q='+this.ISBNsearchterm).then(function(response){
                    console.log(response.data)
                this.res = response.data
                }.bind(this))
            }
      

      },
      takeBookData(volumeInfo){
          this.dialog = false
          this.titel = volumeInfo.title
          var self = this;

            if(volumeInfo.subtitle){
                this.untertitel = volumeInfo.subtitle
            }
            self.authors = []
            volumeInfo.authors.map(function(value, key) {
                let x = value.split(' ');
                self.authors.push({name:x[0], prename:x[1]})
            });
 
          

          this.erscheinungsjahr = volumeInfo.publishedDate
            console.log(volumeInfo.authors)
      },
      save(){
         db.collection('sources').add({

                type:this.sourcetyp,
                titel:this.titel,
                author: this.authors_str,
                erscheinungsjahr: this.erscheinungsjahr,
                untertitel:this.untertitel,
                auflage:this.auflage,
                erscheinungsort: this.erscheinungsort,
                verlag:this.verlag,
                sort:10
            }).then(function() {
                console.log("Document successfully written!");
            });
      },
      addauthor(){
        this.authors.push({ name: '', prename:'' })
      },
      removeAuthor(i){
        this.authors.splice(i, 1);       
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
