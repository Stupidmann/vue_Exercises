const app = new Vue({
    el: '#app',
    data: {
      product: 'Socks',
      image: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
      onSale:true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId:11,
          variantColor:"Green"
        },
        {
          variantId:12,
          variantColor:"Blue"
        }
      ],
      sizes: [
        {
          sizeId:1,
          size:9
        },
        {
          sizeId:2,
          size:10
        },
        {
          sizeId:3,
          size:11
        },
      ]
    } 
  })