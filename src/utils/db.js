import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'database.db'});

const executeQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(results);
        },
        (error) => {
          reject(error);
        },
      );
    });
  });

(async () => {
  await executeQuery(
    `
CREATE TABLE IF NOT EXISTS attendances (
  id integer PRIMARY KEY AUTOINCREMENT,
  attendance_date datetime,
  department_id int(11) DEFAULT NULL,
  employee_id int(11) DEFAULT NULL,
  attendance int(11) DEFAULT NULL, -- 1 present, 2 absence, 3 permit, 4 sick --
  FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE ON UPDATE CASCADE
  FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE
);`,
    [],
  );
  console.log('1. create table attendances success');
  await executeQuery(
    `
CREATE TABLE IF NOT EXISTS departments (
  id integer PRIMARY KEY AUTOINCREMENT,
  name varchar(255) DEFAULT NULL,
  description varchar(255) DEFAULT NULL
);`,
    [],
  );
  console.log('2. create table departments success');
  await executeQuery(
    `
CREATE TABLE IF NOT EXISTS employees (
  id integer PRIMARY KEY AUTOINCREMENT,
  name varchar(255) DEFAULT NULL,
  nik varchar(255) DEFAULT NULL,
  gender int(11) DEFAULT NULL,
  department_id int(11) DEFAULT NULL,
  FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE ON UPDATE CASCADE
);`,
    [],
  );
  console.log('3. create table employees success');
  await executeQuery(
    `
CREATE TABLE IF NOT EXISTS projects (
  id integer PRIMARY KEY AUTOINCREMENT,
  project_date datetime,
  description varchar(255) DEFAULT NULL,
  department_id int(11) DEFAULT NULL,
  progress int(11) DEFAULT NULL,
  FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE CASCADE ON UPDATE CASCADE
);`,
    [],
  );
  console.log('4. create table projects success');
  await executeQuery(
    `
CREATE TABLE IF NOT EXISTS employee_attendance (
  attendance_id integer NOT NULL,
  employee_id integer NOT NULL,
  PRIMARY KEY (attendance_id, employee_id),
  FOREIGN KEY (attendance_id) REFERENCES attendances (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE
);`,
    [],
  );
  console.log('5. create table employee_attendance success');
  await executeQuery(
    `
CREATE TABLE IF NOT EXISTS employee_project (
  employee_id integer NOT NULL,
  project_id integer NOT NULL,
  PRIMARY KEY (employee_id, project_id)
  FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE ON UPDATE CASCADE
);`,
    [],
  );
  console.log('6. create table employee_project success');
})();

export default executeQuery;
