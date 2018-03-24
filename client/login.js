new Vue({
    el: '#login',
    data: {
        name: '',
        email: '',
        password: '',
        token: ''
    },
    methods: {
        login: function () {
            axios.post('https://68598ba2.ngrok.io/users/login', {
                email: this.email,
                password: this.password
            })
                .then((data) => {
                    localStorage.setItem('token', data.data.user.token);
                    localStorage.setItem('username', data.data.user.name);
                    window.location.href = 'index.html'
                })
                .catch(err => {
                    console.log(err)
                })
        },
        register: function () {
            axios.post('https://68598ba2.ngrok.io/users/register', {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then((data) => {
                    window.location.href = 'login.html'
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})
