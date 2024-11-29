export function getUserId(): string | undefined {
  if (typeof localStorage === "undefined") return undefined;
  const userId = localStorage.getItem("userId");
  if (userId) {
    return userId;
  }
  const randomId = generateRandomHexId();
  localStorage.setItem("userId", randomId);
  return randomId;
}

function generateRandomHexId(): string {
  const hexChars = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * hexChars.length);
    result += hexChars[randomIndex];
  }
  return result;
}
