/*
  Warnings:

  - You are about to drop the column `item_price` on the `orderitems` table. All the data in the column will be lost.
  - You are about to drop the column `item_total` on the `orderitems` table. All the data in the column will be lost.
  - Added the required column `itemPrice` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemTotal` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitems` DROP COLUMN `item_price`,
    DROP COLUMN `item_total`,
    ADD COLUMN `itemPrice` INTEGER NOT NULL,
    ADD COLUMN `itemTotal` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `onSale` BOOLEAN NULL DEFAULT false;
