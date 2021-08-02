import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import Api2Pdf from 'api2pdf';

const ExportPDF = () => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const downloadPDF = () => {
    fetch('/api/invoices/create-pdf', {
      data: {
        invoiceDetails,
        invoiceSettings,
        itemsDetails,
        organisationInfos,
        otherDetails,
        clientDetails,
      },
      method: 'POST',
    }).then(res => {
      return res
        .arrayBuffer()
        .then(res => {
          const blob = new Blob([res], { type: 'application/pdf' });
          saveAs(blob, 'invoice.pdf');
        })
        .catch(e => alert(e));
    });
  };

  const createPdf = async () => {
    const apiKey = '0cb45649-4ff7-4b41-8621-509574c6fdb8'; // api2pdf : apiKey
    const option = {
      // TODO : 필요없는 옵션 제외 해야할 듯
      delay: 0,
      puppeteerWaitForMethod: 'WaitForNavigation',
      puppeteerWaitForValue: 'Load',
      usePrintCss: true,
      landscape: false,
      printBackground: true,
      displayHeaderFooter: false,
      headerTemplate: '<span></span>',
      footerTemplate: '<span></span>',
      width: '8.27in',
      height: '11.69in',
      marginTop: '.4in',
      marginBottom: '.4in',
      marginLeft: '.4in',
      marginRight: '.4in',
      pageRanges: '1-10000',
      scale: 1,
    };

    const api2Client = new Api2Pdf(apiKey);

    api2Client
      .chromeHtmlToPdf(NoteStore.exportHTML, {
        inline: false,
        filename:
          NoteStore.exportData.type === 'chapter'
            ? `${ChapterStore.exportChapterTitle}.pdf`
            : `${PageStore.exportPageTitle}.pdf`,
        option,
      })
      .then(async function (result) {
        const res = await fetch(result.FileUrl);
        const blob = await res.blob();
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.style = 'display: none';
        a.href = url;
        a.download =
          NoteStore.exportData.type === 'chapter'
            ? `${ChapterStore.exportChapterTitle}.pdf`
            : `${PageStore.exportPageTitle}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .then(() => {
        initialExport();
      });
  };

  const initialExport = () => {
    NoteStore.setIsExporting(false);
    NoteStore.setExportPDF(false);
  };

  const test = () => {
    const script = document.createElement('script');
    script.src = './test.js';
    script.onload = function () {
      console.log('.........');
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (NoteStore.isExportPDF) {
      setTimeout(() => {
        createPdf();
        // test();
      }, 1);
    }
  }, [NoteStore.isExportPDF]);

  return null;
};

export default ExportPDF;
