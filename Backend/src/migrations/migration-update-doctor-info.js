module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'Doctor_Infor',
                'specialtyId', {
                    type: Sequelize.INTEGER
                }
            )
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Doctor_Infor', 'specialtyId'),
        ]);
    }
};