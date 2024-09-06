const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('Database connected and synced');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
