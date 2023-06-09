"use strict";
exports.__esModule = true;
exports.navItems = void 0;
exports.navItems = [
    {
        displayName: "Entry",
        iconName: "entry",
        route: "entry",
        children: [
            {
                displayName: 'OPD',
                iconName: 'opd',
                route: 'main/opd',
                children: [
                    {
                        displayName: 'Appointment',
                        iconName: 'appointment',
                        route: 'main/opd/appointment',
                        children: []
                    },
                    {
                        displayName: 'Registration',
                        iconName: 'registration',
                        route: 'main/registration/registration-setup',
                        children: []
                    },
                    {
                        displayName: 'Vital Sign',
                        iconName: 'vital-sign',
                        route: 'main/vital-sign',
                        children: []
                    },
                    {
                        displayName: 'Check Out',
                        iconName: 'check-out',
                        route: 'main/opd/check-out',
                        children: []
                    },
                    {
                        displayName: 'Lab',
                        iconName: 'opd',
                        route: 'main/opd/lab',
                        children: []
                    },
                    {
                        displayName: 'Xray',
                        iconName: 'opd',
                        route: 'main/opd/x-ray',
                        children: []
                    },
                ]
            },
            {
                displayName: 'Doctor Entry',
                iconName: 'doctorentry',
                route: 'main/opd/doctor-entry',
                children: []
            },
            {
                displayName: 'Doctor Booking Status',
                iconName: 'DoctorBooking Status',
                route: 'main/opd/appointment/appointment-status',
                children: []
            },
            {
                displayName: 'Nurse Entry',
                iconName: 'doctorentry',
                route: 'main/opd/nurse-entry',
                children: []
            },
        ]
    },
    {
        displayName: "Setup",
        iconName: "",
        route: "setup",
        children: [
            {
                displayName: 'Doctor Setup',
                iconName: 'doctor-setup',
                route: 'setup/doctor',
                children: []
            },
            {
                displayName: 'OPD Setup',
                iconName: 'opd-setup',
                route: 'setup/opd/opd-setup',
                children: []
            },
            {
                displayName: 'Pattern Setup',
                iconName: 'pattern-setup',
                route: 'setup/pattern',
                children: []
            },
            {
                displayName: 'Schedule Setup',
                iconName: 'schedule-setup',
                route: 'setup/schedule/doctor-schedule',
                children: []
            },
        ]
    },
    {
        displayName: "System",
        iconName: "",
        route: "system",
        children: [
            {
                displayName: 'User',
                iconName: 'user',
                route: 'system/user/user-list',
                children: []
            },
            {
                displayName: 'Role',
                iconName: 'role',
                route: 'system/role',
                children: []
            },
            {
                displayName: 'Menu',
                iconName: 'menu',
                route: 'system/menu',
                children: []
            },
        ]
    },
];
