import React from 'react';
import Axios from 'axios';
import { Page, Text, View, Document, StyleSheet,PDFViewer } from '@react-pdf/renderer';
export default function InvoicePDF(props){
    
    return(
        <div>
        <PDFViewer>
            <Document>
                <Page>
                <Text>Test</Text>
                </Page>
            </Document>
        </PDFViewer>
        </div>
    );
}