import React, { useState, useEffect, useCallback } from 'react';
import { useUsers } from '../hooks/useUsers';
import { ModuleDTO } from '../types';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import '../assets/main.css'; // Import custom CSS for additional styling
import { jwtDecode } from 'jwt-decode';

const MainNavigation: React.FC = () => {
    const { fetchModulesWithActiveReports } = useUsers();
    const [modules, setModules] = useState<ModuleDTO[]>([]);
    const [user, setUser] = useState<string>('');

    const fetchData = useCallback(async (idUser: number) => {
        const modulesData = await fetchModulesWithActiveReports(idUser);
        setModules(modulesData.filter(module => module.reports && module.reports.length > 0));
    }, [fetchModulesWithActiveReports]);

    useEffect(() => {
        const decodedToken: any = jwtDecode(localStorage.getItem('access_token') || '');
        const idUser = decodedToken.id;
        const username = decodedToken.sub;
        setUser(username);

        fetchData(idUser);
    }, [fetchData]);

    const modulesData = modules.map(module => ({
        name: module.name,
        reports: module.reports.map(report => report.name)
    }));

    return (
        <div className='container-fluid p-0 m-0'>
            <NavBar user={user} modules={modulesData} />
            <Footer />
        </div>
    );
};

export default MainNavigation;