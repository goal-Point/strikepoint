export function getSpinStatus() {
  const lastSpin = localStorage.getItem("kngoLastSpin");
  const reward = localStorage.getItem("kngoReward");

  if (!lastSpin) {
    return { canSpin: true, reward: null, timeLeft: 0 };
  }

  const now = Date.now();
  const diff = now - Number(lastSpin);
  const cooldown = 24 * 60 * 60 * 1000;

  if (diff >= cooldown) {
    return { canSpin: true, reward: null, timeLeft: 0 };
  }

  return {
    canSpin: false,
    reward,
    timeLeft: cooldown - diff,
  };
}

export function saveSpinReward(reward) {
  localStorage.setItem("kngoReward", reward);
  localStorage.setItem("kngoLastSpin", Date.now());
}
