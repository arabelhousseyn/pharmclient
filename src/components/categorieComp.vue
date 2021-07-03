<template>
    <div class="">
        <div class="wrap">
            <div class="top">
            <div class="container">
                <div class="result">
                    {{count}} Rèsultats
                </div>
            </div>
        </div>
        <div id="seperator"></div>
        <div class="container">
            <div class="form-group az1023">
              <input type="text" placeholder="Recherche produit" @keydown="search" class='form-control'>
               <div id="seperator"></div>
               <router-link to="/cart/" v-if="data.id !== null" style='float:right;' exact><a class='btn btn-warning'><font-awesome-icon icon="cart-plus" /> Voir panier</a></router-link>
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
            <div v-if="!tog" class="row">
                <div v-for="(item,$index) in list" :key="$index"  id='seperator' class="col-lg-4">
                    <div class="card text-center">
                          <img v-if="item.pic != null" :src="'http://localhost/ker/learn%20php/p-pharm/storage/app/products/' +item.pic" :alt="item.name_product" style="width:100%;height: 226px; border-bottom:1px solid #ececec;">
                          <img v-if="item.pic == null" src="http://localhost/ker/learn%20php/p-pharm/storage/app/products/150.png" :alt="item.name_product" style="width:100%;height: 226px; border-bottom:1px solid #ececec;">
                        <div class="card-body">
                            <div style='height:80px;overflow:auto;' class="box-name">
                                 <a href="" style='color: #3f3f3f;text-decoration: none; font-size:14px;'>{{item.name_product}}</a>
                             </div>
                             <div v-if="item.name_dci != undefined" class="type">
                                 <p><span style='font-weight:bold;'>DCI : </span> {{item.name_dci}} </p>
                                 <p><span style='font-weight:bold;'>FORM : </span> {{item.name_form}} </p>
                             </div>
                               <p><button  data-toggle="modal" data-target="#lots" @click="addCart(item.id_product)" class='btn btn-warning'><font-awesome-icon icon="cart-plus" /></button></p>
                        </div>
</div>
                </div>  
                <div v-if="list.length  == 0" class='notfound'>
                    <noresult-comp />
                </div>      
            </div> 

            <div v-if="tog" class="row">
                <div v-for="(item,$index) in list2" :key="$index"  id='seperator' class="col-lg-4">
                    <div class="card text-center">
                          <img v-if="item.pic != null" :src="'http://localhost/ker/learn%20php/p-pharm/storage/app/products/' +item.pic" :alt="item.name_product" style="width:100%;height: 226px; border-bottom:1px solid #ececec;">
                          <img v-if="item.pic == null" src="http://localhost/ker/learn%20php/p-pharm/storage/app/products/150.png" :alt="item.name_product" style="width:100%;height: 226px; border-bottom:1px solid #ececec;">
                        <div class="card-body">
                            <div style='height:80px;overflow:auto;' class="box-name">
                                 <a href="" style='color: #3f3f3f;text-decoration: none; font-size:14px;'>{{item.name_product}}</a>
                             </div>
                             <div v-if="item.name_dci != undefined" class="type">
                                 <p><span style='font-weight:bold;'>DCI : </span> {{item.name_dci}} </p>
                                 <p><span style='font-weight:bold;'>FORM : </span> {{item.name_form}} </p>
                             </div>
                               <p><button  data-toggle="modal" data-target="#lots" @click="addCart(item.id_product)" class='btn btn-warning'><font-awesome-icon icon="cart-plus" /></button></p>
                        </div>
