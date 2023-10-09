import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Modal from 'react-bootstrap/Modal';

const viewerSupportedFileExtensions = [
    ".bmp",
    //".doc", ".docx",
    //".htm", ".html", ".jpg", ".jpeg",
    //".pdf",
    //".png", ".ppt", ".pptx", ".tiff", ".txt", ".xls", ".xlsx"
];

const iframeSupportedFileExtensions = [
    ".htm", ".html", ".jpg", ".jpeg", ".pdf",
    ".png", ".txt", ".mp3"
];

export function FileDisplay({ filePath, rootRoute }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const lastSlashIndex = filePath.lastIndexOf('/');
    const folderPath = lastSlashIndex >= 0 ? filePath.slice(0, lastSlashIndex) : "";
    const fileName = lastSlashIndex >= 0 ? filePath.slice(lastSlashIndex + 1) : filePath;
    const extension = fileName.slice(fileName.lastIndexOf('.'));
    const isViewerSupportedForType = viewerSupportedFileExtensions.includes(extension);
    const isIframeSupportedForType = iframeSupportedFileExtensions.includes(extension);

    useEffect(() => {
        if (filePath && !isViewerSupportedForType && !isIframeSupportedForType) {
            const conditionalPath = folderPath.startsWith('/') ? folderPath : `/${folderPath}`;
            navigate(`${rootRoute}${conditionalPath}`);
            window.location.href = `api/Files/${filePath}?download`;
        }
    }, [filePath, isViewerSupportedForType, isIframeSupportedForType]);


    function closeFile() {
        const conditionalPath = folderPath.startsWith('/') ? folderPath : `/${folderPath}`;

        navigate(`${rootRoute}${conditionalPath}`);
    }

    return (
        <>
            {filePath && (isViewerSupportedForType || isIframeSupportedForType/* || extension === ".mid"*/) &&
                <Modal show={true} fullscreen={true} onHide={closeFile}>
                    <Modal.Header closeButton>
                        <Modal.Title>{fileName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex">
                        {isViewerSupportedForType &&
                            <DocViewer documents={[{ uri: `api/Files/${filePath}` }]} pluginRenderers={DocViewerRenderers} />
                        }
                        {isIframeSupportedForType &&
                            <iframe title={fileName} src={`api/Files/${filePath}#toolbar=1&view=Fit`} className={`w-100 h-100 bg-white`}></iframe>
                        }
                        {/*{extension === ".mid" &&*/}
                        {/*    <MidiPlayer url={`${window.apiBaseUrl}/Files/${filePath}`} />*/}
                        {/*}*/}
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-primary" onClick={closeFile}>{t("close")}</button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}