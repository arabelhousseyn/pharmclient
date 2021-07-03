<template>
    <div class="wrap">
        <div id="seperator"></div>
        <div class="container">
    <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Commandes</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" style='background:none;border-raduis:none;' id="cmds" width="100%" cellspacing="0">
                  <thead>
            <tr>
                <th></th>
                <th>Ref commande</th>
                <th>Date commande</th>
                <th>Produit</th>
                <th>Adresse</th>
                <th>Statu</th>
                <th>Rèclamation</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cmd,index) in commandes" :key="index">
                <td> <button v-if="cmd.statu == 0" @click="genId(cmd)" data-toggle="modal" data-target="#cstt" title="Supprimer" id="border"><font-awesome-icon icon="times" /></button> </td>
                <td> {{cmd.ref_commande}} </td>
                <td>{{cmd.date_cmd}}</td>
                <td> <router-link title="Produit" :to="'/commande/' + cmd.ref_commande" exact><a class='btn btn-success'><font-awesome-icon icon="boxes" /></a></router-link></td>
                <td> <span v-if="cmd.adresse_liv == null">Sans livraison</span> <span v-else> {{ cmd.adresse_liv }} </span> </td>
                <td> <span v-if="cmd.statu == 0" class="badge badge-warning">En attente</span> <span class="base" v-else-if="cmd.statu == 1"> <span class="badge badge-success">Validè</span> {{cmd.date_valid}} <button @click="receive(cmd)" v-if="cmd.statu == 1 && cmd.payment != null && cmd.receive == 0" class="btn btn-success"><font-awesome-icon icon="clipboard-check" /></button> </span> <span v-else-if="cmd.statu == 2" class="badge badge-danger">Refusè</span></td>
                <td><button v-if="cmd.statu != 0" data-toggle="modal" @click="format(cmd)" data-target="#reclamationmodal" class="btn btn-warning"><font-awesome-icon icon="exclamation" /></button></td>
            </tr>
        </tbody>
                </table>
              </div>
            </div>
          </div>
          <reclamation-modal v-if="cmd != null" :cmd="cmd" />
        </div>
        <div class="modal fade" id="cstt" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Suppression</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        êtes-vous sûr de vouloir Supprimer votre commande
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button @click="deletecmd" type="button" class="btn btn-success">Oui</button>
      </div>
    </div>
  </div>
</div> 
    </div>
</template>

<script>
import axios from 'axios'
import datatable from 'datatables.net-bs4'
import reclamationModal from '../modals/reclamationModal'
export default {
    data : ()=>{
        return {
            commandes : null,
            keyId : null,
            cmd : null
        }
    },
    components : {
      reclamationModal
    },
    methods : {
          table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          receive(value)
          {
            var run = axios.post(this.link() + 'commandereceive',{id : value.id_commande},this.cors())
            run.then(e=>{
              if(e.data == "yes")
              {
                this.statu('Opèration èffectuè','success')
                setTimeout(() => {
                  location.reload()
                }, 1000);
              }
            })
          },
          genId(value){
            this.keyId = value.id_commande 
          },
          format(value)
          {
            this.cmd = value
          },
          deletecmd()
          {
              var deletee = axios.post(this.link() + 'deletecommandebyclient',{id : this.keyId},this.cors())
              deletee.then(e=>{
                  if(e.data == "yes")
                  {
                      var i = 0
                      for (const cmd of this.commandes) {
                           if(cmd.id_commande == this.keyId)
                           {
                               this.commandes.splice(i,1)
                               this.hideModal()
                               break
                           }
                           i++;
                      }
                  }
              })
              deletee.catch(e=>{
                  console.log('err')
              })
          }
    },
    created()
    {
           var run = axios.post(this.link() + 'commandebyclient',{id : localStorage.getItem('clientID')},this.cors())
           run.then(e=>{
                  this.commandes = e.data
                   this.table()
           })
           run.catch(e=>{
               console.log('err')
           })

    }
}
</script>