<!-- 
    * v_person.vue
		* show data cost income per person. 
		* @author natirut duangpak 59161030
		* @create Date	2019-09-05
 -->
<template>
  <v-app id="inspire">
    <v-content class="blackgroud">
          <v-flex xs12 sm12 md12 lg12 TopLayoutPerson>
        <br><br><br><br> 
        <v-icon left style="float:right;" color="white" size="22" @click="userSignOut">exit_to_app</v-icon>
        <br>
        <img :src="logoGreen" width="180" height="180">
        <br><br><br><br><br>
      </v-flex>
      <v-card class="paddingBigcardd">
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm12 md6 lg6>
              <v-card style="margin:30px;">
                <v-card-text>
                  <v-flex class="text-center" style="margin-left:3%; margin-right:3%;">
                    <v-system-bar color="#14b09b" :height="70" class="boederRadi">
                      <v-flex class="text-center">
                        <h3 style="color:white; font-size:20px;">กำหนดระยะเวลา</h3>
                      </v-flex>
                    </v-system-bar>
                  </v-flex>
                  <br>
                  <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:8%;">
                    <v-menu
                      ref="menuShowDateStart"
                      v-model="menuShowDateStart"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                    <!-- v-model="computedDateStart" -->
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="computedDateStart"
                          label="วันที่เริ่ม"
                          persistent-hint
                          prepend-icon="event"
                          readonly
                          outlined
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dateStart" no-title @input="menuShowDateStart = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:8%;">
                    <v-menu
                      ref="menuShowDateEnd"
                      v-model="menuShowDateEnd"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                     <!-- v-model="computedDateEnd" -->
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="computedDateEnd"
                          label="วันที่สิ้นสุด"
                          persistent-hint
                          prepend-icon="event"
                          readonly
                          outlined
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="dateEnd" no-title @input="menuShowDateEnd = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-card-text>
               

                <v-btn color="success" @click="Search()">
                  <v-icon left color="white" size="22">search</v-icon>ค้นหา
                </v-btn><br><br><br>

                 วันเริ่ม: {{ $route.params.timeStart }}<br>
                 วันสิ้นสุด {{ $route.params.timeEnd }}<br><br>
                 <!-- start {{start}}<br>
                 end {{end}}<br> -->


              
              </v-card>

                 <v-card  max-width="520" class="mx-auto">
              <v-card-text>
                <!-- <v-btn block color="secondary" dark >Block Button</v-btn><br> -->
                <v-btn x-large color="info" dark @click="repalseHome">
                  <v-icon color="white" size="45">mdi-square-inc-cash</v-icon>ไปหน้าสรุปยอดเงิน
                  </v-btn><br><br>
              </v-card-text>
            </v-card>

            </v-flex>
            <v-flex xs12 sm12 md6 lg6>
              <v-card style="margin:30px;">
                <v-card-text>
                  <v-flex class="text-center" style="margin-left:3%; margin-right:3%;">
                    <v-system-bar color="#0359ae" :height="70" class="boederRadi">
                      <v-flex class="text-center">
                        <h3 style="color:white; font-size:20px;">รายรับต่อคน</h3>
                      </v-flex>
                    </v-system-bar>
                  </v-flex>
                 <br>
                  <v-card style="margin:10px;">
                    <v-card-text>
                      <p style="font-size:18px;">
                              <v-chip large pill>
                                 <v-avatar >
                                    <v-img src="https://firebasestorage.googleapis.com/v0/b/income-vue.appspot.com/o/user%2Fdiw.jpg?alt=media&token=c86a5329-d9af-493c-be90-dfb7126b2d6f"  ></v-img>
                                  </v-avatar>
                                    &nbsp;ธชัยวัฒน์(CEO)
                                </v-chip>
                        </p>
                      <p style="font-size:40px; color:#034b61; ">
                        <animated-number :value=" income_show1" :formatValue="formatToPrice" />
                      </p>
                    </v-card-text>
                  </v-card>
                  <v-card style="margin:10px;">
                    <v-card-text>
                      <p style="font-size:18px;">
                         <v-chip large pill>
                            <v-avatar >
                                <v-img src="https://firebasestorage.googleapis.com/v0/b/income-vue.appspot.com/o/user%2Fca.jpg?alt=media&token=fcbb359d-028c-4016-b0a0-674b02b272ed"  ></v-img>
                            </v-avatar>
                                 &nbsp;สมรัก(พนักงาน)
                           </v-chip>
                        </p>
                      <p style="font-size:30px; color:#19b3b1;">
                        <animated-number :value=" income_show2" :formatValue="formatToPrice" />
                      </p>
                    </v-card-text>
                  </v-card>
                  <v-card style="margin:10px;">
                    <v-card-text>
                      <p style="font-size:18px;">
                        <v-chip large pill>
                              <v-avatar>
                                <v-img src="https://firebasestorage.googleapis.com/v0/b/income-vue.appspot.com/o/user%2Fbank.jpg?alt=media&token=0a61f8ef-bab5-4396-8e4d-60969fc73648"  ></v-img>
                              </v-avatar>
                                 &nbsp;กันตภณ(พนักงาน)
                         </v-chip>
                        </p>
                      <p style="font-size:30px; color:#bc5f6a;">
                        <animated-number :value=" income_show3" :formatValue="formatToPrice" />
                      </p>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm12 md12 lg12>
              <v-card class="paddingCardmid" style="margin:30px">
                <v-card-text>
                  <v-flex class="text-center">
                    <v-system-bar color="#fe7773" :height="70" class="boederRadi">
                      <v-flex class="text-center">
                        <h3 style="color:white; font-size:20px;">ตารางสรุปรายรับต่อคน</h3>
                      </v-flex>
                    </v-system-bar>
                  </v-flex>
                  <v-simple-table>
                    <thead>
                      <tr >
                        <td style="font-size:16px;">ลำดับ</td>
                        <td style="font-size:16px;">ชื่อ</td>
                        <td style="font-size:16px;">วันที่</td>
                        <td style="font-size:16px;">จำนวนเงิน</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ps, val) in dataList_Income" :key="val">
                        <td>{{val+1}}</td>
                        <td>{{ps.names}}</td>
                        <td>{{ps.dateShows}}</td>
                        <td>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-chip :color="getColor(ps.types)" dark v-on="on">{{ ps.costs }}</v-chip>
                            </template>
                            <span>
                              <v-flex v-if="ps.types == '1'">รายรับ</v-flex>
                              <v-flex v-if="ps.types == '2'">รายจ่าย</v-flex>
                            </span>
                          </v-tooltip>
                        </td>
                      </tr>
                      <!-- <tr v-if="dataList_Income==''">
                        <td colspan="4">ไม่มี</td>
                      </tr> -->
                    </tbody>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
          <br><br><br>
        </v-card-text>
      </v-card>
    </v-content>
  </v-app>
