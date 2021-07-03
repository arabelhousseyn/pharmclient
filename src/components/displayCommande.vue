<template>
     <div class="wrap">
        <div id="seperator"></div>
        <div class="container">
            <router-link to="/commandes/" exact><a class='btn btn-warning'><font-awesome-icon icon="arrow-left" /></a></router-link>
            <div id="seperator"></div>
    <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Produits</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" style='background:none;border-raduis:none;' id="cmds" width="100%" cellspacing="0">
                  <thead>
            <tr>
                <th></th>
                <th>Dèsignation</th>
                <th>code lot</th>
                 <th>Date èxpiration</th>
                 <th>Quantitè</th>
                <th>Prix</th>
                <th>Sous Total</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
              <th></th>
                <th></th>
                 <th></th>
                 <th></th>
                <th>Total</th>
                <th>{{total}}.00 DA</th>
                <th></th>  
            </tr>
        </tfoot>
        <tbody>
            <tr v-for="(lot,index) in lots" :key="index">
                <td> <button data-toggle="modal" @click="genId(lot)" data-target="#cstt" v-if="stat == 0" id="border"><font-awesome-icon icon="times" /></button> </td>
                <td> {{lot[0].name_product}} </td>
                <td>{{lot[0].code_lot}}</td>
                <td> {{lot[0].date_fab}} </td>
                <td> <input type="number" min="1" @blur="upqts" style='width:auto;' class='form-control' @keyup="gets(lot)" v-model="lot[1].plus" v-if="stat == 0"> <span v-else>{{lot[1].plus}}</span></td>
                <td> {{lot[0].price}}.00 DA</td>
                <td> {{lot[0].price * lot[1].plus}}.00 DA</td>
            </tr>
        </tbody>
                </table>
              </div>
            </div>
          </div>
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
        êtes-vous sûr de vouloir Supprimer votre produit
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button @click="dellot" type="button" class="btn btn-success">Oui</button>
      </div>
    </div>
  </div>
</div> 
    </div>
</template>

<script>
import axios from 'axios'
import datatable from 'datatables.net-bs4'
export default {
    data : ()=>{
        return{
            lots : null,
            stat : null,
            data : {
                ref : null,
                id_lot : null,
                qts : null,
            },
            datadel : {
               ref : null,
                id_lot : null, 
            },
            total : null,
        }
    },
    methods : {
          table()
          {
              this.$nextTick(()=>{
                  $('#cmds').DataTable();
              })
          },
          upqts(e)
          {
             this.data.qts = e.target.value
             this.data.ref = this.$route.params.reff
             var up = axios.put(this.link() + 'updateQuantityOfCommandeLots',this.data,this.cors())
             up.then(e=>{
                 if(e.data == "yes")
                 {
                     this.statu('Opèration effectuée','success')
                     this.total = 0
                      for (const lot of this.lots) {
                  this.total +=  lot[0].price * lot[1].plus   
                }
                 }
             })
             up.catch(e=>{
                 console.log('err')
             })

          },
          gets(info)
          {
              this.data.id_lot = info[0].id_lot
          },
          genId(value)
          {
            this.datadel.id_lot  = value[0].id_lot
          },
          dellot()
          {
              this.datadel.ref = this.$route.params.reff
              var del = axios.post(this.link() + 'deletelotforcommande',this.datadel,this.cors())
              del.then(e=>{
                  console.log(e.data)
                  if(e.data  == "yes")
                  {
                      var i = 0
                      for (const cmd of this.lots) {
                          if(cmd[i].id_lot == this.datadel.id_lot)
                          {
                              this.lots.splice(i,1)
                              this.hideModal()
                              break
                          }
                          i++
                      }
                      this.total = 0
                      for (const lot of this.lots) {
                  this.total +=  lot[0].price * lot[1].plus   
                }
                  }
              })
              del.catch(e=>{
                  console.log('err')
              })
          }
    },

    created()
    {
        var run = axios.post(this.link() + 'getlotsbycommande',{ref : this.$route.params.reff},this.cors())
        run.then(e=>{
            if(e.data.length > 0)
            {
                this.lots = e.data
                for (const lot of this.lots) {
                  this.total +=  lot[0].price * lot[1].plus   
                }
                this.table()
            }else{
                this.$router.push("/")
            }
        }) 
        run.catch(e=>{
           this.$router.push("/")
        })
        var statu = axios.post(this.link() + 'getstatucommande',{ref : this.$route.params.reff},this.cors())
        statu.then(e=>{
            this.stat = e.data
        })
         statu.catch(e=>{
             console.log('err')
         })
    }
}
</script>