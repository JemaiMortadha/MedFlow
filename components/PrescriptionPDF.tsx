import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles for PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#4F46E5', // Indigo-600
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clinicName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4F46E5',
    },
    clinicDetails: {
        fontSize: 10,
        color: '#6B7280', // Gray-500
        textAlign: 'right',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        width: 100,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#374151', // Gray-700
    },
    value: {
        flex: 1,
        fontSize: 10,
        color: '#111827', // Gray-900
    },
    prescriptionBox: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB', // Gray-200
        borderRadius: 4,
        minHeight: 300,
        padding: 20,
    },
    medicationTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4F46E5',
    },
    medicationText: {
        fontSize: 10,
        marginBottom: 5,
        lineHeight: 1.5,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signature: {
        width: 150,
        borderTopWidth: 1,
        borderTopColor: '#000',
        marginTop: 40,
        textAlign: 'center',
        fontSize: 10,
        paddingTop: 5,
    },
    disclaimer: {
        fontSize: 8,
        color: '#9CA3AF', // Gray-400
        textAlign: 'center',
        marginTop: 20,
    },
});

interface PrescriptionPDFProps {
    patientName: string;
    doctorName: string;
    date: Date;
    appointmentId: number;
}

const PrescriptionPDF: React.FC<PrescriptionPDFProps> = ({
    patientName,
    doctorName,
    date,
    appointmentId
}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.clinicName}>MedFlow</Text>
                <View style={styles.clinicDetails}>
                    <Text>123 Medical Center Dr.</Text>
                    <Text>Health City, HC 12345</Text>
                    <Text>Phone: (555) 123-4567</Text>
                    <Text>Email: contact@medflow.com</Text>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>MEDICAL PRESCRIPTION</Text>

            {/* Patient & Doctor Info */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <Text style={styles.label}>Patient Name:</Text>
                    <Text style={styles.value}>{patientName}</Text>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>{new Date(date).toLocaleDateString()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Doctor:</Text>
                    <Text style={styles.value}>{doctorName}</Text>
                    <Text style={styles.label}>Ref No:</Text>
                    <Text style={styles.value}>#{appointmentId.toString().padStart(6, '0')}</Text>
                </View>
            </View>

            {/* Prescription Content */}
            <View style={styles.prescriptionBox}>
                <Text style={styles.medicationTitle}>Rx</Text>

                {/* Placeholder content - in a real app this would come from a form */}
                <Text style={styles.medicationText}>1. Amoxicillin 500mg</Text>
                <Text style={{ ...styles.medicationText, marginLeft: 20, color: '#6B7280' }}>Take 1 capsule every 8 hours for 7 days.</Text>

                <Text style={{ ...styles.medicationText, marginTop: 10 }}>2. Ibuprofen 400mg</Text>
                <Text style={{ ...styles.medicationText, marginLeft: 20, color: '#6B7280' }}>Take 1 tablet every 6 hours as needed for pain.</Text>

                <Text style={{ ...styles.medicationText, marginTop: 10 }}>Notes:</Text>
                <Text style={{ ...styles.medicationText, marginLeft: 20, color: '#6B7280' }}>Drink plenty of water. Rest for 2-3 days.</Text>
            </View>

            {/* Footer & Signature */}
            <View style={styles.footer}>
                <View>
                    <Text style={{ fontSize: 10, color: '#6B7280' }}>Generated by MedFlow System</Text>
                    <Text style={{ fontSize: 10, color: '#6B7280' }}>{new Date().toLocaleString()}</Text>
                </View>
                <View>
                    <Text style={styles.signature}>Doctor's Signature</Text>
                </View>
            </View>

            <Text style={styles.disclaimer}>
                This is a computer-generated document. No signature is required.
                Valid only with official clinic stamp.
            </Text>
        </Page>
    </Document>
);

export default PrescriptionPDF;
