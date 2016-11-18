# Down Beat

### A Music-synced Platformer

Down beat will generate platforms for the player to jump on to escape. The platforms will drop in sync to music that will slowly increase in speed. The player will benefit by jumping in time to the music and will benefit by staying ahead of the fatal bottom-of-screen.

### MVPs--Goals for the project

The features for a minimum-viable-product were:

- [ ] A canvas-based platformer game
- [ ] Player controls are responsive and feel fun to user
- [ ] A README will be included
- [ ] Viewport speeds up in sync music

### Wireframe:

![Site sketch](docs/img/sketch.png)

The game will be on a single page site. It will include a github link, a title, a brief description and basic gameplay instruction.

### Architecture and Technologies

The game will run on JavaScript using the AudioContext api for the songs..
  - Easel JS will help streamline using the HTML5 Canvas implementation for rendering.
  - Sound JS will likely be implemented help manage audio to sync with gameplay.
    - Initially I will select songs with a set beats-per-minute and hard-code the rate that the platforms generate relative to that. It should behave in such a way that the player is jumping in time.
    - The stretch goal for this would be to have the user select a song and use an API such as EchoNest or dynamically using Audio API.
  - Webpack to package scripts.

  player.js Will handle the player logic. It will handle movement for the player's character, behavior and animation.

  platform.js Will contain platform logic.

  world.js Will contain the backdrop and tie the player, platforms and other objects together.


### Timeline

**Day 1**: Complete configuration including webpack, and installing the necessary libraries. Create a package.json file. Figure out what other libraries will be useful. Get rendering objects and look into dynamic audio playback.

- Webpack set up with entry file
- Libraries installed
- Architecture skeleton defined
- Begin learning Easel

**Day 2**: Work through enough Easel documentation to be able to render and begin animating objects.

- Set up a canvas and get character to render.
- Begin getting character to move.
- Set up keyboard controls for jumping and running.
- Scope out the next steps for rendering with music.

**Day 3**: Work on character movement and platforms. Finish character control and begin working on platform generation and collision with character.

- Get character sprite/animation working.
- Create platform objects and character interaction with them.
  - Platforms generate at dynamic rate.
  - Character can jump from platform to platform.
- Music plays in game.

**Day 4**: Tie in music with platforms. Handle the UI. Style and build out the page.

- Have multiple classical piano songs that increase in tempo
- UI shows height/level/music speed
- Mute button for music
- Have the game splash and game-over pages complete.
- Make page look clean and finish descriptions.

### Bonus features

More variety in game-play. User-uploaded songs. Having events and changing backgrounds.

- I would like to add items to effect player's movement speed. Spring boards and other boosters.
- More engaging animation and sound effects.
- Events or other characters to meet along the way up, maybe a story.
- Backgrounds that slowly will change depending on height and level.
