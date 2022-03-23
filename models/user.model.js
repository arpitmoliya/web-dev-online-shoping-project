const bcryptjs = require("bcryptjs");
const db = require("../database/database");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  async getUserWithSameEmail() {
    return await db.getDb().collection("users").findOne({ email: this.email });
  }

  async signup() {
    const hashedPassword = await bcryptjs.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }

  async hasMtachingPassword(hashedPassword) {
    return await bcryptjs.compare(this.password, hashedPassword);
  }
}

module.exports = User;
