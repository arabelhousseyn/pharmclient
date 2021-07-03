<template>
    <div class="wrap">
        <div id="seperator"></div>
        <div v-if="tog" class="container">
            <div class="row">
                <div v-for="(item,index) in list" :key="index" @click="href(item)" class="col-lg-4">
                    <div class="card">
                        <img :src="'http://localhost/ker/learn%20php/p-pharm/public/images/products/' +item.pic" :alt="item.name_product" style="width:100%">
  <h1 class='name'>{{item.name_product}}</h1>
  <p><button>Voir plus</button></p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!tog" class="container">
             <div class="pas">
                 <h1>Pas de données</h1>
             </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data : () =>
    {
        return{
           tog : false,
            push : {
                name : null
            }
        }
    },
    methods : {
    reload()
        {
            window.location.reload()
        },
        href(item)
    {
        window.location.href = "/product/" + item.name_product
    }
    },
    created()
    {
        var share = + localStorage.getItem('clientID') == undefined ? "none" : localStorage.getItem('clientID')

        this.push.name = this.$route.query.sk + ';' + share

        var run = axios.post('http://localhost/ker/learn%20php/p-pharm/api/getproductsbysearch',this.push)
        run.then((e)=>{
            if(e.data.length > 0)
            {
                this.list = e.data
                this.tog = true
            }else{
                this.tog = false
            }
        })
        run.catch((e)=>{
            console.log('err')
        })
    }
}
</script>