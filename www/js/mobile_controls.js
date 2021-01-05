// function buildMobileControls() {
//     console.log("hereeraea");
//     // Found this helps with multiple buttons being pressed at the same time on mobile
//     // this.input.addPointer(2);
//
//     // Only emitting events from the top-most Game Objects in the Display List.
//     // Mainly useful if you have "background" button zones and you only want
//     // one to be triggered on a single tap.
//     this.input.topOnly = true;
//
//     // Create an object mimicking what the keyboard version would be.
//     // We are going to modify this on touch events so we can check in our update() loop
//     this.cursors = {
//         'up': {},
//         'left': {},
//         'right': {},
//         'down': {},
//     };
//
//     // keyboard listeners to be user for each key
//     const pointerDown = key => {
//         // modifies this.cursors with the property that we check in update() method
//         this.cursors[key].isDown = true
//     };
//     const pointerUp = key => {
//         this.cursors[key].isDown = false
//     };
//
//     // button sizing
//     const WIDTH = 167;
//     const HEIGHT = 153;
//
//     // gutter width between buttons
//     const GUTTER = 12;
//
//
//     // Create a button helper
//     const createBtn = (key, x, y, width=WIDTH, height=HEIGHT) => {
//         // Add a faded out red rectangle for our button
//         this.add.rectangle(x, y, width, height, 0xff0000, 0.07)
//             .setOrigin(0,0)
//             .setScrollFactor(0)
//             .setInteractive()
//             .on('pointerdown', () => pointerDown(key))
//             .on('pointerup', () => pointerUp(key))
//     };
//
//     // Y coordinate to place buttons
//     const BTN_Y = GAME_HEIGHT - HEIGHT - GUTTER;
//
//     // create player control buttons
//     createBtn('left', GUTTER, BTN_Y);
//     createBtn('right', WIDTH + 2*GUTTER, BTN_Y);
//     createBtn('up', GAME_WIDTH - 2*(WIDTH + GUTTER), BTN_Y);
//     createBtn('down', GAME_WIDTH - WIDTH - GUTTER, BTN_Y);
// }