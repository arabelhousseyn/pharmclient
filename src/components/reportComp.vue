<template>
    <div style="text-align:center; min-height:350px;">
        <div class="container">
            <div class="row">
                <div v-for="(rec,index) in recs" :key="index" v-if="recs.length > 0" class="col-lg-12">
                    <div class="card" @click="go(rec)" style="width: auto;margin: 0 30% 0 30%;">
  <div class="card-body">
    <h5 class="card-title">N commande : {{rec.ref_commande}}</h5>
    <h6 class="card-subtitle mb-2 text-muted">Date reclamation :{{rec.date_note}}</h6>
    <p class="card-text">Note : {{rec.note}}</p>
  </div>
</div>
 <button data-toggle="modal" data-target="#reportmodal" @click="format(rec)" class="btn btn-success"><font-awesome-icon icon="eye" /></button>
                </div>
                <div v-if="recs.length == 0" class='col-lg-12'>
                    <div class="card" style="width: auto;margin: 0 30% 0 30%;">
  <div class="card-body">
    <p class="card-text">Pas de reclamations</p>
  </div>
</div>
                </div>
            </div>
        </div>
        <reportModal :value="value" v-if="value != null" />
    </div>
</template>

<script>
import axios from 'axios'
import reportModal from '../modals/reportModal.vue'
export default {
    data : ()=>{
        return{
            recs : [],
            value : null,
        }
    },
    components : {
        reportModal
    },
    methods : {
        go(value)
    {
        this.$router.push('/commande/' + value.ref_commande)
    },
    format(value)
    {
        this.value = value
    }
    },
    created()
    {
        var run = axios.post(this.link() + 'reclamationsbyclient',{id : localStorage.getItem('clientID')},this.cors())
        run.then(e=>{
            if(e.status == 200)
            {
                this.recs = e.data
            }else{
                this.statu('Erreur dans server','error')
            }
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>