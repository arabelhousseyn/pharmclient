<template>
    <div class="wrap">
        <div id="seperator"></div>
        <div class="container">
            <div class="row">
             <div v-for="(values,index) in data" :key="index" class="card mb-3 sp">
  <img class="card-img-top" :src="'http://localhost/ker/learn%20php/p-pharm/public/images/products/' + values.pic" alt="Card image cap">
  <div class="card-body">
    <h3 class="card-title">{{ values.name_product }}</h3>
    <h4  class="card-title" v-if="values.id_form !== null">Type : <span style='color:#f0c14c;'>{{ values.name_form }}</span></h4>
      <div class="cartt">
          <div v-for="(lot,index) in lots" :key="index" class="form-group">
              <label :for="'lot' + index +1" class='bold'>Lot {{index + 1}}</label>
              <p>Date expiration : {{ lot.date_exp }} </p>
              <p>Prix : {{ lot.price }}.00 DA</p>
              <input v-if="lot.qt >= count" type="radio" :for="'lot' + index +1" @change="selected" :value="lot.id_lot" class='form-control'>
              <input v-if="lot.qt >= count" style='margin-top:5px;' type="number" @keyup="change" min="1"  placeholder="Quantitè" class='form-control'>
              <p v-if="lot.qt < count" style='color:red;'>De hors de stock</p>
              <p v-if="lot.qt == count" style='color:#dfdf02;'>Quantité restante supèrieur à {{count}}</p>
          </div>
          <div v-if="stat" style='margin-top:5px;' class="btns">
                  <input type="submit" @click="cart" :disabled="tog" value="Ajouter aux panier" class='btn btn-success'>
              <input type="submit" @click="commande" :disabled="tog" style='margin-left:5px;' value="Acheter maintenant" class='btn btn-secondary'>
              </div>
              <div v-if="!stat">
                  <p>Pour passer votre commande Veuillez <a href="" data-toggle="modal" data-target="#loginModal">se connecter</a> </p>
              </div>
      </div>
  </div>
</div>
            </div>
        </div>
        <login-modal />
    </div>
</template>
<script>
import loginModal from '../modals/loginModal'
import axios from 'axios'
export default {
    data : ()=>{
        return{
           data : null,
           count : null,
           lots : null,
           tog : true,
           value : null,
           stat : false,
           lot : null,
        }
    },
    components : {
        loginModal
    },
    methods: {
        cart()
        {
            var val = localStorage.getItem('cart')
            if(val == undefined)
            {
               localStorage.setItem('cart',this.$route.params.name+';'+this.lot + ';' + this.value + ';split;')
            }else{
               localStorage.setItem('cart',val + this.$route.params.name+';'+this.lot + ';' + this.value + ';split;')
            }

            window.location.href = '/cart/'
            
        },
        commande()
        {

        },
        change(e)
        {
           if(e.target.value !== '')
           {

                    if(e.target.value > this.count)
               {
                   this.tog = true
                   this.statu('vous ne pouvez pas entrer un quantitè supèrieur à ' + this.count,'error')
               }else{
                    this.tog = false
                   this.value = e.target.value
               }
           }
        },
        selected(e)
        {
            this.lot = e.target.value
        }
       
    },
    created()
    {
        this.stat = localStorage.getItem('clientID') == undefined ? false : true

        var run = axios.post(this.link() + 'getproductbyname',{name : this.$route.params.name},this.cors())
        run.then((e)=>{
            if(e.data.length > 0)
            {
                this.data = e.data
            }else{
                window.location.href = '/'
            }
        }) 
        run.catch((e)=>{
            console.log('err')
        })

        var run2 = axios.get(this.link() + 'alerts')
        run2.then((e)=>{
            this.count = e.data[0].type
        })
        run2.catch(e=>{
            console.log('err')
        })

        var run3 = axios.post(this.link() + 'getlots',{name : this.$route.params.name},this.cors())
        run3.then(e=>{
            this.lots = e.data
        })
        run3.catch(e=>{
            console.log('err')
        })
    }
}
</script>