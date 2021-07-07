<template>
    <div class="wrapHome">
       <div id="seperator"></div>
       <div class="container">
           <div class="row">
               <div class="col-lg-4">
                   <div style='border: 1px solid #dddddd !important; margin-bottom:10px;' id='sp' class="card">
  <div class="card-header">
    <div class="details">
        <span>CATÉGORIES</span>
        <span style='float:right;'><font-awesome-icon icon="list-alt" /></span>
    </div>
  </div>
  <div class="card-body">
      <ul id='liis'>
          <li v-for="(cat,index) in cats" :key="index"> <router-link style='text-decoration: none;font-weight:bold;color: #3c3c3c;' :to="'/categorie/' + cat.name_categorie + '/'" exact> {{cat.name_categorie}} <span style='float:right;color: #868686;'><font-awesome-icon icon="arrow-right" /></span> </router-link> </li>
      </ul>
  </div>
</div>
<div class="ads">
    <img src="https://via.placeholder.com/350x800" alt="">
</div>
<div id="seperator"></div>
<div class="ads">
    <img src="https://via.placeholder.com/350x800" alt="">
</div>
               </div>
               <div class="col-lg-8">
                   <div style='margin-bottom:20px;' class="slider">
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" style="height:500px;" src="https://1.bp.blogspot.com/-G5UyR14AH-0/XXR_CwRMzhI/AAAAAAAAnzQ/zBMLoLTxJYwuhzZr6ws_zhCp7dCNJsNzACLcBGAs/s1600/pharmacy.PNG" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" style="height:500px;" src="https://pharmaceutical-journal.com/wp-content/uploads/2021/01/face-mask-pharmacy-pa-20-927x617.jpg" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" style="height:500px;" src="https://pharmaceutical-journal.com/wp-content/uploads/2021/01/face-mask-pharmacy-pa-20-927x617.jpg" alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
                   </div>

<div v-for="(categorie,index) in categories" :key="index" class="card" style='margin-bottom:100px;'>
  <h5 class="card-header" style='text-align:center; background:none; text-transform:uppercase;' >{{categorie[0].cat}}</h5>
  <div class="card-body">
          <div class="row">
                   <div v-for="(cat,inn) in categorie" :key="inn" v-if="!cat.cat"  id='seperator' style='float:left;' class="col-lg-4">
                    <div @click="go(categorie[0].cat)" class="card text-center">
                        <div v-if="categorie.length > 1">
                            <img v-if="cat.pic != null" :src="'http://localhost/ker/learn%20php/p-pharm/storage/app/products/' +cat.pic" :alt="cat.name_product" style="width:100%;height: 226px; border-bottom:1px solid #ececec;">
                            <img v-if="cat.pic == null" src="http://localhost/ker/learn%20php/p-pharm/storage/app/products/150.png" :alt="cat.name_product" style="width:100%;height: 226px; border-bottom:1px solid #ececec;">
                        <div class="card-body">
                             <div style='height:80px;overflow:auto;' class="box-name">
                                 <router-link style='color: #3f3f3f;text-decoration: none; font-size:14px;' :to="'/categorie/' + categorie[0].cat + '/'" exact>{{cat.name_product}}</router-link>
                             </div>
                               <router-link class='btn btn-warning' exact :to="'/categorie/' + categorie[0].cat + '/'"><font-awesome-icon icon="cart-plus" /></router-link>
                        </div>
                        </div>
                        <div v-else>
                            <noresult-comp />
                        </div>
</div>
                </div>  
              </div>
         
      
      <router-link style='text-decoration:none;font-weight:bold;float:right;' :to="'/categorie/' + categorie[0].cat +'/'" exact>Voir plus <span><font-awesome-icon icon="arrow-right" /></span></span></router-link>
  </div>
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
    props : ['check'],
    data : ()=>{
        return{
            categories : null,
            cats : null,
        }
    },
    components : {
        noresultComp,
    },
    methods : {
        go(path)
        {
             this.$router.push('/categorie/' + path + '/')
        },
    },
    created()
    {
        window.document.title = "p-pharm"
        var run = axios.get(this.link() + 'categories',this.cors())
        run.then((e)=>{
            if(e.status == 200)
            {
                this.categories = e.data
            }else{
                this.statu('Erreur dans server','error')
            }
        })
        run.catch((e)=>{
            console.log('err')
        })

        var run1= axios.get(this.link() + 'catss',this.cors())
        run1.then(e=>{
            if(e.status == 200)
            {
                this.cats = e.data
            }else{
                this.statu('Erreur dans server','error')
            }
        })
        run1.catch(e=>{
            console.log('err')
        })
    }
    
}
</script>
