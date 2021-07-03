window.onscroll = ()=>{
    if(window.pageYOffset > 144 && window.innerWidth > 500)
    {
     document.getElementById('sp') ?   document.getElementById('sp').classList.add('topp') : ''
    }else{
        document.getElementById('sp') ?   document.getElementById('sp').classList.remove('topp') : ''
    }
}