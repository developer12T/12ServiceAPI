const express = require('express')
const axios = require('axios');
const { DataCn } = require("../config/connect")
const dataCn = express.Router()

function convertDateFormat(dateString) {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
}

dataCn.post('/addDataCn', async (req, res) => {
    try {
        const response = await axios.get(`${process.env.ORDER_API_BASE_URL}/cnOrder/getAll`, {
            params: { status: `${process.env.ORDER_STATUS}` }
        });

        const ordersData = response.data; 

        for (let orderData of ordersData) { 
            const checkQuery = `SELECT COUNT(*) AS count FROM data_cn WHERE dcn_orderno = :orderNo`;
            const checkResult = await DataCn.query(checkQuery, {
                type: DataCn.QueryTypes.SELECT,
                replacements: { orderNo: orderData.orderNo }
            });

            if (checkResult[0].count > 0) {
                console.log(`Order ${orderData.orderNo} already exists`);
                continue;
            }

            let i = 1;

            for (let listProduct of orderData.list) { 
                const query = `
                    INSERT INTO data_cn (
                        dcn_orderdate, dcn_orderno, dcn_itemcode, dcn_itemname, 
                        dcn_itemqty, dcn_itemunit, dcn_itemprice, dcn_customer, 
                        dcn_zone, dcn_area, dcn_salecode, dcn_update, dcn_note_item, 
                        dcn_note_order, dcn_numberitem, dcn_ststus, dcn_craetedate, dcn_ref_order
                    ) VALUES (
                        :orderDate, :orderNo, :itemCode, :itemName, :itemQty, 
                        :itemUnit, :itemPrice, :storeId, :zone, :area, :saleCode, 
                        :updateDate, :noteItem, :noteCnOrder, :numberItem, :status, 
                        :createDate, :refOrder
                    )
                `;

                await DataCn.query(query, {
                    type: DataCn.QueryTypes.INSERT,
                    replacements: {
                        orderDate: convertDateFormat(orderData.createDate),
                        orderNo: orderData.orderNo,
                        itemCode: listProduct.id,
                        itemName: listProduct.name,
                        itemQty: listProduct.qty,
                        itemUnit: listProduct.unitText,
                        itemPrice: listProduct.pricePerQty,
                        storeId: orderData.storeId,
                        zone: (orderData.area).substr(0, 2),
                        area: orderData.area,
                        saleCode: orderData.saleCode,
                        updateDate: null,
                        noteItem: listProduct.note,
                        noteCnOrder: orderData.note,
                        numberItem: i,
                        status: orderData.status,
                        createDate: orderData.createDate,
                        refOrder: null
                    },
                });
                i++;
            }
        }

        res.status(200).json({ status: 200, message: 'Add Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal Server Error' });
    }
});

dataCn.post('/getDataCn', async (req, res) => {
    const query = `SELECT * FROM data_cn`
    const result = await DataCn.query(query, {
        type: DataCn.QueryTypes.SELECT, replacements: {},
    });
    res.status(200).json(result)
})

module.exports = dataCn
