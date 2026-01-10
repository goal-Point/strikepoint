const STORAGE_KEYS = {
  ACTIVE_COMPETITION: "kngoSpotTheBall_active",
  ENTRY_PREFIX: "kngoSpotTheBall_entry_"
};

export function getActiveCompetition() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_COMPETITION);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading competition:", error);
    return null;
  }
}

export function saveCompetition(imageUrl, centerX, centerY) {
  const competition = {
    imageUrl,
    centerX,
    centerY,
    tolerance: 0,
    competitionId: `comp-${Date.now()}`,
    createdAt: Date.now()
  };

  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_COMPETITION, JSON.stringify(competition));
    return competition;
  } catch (error) {
    console.error("Error saving competition:", error);
    return null;
  }
}

export function getUserEntry(competitionId) {
  try {
    const key = STORAGE_KEYS.ENTRY_PREFIX + competitionId;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading entry:", error);
    return null;
  }
}

export function saveUserEntry(competitionId, x, y, isCorrect) {
  const entry = {
    x,
    y,
    submitted: true,
    correct: isCorrect,
    timestamp: Date.now()
  };

  try {
    const key = STORAGE_KEYS.ENTRY_PREFIX + competitionId;
    localStorage.setItem(key, JSON.stringify(entry));
    return entry;
  } catch (error) {
    console.error("Error saving entry:", error);
    return null;
  }
}

export function checkGuess(guessX, guessY, centerX, centerY, tolerance = 0) {
  const distance = Math.sqrt(
    Math.pow(guessX - centerX, 2) + Math.pow(guessY - centerY, 2)
  );
  return distance <= tolerance;
}

export function deleteActiveCompetition() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_COMPETITION);
    return true;
  } catch (error) {
    console.error("Error deleting competition:", error);
    return false;
  }
}
