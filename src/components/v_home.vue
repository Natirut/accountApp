<!-- 
    * v_home.vue
		* show data cost income outcome balance and add data list income outcome. 
		* @author natirut duangpak 59161030
		* @create Date	2019-09-05
 -->
<template>
  <v-app id="inspire">
  
    <v-content class="blackgroud">
      <v-flex xs12 sm12 md12 lg12 TopLayout>
        <br><br><br><br> 
        <v-icon left style="float:right;" color="white" size="22" @click="userSignOut">exit_to_app</v-icon>
        <br>
        <img :src="logoGreen" width="180" height="180">
        <br><br><br><br><br>
      </v-flex>
      <v-card class="paddingBigcard">
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm12 md6 lg6>
              <v-card class="paddingCardmid">
                <v-card-text>
                  <v-flex class="text-center" style="margin-left:4%; margin-right:4%;">
                    <v-system-bar color="#877d7c" :height="70" class="boederRadi">
                      <v-flex class="text-center">
                        <h3 style="color:white; font-size:20px;">ข้อมูลรายรับรายจ่าย</h3>
                      </v-flex>
                    </v-system-bar>
                  </v-flex><br>
                  <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:8%;" v-if="showMail=='admin@gmail.com'">
                    <v-select
                      prepend-icon="mdi-account-box"
                      v-model="name"
                      :items="users"
                      item-text="name"
                      item-value="name"
                      label="เลือกผู้ใช้"
                      class="input-group--focused"
                      outlined
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:8%;"  v-if="showMail!='admin@gmail.com'" >
                    <v-text-field
                      prepend-icon=" mdi-note-text"
                      v-model="name_login"
                      name="diw_income"
                      label="ผู้ใช้"
                      type="text"
                      readonly
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:8%;">
                    <v-text-field
                      prepend-icon=" mdi-note-text"
                      v-model="note"
                      name="type_income"
                      label="หมายเหตุ"
                      type="text"
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:8%;">
                    <v-text-field
                      prepend-icon="  mdi-cash-usd"
                      v-model="cost"
                      name="cost_income"
                      label="มูลค่า"
                      type="number"
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:8%;">
                    <v-menu
                      ref="menuShowDate"
                      v-model="menuShowDate"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="computedDateFormatted"
                          label="วันที่"
                          persistent-hint
                          prepend-icon="event"
                          readonly
                          outlined
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title @input="menuShowDate = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:8%;">
                    <v-text-field
                      prepend-icon=" mdi-file-image "
                      type="file"
                      id="imge"
                      v-model="imge"
                      ref="imge"
                      outlined
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:5%;">
                    <table align="center" style="margin-left:5%; ">
                      <tr>
                        <td>
                          <v-radio-group v-model="type">
                            <v-radio :value="1" label="รายรับ"></v-radio>
                          </v-radio-group>
                        </td>
                        <td>
                          <v-radio-group v-model="type">
                            <v-radio :value="2" label="รายจ่าย"></v-radio>
                          </v-radio-group>
                        </td>
                      </tr>
                    </table>
                  </v-flex>
                       <v-btn color="success"  class="ma-2" v-show="!checkButtonAdmin" @click="insert_dialog">
                          <v-icon color="white">mdi-content-save</v-icon>บันทึก
                        </v-btn>
                        <v-btn color="success"  class="ma-2" v-show="!checkButtonUser" @click="insert_dialog">
                          <v-icon color="white">mdi-content-save</v-icon>บันทึก
                        </v-btn>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm12 md6 lg6>
              <v-card class="paddingCardmid"  >
                <v-card-text>
                  <v-flex class="text-center" style="margin-left:3%; margin-right:3%;">
                    <v-system-bar color="#fd8411" :height="70" class="boederRadi">
                      <v-flex class="text-center">
                        <h3 style="color:white; font-size:20px;">จำนวนเงิน</h3>
                      </v-flex>
                    </v-system-bar>
                  </v-flex>
                  <br>
                  <v-card style="margin:10px;">
                    <v-card-text>
                      <p style="font-size:18px;">คงเหลือ</p>
                      <p style="font-size:40px; color:blue; ">
                        <animated-number :value="balance_show" :formatValue="formatToPrice" />
                      </p>
                    </v-card-text>
                  </v-card>
                  <v-card style="margin:10px;">
                    <v-card-text>
                      <p style="font-size:18px;">รายรับทั้งหมด</p>
                      <p style="font-size:30px; color:green;">
                        <animated-number :value="income_show" :formatValue="formatToPrice" />
                      </p> 
                    </v-card-text>
                  </v-card>
                  <v-card style="margin:10px;">
                    <v-card-text>
                      <p style="font-size:18px;">รายจ่ายทั้งหมด</p>
                      <p style="font-size:30px; color:red;">
                        <animated-number :value="outcome_show" :formatValue="formatToPrice" />
                      </p>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
              <v-card  max-width="520" class="mx-auto">
              <v-card-text>
                <!-- <v-btn block color="secondary" dark >Block Button</v-btn><br> -->
                <v-btn x-large color="success" dark @click="repalsePerson">
                  <v-icon color="white" size="50">mdi-clipboard-text</v-icon>ไปหน้ารายรับรายคน
                  </v-btn><br><br>
              </v-card-text>
            </v-card>
            </v-flex>
          </v-layout><br><br>
          <v-layout row>
            <v-flex xs12 sm12 md12 lg12>
              <v-card class="paddingCardmid">
                <v-card-text>
                  <v-flex class="text-center">
                    <v-system-bar color="#7bc5ae" :height="70" class="boederRadi">
                      <v-flex class="text-center">
                        <h3 style="color:white; font-size:20px;">สรุปรายรับรายจ่าย</h3>
                      </v-flex>
                    </v-system-bar>
                  </v-flex>
                  <v-layout row wrap>
                    <v-flex xs2>
                      <v-select
                        prepend-icon=" mdi-clipboard-text"
                        :items="items"
                        item-text="mouth"
                        item-value="value"
                        v-model="selectMonth"
                        label="เลือกเดือน"
                        class="input-group--focused"
                        solo
                      ></v-select>
                    </v-flex>
                  </v-layout>
                  <v-simple-table class="paddingTable">
                    <thead>
                      <tr v-if="dataList_Month!=''">
                        <td style="font-size:16px;">ลำดับ</td>
                        <td style="font-size:16px;">วันที่</td>
                        <td style="font-size:16px;">ชื่อผู้บันทึก</td>
                        <td style="font-size:16px;">หมายเหตุ</td>
                        <td style="font-size:16px;">มูลค่า</td>
                        <td style="font-size:16px;">ไฟล์แนบ</td>
                        <td style="font-size:16px;">ดำเนินการ</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(ps, val) in dataList_Month" :key="val">
                        <td>{{val+1}}</td>
                        <td>{{ps.dateShows}}</td>
                        <td align="left">{{ps.names}}</td>
                        <td align="left">{{ps.notes}}</td>
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
                        <td>
                          <v-flex v-if="ps.fileURLs != ''"><a @click="show_image(ps.fileURLs)"> มีไฟล์แนบ</a></v-flex>
                          <v-flex v-if="ps.fileURLs == ' '">-</v-flex>
                        </td>
                        <td v-if="showMail!='admin@gmail.com'">
                               <v-btn v-if="filter_Action(ps.names,ps.created)==true" fab x-small color="warning" @click="update_dialog(ps.id,ps.names,ps.notes,ps.costs,ps.dateShows,ps.types,ps.fileURLs)" >
                                <v-icon dark>mdi-pencil</v-icon>
                              </v-btn>
                               <v-btn v-if="filter_Action(ps.names,ps.created)==true" fab x-small color="error" @click="delete_dialog(ps.id,ps.fileURLs)">
                                <v-icon dark>mdi-minus</v-icon>
                              </v-btn>
                              <v-flex v-if="filter_Action(ps.names,ps.created)==false">
                                      <v-chip>ไม่มีสิทธิการเข้าถึง</v-chip>    
                              </v-flex >
                               <v-flex v-if="Action(ps.names)==false">
                                      <v-chip>ไม่มีสิทธิการเข้าถึง</v-chip>    
                              </v-flex >
                        </td>
                         <td v-if="showMail=='admin@gmail.com'">
                               <v-btn  fab x-small color="warning" @click="update_dialog(ps.id,ps.names,ps.notes,ps.costs,ps.dateShows,ps.types,ps.fileURLs)" >
                                <v-icon dark>mdi-pencil</v-icon>
                              </v-btn>
                               <v-btn  fab x-small color="error" @click="delete_dialog(ps.id,ps.fileURLs)">
                                <v-icon dark>mdi-minus</v-icon>
                              </v-btn>
                        </td>
                      </tr>
                      <tr v-if="dataList_Month==''">
                        <td colspan="6">ไม่มี</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
  <!--######################################## จุดเริ่ม dialog #############################################-->

                      <!-- จุดวาง dialog แสดงไฟล์แนบ -->
                     <v-dialog v-model="dialogShowimage"  width="1200" hight="500">
                            <v-card>
                              <v-card-title class="headline">ไฟล์แนบ</v-card-title>
                              <v-card-text>
                                <img :src=" urlShow "  width="800" height="500" >
                              </v-card-text>
                              <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn color="green darken-1" text @click="dialogShowimage = false">ยกเลิก</v-btn>
                              </v-card-actions>
                            </v-card>
                      </v-dialog>
                       <!-- จุดวาง dialog แสดงไฟล์แนบ -->

                    <!-- จุดวาง dialog ยืนยันการ insert-->
                   <v-dialog v-model="dialog" width="500">
                      <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>ยืนยัน</v-card-title>
                        <v-card-text style="font-size:16px">
                          <br>
                          <v-flex v-if="type == '1'">บันทึก รายรับ เป็นจำนวนเงินมูลค่า {{cost}} บาท</v-flex>
                          <v-flex v-if="type == '2'">บันทึก รายจ่าย เป็นจำนวนเงินมูลค่า {{cost}} บาท</v-flex>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="dialog = false ,insert(name,note,cost,date,type)" v-if="showMail=='admin@gmail.com'">ยืนยัน</v-btn>
                          <v-btn color="primary" text @click="dialog = false ,insert(name_login,note,cost,date,type) " v-if="showMail!='admin@gmail.com'">ยืนยัน</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                     <!-- จุดสิ้นสุด dialog ยืนยันการ insert-->

                     <!-- จุดวาง dialog loading insert-->
                    <v-dialog v-model="dialog2" persistent max-width="290">
                      <v-card>
                        <v-card-title class="headline">Loading..</v-card-title>
                        <v-card-text>
                          <v-progress-circular
                            :rotate="90"
                            :size="100"
                            :width="20"
                            :value="uploadValue"
                            color="teal"
                          >{{ uploadValue }}</v-progress-circular>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  <!-- จุดสิ้นสุด dialog loading insert-->

                 <!-- จุดวาง dialog loaging update-->
                  <v-dialog v-model="dialog3" persistent max-width="290">
                            <v-card>
                              <v-card-title class="headline">Loading..</v-card-title>
                              <v-card-text>
                                <v-progress-circular
                                  :rotate="90"
                                  :size="100"
                                  :width="20"
                                  :value="uploadValue1"
                                  color="teal"
                                >{{ uploadValue1 }}</v-progress-circular>
                              </v-card-text>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                              </v-card-actions>
                            </v-card>
                  </v-dialog>
                <!-- จุดสิ้นสุด dialog loaging update-->

                <!-- จุดวาง dialog ยืนยัน delete-->
                     <v-dialog v-model="dialogDelete" max-width="290">
                            <v-card>
                              <v-card-title class="headline">ยืนยันการลบ</v-card-title>
                              <v-card-text></v-card-text>
                              <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn color="green darken-1" text @click="dialogDelete = false">ยกเลิก</v-btn>
                                <v-btn color="green darken-1" text @click="dialogDelete = false ,incomeoutcome_delete(id_delete,urlDelete)">ยืนยัน</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                <!-- จุดสิ้นสุด dialog ยืนยัน delete-->

                 <!-- จุดวาง dialog update-->
                         <v-dialog v-model="dialogEdit" persistent max-width="600px">
                            <v-card>
                              <v-card-title>
                                <v-flex
                                  class="text-center"
                                  style="margin-left:4%; margin-right:4%;"
                                >
                                  <v-system-bar color="#877d7c" :height="45" class="boederRadi">
                                    <v-flex class="text-center">
                                      <h3
                                        style="color:white; font-size:20px;"
                                      >แก้ไขข้อมูลรายรับรายจ่าย</h3>
                                    </v-flex>
                                  </v-system-bar>
                                </v-flex>
                              </v-card-title>
                              <v-card-text>
                                <v-flex xs12 sm12 md12 lg12 style="margin-left:5%; margin-right:8%;">
                                  <v-select
                                    prepend-icon="mdi-account-box"
                                    v-model="nameEdit"
                                    :items="users"
                                    item-text="name"
                                    item-value="name"
                                    label="เลือกผู้ใช้"
                                    class="input-group--focused"
                                    outlined
                                  ></v-select>
                                </v-flex>
                                <v-flex xs12 sm12 md12 lg12
                                  style="margin-left:5%; margin-right:8%;"
                                >
                                  <v-text-field
                                    prepend-icon=" mdi-note-text"
                                    v-model="noteEdit"
                                    name="type_income"
                                    label="หมายเหตุ"
                                    outlined
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 lg12
                                  style="margin-left:5%; margin-right:8%;"
                                >
                                  <v-text-field
                                    prepend-icon="  mdi-cash-usd"
                                    v-model="costEdit"
                                    name="cost_income"
                                    label="มูลค่า"
                                    type="number"
                                    outlined
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12 lg12
                                  style="margin-left:5%; margin-right:8%;"
                                >
                                  <v-menu
                                    ref="menuShowDateEdit"
                                    v-model="menuShowDateEdit"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    max-width="290px"
                                    min-width="290px"
                                  >
                                    <template v-slot:activator="{ on }">
                                      <v-text-field
                                        v-model="computedDateFormattedEdit"
                                        label="วันที่"
                                        persistent-hint
                                        prepend-icon="event"
                                        readonly
                                        outlined
                                        v-on="on"
                                      ></v-text-field>
                                    </template>
                                    <v-date-picker
                                      v-model="dateEdit"
                                      no-title
                                      @input="menuShowDateEdit = false"
                                    ></v-date-picker>
                                  </v-menu>
                                </v-flex>
                                <v-flex xs12 sm12 md12 lg12
                                  style="margin-left:5%; margin-right:8%;"
                                >
                                  <v-text-field
                                    prepend-icon=" mdi-file-image "
                                    type="file"
                                    id="imgeEdit"
                                     v-model="imgeEdit"
                                    ref="imgeEdit"
                                    outlined
                                  ></v-text-field>
                                  <v-flex xs12 sm12 md12 lg12
                                    style="margin-left:5%; margin-right:5%;"
                                  >
                                    <table align="center" style="margin-left:5%; ">
                                      <tr>
                                        <td>
                                          <v-radio-group v-model="typeEdit">
                                            <v-radio :value="1" label="รายรับ"></v-radio>
                                          </v-radio-group>
                                        </td>
                                        <td>
                                          <v-radio-group v-model="typeEdit">
                                            <v-radio :value="2" label="รายจ่าย"></v-radio>
                                          </v-radio-group>
                                        </td>
                                      </tr>
                                    </table>
                                  </v-flex>
                                </v-flex>
                              </v-card-text>
                              <v-card-actions>
                                <div class="flex-grow-1"></div>
                                <v-btn color="blue darken-1" text @click="dialogEdit = false">Close</v-btn>
                                <v-btn
                                  color="blue darken-1"
                                  text
                                  @click="dialogEdit = false , update(id_update,nameEdit,noteEdit,costEdit,dateEdit,typeEdit,urlEdit)"
                                >Save</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                 <!-- จุดสิ้นสุด dialog update-->
  <!--######################################## จุดสิ้นสุด dialog #############################################-->

                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-content>
  </v-app>
