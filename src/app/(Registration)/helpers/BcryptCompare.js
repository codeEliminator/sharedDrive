const ComparePasswords = async (plainTextPassword, hashedPassword, bcrypt) => {
  try {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  } catch (error) {
    console.error("Ошибка при сравнении паролей:", error);
    return false; 
  }
}

module.exports = ComparePasswords