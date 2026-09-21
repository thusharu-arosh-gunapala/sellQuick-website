require('dotenv').config({ path: './.env' });
const Admin = require('./models_sql/AdminSQL');

const seedAdmin = async () => {
  const adminExists = await Admin.findOne({ email: 'admin@example.com' });
  if (adminExists) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const admin = await Admin.create({
    email: 'admin@example.com',
    password: 'password123',
  });
  
  if (admin) {
    console.log('Admin seeded successfully: admin@example.com / password123');
  } else {
    console.log('Failed to seed admin');
  }
  
  process.exit(0);
};

seedAdmin();
