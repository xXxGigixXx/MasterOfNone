class Bot {
  constructor(name, strategy) {
    this.name = name;
    this.health = 100;
    this.strategy = strategy;
  }

  decide(opponent) {
    return this.strategy(this, opponent);
  }
}

const aggressive = (self, opponent) => {
  if (opponent.health < 20) return "special";
  return self.health > 30 ? "attack" : "defend";
};

const defensive = (self, opponent) => {
  return self.health < 40 ? "defend" : "attack";
};

function resolveAction(attacker, action, defender) {
  if (action === "attack") {
    defender.health -= 15;
    return `${attacker.name} attacks for 15 damage.`;
  }
  if (action === "defend") {
    attacker.health = Math.min(attacker.health + 10, 100);
    return `${attacker.name} defends and heals 10.`;
  }
  if (action === "special") {
    defender.health -= 30;
    return `${attacker.name} uses SPECIAL ATTACK! 30 damage.`;
  }
  return `${attacker.name} is confused.`;
}

function runGame() {
  const bot1 = new Bot("Aggressor", aggressive);
  const bot2 = new Bot("Defender", defensive);
  let output = `Starting match: ${bot1.name} vs ${bot2.name}\n\n`;

  for (let round = 1; round <= 10; round++) {
    if (bot1.health <= 0 || bot2.health <= 0) break;
    output += `-- Round ${round} --\n`;
    const a1 = bot1.decide(bot2);
    const a2 = bot2.decide(bot1);
    output += resolveAction(bot1, a1, bot2) + "\n";
    output += resolveAction(bot2, a2, bot1) + "\n";
    output += `${bot1.name}: ${bot1.health} HP | ${bot2.name}: ${bot2.health} HP\n\n`;
  }

  let winner = "Draw";
  if (bot1.health > bot2.health) winner = bot1.name;
  else if (bot2.health > bot1.health) winner = bot2.name;

  output += `🏆 Winner: ${winner}`;
  document.getElementById("output").innerText = output;
}

runGame();
