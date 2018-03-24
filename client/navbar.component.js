Vue.component('navbar-component', {
    template: `
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Todo Fancy</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right" v-if="token !== ''">
                    <li>
                        <a @click="logout" class="pointer"><span class="glyphicon glyphicon-log-out"></span> Logout</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right" v-if="token == ''">
                    <li>
                        <a href="#" class="pointer">Login / Register</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`,
    props:['token', 'username'],
    data: function() {
        return {}
    },
    methods: {
        logout: function () {
            localStorage.removeItem('token');
            window.location.href = 'index.html'
        }
    },
})