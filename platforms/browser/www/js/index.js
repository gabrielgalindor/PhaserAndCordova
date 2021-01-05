document.addEventListener('deviceready', function() {

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
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

    var player;
    var stars;
    var bombs;
    var platforms;
    var cursors;
    var score = 0;
    var gameOver = false;
    var scoreText;
    var isMobile = false;
    var up;
    var leftbtn;
    var rightbtn;

    var game = new Phaser.Game(config);

    function preload () {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('up', 'assets/up.png');
        this.load.image('down', 'assets/down.png');
        this.load.image('right', 'assets/right.png');
        this.load.image('left', 'assets/left.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    function create () {
        // window.addEventListener('resize', resize);
        // resize();
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        if (!this.sys.game.device.input.touch) {
            this.cursors = this.input.keyboard.createCursorKeys();
            isMobile = false;
        } else {
            this.input.addPointer(9);
            game.scale.scaleMode = Phaser.ScaleModes.NEAREST;
            // Center the game horizontally and vertically
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            isMobile = true;
            up = this.add.image(700, 550, 'up');
            up.setInteractive();
            // down = this.add.image(100, 580, 'down');
            rightbtn = this.add.image(150, 550, 'right');
            rightbtn.setInteractive();
            leftbtn = this.add.image(50, 550, 'left');
            leftbtn.setInteractive();
        }

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        bombs = this.physics.add.group();

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.collider(player, bombs, hitBomb, null, this);
    }

    function update () {
        if (gameOver) {
            return;
        }
        if (!isMobile) {
            cursors = this.cursors;
            if (cursors.left.isDown) {
                player.setVelocityX(-160);
                player.anims.play('left', true);
            }
            else if (cursors.right.isDown) {
                player.setVelocityX(160);
                player.anims.play('right', true);
            }
            else {
                player.setVelocityX(0);
                player.anims.play('turn');
            }

            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-330);
            }
        } else {
            // this.up.input.on('gameobjectdown',this.jump);
            up.on('pointerdown', jump);
            leftbtn.on('pointerdown', goLeft);
            rightbtn.on('pointerdown', goRight);
            leftbtn.on('pointerout',   doStop);
            rightbtn.on('pointerout',  doStop);
        }
    }

    function jump() {
        player.setVelocityY(-330);
    }
    function goLeft() {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    function goRight() {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    function doStop() {
        player.setVelocityX(0);
	    player.anims.play('turn');
    }

    function collectStar (player, star) {
        star.disableBody(true, true);

        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);

        if (score%20 == 0) {
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }

        if (stars.countActive(true) === 0) {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });
        }
    }

    function hitBomb (player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
    }
});