let pong = -1;
export const getPing = (_req, res) => {
  pong += 1;
  res.json({ pong });
};

export const resetPing = (_req, res) => {
  pong = -1;
  res.json({ pong });
};
