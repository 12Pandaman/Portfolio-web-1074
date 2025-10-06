window.onload = loginLoad;
function loginLoad(){
	// เชื่อมฟอร์ม login กับ checkLogin
	var form = document.getElementById('myLogin');
	if(form){
		form.onsubmit = function(e){
			if(!checkLogin()){
				e.preventDefault();
			}
		};
	}
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const checkUser = urlParams.get("username");
const checkPass = urlParams.get("password");
function checkLogin(){

	const username = document.getElementsByName('username')[0].value.trim();
	const password = document.getElementsByName('password')[0].value;

	if (!username || !password) {
		alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
		return false;
	}

	if(username === checkUser && password === checkPass){
		alert('เข้าสู่ระบบสำเร็จ!');
		return true;
	}else{
		alert('username หรือ password ไม่ถูกต้อง กรุณากรอกใหม่');
		return false;
	}
	
	
	// const found = users.find(u => u.username === username && u.password === password);
	// if (!found) {
	// 	alert('username หรือ password ไม่ถูกต้อง กรุณากรอกใหม่');
	// 	return false;
	// }

	// alert('เข้าสู่ระบบสำเร็จ!');
	// return true;
}

			