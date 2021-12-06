const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));//生成したTodoたちを保存しておく記述、一つづつ
if (todos) {
  todos.forEach((todo) => {
    add(todo);//保存しておいたtodoの内容を順番に表示させておく
  });
}
form.addEventListener("submit", function (event) {
  event.preventDefault();//イベントをキャンセルする、画面遷移させない
  add();
});


/** 変数宣言 */
var moveY,modeX, posiY, posiX;
function add(todo) {
  let todoText = input.value;//todoテキスト欄に値を入れる

  if (todo) {
    todoText = todo.text;//
  }

  if (todoText) {
    const li = document.createElement("li");//テキスト文字をliで生成

    li.innerText = todoText;//生成したliにテキストを入れる
    li.classList.add('list-group-item')//クラスを付与する、空のクラスを付与、タスク完了のものは線をひくため

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");//クラスを付与する、線を引く
    }

    li.addEventListener("touchstart", function (event) {//contextmenuとは右クリックボタンのこと、押すと削除にする
		// 現在の座標取得
		posiX = getX(event);

		// 移動距離状態を初期化
		moveX = '';
    });

    li.addEventListener("touchend", function (event) {//contextmenuとは右クリックボタンのこと、押すと削除にする
		if (posiX - getX(event) < -70)  // 70px以上移動でスワイプと判断
		{
			li.remove();//liから外し、テキスト欄の外へ移動させる
			saveData();//保存をするメソッド
		}
    });

    li.addEventListener("click", function () {//保存された文字をクリックすると
		li.classList.toggle("text-decoration-line-through");//クラスを付与する,線を引くのクラスをtoggleによって外す
		saveData();//保存をするメソッド
    });

    ul.appendChild(li);
    input.value = "";//テキストの欄の値を空にする、初期値は空
    saveData();
  }
}

function getX(event) {
	//横方向の座標を取得
	return event.changedTouches[0].pageX;
}

function saveData() {
  const lists = document.querySelectorAll("li");//li値を全て取得
  const todos = [];//todosに空の配列を代入する

  lists.forEach((li) => {//順番にliの内容を表示する
    todos.push({//配列に順番に入れ込んでいく
      text: li.innerText,//liのテキストが順に表示
      completed: li.classList.contains("text-decoration-line-through"),//todoが完了したものは線を引いてゆく
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));//todoリストを保存してゆく,stringfyとは文字列化、シリアライズ化（複数の要素を一列に並べる操作のことをいう）
}