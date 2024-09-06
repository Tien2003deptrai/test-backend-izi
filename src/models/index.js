const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class SinhVien extends Model { }

SinhVien.init({
    _id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    HoTen: {
        type: DataTypes.STRING
    },
    GioiTinh: {
        type: DataTypes.BOOLEAN
    },
    NgaySinh: {
        type: DataTypes.DATE
    },
    MaLop: {
        type: DataTypes.STRING,
        references: {
            model: 'Lop',
            key: '_id'
        }
    },
    Tinh: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'SinhVien'
});

class Lop extends Model { }

Lop.init({
    _id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    TenLop: {
        type: DataTypes.STRING
    },
    MaKhoa: {
        type: DataTypes.STRING,
        references: {
            model: 'Khoa',
            key: '_id'
        }
    }
}, {
    sequelize,
    modelName: 'Lop'
});

class Khoa extends Model { }

Khoa.init({
    _id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    TenKhoa: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Khoa'
});

class KetQua extends Model { }

KetQua.init({
    _id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    MaSV: {
        type: DataTypes.STRING,
        references: {
            model: 'SinhVien',
            key: '_id'
        }
    },
    MaMH: {
        type: DataTypes.STRING,
        references: {
            model: 'MonHoc',
            key: '_id'
        }
    },
    Diem: {
        type: DataTypes.FLOAT
    }
}, {
    sequelize,
    modelName: 'KetQua'
});

class MonHoc extends Model { }

MonHoc.init({
    _id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    TenMH: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'MonHoc'
});

Lop.belongsTo(Khoa, { foreignKey: 'MaKhoa' });
Khoa.hasMany(Lop, { foreignKey: 'MaKhoa' });

KetQua.belongsTo(SinhVien, { foreignKey: 'MaSV' });
SinhVien.hasMany(KetQua, { foreignKey: 'MaSV' });

KetQua.belongsTo(MonHoc, { foreignKey: 'MaMH' });
MonHoc.hasMany(KetQua, { foreignKey: 'MaMH' });

// sequelize.sync().then(() => {
//     console.log('Đồng bộ hóa cơ sở dữ liệu thành công!');
// }).catch((err) => {
//     console.error('Đồng bộ hóa cơ sở dữ liệu thất bại:', err);
// });

module.exports = {
    SinhVien,
    Lop,
    Khoa,
    KetQua,
    MonHoc,
    sequelize
};