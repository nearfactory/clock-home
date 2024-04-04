const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function updateTime(){
  // 日付オブジェクトを取得
  const now = new Date();

  document.getElementById("time").textContent = String(now.getHours()).padStart(2, '0') + ":" +  String(now.getMinutes()).padStart(2, '0');

  document.getElementById("dayAndMonth").textContent = days[now.getDay()%7] + " " + months[now.getMonth()%12];
  document.getElementById("date").textContent = now.getDate();

  const second = now.getSeconds();
  const minute = now.getMinutes();
  const millSecond = now.getMilliseconds();

  var secondDeg = Number(second * 360 / 60) + Number(millSecond * 360 / 60 / 1000);
  var minuteDeg = Number(minute * 360 / 60) + Number(second * 360 / 60 / 60) + Number(millSecond * 360 / 60 / 60 / 1000);

  $("#span1").css("background", "conic-gradient(var(--span1) " + secondDeg + "deg, var(--span2) " + secondDeg + "deg 360deg)");
  $("#span2").css("background", "conic-gradient(var(--span1) " + minuteDeg + "deg, var(--span2) " + minuteDeg + "deg 360deg)");

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


  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const startDate = new Date(year, month - 1, 1); // 月の最初の日を取得
  const endDate = new Date(year, month,  0); // 月の最後の日を取得
  const endDayCount = endDate.getDate(); // 月の末日
  const startDay = startDate.getDay(); // 月の最初の日の曜日を取得
  let dayCount = 1 // 日にちのカウント
  let calendarHtml = ''; // HTMLを組み立てる変数

  calendarHtml += '<table>';

  // 曜日の行を作成
  for (let i = 0; i < days.length; i++) {
      calendarHtml += '<td>' + days[i] + '</td>';
  }

  for (let w = 0; w < 6; w++) {
      calendarHtml += '<tr>';

      for (let d = 0; d < 7; d++) {
          if (w == 0 && d < startDay) {
              // 1行目で1日の曜日の前
              calendarHtml += '<td></td>';
          } else if (dayCount > endDayCount) {
              // 末尾の日数を超えた
              calendarHtml += '<td></td>';
          } else {
              if(dayCount == now.getDate()){
                calendarHtml += '<td class="today">' + dayCount + '</td>';
              }
              else{
                calendarHtml += '<td>' + dayCount + '</td>';
              }
              dayCount++;
          }
      }
      calendarHtml += '</tr>';
  }
  calendarHtml += '</table>';

  document.querySelector('#calendar2').innerHTML = calendarHtml;
}

setInterval(updateTime, 10);