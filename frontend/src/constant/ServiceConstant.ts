let HOST = `http://localhost:4000/api`;

if (process.browser) {
  HOST = `${window.location.protocol}//${window.location.hostname}:4000/api`;
}

const ServiceConstant = {
  LOGIN: HOST + "/login",
  STUDENTS: HOST + "/students",
};

export default ServiceConstant;
