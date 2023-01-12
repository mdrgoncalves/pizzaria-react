import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    quantity: number;
}

class AddItemService {
    async execute({ order_id, product_id, quantity }: ItemRequest) {
        
        const order = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                quantity
            }
        });

        return order;
    }
}

export { AddItemService };