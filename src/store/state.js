//State ตัวเก็บข้อมูล หรือ state ก็คือตัวแปรที่เอาไว้เก็บค่าต่างๆที่เราประกาศไว้ ซึ่ง Vuex จะเข้ามาช่วยจัดการเจ้าตัวแปรพวกนี้
export const state = {
    appName: 'แอปพลิเคชันรายรับรายจ่าย',
    user: null,// user object เอาไว้เก็บ user data
    error: null,//error เอาไว้เก็บ error data
    loading: false,//loading เป็น flag เพื่อบอกว่า app ของเรายังโหลดข้อมูลอยู่
    mail: null
  }
 

