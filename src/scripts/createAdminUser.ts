import bcrypt from 'bcrypt';
import prisma from '../prisma/client';

async function createAdminUser() {
  const passwordHash = await bcrypt.hash('lokmanhekim2025!', 10);
  const user = await prisma.user.create({
    data: {
      login: 'lokmanhekim',
      password: passwordHash,
      role: 'admin',
      email: 'admin@example.com',
      phone: '+1234567890',
      firstName: 'Admin',
      lastName: 'User',
    },
  });
  console.log('Admin user created:', user);
}

createAdminUser()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