</template> 

<script>
import moment from "moment";
import Image from "@/assets/green2.png";
import AnimatedNumber from "animated-number-vue";
import * as api from "../api";
import firebase from "firebase";
import { type } from "os";
import router from '@/router'

export default {
  components: {
    AnimatedNumber
  },
  name: "App",
  data() {
    return {
      IncomeOutcome: [],
      users: [],
      dateStart: new Date().toISOString().substr(0, 10), //วันเริ่ม
      dateEnd: new Date().toISOString().substr(0, 10), //วันสิ้นสุด
      menuShowDateStart: false, //แสดง date picker วันเริ่มต้น
      menuShowDateEnd: false, //แสดง date picker วันสิ้นสุด
      logoGreen: Image, //โลโก้บริษัท
      // start:this.$route.params.timeStart,
      // end:this.$route.params.timeEnd
     
      
    };
  },
  firestore() {
    console.log(this.$route.params.timeStart)
     console.log(this.$route.params.timeEnd)
     var start=parseInt(this.$route.params.timeStart) 
     var end=parseInt(this.$route.params.timeEnd) 
 
    return {
      users: api.db.collection("users"),
      // locations: api.db.collection("locations").where('dateTime ' ,'>' ,'datetimeStart' && 'date' , '<' , 'datetimeEnd')
      IncomeOutcome: api.db.collection("IncomeOutcome").where('dateTime' ,'>' ,start ).where('dateTime' ,'<' ,end)
    };
  },

  computed: {
    test1(){
        var dateStartObj = moment(this.dateStart);
      var datetimeStart =("human to milliseconds ::==",moment(dateStartObj, "YYYY-MM-DD").valueOf());
      return datetimeStart;
    },
    test2(){
            var dateEndObj = moment(this.dateEnd);
      var datetimeEnd =("human to milliseconds ::==",moment(dateEndObj, "YYYY-MM-DD").valueOf());
      return datetimeEnd;
    },
    dataList_Income() {
      // return this.IncomeOutcome
       return this.IncomeOutcome.filter(
        o => o.types == 1 
      );
    },

    income_show1() {
      if (this.dataList_Income) {
        var total = this.dataList_Income.reduce((sum, item) => {
          if (item.names == "ธชัยวัฒน์") {
            if (item.types == 1) {
              return sum + item.costs;
            }
          } else if (item.names != "ธชัยวัฒน์") {
            return sum;
          }
        }, 0);
      }
      return total;
    },

    income_show2() {
      if (this.dataList_Income) {
        var total1 = this.dataList_Income.reduce((sum, item) => {
          if (item.names == "สมรัก") {
            if (item.types == 1) {
              return sum + item.costs;
            }
          } else if (item.names != "สมรัก") {
            return sum;
          }
        }, 0);
      }
      return total1;
    },

    income_show3() {
      if (this.dataList_Income) {
        var total2 = this.dataList_Income.reduce((sum, item) => {
          if (item.names == "กันตภณ") {
            if (item.types == 1) {
              return sum + item.costs;
            }
          } else if (item.names != "กันตภณ") {
            return sum;
          }
        }, 0);
      }
      return total2;
    },

    /*
      * computedDateStart
      * show date dd/mm/yyyy
      * @output date dd/mm/yyyy
      * @author natirut duangpak 59161030
      * @create Date	2019-08-23
		*/
    computedDateStart() {
      return this.formatDate(this.dateStart);
    },
    
    /*
      * computedDateEnd
      * show date dd/mm/yyyy
      * @output date dd/mm/yyyy
      * @author natirut duangpak 59161030
      * @create Date	2019-08-23
		*/
    computedDateEnd() {
      return this.formatDate(this.dateEnd);
    }
  },
  methods: {
    setTime(Timestart,Timeend){
        this.start=Timestart
        this.end=Timeend
    },
      Search() {
      var dateStartObj = moment(this.dateStart);
      var datetimeStart =("human to milliseconds ::==",moment(dateStartObj, "YYYY-MM-DD").valueOf());
      var dateEndObj = moment(this.dateEnd);
      var datetimeEnd =("human to milliseconds ::==",moment(dateEndObj, "YYYY-MM-DD").valueOf());
    
        console.log("start"+" "+datetimeStart)
        console.log("end"+" "+datetimeEnd)
     
       
      this.$router.push({path: `/person/${datetimeStart}/${datetimeEnd}`});
      location.reload()
    },
      userSignOut() {
      this.$store.dispatch("userSignOut");
    },
      /*
      * getColor
      * return color. 
      * @output color
      * @author natirut duangpak 59161030
      * @create Date	2019-08-23
		*/
    getColor() {
      return "green";
    },

     /*
      * formatToPrice
      * show animation number. 
      * @input cost
      * @output animation cost
      * @author natirut duangpak 59161030
      * @create Date	2019-08-23
		*/
    formatToPrice(value) {
      return `<h3> ${Number(value).toFixed(2)}</h3>`;
    },
    /*
      * repalseHome
      * go to router home. 
      * @author natirut duangpak 59161030
      * @create Date	2019-08-23
		*/
    repalseHome() {
      this.$router.replace("/home");
    },
      /*
      * formatDate
      * convert date to dd/mm/yyyy. 
      * @input date yyyy-mm-dd
      * @output date format dd/mm/yyyy
      * @author natirut duangpak 59161030
      * @create Date	2019-08-23
		*/
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
  }
};
</script>

 <style>
.blackgroud {
  background-color: #ebedef;
}/*พื้นหลัง*/

/* .paddingBigcardd {
  margin: 0 auto; 
  float: none; 
  margin-top: 60px; 
  margin-left: 50px;
  margin-right: 50px;
} */

.boederRadi {
  border-radius: 10px;
}/*ขอบโค้งของกาด*/

.paddingBigcardd {
  margin: 0 auto;
  float: none;
  margin-top: -60px;
  margin-left: 4%;
  margin-right: 4%;
} /*กาดขนาดใหญ่*/

.TopLayoutPerson {
  margin-top: -65px;
  /* background-color: #028c6a; */
   background-image: linear-gradient(to right, #00A06F ,#00a06fe6  ,#00a06fe6 ,#00a06fbf,  #00DED5);
} /*header web*/
</style>
