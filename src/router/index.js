import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AddAttendance,
  AddDepartment,
  AddEmployee,
  AddProject,
  AttendanceDetail,
  Attendances,
  Departments,
  EmployeeDetail,
  EmployeeList,
  ExportAttendanceReports,
  Other,
  Projects,
  Splash,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomNavigator from '../components/BottomNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator backBehavior="initialRoute" tabBar={BottomNavigator}>
      <Tab.Screen name="Departemen" component={Departments} />
      <Tab.Screen name="Absensi" component={Attendances} />
      {/*<Tab.Screen name="Projects" component={Projects} />*/}
      <Tab.Screen name="Lainya" component={Other} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Employee Attendance"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Add Department"
        component={AddDepartment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Add Attendance"
        component={AddAttendance}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Add Employee"
        component={AddEmployee}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Add Project"
        component={AddProject}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Attendance Detail"
        component={AttendanceDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Employee Detail"
        component={EmployeeDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Employee List"
        component={EmployeeList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Export Attendance Reports"
        component={ExportAttendanceReports}
      />
    </Stack.Navigator>
  );
};

export default Router;
