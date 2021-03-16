const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepositories extends Repository {
  async create(attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const hashed = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${hashed.toString('hex')}.${salt}`,
    };
    records.push(record);
    // write the updated records back to the file
    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    const [hashed, salt] = saved.split('.');

    const hashedSupplied = await scrypt(supplied, salt, 64);

    return hashed === hashedSupplied.toString('hex');
  }
}

// const test = async () => {
//   const repo = new UsersRepositories('users.json');

//   //await repo.create({ email: 'test@test.com', password: 'password' });

//   //const users = await repo.getAll();

//   //await repo.delete('fc11bdc1');

//   //await repo.update('470901dd', { password: 'my-password' });

//   const user = await repo.getOneBy({ password: 'my-password', id: '470901dd' });
//   console.log(user);

//   //const users = await repo.getAll();
//   // console.log(users);
// };

// test();

module.exports = new UsersRepositories('users.json');
