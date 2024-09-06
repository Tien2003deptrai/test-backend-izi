const { Sequelize } = require('sequelize');
const { SinhVien, Lop, Khoa, KetQua, MonHoc } = require('../models');

const StudentController = {
    // View 
    async viewStudent(req, res) {
        try {
            const students = await SinhVien.findAll({
                include: [
                    {
                        model: Lop,
                        attributes: ['tenLop']
                    }
                ]
            });

            res.status(200).json({ data: students });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async countStudent(req, res) {
        try {
            const classes = await Lop.findOne({
                where: {
                    TenLop: {
                        [Sequelize.Op.iLike]: '%CNTT 01%'
                    }
                },
                include: [{
                    model: SinhVien,
                    attributes: ['_id']
                }]
            })

            res.status(200).json({ data: classes });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async viewStudentIT(req, res) {
        try {
            const students = await SinhVien.findAll({
                attributes: ['_id', 'HoTen', 'NgaySinh'],
                include: [{
                    model: Lop,
                    include: [{
                        model: Khoa,
                        where: {
                            TenKhoa: {
                                [Sequelize.Op.iLike]: '%Cong Nghe Thong Tin%'
                            }
                        }
                    }]
                }]
            })
            res.status(200).json({ data: students });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async viewDepartmentEcom(req, res) {
        try {
            const department = await Khoa.findOne({
                where: {
                    TenKhoa: {
                        [Sequelize.Op.iLike]: '%Kinh Te%'
                    }
                },
                include: [{
                    model: Lop,
                    attributes: ['_id']
                }]
            })
            res.status(200).json({ data: department });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async viewDepartment(req, res) {
        try {
            const department = await Khoa.findAll({
                attributes: ['_id', 'TenKhoa', [Sequelize.fn('COUNT', Sequelize.col('GiangViens._id')), 'SoCanBoGiangDay']],
                include: [{
                    model: GiangVien,
                    attributes: []
                }],
                group: ['Khoa._id']
            })
            res.status(200).json({ data: department });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async viewSubject(req, res) {
        try {
            const subjects = await MonHoc.findAll({
                where: {
                    SoTiet: {
                        [Sequelize.Op.gt]: 50
                    }
                },
                attributes: ['_id', 'TenMH']
            })
            res.status(200).json({ data: subjects });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async viewStudentBySubject(req, res) {
        try {
            const students = await KetQua.findAll({
                where: {
                    Diem: {
                        [Sequelize.Op.gte]: 7
                    }
                },
                include: [{
                    model: SinhVien,
                    attributes: ['_id', 'HoTen']
                }, {
                    model: MonHoc,
                    where: {
                        TenMH: {
                            [Sequelize.Op.iLike]: '%triet hoc%'
                        }
                    }
                }]
            })
            res.status(200).json({ data: students });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async viewStudentMaxMin(req, res) {
        try {
            const studentMin = await KetQua.findOne({
                where: {
                    Diem: {
                        [Sequelize.Op.min]: 'Diem'
                    }
                },
                include: [{
                    model: SinhVien,
                    attributes: ['_id', 'HoTen']
                }, {
                    model: MonHoc,
                    where: {
                        TenMH: {
                            [Sequelize.Op.iLike]: '%triet hoc%'
                        }
                    }
                }]
            })
            const studentMax = await KetQua.findOne({
                where: {
                    Diem: {
                        [Sequelize.Op.max]: 'Diem'
                    }
                },
                include: [{
                    model: SinhVien,
                    attributes: ['_id', 'HoTen']
                }, {
                    model: MonHoc,
                    where: {
                        TenMH: {
                            [Sequelize.Op.iLike]: '%triet hoc%'
                        }
                    }
                }]
            })
            res.status(200).json({ studentMin: studentMin, studentMax: studentMax });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async totalStudentByClasses(req, res) {
        try {
            const total = await Lop.findAll({
                include: [{
                    model: SinhVien,
                    attributes: ['_id']
                }],
                group: ['Lop._id'],
                attributes: ['_id', 'TenLop', [Sequelize.fn('COUNT', Sequelize.col('SinhViens._id')), 'SoSinhVien']]
            })
            res.status(200).json({ data: total });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async viewStudentByCity(req, res) {
        try {
            const students = await SinhVien.findAll({
                where: {
                    Tinh: {
                        [Sequelize.Op.iLike]: '%Da Nang%'
                    }
                },
                attributes: ['_id', 'HoTen']
            })
            res.status(200).json({ data: students });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async averageScore(req, res) {
        try {
            const maSinhVien = req.params.maSinhVien;
            const ketQuas = await KetQua.findAll({
                where: {
                    MaSinhVien: maSinhVien
                }
            });
            const tongDiem = ketQuas.reduce((acc, ketQua) => acc + ketQua.Diem, 0);
            const diemTrungBinh = tongDiem / ketQuas.length;
            res.status(200).json({ diemTrungBinh });
        } catch (error) {
            res.status(500).json({ error });
        }
    },

    async rankStudent(req, res) {
        // try {
        //     const sinhViens = await SinhVien.findAll({
        //         include: [{
        //             model: KetQua,
        //             attributes: ['Diem']
        //         }]
        //     });
        //     const xepHang = sinhViens.map(sinhVien => {
        //         const tongDiem = sinhVien.KetQuas.reduce((acc, ketQua) => acc + ketQua.Diem, 0);
        //         const diemTrungBinh = tongDiem / sinhVien.KetQuas.length;
        //         let xepHang = '';
        //         if (diemTrungBinh >= 8.5) {
        //             xepHang = 'Giỏi';
        //         } else if (diemTrungBinh >= 7 && diemTrungBinh < 8.5) {
        //             xepHang = 'Khá';
        //         } else if (diemTrungBinh >= 5 && diemTrungBinh < 7) {
        //             xepHang = 'Trung bình';
        //         } else {
        //             xepHang = 'Yếu';
        //         }
        //         return { ...sinhVien.toJSON(), xepHang };
        //     });
        //     res.status(200).json({ xepHang });
        // } catch (error) {
        //     res.status(500).json({ error });
        // }
        console.log('doc');
    }



};

module.exports = StudentController;
