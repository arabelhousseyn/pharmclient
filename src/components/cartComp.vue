<template>
    <div class="wrap">
        <div class="container">
            <div class="row">
                <div v-if="tog"  class="col-lg-12">
                    <div id="seperator"></div>
                    <table class="table">
                        <thead>
                            <tr>
                        <th>Dèsignation</th>
                            <th>Prix</th>
                            <th>Quantitè</th>
                            <th>Sous Total</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tfoot>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>Total</th>
                            <th>{{total}}.00 DA</th>
                        </tfoot>
                        <tbody>
                            <tr v-for="(crt,index) in cart" :key="index">
                             <td>{{crt.name_product}} (CD lot : {{crt.code_lot}} )</td>
                             <td>{{crt.price}}.00 DA</td>
                             <td><input type="number" v-model="crt.qts" class='form-control' style='width:auto;background:#dee2e6;' @blur="getvalue" @keyup="getId(crt.id)" min="1"></td>
                             <td>{{crt.qts * crt.price}}.00 DA</td>
                             <td><button @click="del(crt)" class='btn btn-danger'><font-awesome-icon icon="minus"  /></button></td>
                            </tr>
                        </tbody>
                        </table>
                        <div id="seperator"></div>
                        <div class="card">
  <div class="card-header">
    Livraison
  </div>
  <div class="card-body">
  <div class="form-check">
  <input class="form-check-input" @change="gets" v-model="data1.first" type="radio" name="exampleRadios" id="exampleRadios1" value="0">
  <label class="form-check-label" for="exampleRadios1">
    Avec Livraison
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" @change="gets" v-model="data1.second" type="radio" name="exampleRadios" id="exampleRadios2" value="1">
  <label class="form-check-label" for="exampleRadios2">
    Sans Livraison
  </label>
</div>
  </div>
</div>
<div id="seperator"></div>
                        <div class="card" style="width: 18rem;float: right;">
  <div class="card-body">
    <h5 class="card-text">Total : {{total}}.00 DA</h5>
    <button :disabled="disp" data-toggle="modal" data-target="#exampleModal" class='btn btn-primary'>confirmer et payer</button>
  </div>
</div>
                </div>
                <div v-if="!tog">
                        <div id="seperator"></div>
                    <noresult-comp />
                </div>
            </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p class='bold'>Si vous êtes sûr de vouloir commander Appuyez sur <span style='color:green;'>Oui</span> sinon <span style='color:red;'>Fermer</span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" @click="order" class="btn btn-success">Oui</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script>
import axios from 'axios'
import noresultComp from '../components/noresultComp'
export default {
    data : ()=>{
        return{
           cart : null, 
           total : null,
           data : {
               id : null,
               value : null,
           },
           tog : true,
           disp : true,
           data1 : {
               id : localStorage.getItem('clientID'),
               first : null,
               second : null,
           }
        }
    },
    components : {
        noresultComp
    },
    methods : {
        getvalue(value)
        {
            this.total = 0
            this.data.value = value.target.value
             for (const car of this.cart) {
                    this.total += car.price * car.qts
               }
            var rn = axios.post(this.link() + 'updatecartdetails',this.data,this.cors())
            rn.then(e=>{
                if(e.data == "yes")
                {
                    this.statu('Opèration effectuée','success')
                }
            })
            rn.catch(e=>{
                console.log('err')
            })
        },
        getId(id)
        {
         this.data.id = id
        },
        del(value)
        {
            var deletee = axios.post(this.link() + 'deleteproductcart',value,this.cors())
            deletee.then(e=>{
                if(e.data == "yes")
                {
                    this.total = 0
               for (let i = 0; i < this.cart.length; i++) {
                     if(this.cart[i].id == value.id)
                     {
                         this.cart.splice(i,1)
                     }
               }
               for (const car of this.cart) {
                    this.total += car.price * car.qts
               }
                }else{
                    console.log('err')
                }
            })
            deletee.catch(e=>{
                console.log('err')
            })
        },
        gets()
        {
            this.disp = false
        },
        order()
        {
             var order = axios.post(this.link() + 'finalOrder',this.data1,this.cors())
             order.then(e=>{
                 if(e.data == "yes")
                 {
                    this.statu('Opèration effectuée','success')
                    sessionStorage.setItem('success','0')
                    window.location.href='/success/'
                 }else{
                     console.log('err')
                 }
             })
             order.catch(e=>{
                 console.log('err')
             })
        }
    },
    created()
    {
        

        if(localStorage.getItem('clientID') == null)
        {
            window.location.href = '/'
        }else{
            var run = axios.post(this.link() + 'cartdetails', {id : localStorage.getItem('clientID')},this.cors())
            run.then(e=>{
               this.cart = e.data
               if(this.cart.length > 0)
               {
                   this.tog = true
                   for (const car of this.cart) {
                    this.total += car.price * car.qts
               }
               }else{
                   this.tog = false
               }
            })
            run.catch(e=>{
                console.log('err')
            })


        }
        
    },
}
</script>