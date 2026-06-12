
const logActivity = async (userId, action, details = "") => {
  try {
    await ActivityLog.create({ user: userId, action, details });
  } catch (err) {
    console.error("Log failed:", err.message);
  }
};

module.exports = logActivity;
