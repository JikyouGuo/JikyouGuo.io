// 1:00:00

function getData(val) {
  $.ajax({
    type: "GET",
    url: "https://developer.duyiedu.com/edu/turing/chat",
    data: { text: val },
    dataType: "json",
    success: function(resp) {
      renderDom("robot", resp.text);
    }
  });
}
function renderDom(who, text) {
  const chats = chatRobot.find(".robot.main");
  let rows = text.match(/\n/g);
  if (!rows) rows = 1;
  else rows = rows.length + 1;
  const str = `<div class="${who} chat"><span>${who}: </span><p rows="${rows}">${text}</p></div>`;
  chats.append($(str));
  const main = chatRobot.find(".robot.main");
  main.scrollTop(main[0].scrollHeight);
}
function regEvent() {
  chatRobot.find(".send button").click(() => {
    const val = input.val();
    if (val) {
      renderDom("user", val);
      input.val("");
      getData(val);
    }
  });
  input.keypress(function(e) {
    if ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
      this.value += "\n";
    } else if ((e.keyCode === 10 || e.keyCode === 13) && !e.ctrlKey) {
      e.preventDefault();
      send.click();
    }
  });
}

const chatRobot = $(".robot.container");
const input = chatRobot.find(".footer textarea");
const send = chatRobot.find(".footer button");

regEvent();
