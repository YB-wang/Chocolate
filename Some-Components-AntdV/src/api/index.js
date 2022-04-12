import axios from 'axios'
/**
 * 假数据
 *
 * @author ybw
 */
export function getMockList(obj) {
    return axios({
        method: "post",
        url: "/mock/lims/getList",
        data: obj
    })
}
/**
 * add
 *
 * @author ybw
 */
export function addMockData(obj) {
    return axios({
        method: "post",
        url: "/mock/lims/add",
        data: obj
    })
}
/**
 * delete
 *
 * @author ybw
 */
export function deleteMockData(obj) {
    return axios({
        method: "post",
        url: "/mock/lims/delete",
        data: obj
    })
}
/**
 * add
 *
 * @author ybw
 */
export function editMockData(obj) {
    return axios({
        method: "post",
        url: "/mock/lims/edit",
        data: obj
    })
}


export function getDataStand(obj) {
    return axios({
        method: "post",
        url: "/mock/dataStand",
        data: obj
    })
}