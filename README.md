# Down Beat

[Down Beat live][githubpages]

[githubpages]: https://mooserson.github.io/DownBeat/

### A Sisyphean Task
Downbeat is a game written in javascript using the easelJS library.
If challenges the player to explore a dangerous landscape and to triumph over a seemingly absurd and insurmountable task.

![DownBeat](/docs/img/gameplay.gif)

### Challenge
The challenge of calculating collisions became a big focus of the work on this project. The hero has velocity meaning she will move more than one pixel per frame. It is necessary to check and see if:
- 1) If the hero will pass through a platform in the next frame
- 2) Where the hero should land

![Math](docs/img/collision2.jpg)

Here we check to see if the hero will hit a platform when falling straight down.
```javascript
if (this.velocity.x === 0) {
  // We only use velocity in the third check because
  // we are checking whether the hero will cross a platform
  // in the span of its movement this tick
  if (
    this.x + heroWidth > platX
    && this.x < platX + platWidth
    && this.y + this.velocity.y + heroHeight > platY
    && this.y < platY + platHeight
  ) {
    return true;
  }
  return false;
}
```
Then, in cases where the x velocity is not zero we check to see if there is a gap between...
- hero left side and object right
- hero right and object left
- the top of the hero in-flight and the bottom of the platform
- the bottom of the hero in-flight and top of the platform

```javascript
if (
  platX + platWidth > heroX + this.velocity.x
  && platX < heroX + heroWidth + this.velocity.x
  && (
    platY + platHeight > m * (platX - heroX) + heroY
    || platY + platHeight > m * (platX + platWidth - heroX) + heroY
  ) && (
    platY < m * (platX - heroX) + heroY + heroHeight
    || platY < m * (platX + platWidth - heroX - heroWidth) + heroY + heroHeight
  )
) {
  return true;
}
```

### Features Ahead
- 1) Include music that would sync in speed with the motion of the platforms
- 2) Viewport follows hero
