import { useState, useEffect } from 'react';
import {
    getReports,
    getReportById,
    saveReport,
    updateReport,
    deleteReport
} from '../services/reportService';
import { ReportDTO } from '../types';

export const useReports = () => {
    const [reports, setReports] = useState<ReportDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getReports();
            setReports(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchReportById = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getReportById(id);
            setReports([data]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const createReport = async (report: ReportDTO) => {
        setLoading(true);
        setError(null);
        try {
            await saveReport(report);
            fetchReports(); // Refresh the list after saving
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const modifyReport = async (id: number, report: ReportDTO) => {
        setLoading(true);
        setError(null);
        try {
            await updateReport(id, report);
            fetchReports(); // Refresh the list after updating
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeReport = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteReport(id);
            fetchReports(); // Refresh the list after deleting
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return {
        reports,
        loading,
        error,
        fetchReports,
        fetchReportById,
        createReport,
        modifyReport,
        removeReport
    };
};