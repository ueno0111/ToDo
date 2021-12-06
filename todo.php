<?php
  //値の初期化
  $todos = [[]];

  if ($_SERVER['REQUEST_METHOD'] === 'POST'){ //postされた情報と等しい場合
      if (empty($_POST['todo'])){//todoの中身が空の場合は
        $error = 'ToDoを入力してください';//error文を表示する
      }else{
        $todos[] = ['todo' => $_POST['todo']];//todoにpostした値を出力する
      }
  }
?>

<!--HTMLの記述-->
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <!--Bootstrap CSSの読み込み-->
        <link rel="stylesheet" href="./bootstrap.css" media="screen">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        <link rel="stylesheet" href="todo.css">
        <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
        <title>ToDoアプリ</title>
    </head>


    <body>
      <header>
        <div class="header"><!--Bootstrapの色-->
          <div class="header_wrapper">
              <h1 class="title">TODO</h1>
          </div>
        </div>
      </header>

      <main>
        <div class="wrapper">
          <div class="container">
            <!--値が空の場合はエラー表示をさせる-->
            <?php if (!empty($error)) {//$errorが空の場合 ?>
            <p class="error"><?= $error ?></p><!--ToDoリストを入力してくださいを表示させる-->
            <?php } ?>

            <!--todoの内容を順番に取り出して表示させる-->
            <ul class="list-group text-secondary my-4 mx-5"  style="list-style:none;"  id="ul">
              <?php foreach($todos as $todo){ ?><!--$todosの中身を全て取り出す-->
                <li><?= $todo['todo'] ?></li><!--liにして$todoの中身を表示する-->
              <?php }?>
            </ul>

            <!--入力したフォームの内容を自身のページに送る-->
            <form action="todo.php" method="post" id="form"><!--todo.phpにpostする-->
                <input type="text" name="todo" id="input"placeholder="タスクを入力して下さい"><!--タスクの入力-->
                <div class="add"><input type="submit" value="追加" id="add"></div><!--追加ボタン-->
            </form>
            <div class="caution">
              <div class="text">※タスクはスワイプで削除できます。</div>
            </div>

          </div>
        </div>
      </main>


        <!--Javascriptの読み込み-->
        <script src="todo_n.js"></script>
    </body>
</html>