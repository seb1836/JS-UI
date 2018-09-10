var game = {
  init: false
};

// Weapons & spells
var actions = [
  {
    type: 'weapon',
    name: 'sword',
    label: 'Epée',
    attack: 10
  },
  {
    type: 'weapon',
    name: 'axe',
    label: 'Hache',
    attack: 12
  },
  {
    type: 'weapon',
    name: 'shield',
    label: 'Bouclier',
    attack: 0,
    defense: 5
  },
  {
    type: 'spell',
    name: 'fireball',
    label: 'Boule de feu',
    attack: 40,
    mana: 30
  },
  {
    type: 'spell',
    name: 'frostbolt',
    label: 'Eclair de givre',
    attack: 20,
    mana: 20
  },
  {
    type: 'spell',
    name: 'mana',
    label: 'Potion de mana',
    attack: 0,
    mana: 100
  }
];

// Characters
var hero1 = {
  name: 'Roger le guerrier ',
  hp: 500,
  maxHP: 500,
  mp: 50,
  maxMP: 50,
  defense: 0,
  attack: 10,
  class: 'warrior',
  actions: []
};

var hero2 = {
  name: 'Rapafro mage',
  hp: 350,
  maxHP: 350,
  mp: 200,
  maxMP: 200,
  defense: 0,
  attack: 6,
  class: 'mage',
  actions: []
};

// refresh one hero informations a faire
var refreshHerohtml = function(heroElement, hero) {
  //var getdatahpbare1= hero1.maxHP;
  //var getdatampbare1 = hero1.maxMP;
  //var getdatahpbare2 = hero2.maxHP;
  //var getdatampbare2 = hero2.maxMP;
  var hp = document.getElementById('hero1').getElementsByClassName('hero-hp');
  hp[0].innerHTML = hero1.hp + '' + 'HP';
  var mp = document.getElementById('hero1').getElementsByClassName('hero-mp');
  mp[0].innerHTML = hero1.mp + '' + 'MP';
  var hp2 = document.getElementById('hero2').getElementsByClassName('hero-hp');
  hp2[0].innerHTML = hero2.hp + '' + 'HP';
  var mp2 = document.getElementById('hero2').getElementsByClassName('hero-mp');
  mp2[0].innerHTML = hero2.mp + '' + 'MP';
  var hpbar = document.getElementById('hero1').getElementsByClassName('hp-bar');
  hpbar[0].style.width = `${(hero1.hp * 100) / hero1.maxHP}%`;
  //var memo = hero1.hp * 100 / hero1.maxHP
  var manabar = document
    .getElementById('hero1')
    .getElementsByClassName('mp-bar');
  manabar[0].style.width = `${(hero1.mp * 100) / hero1.maxMP}%`;

  var hpbar2 = document
    .getElementById('hero2')
    .getElementsByClassName('hp-bar');
  hpbar2[0].style.width = `${(hero2.hp * 100) / hero2.maxHP}%`;

  var manabar2 = document
    .getElementById('hero2')
    .getElementsByClassName('mp-bar');
  manabar2[0].style.width = `${(hero2.mp * 100) / hero2.maxMP}%`;

  var attack = document
    .getElementById('hero1')
    .getElementsByClassName('attack');
  attack[0].innerHTML = hero1.attack;

  var def = document.getElementById('hero1').getElementsByClassName('defense');
  def[0].innerHTML = hero1.defense;

  var attack2 = document
    .getElementById('hero2')
    .getElementsByClassName('attack');
  attack2[0].innerHTML = hero2.attack;

  var def2 = document.getElementById('hero2').getElementsByClassName('defense');
  def2[0].innerHTML = hero2.defense;
  console.log(hero);
  console.log(heroElement);
};

// refresh the UI a faire récupérer refresh ele html
var refresh = function() {
  var heroelement1 = document.getElementById('hero1');
  var heroelement2 = document.getElementById('hero2');
  refreshHerohtml(heroelement1, hero1);
  refreshHerohtml(heroelement2, hero2);
};

