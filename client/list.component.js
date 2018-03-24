Vue.component('list-component', {
    template: `
    <div class="container">
        <div class="text-centered">
            <h3>Hello,
                <Strong>{{username}}</Strong>
            </h3>
        </div>
        <div class="list-group" v-for="(list, indexList) in lists">
            <li class="list-group-item active">
                {{list.title}}
                <span class="glyphicon glyphicon-trash pull-right pointer" @click="deleteList(list._id, list.title)"></span>
                <a href="#" data-toggle="modal" data-target="#edit-list-modal" @click="setListId(list._id), setListName(list.title)">
                    <span class="glyphicon glyphicon-edit pull-right edit-btn"></span>
                </a>
            </li>
            <li class="list-group-item" v-for="(todo, indexTodo) in list.todo">
                <span class="glyphicon glyphicon-star-empty pointer yellow" v-if="!todo.starred" @click="starredHandler(indexList, indexTodo, todo._id)"></span>
                <span class="glyphicon glyphicon-star pointer yellow" v-else @click="starredHandler(indexList, indexTodo, todo._id)"></span>
                <span class="glyphicon glyphicon-unchecked pointer" v-if="!todo.checked" @click="checkedHandler(indexList, indexTodo, todo._id)"></span>
                <span class="glyphicon glyphicon-check pointer" v-else @click="checkedHandler(indexList, indexTodo, todo._id)"></span>
                <a>{{todo.todo}}</a>
                <span class="glyphicon glyphicon-trash pull-right pointer red" @click="deleteTodo(todo._id, todo.todo)"></span>
            </li>
            <li class="list-group-item text-centered grey">
                <a href="#" data-toggle="modal" data-target="#add-activity-modal" @click="setListId(list._id)">
                    <span class="glyphicon glyphicon-plus-sign"></span> Add new activity</a>
            </li>
        </div>
    </div>`,
    props: ['username', 'lists', 'listid', 'listname'],
    data: function () {
        return {
        }
    },
    methods: {
        setListId: function (id) {
            this.$emit('listid', id);
            // this.listid = id;
        },
        setListName: function (name) {
            this.$emit('listname', name);
            // this.listname = name;
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
})