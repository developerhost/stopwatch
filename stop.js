'use strict';

{
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    let startTime;//処理を開始する定数
    let timeoutId;//処理を停止する定数
    let elapsedTime = 0;//タイマーが走っていた時間
    
    function countUp(){
        console.log(Date.now() - startTime);
        const d = new Date(Date.now() - startTime + elapsedTime);//ミリ秒から秒に変更していく
        const m = String(d.getMinutes()).padStart(2, '0');//分(Stringは文字列にする,padStartは見た目を2桁にしてね、何もなかったら0にしてね)
        const s = String(d.getSeconds()).padStart(2, '0');//秒
        const ms = String(d.getMilliseconds()).padStart(3, '0');//ミリ秒
        timer.textContent = `${m}:${s}:${ms}`;//テンプレートリテラル

        timeoutId = setTimeout(() => {
            countUp();//返り値としてtimeoutIdを取得
        }, 10);//10ミリ秒ごとにカウントアップしていく
    }

    //それぞれのボタンしか押せないようにdisabledしていく

    /*これまではボタン属性でやっていたので、disabledが使えたが、div属性に変えたため、こちらが使えなくなってしまった。
    ので、classList.addでおこなう
    ただ、このままだと押せない風に見えているだけで実際は押せるので、IF分で条件分岐させる */
    function setButtonStateInitial() {
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.add('inactive');
    }

    function setButtonStateRunning() {
        start.classList.add('inactive');
        stop.classList.remove('inactive');
        reset.classList.add('inactive');
    }

    function setButtonStateStopped() {
        start.classList.remove('inactive');
        stop.classList.add('inactive');
        reset.classList.remove('inactive');
    }

    setButtonStateInitial();//ページ読み込み時にdisabled

    //ボタン押せる設定になっているため、押せないように条件分岐
    start.addEventListener('click', () => {
        if (start.classList.contains('inactive') === true) {
            return;//これがあると連打しても一回しか押せなくなる
        }
        setButtonStateRunning();
        startTime =Date.now();//クリックしてからの経過時刻
        countUp();
    });

    stop.addEventListener('click', () => {
        if (stop.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateStopped();//start押した時にdisabled
      clearTimeout(timeoutId);//タイマーを停止
      elapsedTime += Date.now() - startTime;//タイマーが走っていた時間を保持
    });

    reset.addEventListener('click', () => {
        if (reset.classList.contains('inactive') === true) {
            return;
        }
        setButtonStateInitial();//リセット押した時に最初のdisabled
      timer.textContent = '00:00.000';
      elapsedTime = 0;
    });
}