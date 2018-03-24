Vue.component('create-list-component', {
    template: `
    <div class="modal fade" id="create-list-modal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4>Create list</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="createList">List Name</label>
                        <input type="text" class="form-control" id="createList">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="createList">Submit</button>
                </div>
            </div>
        </div>
    </div>`,
    props:[],
    data: function() {
        return {}
    },
    methods: {
        createList: function () {
            let listName = document.querySelector('input#createList').value;
            request.post(`/lists/`, {
                title: listName
            }).then((response) => {
                window.location.href = 'index.html';
            })
        },
    },
})