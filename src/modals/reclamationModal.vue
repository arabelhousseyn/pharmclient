<template>
    <div class="modal fade" id="reclamationmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Rèclamation</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <ol v-if="details != null">
         <li v-for="(detail,index) in details" :key="index"> <details-comp :detail='detail' /> </li>
       </ol>
        <div class="form-group">
            <label for="rec" class="weight">Écrire quelque chose</label>
            <textarea  id="rec" @keypress="checker" @keyup.enter="signal" v-model="send.msg" class='form-control' style='height:200px !important;' placeholder="ex : Il manque un produit"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="solve" data-dismiss="modal">Fermer</button>
        <button type="button" @click="signal" :disabled="dis" class="btn btn-warning">Soumettre</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import detailsComp from '../components/detailsComp'
export default {
    props : ['cmd'],
    components : {
      detailsComp
    },
    data : ()=>{
        return{
            dis : true,
            send : {
                id_commande : null,
                id_client : localStorage.getItem('clientID'),
                msg : null
            },
            details : null
        }
    },
    methods : {
      solve()
      {
        location.reload()
      },
        signal()
        {
            this.dis = true
            this.send.id_commande = this.cmd.id_commande
            var run = axios.post(this.link() + 'setreclamation',this.send,this.cors())
            run.then(e=>{
              if(e.status == 200)
              {
                if(e.data == "yes")
                {
                    this.statu('Opèration èffectuè','success')
                    document.getElementById('reclamationmodal').removeAttribute('class')
            document.getElementById('reclamationmodal').style.display = "none"
            document.querySelector('.modal-backdrop').removeAttribute('class')
            setInterval(() => {
                location.reload()
            }, 2000);
                }
              }else{
                this.statu('Erreur dans server','error')
              }
            })
            run.catch(e=>{
                console.log('err')
            })
        },
        checker()
        {
            this.dis = (this.send.msg == null) ? true : false
          
        }
    },
    created()
    {
      var run = axios.post(this.link() + 'feddbackbycommande', this.cmd,this.cors())
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