const { expect } = require("chai");

describe("PasswordManager", function () {
  let passwordManager;
  let owner;
  let addr1;

  beforeEach(async function () {
    const PasswordManager = await ethers.getContractFactory("PasswordManager");
    passwordManager = await PasswordManager.deploy();
    await passwordManager.deployed();

    [owner, addr1] = await ethers.getSigners();
  });

  describe("User Registration", function () {
    it("Should register a new user", async function () {
      await passwordManager.registerUser();
      expect(await passwordManager.isUserRegistered()).to.equal(true);
    });

    it("Should not allow duplicate registration", async function () {
      await passwordManager.registerUser();
      await expect(passwordManager.registerUser()).to.be.revertedWith(
        "User already registered"
      );
    });
  });

  describe("Password Management", function () {
    beforeEach(async function () {
      await passwordManager.registerUser();
    });

    it("Should store a password", async function () {
      const hash = ethers.utils.id("password123");
      await passwordManager.storePassword(hash);

      expect(await passwordManager.getPasswordCount()).to.equal(1);
      expect(await passwordManager.passwordExists(hash)).to.equal(true);
    });

    it("Should remove a password", async function () {
      const hash = ethers.utils.id("password123");
      await passwordManager.storePassword(hash);
      await passwordManager.removePassword(hash);

      expect(await passwordManager.getPasswordCount()).to.equal(0);
      expect(await passwordManager.passwordExists(hash)).to.equal(false);
    });

    it("Should retrieve user passwords", async function () {
      const hash1 = ethers.utils.id("password1");
      const hash2 = ethers.utils.id("password2");

      await passwordManager.storePassword(hash1);
      await passwordManager.storePassword(hash2);

      const passwords = await passwordManager.getUserPasswords();
      expect(passwords.length).to.equal(2);
    });
  });
});