// load the game
var play = function() {
  // display game content and hide play button
  var gameContainer = document.getElementById('game');
  gameContainer.className = 'game-container';
  var playButton = document.getElementById('play');
  playButton.className = 'play gone';

  // init both heroes using the refresh function
  refresh();
};

// check if attacker has enough mana
var hasEnoughMana = function(attacker, manaCost) {
  if (attacker.mp - manaCost < 0) {
    alert('Pas assez de MP !');
    return false;
  }
  return true;
};

// check if defender is dead
var isDead = function(defender) {
  if (defender.hp <= 0) {
    var message = defender.name + ' a perdu !';
    alert(message);
    return true;
  }
  return false;
};

// handle actions from onclick events optimisation
var doAction = function(action, attacker, defender) {
  /* DEBUG */
  var debug = attacker.name + ' uses ' + action;
  if (action !== 'mana' && action !== 'shield') {
    debug += ' on ' + defender.name;
  }
  console.log(debug);
  /* END DEBUG */

  // TODO : reset attacker's defense at each turn
  //hero1.defense= 0;
  //hero2.defense= 0;
  // TODO : write the code for each action
  //        => remove attacker's attack + action damage to defender's HP
  //        => all the informations you need in the actions array (line 6)
  if (action === 'sword') {
    hero2.hp = hero2.hp - actions[0].attack + hero2.defense;
    hero1.attack = actions[0].attack;
    hero1.defense = 0;
    hero2.defense = 0;
  } else if (action === 'axe') {
    // insert code here
    hero2.hp = hero2.hp - actions[1].attack + hero2.defense;
    hero1.attack = actions[1].attack;
    hero1.defense = 0;
    hero2.defense = 0;
  } else if (action === 'shield') {
    // insert code here
    hero1.defense = 0;
    hero2.defense = 0;
    hero1.defense = actions[2].defense + hero1.defense;
    // Note : shield doesn't add attack but defense
  } else if (action === 'fireball') {
    // insert code here
    /* poser question sur comment obtenir value return*/
    if (hasEnoughMana(hero2, actions[3].mana)) {
      hero2.attack = actions[3].attack;
      hero2.mp = hero2.mp - actions[3].mana;
      hero1.hp = hero1.hp - actions[3].attack + hero1.defense;
      hero1.defense = 0;
      hero2.defense = 0;
      // Note : don't forget to check if attacker has enough mana to cast the spell with hasEnoughMana function
    }
  } else if (action === 'frostbolt') {
    // insert code here
    if (hasEnoughMana(hero2, actions[4].mana)) {
      hero2.mp = hero2.mp - actions[4].mana;
      hero1.hp = hero1.hp - actions[4].attack + hero1.defense;
      hero2.attack = actions[4].attack;
      hero1.defense = 0;
      hero2.defense = 0;
      // Note : don't forget to check if attacker has enough mana to cast the spell with hasEnoughMana function
    }
  } else if (action === 'mana') {
    // insert code here
    if (hero2.mp <= 100) {
      hero2.mp = actions[5].mana + hero2.mp;
      hero1.defense = 0;
      hero2.defense = 0;
      // Note : don't forget to check if attacker MP won't be above maxMP after drinking the mana potion
    } else {
      alert('maximum dépassé');
    }
  }

  // check if the defender is dead to end the game
  if (isDead(defender)) {
    endGame();
    return;
  }

  // refresh DOM once JS objects were updated
  refresh();
};

// reset heroes data
var resetData = function() {
  hero1.hp = hero1.maxHP;
  hero1.mp = hero1.maxMP;
  hero1.defense = 0;
  hero2.hp = hero2.maxHP;
  hero2.mp = hero2.maxMP;
  hero2.defense = 0;
};

// end the game
var endGame = function() {
  game.init = false;

  // hide game content and display play button
  var gameContainer = document.getElementById('game');
  gameContainer.className = 'game-container gone';
  var playButton = document.getElementById('play');
  playButton.className = 'main-menu-btn visible';

  // Reset data for a new game
  resetData();
};

//var b =hasenougthmana()