</div>
                </div>  
                <div v-if="list.length  == 0" class='notfound'>
                    <noresult-comp />
                </div>      
            </div> 
        </div>
        </div>
        <div id="seperator"></div>
        <infinite-loading v-if="!tog" @infinite="infiniteHandler" spinner="waveDots">
            <div slot="no-more">
                <button @click="reload" class='btn btn-primary'>
                   <font-awesome-icon icon="recycle" />
                  </button>
            </div>
              <div slot="no-results">
                  <button @click="reload" class='btn btn-primary'>
                      <font-awesome-icon icon="recycle" />
                  </button>
              </div>
                </infinite-loading>
                <div class="modal fade" id="lots" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div v-if="data.id !== null" class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Lots</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div v-if="lots.length > 0" v-for="(lot,index) in lots" :key="index">
              <div  class="form-check">
     <input @change="upid"  :value="lot.id_lot"   class="form-check-input" type="checkbox"  id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
      <p> <span>lot : {{lot.code_lot}} |</span> Prix :  <span style='color:green;'> {{lot.price}}.00 DA</span> | èxpiration : <span style='color:#f8aa49;'>{{lot.date_exp}}</span></p>
     </label>
     </div>
     <div class="form-group">
         <input type="number" placeholder="Qunatitè"  class='form-control' @blur="upqt">
     </div>
          </div>
          <div v-if="lots.length == 0" >
              <h4 style='color:red;text-align:center;'>Pas disponible</h4>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button @click="goto" :disabled="perm" type="button" class="btn btn-warning"><font-awesome-icon icon="plus" /></button>
      </div>
    </div>
  </div>

  <div v-if="data.id == null" class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Connexion</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          Veuillez connecter pour avoir commander
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>
<script>
import noresultComp from '../components/noresultComp'
import axios from 'axios'

export default {
    data : ()=>{
        return{
            check : false,
            page: 1,
            list: [],
            list2 : [],
            count : null,
            tmp  : null,
            tog : false,
            key : null,
            searched : {
                key : null,
                namecat : null,
            },
            lots : [],
            perm : true,
            data : {
                id : localStorage.getItem('clientID'),
                idp : null,
                ids : [],
                qts : [],
            },
        
        }
    },
    components : {
        noresultComp,
        
    },
    methods : {
        infiniteHandler($state) {
            axios.get(this.link() + 'getproductbycategorie',{
        params: {
          page: this.page,
          name : this.$route.params.name
        },
        headers : {
            Authorization : "Bearer 1|XP9kLs2cwy2te78Q2nDuNSgBGdoPs6ldZiDlVKXY"
        }
      }).then(({ data }) => {
        if (data.data.length) {
          this.page += 1;
          this.list.push(...data.data);
          $state.loaded();
        } else {
          $state.complete();
        }
      });   
    },
    reload()
    {
        window.location.reload()
    },
    search(e)
    {
        this.searched.key = e.target.value
        if(this.searched.key == null || this.searched.key == '' || this.searched.key == "  ")
        {
            this.count = this.tmp
           this.tog = false
        }else{
           var get = axios.post(this.link() + 'searchByCategorie',this.searched,this.cors())
           get.then(e=>{
               this.list2 = e.data
               this.count = e.data.length
           })
           get.catch(e=>{
               console.log('err')
           })
            this.tog = true
        }
    },
     addCart(value)
    {
     this.data.idp = value
        var rn = axios.post(this.link() + 'getlots',{id : value},this.cors())
           rn.then(e=>{
           this.lots = e.data
          })
          rn.catch(e=>{
            console.log('err')
          })
        
    },
    upid(e)
    {
        this.perm = false
        if(e.target.checked)
        {
            this.data.ids.push(e.target.value)
        }else{
           this.data.ids = this.data.ids.filter(item => item !== e.target.value)
        }
    },
    upqt(e)
    {
        this.data.qts.push(e.target.value)     
    },
    goto()
    {
        var go = axios.post(this.link() + 'puto',this.data,this.cors())
        go.then(e=>{
            if(e.data == "yes")
            {
                this.statu('Opèration effectuée','success')
            }
        })
        go.catch(e=>{
            console.log('err')
        })
    }
    },
    created()
    {
        window.document.title = "categorie-" + this.$route.params.name   
        this.searched.namecat = this.$route.params.name

        this.check = localStorage.getItem('clientID') == undefined ? false : true
        var run = axios.post(this.link() + 'exists',{name : this.$route.params.name},this.cors())
        run.then((e)=>{
            if(e.data == "no")
            {
                this.$router.push("/")
            }
        })
        run.catch((e)=>{
            console.log('err')
        })

        var run1 = axios.post(this.link() + 'count',{name : this.$route.params.name},this.cors())
        run1.then(e=>{
            this.count = e.data
            this.tmp = e.data
        })
        run1.catch(e=>{
            console.log('err')
        })
    }
}
</script>