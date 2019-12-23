export interface UpdateObjectArrayParams {
    items: any[]
    keyValue: any
    keyName: string
    newObjProps: object
}

export interface DeleteObjectArrayParams {
    items: any[]
    keyValue: any
    keyName: string
}

export interface deleteObjectArrayCompleted {
    items: any[]
    keyName: any
}

export const updateObjectArray = (params: UpdateObjectArrayParams) => {
    return params.items.map(item => {
        if (item[params.keyName] === params.keyValue) {
            return {...item, ...params.newObjProps}
        }
        return item;
    })
}

export const deleteObjectArray = (params: DeleteObjectArrayParams) => {
    return params.items.filter(item => item[params.keyName] !== params.keyValue)
}

export const deleteObjectArrayCompleted = (params: deleteObjectArrayCompleted) => {
    return params.items.filter(item => item[params.keyName] === false)
}

