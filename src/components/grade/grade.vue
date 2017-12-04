<template>
  <div class="panel panel-default">
    <div class="panel-heading"><h4>Grade List</h4></div>
    <div class="panel-body">
      <div class="panel panel-default">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th v-for="head of theads">{{ head }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member of grade">
                <td>{{ member.name }}</td>
                <td>{{ member.studentID }}</td>
                <td>{{ member.grade }}</td>
                <td>{{ member.total }}</td>
                <td>{{ member.percentage }}</td>
                <td><a class="btn btn-xs btn-default" role="button" @click="deleteConfirm(member)">Delete</a></td>
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
        theads: ['Name', 'StudentID', 'Grade', 'Total', 'Percentage', 'Operation'],
        grade: [],
        toastMsg:'',
        temMember: [],
      }
    },
    methods: {
      goPage: function() {
        var vm = this
        var url = serverConfig.serverApi+'Grade/page'

        $.post(url,{page:vm.page,limit:20},function(res){
          if(res.code == 0){
            vm.grade = res.data
            vm.totalPage = res.totalPage
          } else {
            vm.grade = ''
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
        var url = serverConfig.serverApi+'Grade/deleteStudent'
        $.post(url,{id:vm.temMember.id},function(res){
          if(res.code == 0){
            vm.toastMsg = 'Successfully Deleted'
            vm.$refs.toast.showToast('success')
            vm.grade.$remove(vm.temMember)
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
