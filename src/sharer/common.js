import Vue from 'vue';
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
export default {
    data()
    {
        return {
             allow : 'https://cors-anywhere.herokuapp.com/',
             path : 'http://localhost/ker/learn%20php/p-pharm/api/',
             linkImage :  'http://localhost/ker/learn%20php/p-pharm/public/images/'
        }
    },

    methods : {
         batch()
        {
           return  this.allow
        },
        statu(msg,type)
        {
            return Vue.$toast.open({
                message: msg,
                type: type,
                duration : 2000
            });
        },
        link()
        {
           return this.path
        },
        detect()
        {
            let str = window.navigator.userAgent
            let mobile = str.search('Mobile')
            if(mobile !== -1)
            {
                return true
            }else{
                return false
            }
            
        },
        cors()
        {
            let headers = {
                Authorization : "Bearer 1|XP9kLs2cwy2te78Q2nDuNSgBGdoPs6ldZiDlVKXY",
            }
            return {headers}
        }, // auth 
        hideModal()
        {
            document.getElementById('cstt').removeAttribute('class')
            document.getElementById('cstt').style.display = "none"
            document.querySelector('.modal-backdrop').removeAttribute('class')
        } // hide modal
    }
    
}


