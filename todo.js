const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

//一時的に保存したリストを変数へ代入
const todos = JSON.parse(localStorage.getItem("todos"));//生成したTodoたちを一時的にローカルストレージに保存しておく

//生成したリストを順番に取り出して表示する
if (todos) {
  todos.forEach((todo) => {
    add(todo);//保存しておいたtodoの内容を順番に表示させておく
  });
}

//追加ボタンを押した時のイベント
form.addEventListener("submit", function (event) {//追加ボタンを押したら
  event.preventDefault();//イベントをキャンセルする、画面遷移させない
  add();//遷移させずにtodoリストを表示
});



//リストを生成する関数
function add(todo) {
    //入力されたテキストの内容を変数に入れる
    let todoText = input.value;//todoテキスト欄に値を入れる

    //
    if (todo) {
      todoText = todo.text;//
    }

    //入力欄にテキストを書く
    if (todoText) {//テキストが入力して追加ボタンを押す→liでリストを表示
      const li = document.createElement("li");//テキスト文字をliで生成
      li.innerText = todoText;//生成したliにテキストを入れる
      li.classList.add('list-group-item')//クラスを付与する、空のクラスを付与、タスク完了のものは線をひくため


    //タスクに線を付与する
    if (todo && todo.completed) {//タスクが完了したら線を引いて消す
      li.classList.add("text-decoration-line-through");//クラスを付与する、線を引けるようにする
    }

    //タスクを削除する
    li.addEventListener("contextmenu", function (event) {//contextmenuとは右クリックボタンのこと、押すと削除にする。実際は長押しすると削除になる?
      event.preventDefault();//イベントキャンセル、画面遷移させない
      li.remove();//liから外し、削除する
      saveData();//保存をするメソッド、画面に留めておく
    });

    //クリックすると線を付与、消したりできる
    li.addEventListener("click", function () {//保存された文字をクリックすると線の切り替えができる
      li.classList.toggle("text-decoration-line-through");//クラスを付与する,線を引くのクラスをtoggleによって外す。toggleとはON/OFFを切り替える仕組みのこと
      saveData();//保存をするメソッド
    });

    //入力欄の初期化
    ul.appendChild(li);
    input.value = "";//テキストの欄の値を空にする、初期値は空
    saveData();
  }
}

//生成したリストを保存する関数
function saveData() {
    //liを全て取得して、配列に入れ、順番に表示させる。
    const lists = document.querySelectorAll("li");//li値を全て取得
    const todos = [];//todosに空の配列を代入する

    lists.forEach((li) => {//順番にliの内容を表示する
      todos.push({//配列に順番に入れ込んでいく
        text: li.innerText,//liのテキストが順に表示
        completed: li.classList.contains("text-decoration-line-through"),//todoが完了したものは線を引いてゆく、containsは子要素か否か？
      });
    });

    //生成したリストを保存して一列に並べる
    localStorage.setItem("todos", JSON.stringify(todos));//todoリストを保存してゆく,stringfyとは文字列化、シリアライズ化（複数の要素を一列に並べる操作のことをいう）
}