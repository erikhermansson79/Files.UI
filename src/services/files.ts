export async function getFolderContentAsync(path, page, pageSize) {
    return await fetch(`/api/files/${path}?page=${page}&pageSize=${pageSize}`, {
        credentials: "include"
    });
}

export async function postDownloadAsync(paths) {
    var myform = document.createElement("form");
    myform.action = `/api/files/download`;
    myform.method = "POST";

    myform.addEventListener("submit", (e) => {
        new FormData(myform);
    });
    myform.addEventListener("formdata", (e: any) => {
        const data = e.formData;
        for (const path of paths) {
            data.append('paths', path);
        }
    });

    document.body.appendChild(myform);
    myform.submit();
    document.body.removeChild(myform);
}

export async function postCreateFolderAsync(location, name) {
    return await fetch(`/api/files/CreateFolder`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            folderName: name,
            location
        })
    });
}

export async function postChangeItemNameAsync(target, name, type) {
    return await fetch(`/api/files/ChangeItemName`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type,
            name,
            target
        })
    });
}

export async function postToggleItemHiddenAsync(target, type) {
    return await fetch(`/api/files/ToggleItemHidden`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type,
            target
        })
    });
}

export async function postDeleteItemAsync(target, type) {
    return await fetch(`/api/files/DeleteItem`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type,
            target
        })
    });
}

export async function postMoveItemAsync(target, destination, type) {
    return await fetch(`/api/files/MoveItem`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type,
            target,
            destination
        })
    });
}

export async function postCopyItemAsync(target, destination, type) {
    return await fetch(`/api/files/CopyItem`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type,
            target,
            destination
        })
    });
}

export async function uploadFileAsync(data) {
    return await fetch(`/api/files/UploadFileChunk`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}