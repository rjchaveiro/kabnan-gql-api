export default {
  isAuthenticated: (next, source, args, context) => {
    if (!context.user) throw new Error('You are not authorized to access.');
    return next();
  },
};
