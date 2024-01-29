import { filesize } from "filesize";
import Button from 'react-bootstrap/Button';
import { LoadingIndicator } from './LoadingIndicator';

import { useDateFormat } from '../useDateFormat';

import { Pagination } from './Pagination';
import { Breadcrumbs } from './Breadcrumbs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'

export function FileList({ strategy, data, ...rest }) {
    const formatDate = useDateFormat();

    const HeaderRow = strategy.HeaderRowComponent;
    const ItemRow = strategy.ItemRowComponent;

    if (!data || data.isLoading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            {data && data.breadcrumbs &&
                <Breadcrumbs strategy={strategy} breadcrumbs={data.breadcrumbs} className="m-3" />
            }

            {data && data.items &&
                <div className="m-3 bg-body rounded box-shadow table-responsive" style={{ minHeight: "400px" }}>
                    <table className="table table-sm table-hover table-borderless m-0 border-bottom" style={{ minWidth: "750px" }}>
                        <thead className="p-2">
                            <HeaderRow>
                                {/* @ts-expect-error */}
                                <th scope="col" width="40px"><FontAwesomeIcon icon={faFile} className="fs-6"></FontAwesomeIcon></th>
                                {/* @ts-expect-error */}
                                <th scope="col" width="300px">Namn</th>
                                {/* @ts-expect-error */}
                                <th scope="col" width="200px">Ändrades</th>
                                {/* @ts-expect-error */}
                                <th scope="col" width="150px">Storlek</th>
                                <th scope="col"></th>
                            </HeaderRow>
                        </thead>

                        <tbody>
                            {data && data.items && data.items.map(item => {
                                const itemScope = strategy.getItemScope(item);

                                return (
                                    <ItemRow key={item.name} itemScope={itemScope}>
                                        <td width="40px">
                                            {item.type === "directory" &&
                                                <span className="fiv-sqo fiv-icon-folder"></span>
                                            }
                                            {item.type === "file" &&
                                                <span className={`fiv-sqo fiv-icon-${item.extension.slice(1)}`}></span>
                                            }
                                        </td>
                                        <td width="300px" className="text-truncate d-inline-block">
                                            {!itemScope.disabled &&
                                                <Button variant="link" className="fileListLink m-0 p-0 border-0" onClick={e => { e.stopPropagation(); strategy.onItemClick(item); }}>{item.name}</Button>
                                            }
                                            {itemScope.disabled &&
                                                <>{item.name}</>
                                            }
                                        </td>
                                        <td width="200px">{formatDate(item.lastChanged)}</td>
                                        <td width="150px">
                                            {item.type === "file" &&
                                                <>{filesize(item.size, { round: 0 })}</>
                                            }
                                        </td>
                                        <td></td>
                                    </ItemRow>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            }

            {data && data.pagination &&
                <Pagination paginationData={data.pagination} gotoPage={strategy.gotoPage} {...rest} className="m-3" />
            }
        </>
    );
}