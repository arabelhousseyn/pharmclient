<template>
    <div class="modal fade" id="reportmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Rétroaction</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <ol v-if="details != null">
         <li v-for="(detail,index) in details" :key="index"> <details-comp :detail='detail' /> </li>
       </ol>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="solve" data-dismiss="modal">Fermer</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import detailsComp from '../components/detailsComp'
export default {
    props : ['value'],
    components : {
      detailsComp
    },
    data : ()=>{
        return{
            details : null
        }
    },
    methods : {
      solve()
      {
        location.reload()
      },
    },
    created()
    {
      var run = axios.post(this.link() + 'feddbackbycommande', this.value,this.cors())
      run.then(e=>{
        if(e.status == 200)
        {
          this.details = e.data
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