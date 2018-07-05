<template>
  <div class="hello">
<v-toolbar flat dense color="blue lighten-3">
    <span class="tpt">Quelle hinzufügen</span>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn small flat @click="save()">Speichern</v-btn>
    </v-toolbar-items>
</v-toolbar>

<v-container grid-list-lg >
    <v-card>
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
                                    <v-toolbar dark >
                                    <v-btn icon dark @click.native="dialog = false">
                                        <v-icon>close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>Buchsuche</v-toolbar-title>
                      
                                    </v-toolbar>
                                    <v-toolbar flat dense color="blue lighten-3">
                                            <form class="searchform" v-on:submit.prevent="doISBNSerach">
                                                <input class="toolbar_search" type="text" v-model="ISBNsearchterm" placeholder="Suchbegriff/ISBN Nummer etc."/>
                                                <v-btn @click="doISBNSerach" :loading="loading" icon flat :disabled="ISBNsearchterm==''"><v-icon>search</v-icon></v-btn>   
                                            </form>
                                    </v-toolbar>
                                  
                                    <v-list two-line>
                                     
                                    <v-subheader >Ergebniss(e) </v-subheader>
                                    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
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
                            <v-dialog
                            v-model="savedialog"
                            hide-overlay
                            persistent max-width="290"
                            >
                            <v-card>
                                <v-card-text>
                                Quelle wurde gespeichert
                                </v-card-text>
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="green darken-1" flat @click.native="savedialog = false">Ok</v-btn>
                                </v-card-actions>
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
    props: {
        docid:''
    },

  data: () => {
    return {
    sources:[],
    savedialog:false,
    loading:false,
    dialog: false,
    ISBNsearchterm:'',
    res:'asdasd',
    sourcetyp: 'book',
    erscheinungsjahr:'',
    titel: '',
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
  created() {
   console.log(this.docid)
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
                this.res = [];
                this.loading = true;
                axios.get('https://www.googleapis.com/books/v1/volumes?q='+this.ISBNsearchterm).then(function(response){
                    console.log(response.data)
                this.res = response.data
                this.loading = false;
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
          let self = this;
         
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
                self.savedialog = true
                self.sourcetyp = 'book'
                self.titel= ''
                self.erscheinungsjahr= ''
                self.untertitel= ''
                self.authors = [{ name: '', prename:'' }],
                self.auflage = '',
                self.erscheinungsort= ''
                self.verlag= ''
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
        sources: db.collection('sources').doc(this.docid)
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchform{
    width:100%;
}
.toolbar_search{
    background:rgba(255,255,255,.2);
    padding:.4rem;
    font-weight: 100;
    font-size:1.2rem;
    width: 90%;
    margin-top:6px;
    float: left;
}
.toolbar_search:focus{
 border:none;
 outline: none;
}
.toolbar_search::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(21,21,21,.9);
    opacity: 1; /* Firefox */
}
</style>
