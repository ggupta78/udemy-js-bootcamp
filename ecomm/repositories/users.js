const fs = require('fs');
const crypto = require('crypto');

class UsersRepositories {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename!');
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    // Open this.filename
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf-8',
      })
    );
  }

  async create(attrs) {
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    // write the updated records back to the file
    await this.writeAll(records);

    return attrs;
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error(`Record with ${id} not found!`);
    }
    Object.assign(record, attrs);

    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (const record of records) {
      let found = true;
      for (const key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
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
