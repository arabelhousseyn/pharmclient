<template>
    <div style="text-align:center; min-height:350px;">
        <div class="container">
            <div class="row">
                <div v-for="(rec,index) in recs" :key="index" v-if="recs.length > 0" class="col-lg-12">
                    <div class="card" @click="go(rec)" style="width: auto;margin: 0 30% 0 30%;">
  <div class="card-body">
    <h5 class="card-title">{{rec.ref_commande}}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{{rec.date_note}}</h6>
    <p class="card-text">{{rec.note}}</p>
  </div>
</div>
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
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data : ()=>{
        return{
            recs : []
        }
    },
    methods : {
        go(value)
    {
        this.$router.push('/commande/' + value.ref_commande)
    },
    },
    created()
    {
        var run = axios.post(this.link() + 'reclamationsbyclient',{id : localStorage.getItem('clientID')},this.cors())
        run.then(e=>{
            this.recs = e.data
        })
        run.catch(e=>{
            console.log('err')
        })
    }
}
</script>