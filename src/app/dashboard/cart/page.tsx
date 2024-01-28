import { WidgetItem } from '@/components';
import { Product, products } from '@/products/data';
import { ItemCard } from '@/shopping-cart/components';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'SEO description',
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
  const productsInCart: ProductInCart[] = [];

  for (const id of Object.keys(cart)) {
    const product = products.find((p) => p.id === id);

    if (product) {
      productsInCart.push({ product, quantity: cart[id] });
    }
  }

  return productsInCart;
};

export default function CartPage() {
  const cookiesStore = cookies();
  const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as {
    [is: string]: number;
  };

  const productsInCart = getProductsInCart(cart);

  const totalPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );

  return (
    <>
      <h1 className='text-5xl'>Products in the Shopping Cart</h1>
      <hr className='mb-2' />
      <div className='flex flex-col sm:flex-row gap-2 w-full'>
        <div className='flex flex-col gap-2 w-full sm:w-8/12'>
          {productsInCart.map(({ product, quantity }) => (
            <ItemCard key={product.id} product={product} quantity={quantity} />
          ))}
        </div>
        <div className='flex flex-col w-full sm:w-4/12'>
          <WidgetItem title='Total to pay'>
            <div className='mt-2 flex justify-center gap-4'>
              <h3 className='text-3xl font-bold text-gray-700'>
                $ {(totalPay * 1.15).toFixed(2)}
              </h3>
            </div>
            <span className='font-bold text-center text-gray-500'>
              Tax 15%: $ {(totalPay * 0.15).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </>
  );
}
