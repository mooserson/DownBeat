/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hero = __webpack_require__(1);
	
	var _hero2 = _interopRequireDefault(_hero);
	
	var _platform = __webpack_require__(2);
	
	var _platform2 = _interopRequireDefault(_platform);
	
	var _score = __webpack_require__(3);
	
	var _score2 = _interopRequireDefault(_score);
	
	var _level = __webpack_require__(4);
	
	var _screen_text = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var walker = new Image();
	var hero;
	var stage;
	var score;
	var pauseText;
	window.platforms = [];
	
	document.addEventListener("DOMContentLoaded", function () {
	  stage = new createjs.Stage("canvas");
	  window.stage = stage;
	  walker.onload = imageLoaded;
	  walker.src = 'assets/walker.png';
	
	  // x, y, width, height
	  function imageLoaded() {
	    var data = {
	      images: [walker],
	      frames: [[9, 8, 30, 32], [59, 8, 30, 32], [109, 8, 30, 32], [159, 8, 30, 32], [209, 8, 30, 32], [259, 8, 30, 32], [309, 8, 30, 32], [359, 8, 30, 32], [409, 8, 30, 32], [459, 8, 30, 32], [509, 8, 30, 32], [559, 8, 30, 32], [9, 58, 31, 32], [59, 58, 31, 32], [109, 58, 31, 32], [159, 58, 31, 32], [209, 58, 31, 32], [259, 58, 31, 32], [309, 58, 31, 32]],
	      animations: {
	        run: [0, 11],
	        jump: [12, 18],
	        holdJump: 18
	      }
	    };
	    var spriteSheet = new createjs.SpriteSheet(data);
	    hero = new _hero2.default(spriteSheet);
	    score = new _score2.default();
	    pauseText = (0, _screen_text.pauseScreen)();
	    stage.addChild(pauseText);
	    stage.setChildIndex(pauseText, stage.getNumChildren() - 1);
	    stage.addChild(hero, score.currentScore, score.topScore);
	    stage.setChildIndex(hero, stage.getNumChildren() - 1);
	    window.hero = hero;
	    window.score = score;
	    start();
	  }
	});
	
	function tick(event) {
	
	  if (hero.started) {
	    pauseText.alpha = 0;
	    checkForScore();
	    _platform2.default.tick(window.platforms);
	    hero.play();
	  } else {
	    hero.stop();
	    pauseText.alpha = 1;
	    score.resetScore();
	  }
	  score.tick();
	  hero.tick(window.platforms);
	  stage.update();
	}
	
	function checkForScore() {
	  var bottomPlat = window.platforms[0].getBounds();
	  if (hero.canScore) {
	    if (hero.y + 32 === bottomPlat.y) {
	      score.addPoint();
	      hero.cannotScore();
	    }
	  }
	}
	
	function start() {
	  createjs.Ticker.addEventListener("tick", tick);
	  // let canvasWrapper = document.getElementsByClassName("canvas-wrapper")[0];
	  // canvasWrapper.addEventListener("blur", () => {console.log("blur");});
	  // canvasEl.addEventListener("focusout", checkCanvas);
	  (0, _level.buildStage)(window.platforms);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var spawnX = 100;
	var spawnY = 550;
	
	var Hero = function (_createjs$Sprite) {
	  _inherits(Hero, _createjs$Sprite);
	
	  function Hero(sprite) {
	    _classCallCheck(this, Hero);
	
	    var _this = _possibleConstructorReturn(this, (Hero.__proto__ || Object.getPrototypeOf(Hero)).call(this, sprite));
	
	    _this.bindKeyHandlers();
	    _this.gotoAndPlay("run");
	    _this.resetPosition();
	    _this.snapToPixel = true;
	    _this.checkCollisions = _this.checkCollisions.bind(_this);
	    _this.grounded = false;
	    _this.started = false;
	    _this.jumping = false;
	    _this.canScore = false;
	    return _this;
	  }
	
	  _createClass(Hero, [{
	    key: 'resetPosition',
	    value: function resetPosition() {
	      this.velocity = { x: 0, y: 5 };
	      this.x = spawnX;
	      this.y = spawnY;
	      this.started = false;
	      this.cannotScore();
	    }
	  }, {
	    key: 'run',
	    value: function run(dir) {
	      this.start();
	      if (Math.abs(this.velocity.x) < 7) {
	        switch (dir) {
	          case 'left':
	            this.velocity.x -= 3;
	            break;
	          case 'right':
	            this.velocity.x += 3;
	            break;
	        }
	      }
	    }
	  }, {
	    key: 'jump',
	    value: function jump() {
	      this.start();
	      if (this.grounded) {
	        this.velocity.y -= 15;
	        this.grounded = false;
	      }
	    }
	  }, {
	    key: 'tick',
	    value: function tick(platforms) {
	      var nextPos = this.nextPosition(platforms);
	      this.x = nextPos[0];
	      this.y = nextPos[1];
	      this.onPlatform(platforms);
	      this.applyGravity();
	      this.checkCanScore();
	      if (this.y > 610) {
	        this.resetPosition();
	      }
	    }
	  }, {
	    key: 'nextPosition',
	    value: function nextPosition(platforms) {
	      var collision = void 0;
	      if (!this.grounded) {
	        collision = this.checkCollisions(platforms);
	        if (collision) {
	          return this.collisionPosition(collision);
	        }
	      }
	      return [this.x + this.velocity.x, this.y + this.velocity.y];
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions(platforms) {
	      if (platforms && this.velocity.y > 0) {
	        for (var ii = 0; ii < platforms.length; ++ii) {
	          if (this.checkCollision(platforms[ii])) {
	            return platforms[ii];
	          }
	        }
	      }
	      return null;
	    }
	  }, {
	    key: 'checkCollision',
	    value: function checkCollision(platform) {
	      var m = this.velocity.y / this.velocity.x;
	      var platX = platform.getBounds().x;
	      var platY = platform.getBounds().y;
	      var platWidth = platform.getBounds().width;
	      var platHeight = platform.getBounds().height;
	
	      var heroX = this.x;
	      var heroY = this.y;
	      var heroWidth = this.getBounds().width / 2;
	      var heroHeight = this.getBounds().height;
	
	      if (heroY + heroHeight + this.velocity.y < platY || heroY + heroHeight > platY) {
	        return false;
	      }
	
	      if (this.velocity.x === 0) {
	        // We only use velocity in the third check because
	        // we are checking whether the hero will cross a platform
	        // in the span of its movement this tick
	        if (this.x + heroWidth > platX && this.x < platX + platWidth && this.y + this.velocity.y + heroHeight > platY && this.y < platY + platHeight) {
	          return true;
	        }
	        return false;
	      }
	
	      if (platX + platWidth > heroX + this.velocity.x && platX < heroX + heroWidth + this.velocity.x && (platY + platHeight > m * (platX - heroX) + heroY || platY + platHeight > m * (platX + platWidth - heroX) + heroY) && (platY < m * (platX - heroX) + heroY + heroHeight || platY < m * (platX + platWidth - heroX - heroWidth) + heroY + heroHeight)) {
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'collisionPosition',
	    value: function collisionPosition(platform) {
	      var m = this.velocity.y / this.velocity.x;
	      var platY = platform.getBounds().y;
	      var heroX = this.x;
	      var heroY = this.y;
	      var height = this.getBounds().height;
	
	      if (this.velocity.x === 0) {
	        this.velocity.y = 0;
	        return [heroX, platY - height];
	      }
	
	      var newX = (platY - heroY) / m + heroX;
	      this.velocity.y = 0;
	      if (this.velocity.x > 0) this.velocity.x -= 2;
	      if (this.velocity.x < 0) this.velocity.x += 2;
	      this.grounded = true;
	      return [heroX, platY - height];
	    }
	  }, {
	    key: 'onPlatform',
	    value: function onPlatform(platforms) {
	      var match = false;
	      for (var i = 0; i < platforms.length; ++i) {
	        var platBounds = platforms[i].getBounds();
	        var heroBounds = this.getBounds();
	        if (this.x + heroBounds.width >= platBounds.x && this.x <= platBounds.x + platBounds.width && this.y + heroBounds.height === platBounds.y) {
	          this.grounded = true;
	          return;
	        }
	      }
	      this.grounded = false;
	    }
	  }, {
	    key: 'applyGravity',
	    value: function applyGravity() {
	      if (this.grounded === false) {
	        this.velocity.y += 1;
	        if (this.jumping === false) {
	          this.gotoAndPlay("jump");
	          this.gotoAndStop("holdJump");
	          this.jumping = true;
	        }
	      } else {
	        this.velocity.y = 0;
	        if (this.velocity.x > 0) this.velocity.x -= 1;
	        if (this.velocity.x < 0) this.velocity.x += 1;
	        if (this.jumping === true) {
	          this.gotoAndPlay("run");
	          this.jumping = false;
	        }
	      }
	    }
	  }, {
	    key: 'checkCanScore',
	    value: function checkCanScore() {
	      var topPlat = window.platforms[window.platforms.length - 1].getBounds();
	      if (this.y + 32 === topPlat.y) {
	        this.canScore = true;
	      }
	    }
	  }, {
	    key: 'cannotScore',
	    value: function cannotScore() {
	      this.canScore = false;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.started = true;
	    }
	  }, {
	    key: 'bindKeyHandlers',
	    value: function bindKeyHandlers() {
	      var _this2 = this;
	
	      key('left', function () {
	        return _this2.run('left');
	      });
	      key('right', function () {
	        return _this2.run('right');
	      });
	      key('space', function () {
	        return _this2.jump();
	      });
	    }
	  }]);
	
	  return Hero;
	}(createjs.Sprite);
	
	exports.default = Hero;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Platform = function (_createjs$Shape) {
	  _inherits(Platform, _createjs$Shape);
	
	  function Platform(x, y) {
	    _classCallCheck(this, Platform);
	
	    var graphics = new createjs.Graphics().beginFill("#ff0000").drawRect(x, y, 100, 10);
	
	    var _this = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, graphics));
	
	    _this.setBounds(x, y, 100, 50);
	    _this.direction = _this._setDirection();
	    _this.velocity = 2;
	
	    return _this;
	  }
	
	  _createClass(Platform, [{
	    key: "_setDirection",
	    value: function _setDirection() {
	      var num = Math.random();
	      if (num > .5) {
	        return "right";
	      } else {
	        return "left";
	      }
	    }
	  }, {
	    key: "_increaseVelocity",
	    value: function _increaseVelocity() {
	      if (window.score.points > 0) {
	        this.velocity = 2 + window.score.points * .5;
	      }
	    }
	  }], [{
	    key: "_swapDirection",
	    value: function _swapDirection(platform) {
	      if (platform.direction === "right") {
	        platform.direction = "left";
	      } else {
	        platform.direction = "right";
	      }
	    }
	  }, {
	    key: "highlightObjective",
	    value: function highlightObjective() {
	      var bottomPlat = window.platforms[0];
	      var topPlat = window.platforms[window.platforms.length - 1];
	      if (window.hero.canScore) {
	        bottomPlat.graphics._fill.style = "lightblue";
	        topPlat.graphics._fill.style = "red";
	      } else {
	        topPlat.graphics._fill.style = "lightblue";
	        bottomPlat.graphics._fill.style = "red";
	      }
	    }
	  }, {
	    key: "tick",
	    value: function tick(platforms) {
	      Platform.highlightObjective();
	      platforms.forEach(function (platform) {
	        platform._increaseVelocity();
	        if (platform.getBounds().x < -50 || platform.getBounds().x > 350) {
	          Platform._swapDirection(platform);
	        }
	        if (platform.direction === "right") {
	          platform.x += platform.velocity;
	          platform.setBounds(platform.getBounds().x + platform.velocity, platform.getBounds().y, 100, 50);
	        } else if (platform.direction === "left") {
	          platform.x -= platform.velocity;
	          platform.setBounds(platform.getBounds().x - platform.velocity, platform.getBounds().y, 100, 50);
	        }
	      });
	    }
	  }]);
	
	  return Platform;
	}(createjs.Shape);
	
	exports.default = Platform;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Score = function () {
	  function Score() {
	    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Score: ";
	
	    _classCallCheck(this, Score);
	
	    this.currentScore = new createjs.Text(text + 0, "bold 28px Bungee Inline", "white");
	    this.topScore = new createjs.Text("Top: " + 0, "bold 20px Bungee Inline", "white");
	    this.topScore.y = 25;
	    this.points = 0;
	    this.topPoints = 0;
	  }
	
	  _createClass(Score, [{
	    key: "resetScore",
	    value: function resetScore() {
	      this.points = 0;
	    }
	  }, {
	    key: "addPoint",
	    value: function addPoint() {
	      this.points += 1;
	    }
	  }, {
	    key: "checkHighscore",
	    value: function checkHighscore() {
	      if (this.points > this.topPoints) {
	        this.topPoints = this.points;
	        this.topScore.text = "Top: " + this.topPoints;
	      }
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      this.currentScore.text = "Score: " + this.points;
	      this.checkHighscore();
	    }
	  }]);
	
	  return Score;
	}();
	
	exports.default = Score;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildStage = undefined;
	
	var _platform = __webpack_require__(2);
	
	var _platform2 = _interopRequireDefault(_platform);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var buildStage = exports.buildStage = function buildStage(platforms) {
	  if (platforms.length === 0) {
	    var floor = new _platform2.default(100, 590);
	    floor.direction = "floor";
	    platforms.push(floor);
	    window.stage.addChild(floor);
	  }
	  var highestPlatY = platforms[platforms.length - 1].getBounds().y;
	  while (highestPlatY > 100) {
	    var posX = Math.random() * (380 - 50) + 20;
	    var posY = highestPlatY - (Math.random() * (130 - 100) + 80);
	    var newPlatform = new _platform2.default(posX, posY);
	    platforms.push(newPlatform);
	    window.stage.addChild(newPlatform);
	    highestPlatY = platforms[platforms.length - 1].getBounds().y;
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pauseScreen = exports.pauseScreen = function pauseScreen() {
	  var pauseText = new createjs.Text("Move to begin!", "bold 25px Bungee Inline", "white");
	
	  pauseText.x = 100;
	  pauseText.y = 270;
	  return pauseText;
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map