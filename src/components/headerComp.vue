<template>
<div  class="wrap">
    <div v-if="show" style='text-align:center;' class="alert alert-success">
        merci, vous pouvez connecter
    </div>
    <header>
        <nav id='nav' class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
              <router-link to="/" exact><a class="navbar-brand"><img src="http://localhost/ker/learn%20php/p-pharm/public/images/logo.jpg" alt="p-pharm" style='width:100px;height:100px;'></a></router-link>
              <div class="test">
                  <router-link to="/" exact><a><font-awesome-icon icon="home"  size="3x" /></a></router-link>
              </div>
       <div v-if="check" class="profile">
           <div style='margin-top:9px;'>
               <router-link :to="'/profile/' + data.fname" exact><a style='text-decoration:none;' id="pr">{{data.fname}}</a></router-link>
           </div>
           <div class="dropdown">
  <a  class="btn btn- dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    
  </a>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <router-link  style='text-decoration:none;' :to="'/profile/' + data.fname" exact><a style='text-decoration:none;' class="dropdown-item">Profile</a></router-link>
      <router-link  style='text-decoration:none;' :to="'/commandes/'" exact><a style='text-decoration:none;' class="dropdown-item">Commandes</a></router-link>
      <router-link  style='text-decoration:none;' :to="'/reports/'" exact><a style='text-decoration:none;' class="dropdown-item">Reclamations</a></router-link>
      <router-link  style='text-decoration:none;' :to="'/disconnect/'" exact><a style='text-decoration:none;' class="dropdown-item">Dèconnexion</a></router-link>
  </div>
</div>

<div style='margin-left:10px;' class="dropdown">
    <router-link to="/cart/" exact>
        <a class="btn btn-success">
    <font-awesome-icon icon="cart-plus" />
  </a>
        </router-link>
</div>
       </div>
          </div>
        </nav> 
    </header>
</div>
    
</template>
<script>
import axios from 'axios'
export default {
    props : ['check'],
    data()
    {
        return{
            show : false,
            data : {
                id : localStorage.getItem('clientID'),
                fname : null
            },
            srh : {
                id : localStorage.getItem('clientID'),
                key : null,
                pushcats : null,
            },
            cats : null,
        }
    },
    components : {
      
    },
    methods : {
    },
    created()
    {
   
        
        if(localStorage.getItem('success'))
        {
           this.show = true
           localStorage.removeItem('success')
        }else{
            this.show = false
        }

        if(localStorage.getItem('clientID'))
        {
           var run = axios.post(this.link() + 'client',this.data,this.cors())
           run.then((e)=>{
               
              this.data.fname = e.data[0].fname
           })
           run.catch((e)=>{
               console.log('err')
           })  
        }

        var run1 = axios.get(this.link() + 'categories',this.cors())
        run1.then((e)=>{
            this.cats = e.data
        })
        run1.catch((e)=>{
            console.log('err')
        })

    }
}
</script>