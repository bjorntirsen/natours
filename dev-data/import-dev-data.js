const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Customer = require('./../models/customerModel');

dotenv.config({ path: './config.env' });

const database = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfull!');
  });

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/customers.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Customer.create(customers);
    console.log('✨ Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await Customer.deleteMany();
    console.log('🔥 Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
