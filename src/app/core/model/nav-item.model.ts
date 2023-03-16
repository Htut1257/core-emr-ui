export interface NavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
}

export const navItems: any = [
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
        children:[
            {
                displayName: 'User',
                iconName: 'user',
                route: 'system/user',
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
    
]