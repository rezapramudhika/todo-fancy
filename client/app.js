const request = axios.create({
    baseURL: 'https://68598ba2.ngrok.io',
    headers: { 'token': localStorage.getItem('token') }
})

new Vue({
    el: '#app',
    data: {
        lists: [],
        token: '',
        username: '',
        listid: '',
        listname: ''
    },
    methods: {
        logout: function () {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = 'index.html'
        },
        createTodo: function () {
            let activity = document.querySelector('input#activity').value;
            let isStarred = document.querySelector('input#starred').checked;
            request.post(`/todos/${this.listid}`, {
                todo: activity,
                starred: isStarred
            }).then((response) => {
                window.location.href = 'index.html';
            })
        },
        editList: function () {
            let newListName = document.querySelector('input#editList').value;
            request.put(`/lists/${this.listid}`, {
                title: newListName
            }).then((response) => {
                window.location.href = 'index.html';
            })
        },
        listenListId: function (id) {
            this.listid = id;
            console.log(this.listid)
        },
        listenListName: function (name) {
            this.listname = name;
        },
        setListId: function (id) {
            // this.$emit('listid', id);
            this.listid = id;
        },
        setListName: function (name) {
            // this.$emit('listname', name);
            this.listname = name;
        },
        starredHandler: function (listIndex, todoIndex, todoId) {
            let editStarred = false;
            if (this.lists[listIndex].todo[todoIndex].starred) {
                editStarred = false;
            } else {
                editStarred = true;
            }
            request.put(`/todos/${todoId}`, {
                starred: editStarred
            }).then((response) => {
                window.location.href = 'index.html';
            })
        },
        checkedHandler: function (listIndex, todoIndex, todoId) {
            let editChecked = false;
            if (this.lists[listIndex].todo[todoIndex].checked) {
                editChecked = false;
            } else {
                editChecked = true;
            }
            request.put(`/todos/${todoId}`, {
                checked: editChecked
            }).then((response) => {
                window.location.href = 'index.html';
            })
        },
        deleteTodo: function (todoId, todoActivity) {
            var answer = confirm(`Are you sure to delete "${todoActivity}"?`)
            if (answer) {
                request.delete(`/todos/${todoId}`, {})
                .then((response) => {
                    window.location.href = 'index.html';
                })
            }            
        },
        deleteList: function (listId, listTitle) {
            var answer = confirm(`Are you sure to delete "${listTitle}" and its activities?`)
            if (answer) {
                request.delete(`/lists/${listId}`, {})
                .then((response) => {
                    window.location.href = 'index.html';
                })
            }
        },
    },
    computed: {
        firstName() {
            let displayName = this.username.split(' ');
            return displayName[0];
        }
    },
    created: function () {
        if (localStorage.getItem('token') == null) {
            window.location.href = 'login.html';
        } else {
            this.token = localStorage.getItem('token');
            axios.get('https://68598ba2.ngrok.io/lists/', {
                headers: { token: this.token }
            })
                .then((response) => {
                    response.data.data.forEach(element => {
                        this.lists.push(element);
                    });
                    this.username = localStorage.getItem('username');
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})
