import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../services/fileActions';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import {
    UPLOAD_FILE_ACTION, DELETE_ITEM_ACTION, MOVE_ITEM_ACTION, COPY_ITEM_ACTION
} from '../services/fileActions';

function ActionIcon({ action }) {
    switch (action) {
        case UPLOAD_FILE_ACTION: return <i className="fa-solid fa-fw fa-upload"></i>;
        case DELETE_ITEM_ACTION: return <i className="fa-solid fa-fw fa-trash"></i>;
        case MOVE_ITEM_ACTION: return <i className="fa-solid fa-fw fa-file-export"></i>;
        case COPY_ITEM_ACTION: return <i className="fa-solid fa-fw fa-copy"></i>;
        default: return null;
    }
}

const popoverStyle = {
    "--bs-popover-max-width": "600px"
} as React.CSSProperties;

export function FileActionProgress() {
    const dispatch = useDispatch();
    const fileActions = useSelector((state: any) => state.fileActions);

    const keys = Object.keys(fileActions);
    if (keys.length === 0) {
        return null;
    }

    const allFileActions = keys.map(key => fileActions[key]);
    const finishedFileActions = allFileActions.filter(fa => fa.progress >= 1);

    return (
        <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
                <Popover id={`popover-positioned-bottom`} style={popoverStyle} className="box-shadow mx-2">
                    <Popover.Header as="h3">Status</Popover.Header>
                    <Popover.Body className="d-flex flex-column">
                        <table className="align-self-stretch w-100">
                            <tbody>
                                {keys.map(key => {
                                    const fileAction = fileActions[key];
                                    return (
                                        <tr key={key}>
                                            <td width="40px" className="align-top">
                                                {fileAction.progress === 0 &&
                                                    <i className="fa-regular fa-clock"></i>
                                                }
                                                {fileAction.progress > 0 && fileAction.progress < 1 &&
                                                    <progress className="w-100" value={fileAction.progress} />
                                                }
                                                {fileAction.progress >= 1 &&
                                                    <i className="fa-solid fa-circle-check text-success"></i>
                                                }
                                            </td>
                                            <td width="40px" className="align-top"><ActionIcon action={fileAction.action} /></td>
                                            <td className="align-top pe-3">{fileAction.meta.name}</td>
                                            <td className="align-top pe-2"><span className="text-nowrap"><span className="fiv-sqo fiv-icon-folder me-1"></span> /{fileAction.meta.destination}</span></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Button className="mt-4 ms-auto" onClick={() => dispatch(reset())}>Rensa</Button>
                    </Popover.Body>
                </Popover>
            }
        >
            <button className="border border-light rounded my-1 py-1 px-sm-3 bg-light box-shadow">
                {finishedFileActions.length < allFileActions.length &&
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                }
                {finishedFileActions.length === allFileActions.length &&
                    <i className="fa-solid fa-check-circle"></i>
                }
                <span className="ms-2 d-none d-sm-inline-block">({finishedFileActions.length}/{allFileActions.length})</span>
            </button>
        </OverlayTrigger>
    );
}