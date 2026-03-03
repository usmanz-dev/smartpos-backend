require('./config/dotenv');
const connectDB = require('./config/db');
const app = require('./app');

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║          SmartPOS Pro - Server           ║
  ╠══════════════════════════════════════════╣
  ║  🚀 Running on: http://localhost:${PORT}   ║
  ║  📦 Environment: ${(process.env.NODE_ENV || 'development').padEnd(22)}║
  ║  🌱 Seed data: ${process.env.AUTO_SEED === 'true' ? 'auto' : 'npm run seed'}              ║
  ╚══════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

// optionally seed database during startup if requested
// setting AUTO_SEED=true or running in development mode will
// automatically invoke the seeding script. this is handy on
// deployed instances where you want data seeded without manual
// commands.
if (process.env.AUTO_SEED === 'true' || process.env.NODE_ENV === 'development') {
  // delay slightly so the server banner prints first
  setTimeout(() => {
    try {
      console.log('🌱 AUTO_SEED enabled - running database seed...');
      require('./config/seed');
    } catch (err) {
      console.error('Auto-seed failed:', err);
    }
  }, 1000);
}
