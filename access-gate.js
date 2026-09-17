/* access-gate.js
 * ระบบล็อกรหัสผ่านสำหรับเข้าใช้งานหน้าเว็บ
 * ต้องกรอกรหัสให้ถูกต้องทุกครั้งที่เปิด/รีเฟรชหน้า (ไม่มีการจดจำรหัสไว้)
 * รหัสผ่าน: WHO
 */
(function () {
  "use strict";
  var ACCESS_CODE = "WHO";

  function isCorrect(input) {
    return (input || "").trim().toUpperCase() === ACCESS_CODE;
  }

  var code;
  while (true) {
    code = window.prompt("กรุณาใส่รหัสผ่านเพื่อเข้าใช้งานหน้านี้:");
    if (isCorrect(code)) {
      break;
    }
    window.alert("รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
  }
})();
