<template>
    <footer class='footer'>
        <div class="container">
            <div class="row">
                <div class="col-lg-2 l">
                    <div id="seperator"></div>
                    <div class="heading">
                        <h3 class='title'>Sur nous</h3>
                    </div>
                    <div class="info">
                        <p>descrption generale</p>
                    </div>
                </div>

                <div class="col-lg-2 l">
                    <div id="seperator"></div>
                    <div class="heading">
                        <h3 class='title'>Notre Service</h3>
                    </div>
                    <div class="info">
                        <ul class='lists'>
                            <li>first</li>
                            <li>second</li>
                            <li>third</li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-2 l">
                    <div id="seperator"></div>
                    <div class="heading">
                        <h3 class='title'>Rèseaux sociaux</h3>
                    </div>
                    <div class="info">
                        <ul class='lists'>
                            <li>first</li>
                            <li>second</li>
                            <li>third</li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-2 l">
                    <div id="seperator"></div>
                    <div class="heading">
                        <h3 class='title'>Contactez nous</h3>
                    </div>
                    <div class="info">
                        <ul class='lists'>
                            <li>first</li>
                            <li>second</li>
                            <li>third</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="end">
            <div class="container">
                <p id='copy'>Copyright {{ formatYear }} by p-pharm  | Tous les droit rèserve</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data : ()=>{
        return{
            year : new Date(),
            formatYear : null,
            startYear : 2021
        }
    },
    created()
    {
        this.formatYear = this.startYear === this.year.getFullYear() ? this.startYear : "2021-" + this.year.getFullYear()
    }
}
</script>