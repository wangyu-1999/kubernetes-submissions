export const getGreeting = (req, res) => {
  const name = req.query.name || 'Stranger';
  res.json({ message: `Hello, ${name}!` });
};
