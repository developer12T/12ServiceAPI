const express = require('express');
const {DataCn} = require("../config/connect");
const dataCn = express.Router();

dataCn.post('/addDataCn', async (req, res) => {
    const {DataCn} = require('../config/connect')

    let {orderDate, id, list, saleCode, storeId, zone, area, noteCnOrder,createDate} = req.body
    // const query = 'SELECT * FROM data_cn_test';
    let i = 1
    for (let listProduct of list) {
        const query = `INSERT INTO data_cn_test (
        dcn_orderdate,
        dcn_orderno,
        dcn_itemcode,
        dcn_itemname,
        dcn_itemqty,
        dcn_itemunit,
        dcn_itemprice,
        dcn_customer,
        dcn_zone,
        dcn_area,
        dcn_salecode,
        dcn_update,
        dcn_note_item,
        dcn_note_order,
        dcn_numberitem,
        dcn_ststus,
        dcn_craetedate
        )
    VALUES (
        :orderDate,
        :id,
        :itemCode,
        :itemName,
        :itemQty,
        :itemUnit,
        :itemPrice,
        :storeId,
        :zone,
        :area,
        :saleCode,
        :updateDate,
        :noteItem,
        :noteCnOrder,
        :numberItem,
        :status,
        :createDate
    )`;
        const result = await DataCn.query(query, {
            type: DataCn.QueryTypes.SELECT, replacements: {
                orderDate,
                id,
                itemCode:listProduct.id,
                itemName:listProduct.name,
                itemQty:listProduct.qty,
                itemUnit:listProduct.qtyText,
                itemPrice:listProduct.pricePerUnitRefund,
                storeId,
                zone,
                area,
                saleCode,
                updateDate:null,
                noteItem:listProduct.note,
                noteCnOrder,
                numberItem:i,
                status:0,
                createDate
            },
        });
        i++
        console.log(result)
    }
    res.status(200).json({status:200,message:'Add Successfully!!'})
})

dataCn.post('/getDataCn', async (req, res) => {
    const query = `SELECT * FROM data_cn_test`
    const result = await DataCn.query(query, {
        type: DataCn.QueryTypes.SELECT, replacements: {},
    });
    res.status(200).json(result)
})

module.exports = dataCn
