Vue.component('create-todo-component', {
    template: `
    <div class="modal fade" id="add-activity-modal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4>Add new activity</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="activity">Activity</label>
                        <input type="text" class="form-control" id="activity">
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="starred" /> Starred
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="createTodo">Submit</button>
                </div>
            </div>
        </div>
    </div>`,
    props:['listid'],
    data: function() {
        return {}
    },
    methods: {
        createTodo: function () {
            console.log(this.listid)
            let activity = document.querySelector('input#activity').value;
            let isStarred = document.querySelector('input#starred').checked;
            // request.post(`/todos/${hell}`, {
            //     todo: activity,
            //     starred: isStarred
            // }).then((response) => {
            //     window.location.href = 'index.html';
            // })
        }
    }
})