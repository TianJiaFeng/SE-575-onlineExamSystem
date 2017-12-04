<template>
  <div class="panel panel-default">
    <div class="panel-heading"><h4>Question List</h4></div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-8">
          <button class="btn btn-default" v-link="{name: 'add'}">Add New Question</button>
        </div>
        <div class="col-md-4">
          <div class="form-group" >
            <label>Total Score: {{totalScore}}</label>
          </div>
        </div>
      </div>
      <div class="panel panel-default mt15">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th v-for="head of theads">{{ head }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member of question">
                <td>{{ member.content }}</td>
                <td>{{ member.score }}</td>
                <td>
                  <a class="btn btn-xs btn-default" role="button" v-link="{name:'edit', params: {questionID: member.id}}">Edit</a>
                  <a class="btn btn-xs btn-default" role="button" @click="deleteConfirm(member)">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <pagination :action="goPage" :page.sync="page" :total-page.sync="totalPage"></pagination>
    </div>
    <modal title="Notice" text="Confirm to delete?" id="deleteModal" :confirm-action="delete"></modal>
  </div>

  <toast :autoclose="true" :text="toastMsg" v-ref:toast id="delUserAlert"></toast>

</template>
<script>

  import Pagination from 'components/common/Pagination'
  import Modal from 'components/common/Modal'
  import toast from 'components/common/Alert'
  export default {
    name: 'list',
    components: { Pagination, Modal,toast },
    data() {
      return {
        page: 1,
        totalPage: 1,
        theads: ['content', 'score', 'operation'],
        question: [],
        toastMsg:'',
        totalScore: 0,
        temMember: [],
      }
    },
    methods: {
      goPage: function() {
        var vm = this
        var url = serverConfig.serverApi+'Question/page'
        $.post(url,{page:vm.page,limit:20},function(res){
          if(res.code == 0){
            vm.question = res.data
            vm.totalPage = res.totalPage
            vm.totalScore = res.sum
          } else {
            vm.question = ''
          }
        })
      },
      deleteConfirm: function(row) {
        var vm = this
        vm.temMember = row
        $('#deleteModal').modal('show')
      },
      delete: function() {
        var vm = this
        var url = serverConfig.serverApi+'Question/deleteQuestion'
        $.post(url,{id:vm.temMember.id},function(res){
          if(res.code == 0){
            vm.toastMsg = 'Successfully Deleted'
            vm.$refs.toast.showToast('success')
            // vm.question.$remove(vm.temMember)
            vm.goPage()
          }
          else{
            vm.toastMsg = 'Failed to Delete'
            vm.$refs.toast.showToast('danger')
          }
        })
        $('#deleteModal').modal('hide')
      },
    },
    created: function() {
      var vm = this
      vm.goPage()
    },
  }
</script>
