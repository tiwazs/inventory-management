import express from "express";
const router = express.Router();

/**************************************************|Item Data Models|**********************************************/
export interface ItemBaseDM {
    workspaceId: string;
    categoryId: string;
    locationId: string | null;
    typeId: string;
    barcode: string | null;
    serialNumber: string | null;
    quantity: number;
    name: string;
    description: string | null;
    wholeSalePriceInd: number | null;
    retailPriceInd: number | null;
    wholeSalePrice: number | null;
    retailPrice: number | null;
    length: number | null;
    width: number | null;
    height: number | null;
    weight: number | null;
    forSale: boolean;
}

export interface ItemDM extends ItemBaseDM {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * @swagger
 * components:
 *  schemas:
 *      item:
 *          type: object
 *          required:
 *              - name
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the item
 *              workspaceId:
 *                  type: string
 *                  description: workspaceId
 *              categoryId:
 *                  type: string
 *                  description: categoryId
 *              locationId:
 *                  type: string
 *                  description: locationId
 *              typeId:
 *                  type: string
 *                  description: typeId
 *              barcode:
 *                  type: string
 *                  description: barcode
 *              serialNumber:
 *                  type: string
 *                  description: serialNumber
 *              quantity:
 *                  type: number
 *                  description: quantity
 *              name:
 *                  type: string
 *                  description: Item name
 *              description:
 *                  type: string
 *                  description: Item description
 *              wholeSalePriceInd:
 *                  type: number
 *                  description: Item individual wholesale price
 *              retailPriceInd:
 *                  type: number
 *                  description: Item individual retail price
 *              wholeSalePrice:
 *                  type: number
 *                  description: Item wholesale price
 *              retailPrice:
 *                  type: number
 *                  description: Item retail price
 *              length:
 *                  type: number
 *                  description: Item length
 *              width:
 *                  type: number
 *                  description: Item width
 *              height:
 *                  type: number
 *                  description: Item height
 *              weight:
 *                  type: number
 *                  description: Item weight
 *              forSale:
 *                  type: boolean
 *                  description: Item for sale
 *              createdAt:
 *                  type: string
 *                  description: time
 *              updatedAt:
 *                  type: string
 *                  description: time
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      itemToUpdate:
 *          type: object
 *          properties:
 *              workspaceId:
 *                  type: string
 *                  description: workspaceId
 *              categoryId:
 *                  type: string
 *                  description: categoryId
 *              locationId:
 *                  type: string
 *                  description: locationId
 *              typeId:
 *                  type: string
 *                  description: typeId
 *              barcode:
 *                  type: string
 *                  description: barcode
 *              serialNumber:
 *                  type: string
 *                  description: serialNumber
 *              quantity:
 *                  type: number
 *                  description: quantity
 *              name:
 *                  type: string
 *                  description: Item name
 *              description:
 *                  type: string
 *                  description: Item description
 *              wholeSalePriceInd:
 *                  type: number
 *                  description: Item individual wholesale price
 *              retailPriceInd:
 *                  type: number
 *                  description: Item individual retail price
 *              wholeSalePrice:
 *                  type: number
 *                  description: Item wholesale price
 *              retailPrice:
 *                  type: number
 *                  description: Item retail price
 *              length:
 *                  type: number
 *                  description: Item length
 *              width:
 *                  type: number
 *                  description: Item width
 *              height:
 *                  type: number
 *                  description: Item height
 *              weight:
 *                  type: number
 *                  description: Item weight
 *              forSale:
 *                  type: boolean
 *                  description: Item for sale
*/

/**
 * @swagger
 * components:
 *  schemas:
 *      itemToCreate:
 *          type: object
 *          required:
 *              - workspaceId
 *              - categoryId
 *              - typeId
 *              - name
 *          properties:
 *              workspaceId:
 *                  type: string
 *                  description: workspaceId
 *              categoryId:
 *                  type: string
 *                  description: categoryId
 *              locationId:
 *                  type: string
 *                  description: locationId
 *              typeId:
 *                  type: string
 *                  description: typeId
 *              barcode:
 *                  type: string
 *                  description: barcode
 *              serialNumber:
 *                  type: string
 *                  description: serialNumber
 *              quantity:
 *                  type: number
 *                  description: quantity
 *              name:
 *                  type: string
 *                  description: Item name
 *              description:
 *                  type: string
 *                  description: Item description
 *              wholeSalePriceInd:
 *                  type: number
 *                  description: Item individual wholesale price
 *              retailPriceInd:
 *                  type: number
 *                  description: Item individual retail price
 *              wholeSalePrice:
 *                  type: number
 *                  description: Item wholesale price
 *              retailPrice:
 *                  type: number
 *                  description: Item retail price
 *              length:
 *                  type: number
 *                  description: Item length
 *              width:
 *                  type: number
 *                  description: Item width
 *              height:
 *                  type: number
 *                  description: Item height
 *              weight:
 *                  type: number
 *                  description: Item weight
 *              forSale:
 *                  type: boolean
 *                  description: Item for sale
*/

module.exports = router;