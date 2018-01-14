/**
 * @author    Pavle Goloskokovic <pgoloskokovic@gmail.com> (http://prunegames.com)
 */

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    },
    pixelArt: true
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('title', 'assets/pics/catastrophi.png');

    this.load.spritesheet('button', 'assets/ui/flixel-button.png', { frameWidth: 80, frameHeight: 20 });

    this.load.bitmapFont('nokia', 'assets/fonts/bitmap/nokia16black.png', 'assets/fonts/bitmap/nokia16black.xml');

    this.load.audio('sfx', [
        'assets/audio/SoundEffects/fx_mixdown.ogg',
        'assets/audio/SoundEffects/fx_mixdown.mp3'
    ]);
}

var markers = [
    { name: 'alien death', start: 1, duration: 1.0, config: {} },
    { name: 'boss hit', start: 3, duration: 0.5, config: {} },
    { name: 'escape', start: 4, duration: 3.2, config: {} },
    { name: 'meow', start: 8, duration: 0.5, config: {} },
    { name: 'numkey', start: 9, duration: 0.1, config: {} },
    { name: 'ping', start: 10, duration: 1.0, config: {} },
    { name: 'death', start: 12, duration: 4.2, config: {} },
    { name: 'shot', start: 17, duration: 1.0, config: {} },
    { name: 'squit', start: 19, duration: 0.3, config: {} }
];

function create ()
{
    this.add.image(400, 300, 'title');

    for (var i=0; i < markers.length; i++)
    {
        makeButton.bind(this)(markers[i].name, i);
    }

    this.input.events.on('GAME_OBJECT_OVER_EVENT', function (event)
    {
        setButtonFrame(event.gameObject, 0);
    });
    this.input.events.on('GAME_OBJECT_OUT_EVENT', function (event)
    {
        setButtonFrame(event.gameObject, 1);
    });
    this.input.events.on('GAME_OBJECT_DOWN_EVENT', function (event)
    {
        var button = event.gameObject;
        var index = button.getData('index');

        this.game.sound.play('sfx', markers[index]);

        setButtonFrame(button, 2);

    }.bind(this));
    this.input.events.on('GAME_OBJECT_UP_EVENT', function (event)
    {
        setButtonFrame(event.gameObject, 0);
    });
}

function makeButton(name, index)
{
    var button = this.add.image(680, 115 + index*40, 'button', 1).setInteractive();
    button.setData('index', index);
    button.setScale(2, 1.5);

    var text = this.add.bitmapText(button.x - 40, button.y - 8, 'nokia', name, 16);
    text.x += (button.width - text.width) / 2;
}

function setButtonFrame(button, frame)
{
    button.frame = button.scene.textures.getFrame('button', frame);
}