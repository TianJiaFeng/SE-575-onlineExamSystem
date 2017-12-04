<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 v-if="$route.params.questionID==undefined">Add New Question<button class="btn btn-default pull-right" v-link="{path: '/content'}">Return</button></h4>
      <h4 v-else>Edit Question<button class="btn btn-default pull-right" v-link="{path: '/content'}">Return</button></h4>
    </div>
    <div class="panel-body">
      <div>
        <div class="row">
          <div class="col-md-8">
            <div class="form-group" :class="{'has-error':submitFlag&&content==''}">
              <label>Question Content</label>
              <input type="text" class="form-control" required="required" v-model="content">
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group" :class="{'has-error':submitFlag&&score==''}">
              <label>Score</label>
              <input type="text" placeholder="Score cannot be less than 0" class="form-control" required="required" v-model="score">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8" :class="{'has-error':submitFlag&&item1.content==''}">
            <label for="">Answer1:</label>
            <input type="text" class="form-control" v-model='item1.content'>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8" :class="{'has-error':submitFlag&&item2.content==''}">
            <label for="">Answer2:</label>
            <input type="text" class="form-control" v-model='item2.content'>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8" :class="{'has-error':submitFlag&&item3.content==''}">
            <label for="">Answer3:</label>
            <input type="text" class="form-control" v-model='item3.content'>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8" :class="{'has-error':submitFlag&&item4.content==''}">
            <label for="">Answer4:</label>
            <input type="text" class="form-control" v-model='item4.content'>
          </div>
        </div>
        <div class="row">
          <div class="form-group col-md-4" :class="{'has-error':submitFlag&& (correctAnswer=='' || correctAnswer=='0')}">
            <label for="">Correct Answer</label>
            <select class="form-control" v-model="correctAnswer">
              <option value="0">Please Select The Right Answer</option>
              <option value="1">Answer1</option>
              <option value="2">Answer2</option>
              <option value="3">Answer3</option>
              <option value="4">Answer4</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-footer">
      <button class="btn btn-default" v-link="{path: '/content'}">Cancel</button>
      <button class="btn btn-primary pull-right" @click="save">Save</button>
    </div>
  </div>
  <toast :autoclose="true" :text="toastMsg" v-ref:toast id="addUserAlert"></toast>
</template>

<script>
  import toast from 'components/common/Alert'
  export default {
    name: 'edit',
    components: {toast},
    data() {
      return {
        toastMsg:'',
        questionID: '',
        submitFlag: false,
        content: '',
        score: '',
        item1: {id:0, content:'', correct:0},
        item2: {id:0, content:'', correct:0},
        item3: {id:0, content:'', correct:0},
        item4: {id:0, content:'', correct:0},
        correctAnswer: '0',
      }
    },
    created:function(){
      var vm = this
      if(vm.$route.params.questionID){
        vm.questionID = vm.$route.params.questionID
        var url = serverConfig.serverApi+'Question/detail'
        $.post(url,{id:vm.questionID},function(res){
          if(res.code == 0){
            var item = res.questionItem
            vm.content = res.question
            vm.score = res.score
            vm.item1 = item[0]
            vm.item2 = item[1]
            vm.item3 = item[2]
            vm.item4 = item[3]
            for(var i = 0; i < 4; i++){
              if(item[i].correct == 1){
                vm.correctAnswer = i+1
              }
            }
          }
        })
      } else {

      }
    },
    methods: {
      save: function() {
        var vm = this
        vm.submitFlag = true
        if(parseInt(vm.score) < parseInt(0)){
          vm.toastMsg = 'Score must be equal or more than 0'
          vm.$refs.toast.showToast('danger')
        }
        else if(vm.correctAnswer==0 || vm.content=='' || vm.score=='' || vm.item1.content=='' || vm.item2.content=='' || vm.item3.content=='' || vm.item4.content==''){
          vm.toastMsg = 'Insufficient Info'
          vm.$refs.toast.showToast('danger')
        }
        else {
          var item = [vm.item1,vm.item2,vm.item3,vm.item4]
          for(var i = 0; i < 4; i++){
            if(vm.correctAnswer == i+1){
              item[i].correct = 1
            } else {
              item[i].correct = 0
            }
          }
          var url = serverConfig.serverApi+'Question/saveQuestion'
          $.post(url,{id:vm.questionID,questionContent:vm.content,questionScore:vm.score,questionItem:item},function(res){
            if(res.code == 0){
              vm.toastMsg = 'Success'
              vm.$refs.toast.showToast('success')
              window.location.reload(true)
            }
            else{
              vm.toastMsg = 'Failed'
              vm.$refs.toast.showToast('danger')
            }
          })
          vm.$router.go({path: '/content'})
        }
      },
    }
  }
</script>
