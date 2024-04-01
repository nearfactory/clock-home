const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function updateTime(){
  // 日付オブジェクトを取得
  const now = new Date();

  document.getElementById("time").textContent = String(now.getHours()).padStart(2, '0') + ":" +  String(now.getMinutes()).padStart(2, '0');

  document.getElementById("dayAndMonth").textContent = day[now.getDay()%7] + " " + month[now.getMonth()%12];
  document.getElementById("date").textContent = now.getDate();

  const second = now.getSeconds();
  const millSecond = now.getMilliseconds();

  var deg = Number(second * 6) + Number(millSecond * 360 / 60 / 1000);

  $("#clockContainer>span").css("background", "conic-gradient(var(--span1) " + deg + "deg, var(--span2) " + deg + "deg 360deg)");

  // 朝7時以前もしくは夜19時以降はナイトモードをオン
  if(now.getHours() <= 7 || now.getHours() >= 19){
    document.documentElement.style.setProperty('--background', "#181818");
    document.documentElement.style.setProperty('--text', "#f8f8f8");
    document.documentElement.style.setProperty('--span1', "#303030");
    document.documentElement.style.setProperty('--span2', "#1a1a1a");
  }
  else{
    document.documentElement.style.setProperty('--background', "#f8f8f8");
    document.documentElement.style.setProperty('--text', "#0f0f0f");
    document.documentElement.style.setProperty('--span1', "#e0e0e0");
    document.documentElement.style.setProperty('--span2', "#f2f2f2");
  }
}

setInterval(updateTime, 10);