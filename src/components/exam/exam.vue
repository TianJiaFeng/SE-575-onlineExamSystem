<template>
  <div class="row mt15">
    <div class="col-md-10 col-md-offset-1">
      <div class="panel panel-default">

        <div class="panel-heading">
          <div class="row">
            <div class="col-sm-8">
              <h4 class="">Exam</h4>
            </div>
            <div class="col-sm-4">
              <h4 class="">Remaining Time {{minute}}:{{second}}</h4>
            </div>
          </div>
        </div>
        <div class="panel-body">
          <div class="row" v-if="tableData != []">
            <div class="col-sm-12">
              <div v-for="(index,member) of tableData">
                <div class="row">
                  <div class="col-md-10">
                    <div class="form-group">
                      <label>{{$index+1}}. {{member.content}}</label>
                    </div>
                    <div v-for="(index,item) of member.questionItem">
                      <div class="radio">
                        <label class="radio-inline">
                          <!-- <input type="radio" :value="$index+1" v-model="member.check" @change="checkAnswer(member)"> -->
                          <input type="radio" :value="$index+1" v-model="member.check">
                          <p>{{item.content}}</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>cannot acquire questions</p>
          </div>
        </div>
        <div class="panel-footer">
          <div align="right">
            <button class="btn btn-primary" @click="submit">Submit</button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <alert :autoclose="true" :text="alertMsg" v-ref:pretoast id="pretoast"></alert>
  <modalalert id="saveModal" title="Notice" text="After submitted, you will not be able to change your answer. Are you sure you want to submit?" :method="save"></modalalert>
</template>
<script>
import serverConfig from 'assets/js/serverConfig.js'
import alert from 'components/common/Alert'
import modalalert from 'components/common/ModalAlert'

export default {
  name: 'exam',
  components: {serverConfig,alert,modalalert},
  data() {
      return {
        tableData: [],
        serverApi:serverConfig.serverApi,
        alertMsg:'',
        time: 0,
        minute: 0,
        second: 0,
        sum: 0,
        studentID: 0,
      }
    },
    created: function() {
      var vm = this
      var arr = document.cookie.split(";")
      vm.studentID = parseInt(arr[0]) 
      var url = serverConfig.serverApi+'Question/getAll'
      $.post(url,{},function(res){
        if(res.code == 0){
          vm.tableData = res.data
          vm.sum = res.sum
          vm.time = 600 // setTime
          vm.computing()
        } else {
          vm.tableData = []
          vm.alertMsg = "cannot acquire questions"
          vm.$refs.pretoast.showToast('danger')
        }
      })
    },
    methods: {
      // checkAnswer: function(member) {
      //   var vm = this
      // },
      submit: function() {
        var vm = this
        $("#saveModal").modal('toggle')
      },
      save: function() {
        var vm = this
        var grade = 0;
        for(var i = 0; i < vm.tableData.length; i++){
          if(vm.tableData[i].check == vm.tableData[i].correctAnswer){
            grade = grade + parseInt(vm.tableData[i].score) 
          }
        }
        var url = serverConfig.serverApi+'Grade/addGrade'
        $.post(url,{studentID:vm.studentID,grade:grade,total:vm.sum},function(res){
          if(res.code == 0){
            setTimeout(function(){vm.end()},1000)
          } else {
            vm.alertMsg = "Fail, Please Resubmit"
            vm.$refs.pretoast.showToast('danger')
          }
        })
      },
      end: function() {
        var vm = this
        window.location.href= serverConfig.urlConfig+'end.html'
      },
      computing: function() {
        var vm = this
        if(vm.time > 0){
          vm.time--
          vm.setTime()
          setTimeout(function(){vm.computing()},1000)
        } else {
          vm.alertMsg = "Times Up!"
          vm.$refs.pretoast.showToast('danger')
          vm.save()
        }
      },
      setTime: function() {
        var vm = this
        if(vm.time>60){
          vm.minute=parseInt(vm.time/60)
          vm.second=parseInt(vm.time%60);
        } else {
          vm.minute = 0
          vm.second=vm.time
        }
        if(vm.second<10){
          vm.second = '0'+vm.second
        }
      },
    }
}
</script>