</template> 

<script>
import moment from "moment"; //จัดการเวลา
import Image from "@/assets/green2.png"; //import logo
import AnimatedNumber from "animated-number-vue"; //import animation number
import * as api from "../api"; //import all foder api
import firebase from "firebase";
import { type } from "os";

//valiable upload
var storageRef = firebase.storage().ref();
var mountainsRef = storageRef.child("one.jpg");
var mountainImagesRef = storageRef.child("photo/one.jpg");
mountainsRef.name === mountainImagesRef.name; // true
mountainsRef.fullPath === mountainImagesRef.fullPath; // false

//valiable dowload
var storage = firebase.storage();
var pathReference = storage.ref("photo/note6051");
var gsReference = storage.refFromURL("gs://bucket/photo/note6051");

//valiable delete
var desertRef = firebase.storage().ref()

export default {
  components: {
    AnimatedNumber
  },
  name: "App",
  data() {
    return {
      date: new Date().toISOString().substr(0, 10), //วันที่เริ่มต้น
      dateEdit: new Date().toISOString().substr(0, 10), //วันที่เริ่มต้นการแก้ไข
      logoGreen: Image, //โลโก้บริษัท
      IncomeOutcome: [], //ตารางรายรับรายจ่าย
      users: [], //ตารางuser
      name: "", //ชื่อ
      name_login: "", //ชื่อคนที่ login
      note: "", //หมายเหตุ
      cost: "", //ราคา
      imge: "", //ไฟล์แนบ
      type: "", //ชนิดรายรับหรือรายจ่าย
      nameEdit: "", //ชื่อ
      noteEdit: "", //หมายเหตุ
      costEdit: "", //ราคา
      imgeEdit: "", //ไฟล์แนบ
      typeEdit: "", //ชนิดรายรับหรือรายจ่าย
      selectMonth: "", //ตัวผูกค่าเดือน
      items: [
        { value: "01", mouth: "ม.ค." },
        { value: "02", mouth: "ก.พ." },
        { value: "03", mouth: "มี.ค." },
        { value: "04", mouth: "เม.ย." },
        { value: "05", mouth: "พ.ค." },
        { value: "06", mouth: "มิ.ย." },
        { value: "07", mouth: "ก.ค." },
        { value: "08", mouth: "ส.ค." },
        { value: "09", mouth: "ก.ย." },
        { value: "10", mouth: "ต.ค." },
        { value: "11", mouth: "พ.ย." },
        { value: "12", mouth: "ธ.ค." }
      ], //object ของเดือน
      dialog: false, //แสดงหน้าต่างแสดงผลซ้อนยืนยันการบันทึก
      dialog2: false, //แสดงหน้าต่างแสดงผลซ้อนการอัพโหลดข้อมูล
      dialog3: false, //แสดงหน้าต่างแสดงผลซ้อนอัพโหลดข้อมูล
      isHidden: true, //แสดงหรือซ่อนปุ่มบันทึก
      menuShowDate: false, //แสดง date picker
      menuShowDateEdit: false, //แสดง date picker
      uploadValue: 0, //แสดงเปอร์เซนการอัปโหลด
      uploadValue1: 0, //แสดงเปอร์เซนการอัปโหลด
      loading: false, //แสดงตัวโหลด
      dialogEdit: false, //แสดงหน้าต่างแสดงผลซ้อนการแก้ไข
      dialogDelete: false, //แสดงหน้าต่างแสดงผลซ้อนยืนยันการลบ
      id_delete:"", // id ลบ
      id_update:"", // id แก้ไข
      urlEdit:"", // url แก้ไข
      urlDelete:"", // url ลบ
      dialogShowimage:false, //แสดงหน้าต่างแสดงผลซ้อนการแสดงรูปภาพ
      urlShow:"", //เก็บ url รูปภาพ
    };
  },

  /*
   * firestore
   * return table DB.
   * @output table users,table IncomeOutcome
   * @author natirut duangpak 59161030
   * @create Date	2019-08-23
   */
  firestore() {
    return {
      users: api.db.collection("users"),
      IncomeOutcome: api.db.collection("IncomeOutcome").orderBy("created", "desc"),
    };
  },
 
  methods: {  
  /*
   * filter_Action
   * manage time and check permistion user
   * @output true,false
   * @author natirut duangpak 59161030
   * @create Date	2019-09-18
   */ 
    filter_Action(name,date){
       if(name==this.name_login){
          var dateObj = moment(date.seconds); //obj timestamp
          var dateObj2 = dateObj*1000;
          var formatted = moment(dateObj2).format('L'); //mm/dd/yyyy
          var dateStartLog =("human to milliseconds ::==",moment(formatted, "MM/DD/YYYY").valueOf()); //milliseconds
      
          var datePlus = moment(dateStartLog).add(14, 'days').format('MM/DD/YYYY')//mm/dd/yyyy  
          var dateEndLog =("human to milliseconds ::==",moment(datePlus, "MM/DD/YYYY").valueOf());
      
         
         
          if(dateCurrenLog<dateEndLog){
              return true
          }
          else{
              return false
          }
       } 
    },
  /*
   * Action
   * check permistion user
   * @output true,false
   * @author natirut duangpak 59161030
   * @create Date	2019-09-18
   */ 
    Action(name){
       if(name==this.name_login){
         return true
       }
       else{
         return false
       }
      
    },
  /*
   * show_image
   * show dialog image
   * @author natirut duangpak 59161030
   * @create Date	2019-09-18
   */ 
    show_image(url){
      this.dialogShowimage=true
      this.urlShow=url
    },
  /*
   * insert_dialog
   * show dialog confirm insert
   * @author natirut duangpak 59161030
   * @create Date	2019-09-18
   */ 
    insert_dialog(){
        this.dialog = true
    },
  /*
   * update_dialog
   * show dialog update and set value update
   * @author natirut duangpak 59161030
   * @create Date	2019-08-15
   */ 
    update_dialog(id,name,note,cost,date,type,url){
      this.dialogEdit = true
      this.id_update=id
      this.nameEdit=name
      this.noteEdit=note
      this.costEdit=cost
      this.dateEdit=date
      this.typeEdit=type
      this.urlEdit=url
    },
   /*
   * delete_dialog
   * set value id url for delete image and list income outcome
   * @author natirut duangpak 59161030
   * @create Date	2019-08-15
   */ 
    delete_dialog(id,url){
       this.dialogDelete = true
       this.id_delete=id
       this.urlDelete=url 
    },
  /*
   * incomeoutcome_delete
   * delete image and list income outcome
   * @author natirut duangpak 59161030
   * @create Date	2019-08-15
   */ 
    incomeoutcome_delete(id,url) {
        var delete_image = firebase.storage().refFromURL(url)
          // Delete the file
        delete_image.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
      api.db
        .collection("IncomeOutcome")
        .doc(id)
        .delete();
    },
    /*
     * getColor
     * return color red or green.
     * @output color
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    getColor(type) {
      if (type == "1") return "green";
      else if (type == "2") return "red";
    },
    /*
     * repalsePerson
     * go to router person.
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    repalsePerson() {
       var currenDate = new Date()
          var formattedCurren = moment(currenDate).format('L'); //mm/dd/yyyy
          var dateCurren =("human to milliseconds ::==",moment(formattedCurren, "MM/DD/YYYY").valueOf()); 
          // this.$router.push({path: `/person/${dateCurren}/${dateCurren}`});
           this.$router.push({path: `/person/${dateCurren}/${dateCurren}`});
      // this.$router.push("person");
    },

    /*
     * insert
     * insert data income outcome and image.
     * @input name, note, cost, date, type
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    insert(name, note, cost, date, type) {
      this.dialog2 = true;
      let self = this;
      var filename = "note" + Date.now();
      var st = firebase.storage().ref("photo/" + filename);
      var file = document.getElementById("imge").files[0];
      var uploadTask = st.put(file);
      st.put(file).then(function(snapshot) {
        console.log("Uploaded a blob or file!");
      });
      //getUrl
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          let percen = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          self.uploadValue = percen.toFixed(0);
          console.log("Upload is " + self.uploadValue + "% done");
        },
        function(error) {
          console.log(error);
        },
        function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(fileURL) {
            console.log("File available at", fileURL);
            self.dialog2 = false;
            // var dateShow = moment(String(date)).format("DD-MM-YYYY"); //แปลง date เข้า db เเสดงใน table
            var dateObj = moment(date);
            var datetime =("human to milliseconds ::==",moment(dateObj, "YYYY-MM-DD").valueOf());
            cost = parseFloat(cost);

            api.db.collection("IncomeOutcome").add({
              names: name,
              notes: note,
              costs: cost,
              dateShows: date,
              types: type,
              dateTime: datetime,
              fileURLs: fileURL,
              created: firebase.firestore.Timestamp.fromDate(new Date())
            });
          }); //then
        }
      );
        (this.name = ""),
        (this.note = ""), //ล้างค่าไปหลังจาก insert เสร็จแล้ว
        (this.cost = ""),
        (this.date = new Date().toISOString().slice(0, 10)),
        (this.type = "");
        this.imge = "";
    },

    /*
     * update
     * update data income outcome and image.
     * @input name, note, cost, date, type
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    update(id, name, note, cost, date, type,url) {
       if(this.imgeEdit!="")
       {
          this.dialog3 = true;
      let self = this;
         var img_delete = firebase.storage().refFromURL(url)
     // Delete the file
        img_delete.delete().then(function() {
          // File deleted successfully
        }).catch(function(error) {
          // Uh-oh, an error occurred!
        });
      
      var filename = "note" + Date.now();
      var st = firebase.storage().ref("photo/" + filename);
      var file = document.getElementById("imgeEdit").files[0];
      var uploadTask = st.put(file);
      st.put(file).then(function(snapshot) {
        console.log("Uploaded a blob or file!");
      });
      //getUrl
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          let percen = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          self.uploadValue1 = percen.toFixed(0);
          console.log("Upload is " + self.uploadValue1 + "% done");
        },
        function(error) {
          console.log(error);
        },
        function() {
          // self.uploadValue1 = 100;
          uploadTask.snapshot.ref.getDownloadURL().then(function(fileURL) {
            console.log("File available at", fileURL);
            self.dialog3 = false;
            
            var dateObj = moment(date);
            var datetime =
              ("human to milliseconds ::==",
              moment(dateObj, "YYYY-MM-DD").valueOf());
            cost = parseFloat(cost);
            api.db
              .collection("IncomeOutcome")
              .doc(id)
              .update({names: name,notes: note,costs: cost,dateShows: date,types: type,dateTime: datetime,fileURLs: fileURL,created: firebase.firestore.Timestamp.fromDate(new Date())
              });
            
          }); //then
        }
      );
  
       }
       else{
               this.dialog3 = true;
      let self = this;
       self.uploadValue1 = 0;
       console.log(self.uploadValue1)
              var dateObj = moment(date);
            var datetime =
              ("human to milliseconds ::==",
              moment(dateObj, "YYYY-MM-DD").valueOf());
            cost = parseFloat(cost);

            api.db
              .collection("IncomeOutcome")
              .doc(id)
              .update({names: name,notes: note,costs: cost,dateShows: date,types: type,dateTime: datetime,fileURLs: url,created: firebase.firestore.Timestamp.fromDate(new Date())
              });
               self.uploadValue1 = 100;
                 console.log("end"+self.uploadValue1)
              // self.dialog3 = false;
                setTimeout(() => (self.dialog3 = false), 400)
       }
        (this.imgeEdit = "");
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
      return `<h3>${Number(value).toFixed(2)}</h3>`;
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
    },

    /*
     * userSignOut
     * Logout web site.
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    userSignOut() {
      this.$store.dispatch("userSignOut");
    }
  },

  computed: {
      /*
     * showMail
     * set permistion email login
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
      showMail(){
        if(this.$store.getters.getUser !== null &&this.$store.getters.getUser !== undefined){
                      if(this.$store.getters.getEmail!=null){
                        if(this.$store.getters.getEmail=="diw@gmail.com"){
                          this.name_login="ธชัยวัฒน์"
                        }
                        else if(this.$store.getters.getEmail=="ca@gmail.com"){
                          this.name_login="สมรัก"
                        }
                        else if(this.$store.getters.getEmail=="bank@gmail.com"){
                          this.name_login="กันตภณ"
                        }
                      
                        return this.$store.getters.getEmail
                      }
                      if(this.$store.getters.getUser.email!=""){
                         if(this.$store.getters.getUser.email=="diw@gmail.com"){
                          this.name_login="ธชัยวัฒน์"
                        }
                        else if(this.$store.getters.getUser.email=="ca@gmail.com"){
                          this.name_login="สมรัก"
                        }
                        else if(this.$store.getters.getUser.email=="bank@gmail.com"){
                          this.name_login="กันตภณ"
                        } 
                        return this.$store.getters.getUser.email
                      }
        }
    },

    /*
     * computedDateFormatted
     * show date dd/mm/yyyy
     * @output date dd/mm/yyyy
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    /*
     * computedDateFormattedEdit
     * show date edit dd/mm/yyyy
     * @output date dd/mm/yyyy
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    computedDateFormattedEdit() {
      return this.formatDate(this.dateEdit);
    },
    
    /*
     * checkButtonAdmin
     * check value name note cost date type imge of admin
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    checkButtonAdmin: function() {
      if (!this.name ||!this.note ||!this.cost ||!this.date ||!this.type ||!this.imge) {
        return true;
      }
    },
     /*
     * checkButtonUser
     * check value name note cost date type imge of user
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
     checkButtonUser: function() {
      if (!this.name_login ||!this.note ||!this.cost ||!this.date ||!this.type ||!this.imge) {
        return true;
      }
    },
  
    /*
     * dataList_Month
     * filter month equal select
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    dataList_Month() {
      if (this.selectMonth == "") {
        return this.IncomeOutcome.slice(0, 10);
      } else {
        return this.IncomeOutcome.filter(
          o => o.dateShows.substring(5, 7) == this.selectMonth
        );
      }
    },

    /*
     * isAuthenticated
     * check authen users.
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    isAuthenticated() {
      return (
        this.$store.getters.getUser !== null &&
        this.$store.getters.getUser !== undefined
      );
    },

    /*
     * balance_show
     * sum cost total balance
     * total balance
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    balance_show() {
      if (this.IncomeOutcome) {
        var total = this.IncomeOutcome.reduce((sum, item) => {
          if (item.types == 1) {
            return sum + item.costs;
          } else if (item.types == 2) {
            return sum - item.costs;
          }
        }, 0);
      }
      return total;
    }, //computed

    /*
     * income_show
     * sum cost total income
     * total income
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    income_show() {
      if (this.IncomeOutcome) {
        var total = this.IncomeOutcome.reduce((sum, item) => {
          if (item.types == 1) {
            return sum + item.costs;
          } else if (item.types == 2) {
            return sum - 0;
          }
        }, 0);
      }
      return total;
    },

    /*
     * outcome_show
     * sum cost total outcome
     * total outcome
     * @author natirut duangpak 59161030
     * @create Date	2019-08-23
     */
    outcome_show() {
      if (this.IncomeOutcome) {
        var total = this.IncomeOutcome.reduce((sum, item) => {
          if (item.types == 2) {
            return sum - item.costs * -1;
          } else if (item.types == 1) {
            return sum - 0;
          }
        }, 0);
      }
      return total;
    },
  }
};
</script>

 <style>
.blackgroud {
  background-color: #ebedef;
} /*ภาพพื้นหลัง*/

.TopLayout {
  margin-top: -65px;
  /* background-color: #028c6a; */
   background-image: linear-gradient(to right, #00A06F ,#00a06fe6  ,#00a06fe6 ,#00a06fbf,  #00DED5);
} /*header web*/

.paddingBigcard {
  margin: 0 auto;
  float: none;
  margin-top: -60px;
  margin-left: 4%;
  margin-right: 4%;
} /*กาดขนาดใหญ่*/

.paddingTable {
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 50px;
} /*ตาราง*/

.paddingCardmid {
  margin: 30px;
} /*กาดขนาดกลาง*/

.table td {
  text-align: center;
} /*td กึ่่งกลาง*/

.boederRadi {
  border-radius: 10px;
} /*ขอบโค้งของกาด*/

</style>
