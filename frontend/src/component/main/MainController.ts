import { useEffect, useState } from "react";
import ServiceConstant from "../../constant/ServiceConstant";
import ServiceManager from "../../core/service/ServiceManager";
import StudentType from "../../type/StudentType";
import ToastUtil from "../../util/ToastUtil";

const useMainController = () => {
  const [students, setStudents] = useState<StudentType[] | []>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setIsFetching(true);
      const students = await ServiceManager.get(ServiceConstant.STUDENTS);
      setIsFetching(false);
      setStudents(students || []);
    } catch (error) {
      ToastUtil.error(String(error));
    }
  };

  const addStudent = async (student: StudentType) => {
    let success = false;
    try {
      setIsSubmitting(true);
      await ServiceManager.post(ServiceConstant.STUDENTS, student);
      setIsSubmitting(false);
      success = true;
    } catch (error) {
      ToastUtil.error(String(error));
    }
    return success;
  };

  const updateStudent = async (student: StudentType) => {
    let success = false;
    try {
      setIsSubmitting(true);
      await ServiceManager.put(`${ServiceConstant.STUDENTS}/${student._id}`, student);
      setIsSubmitting(false);
      success = true;
    } catch (error) {
      ToastUtil.error(String(error));
    }
    return success;
  };

  const deleteStudent = async (student: StudentType | null) => {
    let success = false;
    try {
      setIsSubmitting(true);
      await ServiceManager.delete(`${ServiceConstant.STUDENTS}/${student?._id}`);
      setIsSubmitting(false);
      success = true;
    } catch (error) {
      ToastUtil.error(String(error));
    }
    return success;
  };

  return {
    state: {
      students,
      isFetching,
      isSubmitting,
    },
    controller: {
      addStudent,
      updateStudent,
      deleteStudent,
      fetchStudents,
    },
  };
};

export default useMainController;
