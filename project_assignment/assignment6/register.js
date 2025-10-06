window.onload = pageLoad;
function pageLoad(){
    var form = document.getElementById('myRegister');
    if(form){
        form.onsubmit = function(e){
            if(!validateForm()){
                e.preventDefault();
            }
        };
    }
}

function validateForm() {
    const form = document.getElementById('myRegister');
    const requiredFields = [
        'firstname', 'lastname', 'gender', 'bday', 'email', 'username', 'password'
    ];
    for (let name of requiredFields) {
        if (name === 'gender') {
            const genderChecked = form.querySelector('input[name="gender"]:checked');
            if (!genderChecked) {
                alert('กรุณาเลือกเพศ');
                return false;
            }
        } else {
            const input = form.querySelector(`[name="${name}"]`);
            if (!input || !input.value.trim()) {
                alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
                return false;
            }
        }
    }

    const passwordInputs = form.querySelectorAll('input[name="password"]');
    const password = passwordInputs[0].value;
    const retype = passwordInputs[1].value;
    if (password !== retype) {
         document.getElementById("errormsg").innerText = "Passwords do not match";
        return false;
    }

    const username = form.querySelector('[name="username"]').value.trim();
   
    if (users.some(u => u.username === username)) {
        document.getElementById("errormsg").innerText = "Username already exists";
        return false;
    }
    return true;
}