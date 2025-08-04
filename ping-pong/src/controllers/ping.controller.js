let pong = -1;
export const getPingPong = (_req, res) => {
  pong += 1;
  res.json({ pong });
};

export const getPing = (_req, res) => {
  res.json({ pong });
};
export const resetPing = (_req, res) => {
  pong = -1;
  res.json({ pong });
};
