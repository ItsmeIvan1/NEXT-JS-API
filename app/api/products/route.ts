import { NextResponse } from 'next/server';
import connection from '@/lib/db';

export async function GET(req: Request)
{
    const [products] = await connection.execute('SELECT * FROM products');
    return NextResponse.json(products);
}

export async function POST(req: Request)
{
    try {
        const { productName, productPrice, productType } = await req.json();

        const query = 'INSERT INTO products (product_name, product_price, product_type) VALUES (?, ?, ?)';
        const values = [productName, productPrice, productType];

        await connection.execute(query, values);

        return NextResponse.json({
            message: 'Successfully Created!'
        });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}

export async function PUT(req: Request)
{
    try{
        const { productId, productName, productPrice, productType } = await req.json();

        const query = 'UPDATE products SET product_name = ?, product_price = ?, product_type = ? WHERE product_id = ?';
        const values = [productName, productPrice, productType, productId];

        await connection.execute(query, values);

        return NextResponse.json({

            message: 'Successfully updated!'
        });


    } catch(error){

        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });

    }
}

export async function DELETE(req: Request)
{
    try{

        const {productId} = await req.json();

        const query = 'DELETE FROM products WHERE product_id = ?';
        const values = [productId];

        await connection.execute(query, values);

        return NextResponse.json({

            message: 'Successfully deleted!'
        });



    }catch(error)
    {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
