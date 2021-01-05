document.addEventListener('deviceready', function() {

    var intervalID = window.setInterval(miFuncion, 8000);

    function miFuncion() {
        document.getElementById("videocont").style.display="none";
    }

    var config = {
        type: Phaser.AUTO,
        width: 732,
        height: 412,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        input :{
            activePointers:2,
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    // var player;
    // var stars;
    // var bombs;
    // var platforms;
    // var cursors;
    // var score = 0;
    // var gameOver = false;
    // var scoreText;
    // var isMobile = false;
    // var up;
    // var leftbtn;
    // var rightbtn;
    var Scx = window.screen.width/732;
    var Scy = window.screen.height/412;
    var set1;
    var set2;
    var text;

    var game = new Phaser.Game(config);

    function preload () {
       this.load.image('menu', 'assets/menu1.png');
       this.load.image('menu2','assets/menu2.png');
    }

    function create () {
        // window.addEventListener('resize', resize);
        // resize();
       set2 = this.add.tileSprite(366*Scx, 206*Scy, 800, 600, 'menu2');
       set1 = this.add.image(366*Scx, 206*Scy, 'menu');
       

       set1.setScale(Scx,Scy);
       set2.setScale(Scx,Scy);

        //  Our player animations, turning, walking left and walking right.
        text = this.add.text(0, 0, 'Move the mouse', { font: '16px Courier', fill: '#00ff00' });
          text.setText([
        'x: '+window.screen.width,
        'y: '+window.screen.height
         ]);

        
    }

    function update () {
        set2.tilePositionX -= 15;
    }

    
});