// global game state
var gameTimer = null;
var gameRunning = false;

window.onload = pageLoad;

function pageLoad(){
	var startBtn = document.getElementById('start');
	if (startBtn) startBtn.onclick = startGame;
}

function startGame(){
	// ปุ่มเริ่มเกมจะสร้างกล่องแล้วเริ่มจับเวลา 30 วินาที
	if (gameRunning) return; // ป้องกัน start ซ้ำ
	// ถ้ามี timer เก่าค้างไว้ ให้เคลียร์
	if (gameTimer){
		clearInterval(gameTimer);
		gameTimer = null;
	}
	gameRunning = true;
	var startBtn = document.getElementById('start');
	if (startBtn) startBtn.disabled = true;
	clearScreen();
	addBox();
	timeStart(30); // 30 seconds
}

function timeStart(seconds){
	var TIMER_TICK = 1000;
	var remaining = typeof seconds === 'number' ? seconds : 30;
	var clockEl = document.getElementById('clock');

	function updateClock(){
		if (!clockEl) return;
		var s = remaining % 60;
		var m = Math.floor(remaining / 60);
		clockEl.textContent = (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
	}

	updateClock();

	// store timer globally so bindBox can clear it immediately
	gameTimer = setInterval(function timeCount(){
		var allbox = document.querySelectorAll('#layer div');
		// ถ้ายังมีกล่องเหลืออยู่ เวลาจะลดลง
		if (allbox.length > 0){
			remaining -= 1;
			updateClock();
		}

		// ถ้าไม่มีเหลือก่อนเวลาหมด -> ชนะ
		if (allbox.length === 0){
			if (gameRunning){
				clearInterval(gameTimer);
				gameTimer = null;
				gameRunning = false;
				var startBtn = document.getElementById('start');
				if (startBtn) startBtn.disabled = false;
				alert('You win!');
			}
			return;
		}

		// ถ้าเวลาเหลือน้อยกว่า 0 และยังมีกล่อง -> แพ้
		if (remaining <= 0){
			if (gameRunning){
				clearInterval(gameTimer);
				gameTimer = null;
				gameRunning = false;
				var startBtn = document.getElementById('start');
				if (startBtn) startBtn.disabled = false;
				alert('Game over');
				clearScreen();
				updateClock();
			}
			return;
		}
	}, TIMER_TICK);
}

function addBox(){
	// สร้างกล่องตาม input ที่เราใส่ 
		var numboxInput = document.getElementById('numbox');
		var numbox = 5;
		if (numboxInput && numboxInput.value) {
				numbox = parseInt(numboxInput.value, 10) || 5;
		}

		var gameLayer = document.getElementById('layer');
		if (!gameLayer) return;

		var colorSelect = document.getElementById('color');
		var color = colorSelect ? colorSelect.value : 'maroon';

		for (var i = 0; i < numbox; i++){
				var tempbox = document.createElement('div');
				tempbox.className = 'square'; // match CSS .square
				tempbox.id = 'box' + i;
				// compute container size and box size to avoid overflow
				var rect = gameLayer.getBoundingClientRect();
				var boxSize = 36; // match .square width/height in CSS
				var maxLeft = Math.max(0, rect.width - boxSize);
				var maxTop = Math.max(0, rect.height - boxSize);
				tempbox.style.left = Math.random() * maxLeft + 'px';
				tempbox.style.top = Math.random() * maxTop + 'px';
				tempbox.style.backgroundColor = color;
				gameLayer.appendChild(tempbox);
				bindBox(tempbox);
		}
}

function bindBox(box){
	//เมื่อกดแล้ว กล่องจะหายไป
	box.onclick = function(){
		if (this.parentNode){
			this.parentNode.removeChild(this);
			// ถ้าเป็นการลบกล่องสุดท้าย ให้ชนะทันทีโดยไม่ต้องรอ tick ถัดไป
			var allbox = document.querySelectorAll('#layer div');
			if (allbox.length === 0 && gameRunning){
				if (gameTimer){
					clearInterval(gameTimer);
					gameTimer = null;
				}
				gameRunning = false;
				var startBtn = document.getElementById('start');
				if (startBtn) startBtn.disabled = false;
				alert('You win!');
			}
		}
	};
}

function clearScreen(){
	// ทำการลบ node ของกล่องทั้งหมด ออกจาก หน้าจอ
	var layer = document.getElementById('layer');
	if (!layer) return;
	var allbox = layer.querySelectorAll('div');

	// delete all div from end to start
	for (var i = allbox.length - 1; i >= 0; i--){
		var b = allbox[i];
		if (b && b.parentNode) b.parentNode.removeChild(b);
	}
}




