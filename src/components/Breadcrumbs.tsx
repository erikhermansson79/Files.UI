export function Breadcrumbs({ strategy, breadcrumbs, ...restProps }) {
    const [first, ...rest] = breadcrumbs;

    var path = breadcrumbs.length === 1 ? undefined : "";

    const crumbs = [{ name: first, path: path }];

    var count = 1;
    for (const bc of rest) {
        count++;
        path = count === breadcrumbs.length ? undefined : (path ? `${path}/${bc}` : bc);
        crumbs.push({ name: bc, path: path });
    }

    return (
        <ol {...restProps}>
            {crumbs.map(bc => (
                <li key={bc.name} className="d-inline-block fs-4">
                    {bc.path !== undefined &&
                        <>
                        <span className="link text-muted m-0 p-0 border-0 fs-4" onClick={e => { e.stopPropagation(); strategy.gotoPath(bc.path); }}>{bc.name}</span>
                            <i className="mx-2 fa-solid fa-chevron-right fs-6 text-muted"></i>
                        </>
                    }
                    {bc.path === undefined && <span className="">{bc.name}</span>}
                </li>
            ))}
        </ol>
    );
}