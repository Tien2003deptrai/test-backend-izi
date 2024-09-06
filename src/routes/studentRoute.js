const express = require('express');
const StudentController = require('../controllers/StudentController');
// const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/cau-1', StudentController.viewStudent);
router.get('/cau-2', StudentController.countStudent);
router.get('/cau-3', StudentController.viewStudentIT);
router.get('/cau-4', StudentController.viewDepartmentEcom);
router.get('/cau-5', StudentController.viewDepartment);

router.get('/cau-6', StudentController.viewSubject);
router.get('/cau-7', StudentController.viewStudentBySubject);
router.get('/cau-8', StudentController.viewStudentMaxMin);
router.get('/cau-9', StudentController.totalStudentByClasses);
router.get('/cau-10', StudentController.viewStudentByCity);

router.get('/cau-10/:maSinhVien', StudentController.averageScore);
router.get('/cau-10', StudentController.viewStudentByCity);
router.get('/cau-10', StudentController.viewStudentByCity);
router.get('/cau-10', StudentController.viewStudentByCity);
router.get('/cau-10', StudentController.viewStudentByCity);


module.exports = router;
